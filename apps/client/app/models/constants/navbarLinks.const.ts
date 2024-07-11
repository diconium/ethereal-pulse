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
]


export const LANDING_PAGE_LINKS: NavbarLink[] = [
  {
    path: "/docs",
    label: "Docs"
  },
  {
    path: "/templates",
    label: "Templates"
  },
  {
    path: "/login",
    label: "Login"
  },
]