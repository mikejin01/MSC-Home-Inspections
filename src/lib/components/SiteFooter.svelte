<script>
	/**
	 * The site footer: brand blurb, contact details, three link columns, the
	 * legal row, and the policy links.
	 *
	 * Extracted from BentoPage so every page shares one footer and one set of
	 * content keys (`footer_blurb`, `footer_col_{ci}_*`, `footer_legal_{i}_*`).
	 * Renaming or reordering those keys orphans a client's live edit, so add
	 * rather than renumber.
	 */
	import Logo from '$lib/components/Logo.svelte';
	import InlineEdit from '$lib/inline-edit/InlineEdit.svelte';
	import LinkEdit from '$lib/inline-edit/LinkEdit.svelte';
	import { mailHref, telHref } from '$lib/wp/client.js';
	import { wpEdit } from '$lib/wp/wpEdit.svelte.js';
	import { BRAND_LEGAL, CONTACT, FOOTER, LEGAL_LINKS } from '$lib/content.js';

	let {
		/** Prefix for in-page `#anchor` hrefs — see SiteHeader. */
		anchorBase = '',
		/** Where the footer logo links. */
		homeHref = '#top',
		/** Prefix for the policy-page hrefs, so they work under a base path. */
		pageBase = ''
	} = $props();

	const t = (/** @type {string} */ key, /** @type {string} */ fallback) => wpEdit.text(key, fallback);

	const businessName = $derived(t('global_business_name', BRAND_LEGAL));
	const phone = $derived(t('global_contact_phone', CONTACT.phone));
	const phoneLink = $derived(telHref(phone));
	const email = $derived(t('global_contact_email', CONTACT.email));
	const emailLink = $derived(mailHref(email));

	const year = 2026;
</script>

<footer class="bt-footer on-dark">
	<div class="bt-footer-card">
		<div class="bt-footer-inner">
			<div class="bt-footer-brand">
				<a href={homeHref} class="bt-footer-logo">
					<Logo light size="lg" />
				</a>
				<p><InlineEdit k="footer_blurb" value={FOOTER.blurb} multiline /></p>
				<p class="bt-footer-contact">
					<a href={phoneLink}>{phone}</a><br />
					<a href={emailLink}>{email}</a>
				</p>
			</div>

			<nav class="bt-footer-links" aria-label="Footer">
				{#each FOOTER.columns as col, ci}
					<div class="bt-footer-col">
						<span class="bt-footer-label">
							<InlineEdit k="footer_col_{ci}_label" value={col.label} />
						</span>
						{#each col.links as l, li}
							<LinkEdit
								urlKey="footer_col_{ci}_link_{li}_url"
								defaultHref={l.href}
								{anchorBase}
							>
								<InlineEdit k="footer_col_{ci}_link_{li}_label" value={l.label} />
							</LinkEdit>
						{/each}
					</div>
				{/each}
			</nav>
		</div>

		<div class="bt-footer-legal">
			<span>
				© {year}
				{businessName}. <InlineEdit k="footer_legal" value="All rights reserved." />
			</span>

			<!-- Policy pages get their own labelled nav so screen-reader users can
			     jump straight to them instead of hunting the legal line. -->
			<nav class="bt-footer-policies" aria-label="Legal and accessibility">
				{#each LEGAL_LINKS as l, i}
					<LinkEdit urlKey="footer_legal_{i}_url" defaultHref="{pageBase}{l.href}">
						<InlineEdit k="footer_legal_{i}_label" value={l.label} />
					</LinkEdit>
				{/each}
			</nav>

			<span class="bt-footer-tag">
				<InlineEdit k="footer_tagline" value="Protecting What Matters Most." />
			</span>
		</div>
	</div>
</footer>

<style>
	.bt-footer {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: clamp(48px, 6vw, 92px) var(--rail) clamp(24px, 5vw, 44px);
	}
	.bt-footer-card {
		border-radius: var(--r-lg);
		padding: clamp(32px, 4vw, 56px) clamp(26px, 3.4vw, 50px) clamp(26px, 3vw, 40px);
		background: linear-gradient(158deg, var(--navy-2), var(--navy) 70%);
		color: rgba(255, 255, 255, 0.78);
	}
	.bt-footer-inner {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1fr;
		gap: clamp(28px, 4vw, 56px);
	}
	.bt-footer-logo {
		display: inline-flex;
	}
	.bt-footer-brand p {
		font-size: 14px;
		line-height: 1.6;
		max-width: 36ch;
		margin-top: 16px;
	}
	.bt-footer-contact {
		font-family: var(--display);
		font-size: 16px !important;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: #fff;
	}
	.bt-footer-contact a:hover {
		color: var(--accent-on-dark);
	}
	.bt-footer-links {
		display: contents;
	}
	.bt-footer-col {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.bt-footer-label {
		font-family: var(--display);
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #fff;
		margin-bottom: 4px;
	}
	.bt-footer-col :global(a) {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.78);
		transition: color 0.2s;
	}
	.bt-footer-col :global(a:hover) {
		color: var(--accent-on-dark);
	}
	.bt-footer-legal {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px 20px;
		margin-top: clamp(28px, 4vw, 48px);
		padding-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.14);
		font-size: 12.5px;
		/* was rgba(255,255,255,.55) — lifted to clear 4.5:1 on the navy card */
		color: rgba(255, 255, 255, 0.72);
	}
	.bt-footer-policies {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 18px;
	}
	.bt-footer-policies :global(a) {
		font-size: 12.5px;
		/* 24px min height keeps these clear of WCAG 2.5.8 target size even where
		   they wrap tight against the copyright line */
		display: inline-flex;
		align-items: center;
		min-height: 24px;
		color: rgba(255, 255, 255, 0.78);
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 1px;
		transition: color 0.2s;
	}
	.bt-footer-policies :global(a:hover) {
		color: var(--accent-on-dark);
	}
	.bt-footer-tag {
		font-family: var(--script);
		font-size: 17px;
		color: rgba(255, 255, 255, 0.78);
	}

	@media (max-width: 900px) {
		.bt-footer-inner {
			grid-template-columns: 1fr 1fr;
		}
		.bt-footer-brand {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 620px) {
		.bt-footer-inner {
			grid-template-columns: 1fr;
		}
		.bt-footer-legal {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
