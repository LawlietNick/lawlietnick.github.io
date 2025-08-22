import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Niko Karppinen",
  EMAIL: "niko@banal.one",
  NUM_POSTS_ON_HOMEPAGE: 2,
  NUM_WORKS_ON_HOMEPAGE: 0,
  NUM_PROJECTS_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Niko Karppinen",
  DESCRIPTION: "Analytiikan ja hakukoneoptimoinnin konsultti",
};

export const BLOG: Metadata = {
  TITLE: "Blogi",
  DESCRIPTION: "Omia tekstejä",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projectit ja esiintymiset",
  DESCRIPTION: "Viimeisiä projekteja ja esiintymisiä",
};

export const SOCIALS: Socials = [
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/karppinenniko/",
  },
  { 
    NAME: "bluesky",
    HREF: "https://bsky.app/profile/lawlietnick.bsky.social",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/LawlietNick"
  },
  
];
