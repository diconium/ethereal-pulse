import { GitHubStrategy } from 'remix-auth-github';
import { sessionStorage } from '~/services/session.server';

function initializeGitHubStrategy() {
  const {
    WEBAPP_GITHUB_CLIENT_ID,
    WEBAPP_GITHUB_CLIENT_SECRET,
    WEBAPP_GITHUB_CALLBACK_URL,
  } = process.env;
  if (
    !WEBAPP_GITHUB_CLIENT_ID ||
    !WEBAPP_GITHUB_CLIENT_SECRET ||
    !WEBAPP_GITHUB_CALLBACK_URL
  ) {
    throw new Error('Missing required GitHub environment variables');
  }

  return new GitHubStrategy(
    {
      clientID: WEBAPP_GITHUB_CLIENT_ID,
      clientSecret: WEBAPP_GITHUB_CLIENT_SECRET,
      callbackURL: WEBAPP_GITHUB_CALLBACK_URL,
    },
    async ({ profile }) => {
      const userId = profile.id;
      // Store the user ID in the session
      const session = await sessionStorage.getSession();
      session.set('userId', userId);
      return userId;
    },
  );
}

export const gitHubStrategy = initializeGitHubStrategy();
