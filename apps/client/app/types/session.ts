import { User } from "./auth";

export interface CreateUserSessionOptions {
  redirectTo?: string;
  remember?: boolean;
}

export interface RootData {
  csrf: string;
  isLoggedIn: boolean;
  user?: User;
}