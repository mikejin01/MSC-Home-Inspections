# Asset Manifest

Images fall into three groups: **client-supplied**, **licensed stock**, and **extracted
from the flyer**. Which group a file belongs to determines whether it still needs
replacing before launch.

## 1. Client-supplied

| File | Notes |
| --- | --- |
| `inspector-hq.png` | The inspector's portrait, supplied by the business. High resolution, clean white background. Used on the "Your Inspector" tile. |

> Note for the client: the polo in this portrait reads **MSC Home Improvement &
> Construction**, not *MSC Home Inspections*. Worth confirming that is the intended
> branding on the inspections site.

## 2. Licensed stock — Unsplash

The photography was replaced on 2026-08-05. The previous set was cropped out of the
flyer JPEG at roughly 700 × 550 and then upscaled, so it rendered soft and washed out
on tiles two to three times that size. These are full-resolution originals.

All are covered by the [Unsplash License](https://unsplash.com/license): free to use
commercially, no permission or attribution required. Attribution is not required, but
the photo IDs are recorded here so provenance and licence can be re-checked at any time.

| File | Output | Unsplash photo ID | Used for |
| --- | --- | --- | --- |
| `home-exterior.jpg` | 1800 × 1200 | `photo-1568605114967-8130f3a36994` | Hero photo tile |
| `service-1.jpg` | 1300 × 732 | `photo-1708895140733-8873a8b8ee0f` | Moisture Intrusion Detection |
| `service-2.jpg` | 1400 × 1050 | `photo-1737739973200-61c2ae4d1272` | Water Damage Inspections |
| `service-3.jpg` | 1200 × 800 | `photo-1737116748146-a6be49d6cb54` | Attic & Crawl Space Evaluations |
| `service-4.jpg` | 1200 × 900 | `photo-1683468820750-b1fd50978474` | Indoor Air Quality Concerns |
| `service-5.jpg` | 1200 × 753 | `photo-1614935151651-0bea6508db6b` | Referrals When Needed |
| `service-pool.jpg` | 1900 × 1226 | `photo-1714203172156-4c2f8c767a37` | Pool Inspections |

Any photo can be swapped by downloading
`https://images.unsplash.com/photo-<id>?w=<width>&q=90&fm=jpg&fit=max` and re-saving it
over the file. All are re-encoded as progressive JPEG at quality 72–82 and kept under
about 380 KB.

**These are stock, not this business's work.** Real photographs from actual MSC
inspections would be more persuasive than any stock image, and are the single biggest
available upgrade to this page. Swapping them in requires no code change — just replace
the files at the same paths and update the `alt` text in `src/lib/content.js`.

## 3. Extracted from the flyer

Still cropped out of `docs/Business Flyer.jpg` (1280 × 1906 px) with Pillow — LANCZOS
upscale, light unsharp mask, saved as PNG with a transparent background. The flyer is a
compressed JPEG, so **these remain low-resolution and should be replaced with the
originals before launch.**

| File | Source region (x₁,y₁,x₂,y₂ in the flyer) | Output | Used for |
| --- | --- | --- | --- |
| `logo-msc.png` | 98, 10 → 500, 337 | 402 × 327, transparent | Full stacked lockup — **not currently placed** |
| `logo-msc-white.png` | same, knocked out white | 402 × 327, transparent | Reversed stacked lockup — **not currently placed** |
| `mark-msc.png` | 110, 12 → 380, 132 | 270 × 120, transparent | Roof mark — header lockup, hero script tile |
| `mark-msc-white.png` | same, knocked out white | 270 × 120, transparent | Roof mark — footer lockup |
| `inspector.jpg` | 20, 357 → 312, 920 | 759 × 1463 | Superseded by `inspector-hq.png`; **no longer referenced** |

`favicon.svg` is hand-drawn to echo the roof mark; it is not extracted from the flyer.

**The logo knockout.** The lockups sit on white in the flyer. Background was made
transparent by mapping luminance to alpha (fully opaque at ≤205, fully transparent at
≥247, linear between), which preserves the navy roof and near-black wordmark rather
than flattening them to a silhouette. The white variants use the same alpha with the
colour forced to white.

## What to request from the client

1. **The original vector logo** (`.svg`, `.ai`, or `.eps`). The header currently uses
   the extracted roof mark beside a typeset Montserrat wordmark, because the flyer's
   stacked lockup is illegible at header size. A proper horizontal lockup would replace
   that.
2. **Photographs from real inspections** — defect findings, attics and crawl spaces,
   and a pool — to replace the stock set in section 2.
3. **A pool inspection photo in particular.** Pool inspections were added to the site
   after the flyer was printed, so there is no client imagery for it at all.
