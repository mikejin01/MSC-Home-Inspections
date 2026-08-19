# Per-site SiteGround SSH + deploy config TEMPLATE.
#
# HOW TO USE
#   1. Copy this file to .live-sites/<site_key>.mk   (e.g. .live-sites/msc.mk)
#   2. Fill in the real values.
#   3. Use it:  make test-connection SITE=msc
#               make build-and-push  SITE=msc
#               make ssh             SITE=msc
#
#   Omitting SITE= uses the defaults at the top of the Makefile instead.
#
# SECURITY
#   Only this _template.mk is committed — every real .live-sites/*.mk is
#   gitignored. Never paste real credentials into this file. Use SSH key auth,
#   never passwords; keep the key at SITEGROUND_IDENTITY_FILE, chmod 600.
#
# WHERE THE VALUES COME FROM
#   SiteGround Site Tools → Devs → SSH Keys Manager shows the username, host
#   and port. The port is 18765 on SiteGround, not 22.
#
# WHICH KEY
#   Check `ls ~/.ssh/siteground*` before generating anything. One key pair is
#   shared across every site in the same SiteGround account — onboarding a new
#   site under an account that already trusts the key is just Site Tools → Devs
#   → SSH Keys Manager → Import → paste ~/.ssh/siteground.pub. Only generate a
#   new pair for a different SiteGround account, named per account
#   (e.g. ~/.ssh/siteground_jeffl208).

# ----- SSH connection -----
SITEGROUND_USER           := REPLACE_WITH_SSH_USER
SITEGROUND_DOMAIN         := REPLACE_WITH_DOMAIN.com
SITEGROUND_HOST           := ssh.$(SITEGROUND_DOMAIN)
SITEGROUND_PORT           := 18765
SITEGROUND_IDENTITY_FILE  := ~/.ssh/siteground

# ----- WordPress paths on the server -----
# The docroot is almost always www/<domain>/public_html on SiteGround.
SITEGROUND_DOCROOT        := www/$(SITEGROUND_DOMAIN)/public_html

# Theme folder name under wp-content/themes/. Must match THEME.slug in
# scripts/build-wordpress-theme.mjs.
SITEGROUND_THEME_NAME     := msc-home-inspections
SITEGROUND_REMOTE_PATH    := $(SITEGROUND_DOCROOT)/wp-content/themes/$(SITEGROUND_THEME_NAME)/
