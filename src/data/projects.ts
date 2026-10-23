import scentiquePv from "../assets/scentique-pv.jpg";
import barberPv from "../assets/barberbydavid-pv.jpg";
import hyrulePv from "../assets/HyruleCompendium.jpg";

export type Project = {
  name: string;
  description: string;
  url: string;
  display: string;
  image?: string;
  tags?: string[];
  placeholder?: boolean;
};

export const clientProjects: Project[] = [
  {
    name: "ESA Audio Production",
    description: "Website for an audio production studio. Live customer project.",
    url: "https://esa-audio.se",
    display: "esa-audio.se",
    tags: ["Next.js"],
  },
  {
    name: "Creekroad AB",
    description: "Company website. Live customer project.",
    url: "https://creekroad.se",
    display: "creekroad.se",
    tags: ["WordPress"],
  },
  {
    name: "Scentique",
    description:
      "E-commerce store for a fragrance brand. Built and deployed as a live customer project.",
    url: "https://scentique.se",
    display: "scentique.se",
    image: scentiquePv,
    tags: ["Shopify"],
  },
  {
    name: "Barber by David",
    description:
      "Booking and presentation site for a barber studio. Live customer project.",
    url: "https://www.barberbydavid.com",
    display: "barberbydavid.com",
    image: barberPv,
    tags: ["WIX"],
  },
];

export const personalProjects: Project[] = [
  {
    name: "Hyrule Compendium",
    description:
      "A searchable Breath of the Wild compendium built with vanilla JS. Heavy focus on custom styling and API integration.",
    url: "https://github.com/tZandr/Hyrule-Compendium-App",
    display: "github.com/tZandr",
    image: hyrulePv,
    tags: ["JS", "CSS", "API"],
  },
  {
    name: "GymLog",
    description:
      "Workout tracker with exercise management, saved sessions, and an active training flow built with React, Express, and MongoDB.",
    url: "https://github.com/tZandr/gymlog-app",
    display: "github.com/tZandr",
    tags: ["React", "TypeScript", "Express", "MongoDB"],
  },
];
