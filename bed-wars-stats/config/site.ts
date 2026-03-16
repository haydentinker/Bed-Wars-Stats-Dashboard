export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Bedwars Stats",
  description: "View Hypixel Bedwars stats",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Player Stats",
      href: "/player/[userName]",
    },

  ],


};
