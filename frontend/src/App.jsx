import { AppShell } from './components/AppShell.jsx';
import { AuthScreen } from './components/AuthScreen.jsx';
import { FeedView } from './components/FeedView.jsx';
import { ProfileView } from './components/ProfileView.jsx';
import { PublicProfileView } from './components/PublicProfileView.jsx';
import { RecipeComposer } from './components/RecipeComposer.jsx';
import { useAuth } from './hooks/useAuth.js';
import { useFeed } from './hooks/useFeed.js';
import { usePublicProfile } from './hooks/usePublicProfile.js';
import { useTheme } from './hooks/useTheme.js';
import { useEffect, useState } from 'react';

function App() {
  const [activeView, setActiveView] = useState('feed');
  const auth = useAuth();
  const feed = useFeed(auth.token);
  const publicProfile = usePublicProfile(auth.token);
  const theme = useTheme();

  useEffect(() => {
    if (activeView === 'auth' && auth.isAuthenticated) {
      setActiveView('feed');
    }

    if (!auth.isAuthenticated && ['create', 'profile'].includes(activeView)) {
      setActiveView('feed');
    }
  }, [activeView, auth.isAuthenticated]);

  useEffect(() => {
    if (activeView === 'profile' && auth.userId) {
      publicProfile.loadProfile(auth.userId);
    }
  }, [activeView, auth.userId]);

  async function openPublicProfile(userId) {
    await publicProfile.loadProfile(userId);
    setActiveView('publicProfile');
  }

  async function toggleLike(recipe) {
    if (!auth.isAuthenticated) return;

    publicProfile.updateProfileRecipe(recipe);
    await feed.toggleLike(recipe);
  }

  async function updateRecipe(recipeId, recipe) {
    const updatedRecipe = await feed.updateRecipe(recipeId, recipe);
    publicProfile.replaceProfileRecipe(updatedRecipe);
  }

  async function deleteRecipe(recipeId) {
    await feed.deleteRecipe(recipeId);
    publicProfile.removeProfileRecipe(recipeId);
  }

  if (activeView === 'auth' && !auth.isAuthenticated) {
    return (
      <AuthScreen
        isLoading={auth.isAuthLoading}
        onContinueAsGuest={() => setActiveView('feed')}
        onLogin={async (credentials) => {
          await auth.login(credentials);
          setActiveView('feed');
        }}
        onSignup={async (user) => {
          await auth.signup(user);
          setActiveView('feed');
        }}
        onToggleTheme={theme.toggleTheme}
        theme={theme.theme}
      />
    );
  }

  return (
    <AppShell
      activeView={activeView}
      currentUser={auth.currentUser}
      isAuthenticated={auth.isAuthenticated}
      onChangeView={setActiveView}
      onLogin={() => setActiveView('auth')}
      onLogout={auth.logout}
      onToggleTheme={theme.toggleTheme}
      theme={theme.theme}
    >
      {activeView === 'feed' ? (
        <FeedView
          filters={feed.filters}
          commentsByRecipe={feed.commentsByRecipe}
          currentUserId={auth.userId}
          feedError={feed.feedError}
          isLoading={feed.isFeedLoading}
          isAuthenticated={auth.isAuthenticated}
          recipes={feed.recipes}
          page={feed.page}
          pageSize={feed.pageSize}
          totalRecipes={feed.totalRecipes}
          tags={feed.tags}
          onAddComment={feed.addComment}
          onClearFilters={feed.clearFilters}
          onDeleteRecipe={deleteRecipe}
          onLoadComments={feed.loadComments}
          onOpenCreate={() => setActiveView('create')}
          onPageChange={feed.goToPage}
          onPageSizeChange={feed.updatePageSize}
          onRefresh={feed.refreshFeed}
          onToggleLike={toggleLike}
          onUpdateRecipe={updateRecipe}
          onUpdateFilters={feed.updateFilters}
          onViewProfile={openPublicProfile}
        />
      ) : null}

      {activeView === 'create' && auth.isAuthenticated ? (
        <RecipeComposer
          onCreateRecipe={feed.createRecipe}
          onCreateTag={feed.createTag}
          onCreated={() => setActiveView('feed')}
          tags={feed.tags}
        />
      ) : null}

      {activeView === 'profile' ? (
        <ProfileView
          commentsByRecipe={feed.commentsByRecipe}
          currentUser={auth.currentUser}
          currentUserId={auth.userId}
          isLoading={auth.isAuthLoading}
          isRecipesLoading={publicProfile.isProfileLoading}
          profileError={publicProfile.profileError}
          recipes={publicProfile.profileRecipes}
          tags={feed.tags}
          onAddComment={feed.addComment}
          onDeleteAccount={auth.deleteAccount}
          onDeleteRecipe={deleteRecipe}
          onLoadComments={feed.loadComments}
          onToggleLike={toggleLike}
          onUpdateProfile={auth.updateProfile}
          onUpdateRecipe={updateRecipe}
        />
      ) : null}

      {activeView === 'publicProfile' ? (
        <PublicProfileView
          commentsByRecipe={feed.commentsByRecipe}
          isLoading={publicProfile.isProfileLoading}
          profileError={publicProfile.profileError}
          profileRecipes={publicProfile.profileRecipes}
          profileUser={publicProfile.profileUser}
          currentUserId={auth.userId}
          tags={feed.tags}
          onAddComment={feed.addComment}
          onBack={() => setActiveView('feed')}
          onDeleteRecipe={deleteRecipe}
          onLoadComments={feed.loadComments}
          onToggleLike={toggleLike}
          onUpdateRecipe={updateRecipe}
          onViewProfile={openPublicProfile}
        />
      ) : null}
    </AppShell>
  );
}

export default App;
