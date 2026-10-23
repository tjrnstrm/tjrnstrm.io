import esaShot from "../assets/esa-audio.jpg";
import creekroadShot from "../assets/creekroad.jpg";
import scentiqueShot from "../assets/scentique.jpg";
import barberShot from "../assets/barberbydavid.jpg";
import hyrulePv from "../assets/HyruleCompendium.jpg";

export type Project = {
  name: string;
  /** What it is, in a few words ("Barbershop"); shown above the name. */
  what?: string;
  description: string;
  url: string;
  display: string;
  image?: string;
  tags?: string[];
  /** The year it was handed over to the client, who runs it since. */
  handedOver?: number;
  placeholder?: boolean;
};

export const clientProjects: Project[] = [
  {
    name: "ESA Audio Production",
    what: "Sound producer portfolio",
    description:
      "A dark, cinematic site for a game-audio producer, with a showreel, a portfolio of game credits and a background music player.",
    url: "https://esa-audio.se",
    display: "esa-audio.se",
    image: esaShot,
    tags: ["Next.js"],
  },
  {
    name: "Creekroad AB",
    what: "Telecom and infrastructure",
    description:
      "Company site for a telecom and infrastructure firm in Falun: services, projects and news, built for the client to update themselves.",
    url: "https://creekroad.se",
    display: "creekroad.se",
    image: creekroadShot,
    tags: ["WordPress", "Elementor"],
  },
  {
    name: "Scentique",
    what: "Fragrance store",
    description:
      "Online store for designer and niche fragrances, with a price guarantee, trade-ins and a pre-loved section.",
    url: "https://scentique.se",
    display: "scentique.se",
    image: scentiqueShot,
    tags: ["Shopify"],
    handedOver: 2024,
  },
  {
    name: "Barber by David",
    what: "Barbershop",
    description:
      "Booking and presentation site for a barbershop, with online booking straight from the front page.",
    url: "https://www.barberbydavid.com",
    display: "barberbydavid.com",
    image: barberShot,
    tags: ["WIX"],
    handedOver: 2022,
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
