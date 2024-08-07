import { GitHubStrategy } from 'remix-auth-github';
import { sessionStorage } from '~/services/session.server';

function initializeGitHubStrategy() {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } =
    process.env;
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
    throw new Error('Missing required GitHub environment variables');
  }

  return new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
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
