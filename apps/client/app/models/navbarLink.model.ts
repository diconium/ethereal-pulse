export interface NavbarLink {
  path: string,
  label: string
}


export const defaultLinks: NavbarLink[] = [
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


export const landingPageLinks: NavbarLink[] = [
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
    path: "/emails",
    label: "Emails"
  }
]