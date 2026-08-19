# Website Intake Guide

> A reusable process + checklist for collecting everything needed to build a client's
> website. The output is a `website-brief.md` for the client (see the MSC
> `docs/website-brief.md` for a completed example). The build then starts from one of
> the template repos (Phase 6) — never from scratch.

---

## The Process

The guiding principle: **pull, don't ask.** Most facts about a business already exist
online or in its marketing materials. Asking for links first and fetching them makes
intake dramatically easier for the client — but everything pulled must be **verified**,
because online sources go stale (old phone numbers, outdated hours, menus that changed
last year).

```
1. ASK FOR SOURCES  →  2. PULL & PRE-FILL  →  3. VERIFY WITH CLIENT  →  4. ASK THE GAPS  →  5. COMPILE  →  6. SCAFFOLD
   links & files          fetch each source      confirm-or-correct        only what no        website-       start from a
   nothing else yet       cite every fact        every pulled fact         source answered     brief.md       template repo
```

The **Field Checklists** section at the bottom defines every field the finished brief
needs — Phases 2–4 are about filling it in with as little client effort as possible.

**Markers used while filling the checklists:**

| Marker | Meaning |
|---|---|
| **[Unverified — source]** | Pulled from a source (name it, e.g. **[Unverified — GBP]**), not yet confirmed by the client. Never treat as final. |
| **[Inferred]** | Educated guess (e.g. owner name deduced from an email address). Must be confirmed. |
| **[Needs confirmation]** | No source had it — goes into the Phase 4 question batch. |

A fact loses its marker only when the client confirms it. If two sources disagree
(website says one phone number, Google Business Profile another), record both and flag
the conflict for the client — don't silently pick one.

---

## Session Workflow — Start & Resume

Intake spans multiple sessions (client answers arrive days apart), and a new session
starts with no memory of the last one. Two files make the process resumable: the client
repo's `CLAUDE.md` (auto-loaded at the start of every session) and the draft
`docs/website-brief.md` (the save-state, markers and all).

**First session in a new client repo — before starting Phase 1:**

1. Put this guide at `docs/website-intake-guide.md` in the client repo.
2. Create the repo's `CLAUDE.md` with a status pointer, so a plain "continue" in any
   later session lands in the right place:

   ```markdown
   ## Project status
   Client website built via the intake process in docs/website-intake-guide.md.
   Current state: docs/website-brief.md — check its status line and its remaining
   [Unverified] / [Needs confirmation] markers to see where we are and what's next.
   ```

3. Write the draft `docs/website-brief.md` in the same session Phase 1 starts, and
   keep it updated as facts come in — never leave progress only in the conversation.
4. Keep a **status line** at the top of the draft brief and update it every session:

   > Intake status: Phase 3 — awaiting client verification (sent 2026-08-06)

**Every later session:** `CLAUDE.md` points at the draft brief; its status line says
which phase is active, and the remaining markers say exactly what's still open. Resume
from there.

---

## Phase 1 — Ask for Sources

The **only** opening questions. No factual questions about the business yet — every
fact a source can answer is a question the client doesn't have to type out.

1. **Old / current website** — is there one? URL?
2. **Google Business Profile** — is there one? (A link, or just confirm the listing
   after searching the business name + city.)
3. **Social accounts** — Instagram, Facebook page, TikTok, Yelp, LinkedIn, YouTube,
   Nextdoor — whichever exist.
4. **Marketing materials** — flyer, brochure, menu, business card, signage photo,
   anything printed or designed. Original files preferred over photos of them.
5. **Logo files** — vector if possible (`.svg` / `.ai` / `.eps`), plus any variants.
6. **Original photos** — high-res versions, not ones cropped into a flyer or
   compressed by social media.

---

## Phase 2 — Pull & Pre-fill

Fetch every source provided and pre-fill the Field Checklists. Tag each fact with the
source it came from, e.g. **[Unverified — old website]**, **[Unverified — GBP]**.

| Source | What to extract |
|---|---|
| **Old website** | Business info, full service/menu list, copy and tone, photos, page structure, existing page URLs (for 301 redirects so SEO isn't lost) |
| **Google Business Profile** | Business name, category/industry, address, phone, hours, service area, description, attributes, reviews, photos |
| **Social accounts** | Handles/links for the site footer, bio copy, brand visuals, tone from recent posts, menu/product photos, review counts and follower proof |
| **Marketing materials** | Brand colors, fonts, logo, taglines, messaging, photography style, service descriptions |
| **Logo files** | Header logo, favicon, exact brand colors |
| **Photos** | Hero images, service/product imagery, team portraits |

**If an old website exists, also record:**
- [ ] Current domain name and where it's registered (who controls it)
- [ ] Current hosting / platform (Wix, Squarespace, WordPress, etc.)
- [ ] List of existing page URLs (for 301 redirects)
- [ ] What the client likes / dislikes about the old site

---

## Phase 3 — Verify With the Client

Present everything pulled as a single **confirm-or-correct** list, grouped by topic:

> "Here's what I found from your website / Google listing / Instagram — is all of this
> still correct?"

- Ask explicitly about the fields most likely to be stale: **phone, hours, address,
  prices/menu, service list, service area**.
- Surface any **conflicts between sources** and ask which is current.
- If the old website is clearly outdated, ask which parts are still accurate rather
  than treating any of it as authoritative.
- Only after this pass do pulled facts lose their **[Unverified]** marker.

---

## Phase 4 — Ask the Gaps

Whatever the sources didn't answer — every remaining **[Needs confirmation]** item —
goes to the client as **one consolidated, numbered question batch**, not a drip of
one-off questions. Combine it with the Phase 3 verification list into a single message
when practical: "confirm these, answer those."

---

## Phase 5 — Compile the Brief

Compile everything into `docs/website-brief.md` for the client, structured as:

1. **Business Information** — table from checklist A
2. **Messaging & Copy** — verbatim taglines and copy from sources, positioning notes (checklist D)
3. **Services / Offerings** — checklist B, preserving the client's own scope language
4. **Brand & Design Direction** — palette, type, logo, imagery, layout language from checklist C
5. **Website Build Notes** — suggested page structure, practical flags, SEO starting points (checklist E)
6. **Open Questions Summary** — every remaining **[Needs confirmation]** and **[Unverified]** item, numbered, in one list

The brief is "done" when no **[Unverified]** markers remain.

---

## Phase 6 — Scaffold from a Template

Never build a client site from scratch. Once the brief is compiled, start from the
template repo that matches the business type, keep the one style closest to the brand
direction in checklist C, and re-skin it with the brief's content, palette, and type.

| Template repo | Use for | Stack | Styles / demos |
|---|---|---|---|
| [Sora-Sushi-Web-Design-Template](https://github.com/mikejin01/Sora-Sushi-Web-Design-Template) | Restaurants & food service | SvelteKit (Svelte 5), fully static, GitHub Pages | 4 switchable styles: **Editorial** (dark & cinematic), **Minimalist** (light & serene), **Illustrative** (warm & hand-crafted), **Bento** (modular & modern) |
| [Hamilton-Auto-Solution](https://github.com/mikejin01/Hamilton-Auto-Solution) | General & service businesses — the default choice for anything that isn't a restaurant or a store | SvelteKit (Svelte 5), fully static, GitHub Pages | Same 4 styles: Editorial, Minimalist, Illustrative, Bento |
| [E-commerce-Templates](https://github.com/mikejin01/E-commerce-Templates) | E-commerce / online stores | Next.js (TypeScript), static, GitHub Pages | 2 complete demo storefronts: **Verdon** (outdoor & sports eyewear) and **Elburg** (card-protecting wallets & pocket carry), each with the full home → listing → product → cart → checkout flow |

**How to scaffold** — the MSC site is the worked example (built from
Hamilton-Auto-Solution, keeping the **Bento** style):

1. Pick the repo by business type, and the style/demo by the brand direction in checklist C.
2. Clone it, keep only the chosen style, and remove the style switcher and unused themes.
3. Replace the design tokens (colors, fonts) and content with the brief's values.
4. Swap all demo imagery for the client's photos — the templates' stock/demo media
   never ships on a client site.

---

## Field Checklists

Everything the finished brief needs. Pre-fill from sources (Phase 2); whatever stays
empty becomes a Phase 4 question.

### A — Core Business Information

| Field | Value | Source | Verified? |
|---|---|---|---|
| Business name (legal) | | | |
| Display / short name | | | |
| Legal entity type (LLC, Inc, sole prop) | | | |
| Industry | | | |
| Phone number(s) — and label (cell/office) | | | |
| Email address | | | |
| Physical address — or confirm mobile/service-area-only with no public address | | | |
| Service area (cities, counties, radius) | | | |
| Business hours | | | |
| Year founded / years in business | | | |
| Owner name(s) and preferred title | | | |
| License / certification numbers | | | |
| Professional affiliations (trade orgs, BBB, etc.) | | | |
| Insurance / bonding (if relevant to trust) | | | |
| Social media accounts | | | |
| Languages spoken (if relevant) | | | |

**Flags to check:**
- Personal email (gmail/icloud) → recommend a branded address at the new domain, with forwarding.
- Licensed industries (inspections, contracting, food service, salons, medical) → license number on the site is a trust signal and sometimes legally required.

### B — Offerings (adapt to industry)

#### All businesses
- [ ] Full list of services/products — name + one-to-two sentence description each
- [ ] Which offering is the **core** one vs. add-ons or specialties
- [ ] Pricing approach: published prices, "starting at," or quote-on-request
- [ ] Anything they deliberately **don't** do (scope limits — mirror the client's own hedged language; don't over-promise on their behalf)
- [ ] Seasonal or limited-time offerings
- [ ] Guarantees / warranties

#### Restaurants & food service
- [ ] Full menu(s) — with prices, sections, and descriptions (get the source file, not just a photo)
- [ ] Separate menus: lunch/dinner/brunch/drinks/kids/catering
- [ ] Dietary labels (vegan, GF, halal, etc.)
- [ ] Online ordering / delivery platforms used (and whether to link or embed)
- [ ] Reservations system (OpenTable, Resy, phone-only)
- [ ] How often the menu changes (determines whether the menu should be easy to self-edit, a PDF, or hard-coded)

#### Service businesses (trades, inspections, cleaning, etc.)
- [ ] Process / what to expect (booking → service → deliverable, turnaround times)
- [ ] Sample deliverables (e.g. inspection report) to show or describe
- [ ] Emergency / after-hours availability
- [ ] Referral relationships (what they refer out vs. handle themselves)

#### Retail / products
- [ ] Product catalog scope — brochure site vs. actual e-commerce
- [ ] If e-commerce: payments, shipping, inventory management

### C — Brand & Design

Extract from marketing materials and social visuals first; ask only about gaps and
preferences.

- [ ] **Colors** — sample hex values from logo/materials; identify primary, accent, neutrals. Note the palette logic (e.g. "two-tone blue, no third accent").
- [ ] **Typography** — identify or approximate fonts from materials; map to free web-font equivalents (display / body / accent tiers)
- [ ] **Logo** — vector source? Variants needed (color-on-light, reversed-on-dark, favicon)? If no vector exists, flag as an action item.
- [ ] **Imagery style** — what photo categories do the materials use (aspirational, documentary/evidence, product, team/human)? What's missing and needs to be shot or sourced?
- [ ] **Layout signatures** — any distinctive visual moves in the materials worth carrying to the site (angled panels, badge icons, two-tone headlines, banding)
- [ ] **Tone of voice** — corporate-professional / friendly-local / upscale / playful? Take it from existing copy if possible.
- [ ] **Sites they like** — 2–3 examples (competitors or otherwise) and what specifically they like
- [ ] **Hard no's** — colors, styles, or clichés the client wants to avoid

### D — Content & Messaging

- [ ] Tagline(s) — existing ones verbatim from materials, or does one need to be written?
- [ ] Elevator pitch: who they serve + what makes them different (the "why us")
- [ ] Primary audience (and secondary — e.g. home buyers primary, realtors as referral partners)
- [ ] About / story — founding, background, credentials
- [ ] Team bios + headshots (or owner-operated single portrait)
- [ ] Testimonials/reviews to feature (with permission) — pull candidates from GBP/Yelp reviews found in Phase 2
- [ ] FAQs the client answers repeatedly
- [ ] Photos/certifications/press worth showing
- [ ] **Primary call to action** — what should a visitor do: call, fill a form, book online, order?

### E — Technical & Logistics

- [ ] **Timeline** — target launch date; any hard deadline (opening day, season, ad campaign)
- [ ] **Domain** — existing (who controls it) or new (preferred names, check availability)
- [ ] **Email** — set up branded email? Forwarding target?
- [ ] **Booking / contact method** — form, phone-only, scheduling tool (Calendly etc.), or third-party platform
- [ ] Where should form submissions go? (email address, expected response time)
- [ ] **Analytics** — Google Analytics / Search Console setup
- [ ] **Google Business Profile** — exists? Claimed by the owner? (Often matters more for local SEO than the site itself. If none exists, creating one is a recommendation for the brief.)
- [ ] **SEO basics** — primary keywords, locations to target, county/town service pages needed?
- [ ] Legal pages needed — privacy policy (required if forms/analytics), terms, accessibility statement
- [ ] Who maintains the site after launch, and what will they need to edit themselves?
- [ ] Content update frequency (static brochure vs. news/specials/menu changes)
