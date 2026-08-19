# `.live-sites/`

Per-site SSH and deploy credentials, kept out of git.

- `_template.mk` — the documented template. **Committed. No real values.**
- `<site_key>.mk` — one per live WordPress install. **Gitignored.**

```bash
cp .live-sites/_template.mk .live-sites/msc.mk
$EDITOR .live-sites/msc.mk          # fill in user / domain / port / key path

make test-connection SITE=msc
make build-and-push  SITE=msc
make list-sites                     # see what's configured
```

Omitting `SITE=` falls back to the defaults at the top of the `Makefile`, which
is fine for a single-site project once you've filled them in — this directory
exists so credentials never have to be committed, and so a second install
(staging, a second domain) costs one file rather than a Makefile edit.

Content sync is per install, because each one has its own database:

```bash
make check-content-drift SITE=msc
make pull-content        SITE=msc
```

The private key itself lives outside the repo (`~/.ssh/…`, `chmod 600`) — only
its path is recorded here.
