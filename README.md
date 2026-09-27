# tjrnstrm.io

My personal site: a landing page, an about page, and a project-brief form that
sends straight to my inbox. Live at [tjrnstrm.io](https://tjrnstrm.io).

## Stack

- **React 19** + **TypeScript**, built with **Vite**
- **Tailwind CSS v4**
- **React Router v7**, animated page changes via the View Transitions API
- **[cuelume](https://github.com/Danilaa1/cuelume)** for synthesized interaction sounds
- Hosted on **Vercel**; the contact form sends through **Formspree**

## Pages

- **/** — hero, name, status
- **/about** — bio, skills, experience and education
- **/contact** — a multi-step project brief that sends on submit, with a
  confirmation dialog on success

## Notes

- `DESIGN_LOG.md` is a running log of design and implementation decisions —
  what changed, why, and what was tried and dropped along the way.
- The contact form posts to a Formspree endpoint (`src/lib/sendBrief.ts`); no
  backend of its own.
