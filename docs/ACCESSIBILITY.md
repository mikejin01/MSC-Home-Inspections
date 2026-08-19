# Accessibility — audit record and working rules

**Target:** WCAG 2.1 Level AA — the standard US courts and the DOJ consistently
reference when applying the ADA to websites, and the one Section 508 adopts.

**Last audit:** 19 August 2026, against `main`.
**Method:** self-assessment. `axe-core` run over the prerendered HTML of all four
routes (including the booking dialog in its open state); every foreground /
background pair computed against the WCAG relative-luminance formula; keyboard
and screen-reader behaviour reviewed by reading the DOM the components produce.
**Not done:** an independent third-party audit, and testing on real AT
(NVDA/JAWS/VoiceOver). Both are worth commissioning before making any stronger
public claim than the one in `/accessibility/`.

---

## What was wrong, and what changed

### Colour contrast (1.4.3, 1.4.11)

Eight pairs missed AA. The fix keeps the flyer's palette and adds two
text-specific tokens rather than restyling anything.

| Where | Was | Ratio | Now | Ratio |
| --- | --- | --- | --- | --- |
| `--faint` body text (`.bt-info-label`, `.bk-note`, `.bk-opt`) | `#7b8798` | 3.65 | `#626e80` | 5.17 |
| `.bt-eyebrow` on the page field | `--accent` `#1c6fc9` | 4.49 | `--accent-ink` `#1866b8` | 5.15 |
| `.bt-eyebrow.bt-on-dark`, `.bt-accent-text` on navy | `--accent-bright` `#2e86e0` | 2.50 ¹ | `--accent-on-dark` `#7cbcf5` | 4.63 |
| `.bt-call-label` on the hero call tile | white @ .78 on `#2e86e0` | 2.89 | white @ .94 on `--accent` | 4.65 |
| `.bt-call-number` | white on `#2e86e0` | 3.75 | white on `--accent` | 5.04 |
| `.bt-stat-label` on the accent stat tile | white @ .78 on `#2e86e0` | 2.89 | white @ .94 on `--accent` | 4.65 |
| `.bt-footer-legal` | white @ .55 | 4.13 ² | white @ .72 | 7.72 |
| footer link `:hover` | `--accent-bright` | 4.35 | `--accent-on-dark` | 6.64 |

¹ measured against the hero's radial glow at its peak (`#1d4875`), not flat navy
— that glow sits directly behind the eyebrow and the headline's accent line.
² against `--navy-2`, the lighter end of the footer card's gradient.

Two gradients lost their brightest stop (`.bt-hero-call`, `.bt-stat-accent`)
because white text could not clear 4.5:1 over `#2e86e0`. Both now run
`--accent → --accent-deep`. `--accent-bright` survives as a graphic-only colour:
the hero lead's left rule and the trust-strip icons, where 3:1 is the bar.

### Keyboard and focus

- **No skip link (2.4.1, Level A).** Added `.xo-skip` as the first thing in the
  tab order on every page; `<main id="main" tabindex="-1">` is the target.
- **The closed mobile drawer stayed focusable.** It was hidden with
  `transform: translateX(100%)` alone, so tabbing on a phone walked through five
  invisible off-screen links (2.4.3). It now also carries `visibility: hidden`,
  transitioned so the slide-out still animates.
- **Collapsed FAQ panels stayed in the accessibility tree.** `grid-template-rows: 0fr`
  clips visually but leaves the text readable to a screen reader, contradicting
  the `aria-expanded="false"` on the trigger. Same `visibility` fix.
- **The booking dialog had no focus trap and never restored focus** (2.4.3).
  It now wraps Tab/Shift-Tab inside the panel, returns focus to whatever opened
  it, and locks background scroll while open. Escape already worked.
- **Focus rings were one colour.** `#1c6fc9` cannot clear 3:1 on both the
  `#eff2f7` field and a navy tile. There are now two: the default blue ring, and
  a white ring for anything inside an element marked `.on-dark`.

### Forms (3.3.1, 3.3.2)

The booking form showed errors in red text with no programmatic link to the
field. Now: `aria-invalid` and `aria-describedby` on each failing input, a
`role="alert"` summary above the form, focus moved to the first field that needs
fixing, `aria-required` on the four required fields, and `role="status"` on the
confirmation panel so "Request sent" is announced.

### Structure

- Two `<h1>`s on the WordPress build — the theme's SEO-only heading plus the
  SPA's own. The PHP one is now `aria-hidden="true"`: crawlers still read it,
  screen readers see exactly one.
- Service cards got `aria-labelledby`; FAQ panels got `role="region"` pointing
  at their trigger; the footer's policy links got their own labelled `<nav>`.
- The mobile toggle got `aria-controls` and a label that reflects its state.
- `::placeholder` was pinned to `#626e80` — browser defaults miss 4.5:1 on the
  form's tinted field background.

### Target size (2.5.8)

The dialog close button went 38px → 44px and the hamburger 42px → 44px; the FAQ
trigger row has an explicit 48px minimum; footer policy links and the legal
pages' contents list carry a 24px minimum height.

---

## Rules that keep this from regressing

1. **`--accent` is a fill, not an ink.** White text on it clears 5.04:1, so it is
   right for buttons and badges. For accent-coloured *text*, use `--accent-ink`
   on light surfaces and `--accent-on-dark` on navy. Never `--accent-bright` —
   it is 3.75:1 against white and is reserved for graphics.
2. **Check contrast against the real backdrop.** The hero and contact tiles have
   a radial glow over the navy gradient; measure against the glow's peak, not
   the base colour.
3. **Hiding something visually is not hiding it.** Anything collapsed or slid
   off-screen needs `visibility: hidden` (or `hidden`/`inert`) as well, or it
   stays focusable and readable.
4. **New routes are three edits, not one**: `src/routes/<slug>/+page.svelte`, the
   `THEME.pages` map in `scripts/build-wordpress-theme.mjs`, and — for policy
   pages — `LEGAL_LINKS` in `src/lib/content.js`. Miss the second and the page
   404s on WordPress while working fine on GitHub Pages.
5. **Alt text is content, not markup.** It lives under a `_alt` content key and
   the client can edit it in place; don't hardcode it in a component.

---

## Open items

- [ ] **Have the legal pages reviewed by an attorney.** `/privacy-policy/` and
      `/terms-of-service/` follow the X.O. house template already live on the
      iDeal Auto Broker sites, with the auto-broker clauses replaced by
      inspection ones. That makes them consistent with the rest of the
      portfolio; it does not make them legal advice.
- [ ] **Confirm MSC can meet the 2-business-day response commitment.**
      `/accessibility/` now promises it, matching the house standard. It is a
      real commitment on a one-person business — worth saying out loud to the
      owner before launch.
- [ ] **Add the NJ home inspector licence number.** It belongs in the terms'
      Inspection Services Disclosure and in the footer legal line. It is the
      analogue of the VTL §415 broker disclosure the iDeal sites carry, and the
      strongest trust signal available to a licensed inspector.
- [ ] **Add the business mailing address** to the privacy policy, once confirmed.
- [x] ~~Confirm the analytics claim.~~ Checked against the X.O. Analytics
      network on 19 Aug 2026 (`get_account_summaries`): **there is no GA4
      property for mschomeinspections.com**. The policy now says plainly that
      the site runs no third-party analytics and sets no tracking cookies.
      ⚠️ Connecting GA4 later makes both sentences false — update them in the
      same change.
- [x] ~~Verify the 320px / 200%-zoom claim.~~ Resolved by removing it. The
      statement no longer lists reflow among its specific claims, so nothing on
      the page rests on a measurement that was reasoned from the stylesheet
      rather than rendered. The CSS does support it; it is simply not claimed.
- [ ] Test with VoiceOver (macOS/iOS) and NVDA (Windows). The statement says the
      site is *designed to be* compatible with them, which is a design-intent
      claim — testing would let it say more.
- [ ] Re-check contrast if the client changes a brand colour in X.O. Admin —
      the palette is in CSS, not the database, but logo swaps can change the
      surfaces text sits on.

---

## A note on the conformance claim

The statement says the site is **"partially conformant"** and that we are
**"working toward"** WCAG 2.1 AA — the wording the house template uses, and
deliberately weaker than what the audit found. That is the right way round.
An accessibility statement is the first page a plaintiff's firm reads, and a
claim of full conformance is an invitation to disprove it. Understating a site
that measures clean costs nothing; overstating one costs a great deal.
