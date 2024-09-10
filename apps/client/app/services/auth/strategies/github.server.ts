import { NewUser } from '~/models';
import { GitHubStrategy } from 'remix-auth-github';
import { storeUser } from '~/services/user.server';
import { getSession } from '~/services/session.server';
import { ERROR_MESSAGES } from '~/constant/error-messages-constants';

function initializeGitHubStrategy() {
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } =
    process.env;
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
    throw new Error(ERROR_MESSAGES.MISSING_GITHUB_ENV_VARS);
  }

  return new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
    async ({ profile }) => {
      const user: NewUser = {
        firstName: profile.displayName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
      };

      const userId = await storeUser(user);

      const session = await getSession();
      session.set('userId', userId);

      return userId;
    },
  );
}

export const gitHubStrategy = initializeGitHubStrategy();
