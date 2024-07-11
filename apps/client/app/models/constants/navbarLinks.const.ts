import { NavbarLink } from "~/models/navbarLink.model";

export const DEFAULT_LINKS: NavbarLink[] = [
  {
    path: "/emails",
    label: "Emails"
  },
  {
    path: "/templates",
    label: "Templates"
  },
  {
    path: "/groups",
    label: "Groups"
  },
  {
    path: "/api-keys",
    label: "API Keys"
  },
  {
    path: "/docs",
    label: "Docs"
  },
  {
    path: "/help",
    label: "Help"
  },
  {
    path: "/settings",
    label: "Settings"
  },
  {
    path: "/user",
    label: "User name"
  },
]


export const LANDING_PAGE_LINKS: NavbarLink[] = [
  {
    path: "/login",
    label: "Sign in"
  },
  {
    path: "/signup",
    label: "Sign up"
  },
  {
    path: "/docs",
    label: "Docs"
  },
  {
    path: "/templates",
    label: "Templates"
  }
]