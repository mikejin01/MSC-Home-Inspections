# MSC Home Inspections LLC — Website

A one-page marketing site for **MSC Home Inspections LLC**, a home inspection business
serving the New Jersey area. Built with **SvelteKit (Svelte 5)** as a fully static site,
deployable to GitHub Pages.

The design is a **bento layout** — rounded tiles of varying sizes on a light field —
with all art direction taken from the client's business flyer
(`docs/Business Flyer.jpg`). See [`docs/business-profile.md`](docs/business-profile.md)
for the full brand brief and [`docs/asset-manifest.md`](docs/asset-manifest.md) for
where every image came from.

Scaffolded from the [Hamilton Auto Solution](https://github.com/mikejin01/Hamilton-Auto-Solution)
template. The template's other three themes (editorial, minimalist, illustrative), the
style switcher, and all of its demo media were removed — this repo carries the bento
theme only.

## Run locally

Uses [pnpm](https://pnpm.io) (`corepack enable` if you don't have it):

```bash
pnpm install
pnpm dev           # dev server at http://localhost:5173
```

Build / preview the production static site:

```bash
pnpm build         # outputs static files to ./build
pnpm preview       # serve the built site locally
```

## Where to edit things

| I want to change… | Edit |
| --- | --- |
| Any copy, phone number, email, service descriptions, FAQ | [`src/lib/content.js`](src/lib/content.js) |
| Layout, colours, typography, tile sizes | [`src/lib/bento/BentoPage.svelte`](src/lib/bento/BentoPage.svelte) |
| The "Schedule an Inspection" form | [`src/lib/components/BookingModal.svelte`](src/lib/components/BookingModal.svelte) |
| Page title, meta description, structured data | [`src/routes/+page.svelte`](src/routes/+page.svelte) |
| Fonts | [`src/app.html`](src/app.html) |
| Images | [`static/assets/images/`](static/assets/images/) |

`src/lib/content.js` is the single source of truth for copy — nearly every text change
should happen there, not in the component.

## The contact form

The form has no backend. Out of the box it opens the visitor's email client with a
pre-filled message to the address in `CONTACT.email`. That works on a static host, but
it depends on the visitor having a mail client configured.

To collect submissions properly, set `FORM_ENDPOINT` in `src/lib/content.js` to a form
service endpoint ([Formspree](https://formspree.io), [Basin](https://usebasin.com), or
similar). The form will POST JSON there instead, and fall back to email if the request
fails.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to
`main`. It sets `BASE_PATH` automatically so the site works from a project page
(`https://<user>.github.io/<repo>/`).

For a custom domain, add a `CNAME` file to `static/` and leave `BASE_PATH` unset so the
site serves from `/`.

## Before this goes live

Content decisions are deliberately conservative: home inspection is a licensed,
liability-sensitive trade, so the site claims **no** credential, price, turnaround time,
rating, or review that the flyer didn't establish. Search `src/lib/content.js` for
`TODO:` — each one marks something the business needs to confirm. The most important:

1. **The NJ home inspector licence number**, plus any InterNACHI / ASHI affiliation.
   Both belong in the footer and the About section; they're the strongest trust signals
   this business has and the site currently shows neither.
2. **A branded email address.** `francocaruso19@icloud.com` is a personal iCloud
   address and currently appears in three places on the page.
3. **Specific counties and towns served** — replacing the generic "New Jersey area" is
   the single biggest local-SEO improvement available here.
4. **Report turnaround time** and whether clients may attend the inspection — both are
   referenced in the How It Works and FAQ sections with placeholder wording.
5. **Real reviews.** There is no testimonials section, because inventing testimonials
   for a real business isn't an option. Once Google reviews exist, that section is worth
   adding — it's the most common conversion driver for this trade.
6. **The original vector logo and high-resolution photography.** Every image on the site
   is currently extracted from the flyer JPEG. See `docs/asset-manifest.md`.
