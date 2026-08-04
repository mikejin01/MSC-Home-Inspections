# Asset Manifest

Every image in `static/assets/images/` was extracted from the client's own flyer,
`docs/Business Flyer.jpg` (1280 × 1906 px). No stock or placeholder imagery is used —
but the flyer is a compressed JPEG, so **all of these are low-resolution and should be
replaced with the originals before launch.**

Crops were taken with Pillow, upscaled with LANCZOS resampling and a light unsharp mask,
and saved as progressive JPEG (quality 84–86) or PNG with a transparent background.

| File | Source region (x₁,y₁,x₂,y₂ in the flyer) | Output | Used for |
| --- | --- | --- | --- |
| `home-exterior.jpg` | 958, 306 → 1271, 918 | 813 × 1591 | Hero photo tile |
| `inspector.jpg` | 20, 357 → 312, 920 | 759 × 1463 | "Your Inspector" portrait tile |
| `service-1.jpg` | 18, 928 → 253, 1112 | 705 × 552 | Moisture Intrusion Detection |
| `service-2.jpg` | 268, 928 → 503, 1112 | 705 × 552 | Water Damage Inspections |
| `service-3.jpg` | 518, 928 → 755, 1112 | 711 × 552 | Attic & Crawl Space Evaluations |
| `service-4.jpg` | 769, 928 → 1006, 1112 | 711 × 552 | Indoor Air Quality Concerns |
| `service-5.jpg` | 1017, 928 → 1257, 1112 | 720 × 552 | Referrals When Needed |
| `logo-msc.png` | 98, 10 → 500, 337 | 402 × 327, transparent | Full stacked lockup — **not currently placed** |
| `logo-msc-white.png` | same, knocked out white | 402 × 327, transparent | Reversed stacked lockup — **not currently placed** |
| `mark-msc.png` | 110, 12 → 380, 132 | 270 × 120, transparent | Roof mark — header lockup, hero script tile |
| `mark-msc-white.png` | same, knocked out white | 270 × 120, transparent | Roof mark — footer lockup |

`favicon.svg` is hand-drawn to echo the roof mark; it is not extracted from the flyer.

## Two repairs worth knowing about

**The portrait.** The flyer's navy hero panel bleeds into the top-right of the
inspector crop as a diagonal wedge. Above y ≈ 563 the wedge is contiguous with the
right edge and separated from his shoulder by light background, so it was repainted
white by walking in from the right edge along each row and feathering the seam. Below
that line the panel and his black polo are the same near-black and merge, so no repair
was needed — it reads as part of him.

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
2. **High-resolution photography** — especially the dusk home exterior, which is doing
   the most visual work on the page and is being upscaled roughly 1.5× from source.
3. **The inspector's portrait as a clean cutout** (transparent background, no flyer
   panel behind it).
4. The five defect photographs at full resolution.
