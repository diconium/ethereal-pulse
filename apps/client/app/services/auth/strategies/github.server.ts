import { GitHubStrategy } from 'remix-auth-github';
import { sessionStorage } from '~/services/session.server';

export const gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: process.env.GITHUB_CALLBACK_URL!,
  },
  async ({ profile }) => {
    const userId = profile.id;
    // Store the user ID in the session
    const session = await sessionStorage.getSession();
    session.set('userId', userId);
    return userId;
  },
);
