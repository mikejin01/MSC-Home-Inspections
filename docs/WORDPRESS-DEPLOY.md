# WordPress on SiteGround — setup and operations

This repo builds two ways from one source:

| Target | Command | Output |
| --- | --- | --- |
| GitHub Pages | `pnpm build` | prerendered static HTML in `build/` |
| WordPress on SiteGround | `make build-and-push` | a WordPress theme in `wordpress-theme/`, rsynced to the server |

The WordPress build turns the site into a client-editable CMS: the business owner
sets their details on an **X.O. Admin** screen, inspection requests land on a
**Leads** page *and* arrive by email, and any logged-in user can edit text,
images and links in place on the live site.

The architecture is [`SPA-TO-WORDPRESS-THEME-PLAYBOOK.md`](./SPA-TO-WORDPRESS-THEME-PLAYBOOK.md);
this document is the concrete implementation for this project.

> **Never install WordPress locally** — no Docker, no wp-env, no LocalWP, no
> MAMP. WordPress lives only on SiteGround; the SPA runs locally via `pnpm dev`.
> The test environment is the live site over SSH. See the playbook's hard rules.

## This site

| | |
| --- | --- |
| Live URL | <https://mschomeinspections.com> |
| Docroot | `www/mschomeinspections.com/public_html` |
| Theme | `wp-content/themes/msc-home-inspections` |
| WordPress | 7.0.3, permalinks `/%postname%/`, static front page |
| SSH | port 18765, key `~/.ssh/siteground` — username lives in the gitignored `.live-sites/msc.mk` |

Only one `.live-sites/*.mk` exists, so the Makefile loads it automatically:
`make build-and-push` works without `SITE=`.

**Domain history:** the site launched on SiteGround's temporary hostname
`jeffl247.sg-host.com`; when mschomeinspections.com was attached (August 2026),
SiteGround retired that hostname entirely (it no longer resolves, SSH included)
**and renamed the docroot folder** to `www/mschomeinspections.com`. Both the
SSH host and deploy path now come from `SITEGROUND_DOMAIN` in
`.live-sites/msc.mk`. If the domain ever changes again, run `ls ~/www` over SSH
before updating that variable — the docroot folder name must match.

---

## How it fits together

```
┌─ LOCAL ─────────────────────────────────┐   ┌─ SITEGROUND (live) ──────────────────┐
│ SvelteKit SPA                           │   │ WordPress                            │
│   src/lib/content.js       defaults     │   │  wp-content/themes/msc-home-inspections/
│   src/lib/content-overrides.json        │   │    index.php   → SEO h1 + app mount  │
│   src/lib/wp/              content layer│   │    header.php  → hashed _app/ assets │
│   src/lib/inline-edit/     edit UI      │   │    functions.php → REST + X.O. Admin │
│                                         │   │  DB: xo_global_*, xo_route_overrides,│
│ scripts/build-wordpress-theme.mjs       │   │      post meta   ← live edits live HERE
│   WP_BUILD=1 vite build → generate PHP  │   │                                      │
└──────┬──────────────────────────────────┘   └────────▲──────────────┬──────────────┘
       │  make build-and-push  (rsync over SSH)        │              │
       └──────────────────────────────────────────────-┘              │
       ┌───────────────────────────────────────────────────────────---┘
       │  make pull-content  (WP-CLI over SSH → src/lib/content-overrides.json)
       ▼
  local content stays in sync  →  CLAUDE.md rule: check drift before editing copy
```

**The mental model that matters:** `src/lib/content.js` is a *fallback layer*,
not the live copy. Live edits sit in the WordPress database and shadow it. That
is why the sync gate below exists.

---

## Part 1 — First-time setup

### 1.1 SSH access

1. **Reuse the existing key first** — `ls ~/.ssh/siteground*`. One key pair is
   shared across every site in the same SiteGround account, so if this site
   lives under an account that already trusts `~/.ssh/siteground`, onboarding is
   just Site Tools → Devs → SSH Keys Manager → **Import** → paste
   `~/.ssh/siteground.pub`. Only generate a new pair for a *different* SiteGround
   account, named per account (e.g. `~/.ssh/siteground_jeffl208`).
2. From **Site Tools → Devs → SSH Keys Manager**, note the **username**,
   **host** (`ssh.<domain>`) and **port** (18765, not 22). If a new key was
   downloaded rather than imported, lock it down:

   ```bash
   mv ~/Downloads/private_key ~/.ssh/siteground_<account>
   chmod 600 ~/.ssh/siteground_<account>
   ```

3. Fill in the variable block at the top of the [`Makefile`](../Makefile) —
   or, better, keep credentials out of git entirely:

   ```bash
   cp .live-sites/_template.mk .live-sites/msc.mk
   $EDITOR .live-sites/msc.mk
   make test-connection SITE=msc
   ```

   Every target accepts `SITE=<key>`. The rest of this document omits it; add it
   if you use the fragment.

SiteGround ships **WP-CLI preinstalled**, which is what the content-sync targets
depend on. `make test-connection` reports whether it is on the PATH.

### 1.2 Deploy and activate

```bash
make build-and-push
```

Then, in wp-admin:

1. **Appearance → Themes → Activate** "MSC Home Inspections".
   Activation creates the front page and seeds the business details.
2. **Settings → Permalinks → Post name.** Pretty permalinks are required.
3. **Settings → Reading →** confirm a static front page is set (activation does
   this; the button in X.O. Admin re-runs it).
4. **X.O. Admin → Business details →** set the **Email**. Until it is set,
   inspection requests are saved but nothing is emailed to anyone. The screen
   shows a red warning while it is blank.
5. **Settings → General → Site Icon.** Without it WordPress 302-redirects
   `/favicon.ico` to its own logo, which is what shows in the browser tab. The
   theme ships a ready-made 512×512 icon — set it from the Media Library, or
   over SSH:

   ```bash
   make ssh
   cd www/mschomeinspections.com/public_html
   wp media import wp-content/themes/msc-home-inspections/assets/images/site-icon.png \
     --title="MSC Home Inspections site icon" --porcelain
   wp option update site_icon <returned-attachment-id>
   ```

   `static/assets/images/site-icon.png` is generated from `static/favicon.svg`
   so the two never drift: `rsvg-convert -w 512 -h 512 static/favicon.svg -o
   static/assets/images/site-icon.png`.
6. **X.O. Admin → Maintenance → Import theme images.** Nothing runs this
   automatically. Until you press it the Media Library is empty, so a client who
   clicks *Replace image* in edit mode has nothing to choose from. Safe to
   re-run — it skips anything already imported.

   ```bash
   # or over SSH
   make ssh
   cd www/mschomeinspections.com/public_html
   wp eval 'wp_set_current_user(1); $r = xo_import_theme_images();
            printf("imported %d, skipped %d\n", $r["imported"], $r["skipped"]);'
   ```

   **This does not change what the site displays.** The page keeps rendering the
   copies shipped inside the theme (`/wp-content/themes/…/assets/images/…`),
   which deploy atomically with the code and never depend on the database. The
   Media Library copies exist purely so the client has the originals to pick,
   crop, or replace from.
7. **Yoast SEO** — see the section below.

If SSH is not available yet, `pnpm run build:wordpress` also writes
`msc-home-inspections.zip` for **Appearance → Themes → Add New → Upload**.

### 1.3 Verify

- Visit the site logged out — the bento page renders, the phone number matches
  X.O. Admin, images load from `/wp-content/themes/msc-home-inspections/assets/`.
- **Media → Library** shows the 13 theme photos plus the site icon. If it's
  empty, step 6 above was skipped.
- View source: every `_app/` URL must point inside the theme directory. A bare
  `/_app/...` means the URL rewrite missed (see Troubleshooting).
- Submit the booking form → a row appears under **Leads** and an email arrives.
- Log in, click **Edit page** bottom-right, change some text, **Save changes**,
  then check in a private window that the change is live.

### 1.4 SEO — who owns what

Yoast SEO is **active**. The theme checks for it (`xo_seo_plugin_active()`) and
steps back from anything Yoast does better, so each tag has exactly one owner:

| Output | Owner | Notes |
| --- | --- | --- |
| `<title>` | Yoast | From `_yoast_wpseo_title` on the front page |
| `<meta name="description">` | Yoast | The theme's own is suppressed while a SEO plugin is active |
| canonical, robots, OG/Twitter | Yoast | |
| `Organization` / `WebSite` / `WebPage` / `BreadcrumbList` schema | Yoast | Its standard graph |
| `HomeAndConstructionBusiness` schema | **the theme** | Phone, service area, `knowsAbout`, slogan — built from X.O. Admin. Yoast free can't express this type, so the theme keeps emitting it alongside Yoast's graph. |
| `sitemap_index.xml` | Yoast | |

Front-page title and description are set as Yoast post meta, so editing them in
Yoast's own UI works normally and survives redeploys. To change them from the
terminal:

```bash
make ssh
cd www/mschomeinspections.com/public_html
FRONT=$(wp option get page_on_front)
wp post meta update $FRONT _yoast_wpseo_title 'New title'
wp post meta update $FRONT _yoast_wpseo_metadesc 'New description'
wp cache flush && wp sg purge
```

**Site representation** is set to *Company* — "MSC Home Inspections LLC", logo =
the site icon. Yoast's Organization schema reads from there.

Worth doing when the real domain is attached: submit
`https://<domain>/sitemap_index.xml` to Google Search Console.

---

## Part 2 — Day-to-day

| Task | Command |
| --- | --- |
| Deploy code changes | `make build-and-push` |
| Redeploy without rebuilding | `make push` |
| Push only `functions.php` | `make push-functions` |
| Purge caches after a DB change | `make purge-cache` |
| Shell on the live server | `make ssh` |
| Check for live content this repo lacks | `make check-content-drift` |
| Pull live content into the repo | `make pull-content` |

Anything WP-CLI can do works from your terminal:

```bash
make ssh
cd www/mschomeinspections.com/public_html
wp option get xo_global_contact_email
wp option update xo_global_contact_phone '(917) 853-7100'
wp option delete xo_route_overrides     # clears every inline edit
wp cache flush && wp sg purge
```

> ⚠️ After **any** direct database change, purge caches. SiteGround's dynamic
> cache will serve stale HTML for hours otherwise.

---

## Part 3 — Editing content on the live site

Log in to WordPress, visit the site, and an **Edit page** button appears in the
bottom-right corner (any account that can edit posts).

| In edit mode | What you get |
| --- | --- |
| Text | Yellow dashed outline. Click and type. Enter commits, Escape reverts. |
| Images | Blue outline with a toolbar: **Replace image** opens the Media Library, plus an alt-text field. |
| Links | Blue outline. Clicking opens a URL box instead of navigating. |
| FAQ | Every answer opens, so questions and answers are both reachable. |

**Save changes** publishes everything at once and purges the SiteGround cache.
**Cancel** discards the draft. Closing the tab with unsaved edits prompts first.

### Placeholders

Typing any of these into editable text fills itself in from X.O. Admin, so the
phone number only ever has to change in one place:

`{{BUSINESS_NAME}}` `{{PHONE}}` `{{PHONE_HREF}}` `{{EMAIL}}` `{{EMAIL_HREF}}`
`{{ADDRESS}}` `{{CITY_STATE}}` `{{HOURS}}` `{{SERVICE_AREA}}`

While editing you see the raw `{{TOKEN}}`; everyone else sees the value. X.O.
Admin lists each token beside its current value.

### Where each edit is stored

| Key shape | Stored as | Example |
| --- | --- | --- |
| `global_*` | `xo_global_*` option (site-wide) | `global_contact_phone` |
| anything else | `xo_route_overrides` **and** post meta `_xo_<key>` | `hero_lead`, `faq_2_a` |
| `*_url` | sanitised as a URL (http/https/mailto/tel only) | `nav_0_url` |
| `*_img`, `*_photo`, `*_logo`, `*_mark` | normalised to a root-relative uploads path | `hero_photo` |

---

## Part 4 — Keeping the repo in sync

Live edits shadow `src/lib/content.js` rather than overwriting files, so a stale
local default is invisible on the live site — until someone resets content, or
greps the repo for copy that no longer matches production.

```bash
make check-content-drift    # exit 1 if the live site has copy this repo lacks
make pull-content           # merge it into src/lib/content-overrides.json
git diff src/lib/content-overrides.json
git commit -m "chore(content): sync live edits from mschomeinspections.com"
```

`src/lib/content-overrides.json` is tracked, sits between the WordPress database
and the code defaults, and feeds the static GitHub Pages build too — so a synced
repo and the live site say the same thing on both hosts.

There is no push direction. The live site cannot write commits into this repo,
and pretending otherwise would be worse than an honest gate. The rule in
[`CLAUDE.md`](../CLAUDE.md) is what makes the gate get used.

Optional hardening — make it mechanical instead of instructional:

```bash
cat > .git/hooks/pre-commit <<'SH'
#!/bin/sh
git diff --cached --name-only | grep -q 'src/lib/content' || exit 0
make check-content-drift
SH
chmod +x .git/hooks/pre-commit
```

---

## Part 5 — How the build works

`pnpm run build:wordpress` ([`scripts/build-wordpress-theme.mjs`](../scripts/build-wordpress-theme.mjs)):

1. `WP_BUILD=1 vite build` — SSR and prerendering off (`src/routes/+layout.js`
   reads the `__WP_BUILD__` flag from `vite.config.js`), so `build/index.html`
   is a pure SPA fallback. The GitHub Pages build is untouched and still
   prerenders.
2. Recreates `wordpress-theme/` and copies the build output in.
3. Splits `build/index.html`: `<link>` tags for `_app/` assets go into
   `header.php`, the mount `<div>` and its inline init script go into
   `index.php` **verbatim** — that script mounts the app into its own parent
   element, so the nesting has to survive. Root-absolute `/_app/` URLs are
   rewritten to `<?php echo get_template_directory_uri(); ?>/_app/`, which is
   what lets the same bundle work on any domain.
4. Generates `style.css`, `header.php`, `index.php`, `404.php`, `footer.php`,
   `functions.php`.
5. Zips the theme for manual upload.

**Generated files are never hand-edited.** Everything in `wordpress-theme/` is
overwritten on the next build; the PHP lives as template literals inside the
generator, and that is the file to change.

### Three hosts, one image path

`content.js` stores `/assets/images/x.jpg`. `assetUrl()` in
[`src/lib/wp/assets.js`](../src/lib/wp/assets.js) resolves it per host:

| Host | Resolves to |
| --- | --- |
| dev / GitHub Pages | `<base>/assets/images/x.jpg` |
| WordPress theme | `/wp-content/themes/msc-home-inspections/assets/images/x.jpg` |
| Media Library pick | `/wp-content/uploads/…` — passed through untouched |

---

## Part 6 — Verifying a change

> **The test environment is the live site, reached over SSH.** There is no local
> WordPress in this workflow — no Docker, no wp-env, no LocalWP, no MAMP, not
> even temporarily. The SPA runs locally through `pnpm dev`; WordPress exists
> only on SiteGround. See the hard rules at the top of
> [the playbook](./SPA-TO-WORDPRESS-THEME-PLAYBOOK.md).

What can be checked locally, before anything is pushed:

```bash
pnpm dev                      # the SPA itself, with content.js defaults
pnpm run build:wordpress      # generator runs, theme dir + PHP produced
grep -c '/_app/' wordpress-theme/header.php          # asset tags extracted
grep -o 'get_template_directory_uri' wordpress-theme/index.php | head -1
```

The generator throws rather than emitting a theme with zero asset tags, so a
successful build already rules out the most common SvelteKit-upgrade breakage.

Everything else is verified **against the live site after `make push`**, in this
order — these are the things static inspection cannot answer:

```bash
make build-and-push

# 1. The shell renders and every asset URL points inside the theme.
curl -s -A "Mozilla/5.0" https://<domain>/ | grep -c '/wp-content/themes/msc-home-inspections/_app/'
curl -s -A "Mozilla/5.0" https://<domain>/ | grep -c '"/_app/'      # must be 0

# 2. The wpRest contract is present.
curl -s -A "Mozilla/5.0" https://<domain>/ | grep -o 'window.wpRest = .\{0,120\}'
curl -s https://<domain>/wp-json/wp-theme/v1/bootstrap | head -c 200

# 3. Server-side state, straight from WP-CLI.
make ssh
cd www/<domain>/public_html
wp option list --search='xo_global_*'
wp option get xo_route_overrides --format=json
wp post list --post_type=lead_submission --fields=ID,post_title
```

Then in a browser, on the live site:

1. Logged out — the page renders and the phone number matches X.O. Admin.
2. Logged in — **Edit page** appears; text, images and links become editable;
   **Save changes** reports success; the edit survives a reload in a private
   window (after the cache purge the save triggers).
3. Submit the booking form — a row appears under **Leads** with its meta columns
   filled, and the email arrives.
4. X.O. Admin saves, and Repair Pages / Import Images / Reset each report a
   result rather than a PHP warning.

If a PHP change needs a syntax check before it goes up, SiteGround has PHP:

```bash
make push-functions   # or: make push
make ssh
php -l www/<domain>/public_html/wp-content/themes/msc-home-inspections/functions.php
```

Deploy to a staging copy first (SiteGround Site Tools → **WordPress → Staging**)
if a change is risky enough to warrant it — that is the supported way to get a
throwaway environment, and it still lives on SiteGround.

---

## Troubleshooting

**"I changed the default but the site didn't change."** Almost always a database
override sitting on top of it — check that layer first:

```bash
make ssh
cd www/mschomeinspections.com/public_html
wp option get xo_route_overrides --format=json
wp post meta list $(wp option get page_on_front)
```

Clear them with X.O. Admin → *Reset page content*, or `wp option delete
xo_route_overrides`.

**Lead emails never arrive.** In order of likelihood: the Email field in X.O.
Admin is blank (the page warns when it is); or `wp_mail` is being dropped by the
host. The lead is still saved under **Leads** either way. SiteGround sends fine
from `wordpress@<domain>`, but a custom From header on another domain lands in
spam — use SiteGround's email service or an SMTP plugin for branded senders, and
always send one real test submission after launch.

**Edit mode doesn't appear when logged in.** A speed/optimisation plugin has
probably stripped the inline `window.wpRest` script. The app recovers by
fetching `/wp-json/wp-theme/v1/bootstrap`, and an editor's nonce comes from
`admin-ajax.php?action=xo_edit_context` — a REST request without a nonce is
unauthenticated by design, so the public bootstrap endpoint deliberately cannot
hand out editing credentials. If it still fails, exclude the theme's inline
script from the plugin's JS optimisation.

**Assets 404 with a bare `/_app/...` path.** The URL rewrite missed. SvelteKit
occasionally changes the shape of its init script between versions; rebuild and
re-read the generated `header.php` / `index.php`. The generator throws rather
than shipping a theme with zero asset tags, but a partial change would slip
through.

**Verify what actually shipped.** Build metadata can lie. `curl` the live page,
find the hashed bundle name, and grep the deployed file for your string:

```bash
curl -s -A "Mozilla/5.0" https://mschomeinspections.com/ | grep -o '_app/immutable/entry/start\.[^"]*'
make ssh
grep -c 'your string' www/.../wp-content/themes/msc-home-inspections/_app/immutable/entry/app.*.js
```

SiteGround's anti-bot layer can 403 plain `curl`; pass a browser user-agent
before concluding a page is down.

**Long-lived caching for hashed assets.** HTML responses are sent `no-cache`
from PHP (content comes from the database, so a cached page shows a client their
old copy). Hashed assets are the opposite case and should be cached hard — that
belongs in `.htaccess`, which is server config this repo does not manage:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  <FilesMatch "\.(js|css|woff2)$">
    ExpiresDefault "access plus 1 year"
  </FilesMatch>
</IfModule>
```
