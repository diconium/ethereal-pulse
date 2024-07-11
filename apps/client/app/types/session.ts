import { User } from "./auth";

export interface RootData {
  csrf: string;
  user?: User;
}