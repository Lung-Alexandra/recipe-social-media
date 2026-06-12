function requireAuthenticatedUser(context) {
    if (!context?.user_id) {
        throw new Error('Authentication required');
    }

    return context.user_id;
}

module.exports = requireAuthenticatedUser;
