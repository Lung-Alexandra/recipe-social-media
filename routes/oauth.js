const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const db = require('../models');

const router = express.Router();
const stateCookieName = 'oauth_state';

function getRequiredEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}

function getClient() {
    return new OAuth2Client(
        getRequiredEnv('GOOGLE_CLIENT_ID'),
        getRequiredEnv('GOOGLE_CLIENT_SECRET'),
        getRequiredEnv('GOOGLE_CALLBACK_URL')
    );
}

function parseCookies(cookieHeader = '') {
    return Object.fromEntries(
        cookieHeader
            .split(';')
            .map((entry) => entry.trim().split('='))
            .filter(([key, value]) => key && value)
            .map(([key, value]) => [key, decodeURIComponent(value)])
    );
}

function setStateCookie(res, state) {
    res.cookie(stateCookieName, state, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
}

function clearStateCookie(res) {
    res.clearCookie(stateCookieName, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
}

function buildUsername(email) {
    const base = email.split('@')[0].replace(/[^a-z0-9_]/gi, '').slice(0, 24) || 'user';
    return `${base}_${crypto.randomBytes(3).toString('hex')}`;
}

function signAppToken(user) {
    return jwt.sign(
        { user_id: user.user_id },
        getRequiredEnv('JWT_SECRET'),
        { expiresIn: '7d' }
    );
}

router.get('/google', (req, res, next) => {
    try {
        const state = crypto.randomBytes(32).toString('hex');
        const client = getClient();
        const url = client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'select_account',
            scope: ['openid', 'email', 'profile'],
            state,
        });

        setStateCookie(res, state);
        res.redirect(url);
    } catch (error) {
        next(error);
    }
});

router.get('/google/callback', async (req, res, next) => {
    try {
        const { code, state } = req.query;
        const cookies = parseCookies(req.headers.cookie);
        const frontendUrl = process.env.OAUTH_SUCCESS_REDIRECT || 'http://localhost:5173';

        if (!code || !state || cookies[stateCookieName] !== state) {
            clearStateCookie(res);
            res.redirect(`${frontendUrl}/?oauthError=state`);
            return;
        }

        const client = getClient();
        const { tokens } = await client.getToken(String(code));
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: getRequiredEnv('GOOGLE_CLIENT_ID'),
        });
        const payload = ticket.getPayload();

        if (!payload?.email || !payload.email_verified) {
            clearStateCookie(res);
            res.redirect(`${frontendUrl}/?oauthError=email`);
            return;
        }

        const [user] = await db.User.findOrCreate({
            where: { email: payload.email },
            defaults: {
                username: buildUsername(payload.email),
                password: null,
                profile_picture: payload.picture || null,
                bio: null,
                date_joined: new Date(),
            },
        });

        if (!user.profile_picture && payload.picture) {
            user.profile_picture = payload.picture;
            await user.save();
        }

        const appToken = signAppToken(user);
        clearStateCookie(res);
        res.redirect(`${frontendUrl}/?token=${encodeURIComponent(appToken)}`);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
