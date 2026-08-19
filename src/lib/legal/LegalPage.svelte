<script>
	/**
	 * Shared layout for the three policy pages — privacy, terms, accessibility.
	 *
	 *   <LegalPage page={PRIVACY} />
	 *
	 * The page object is defined in src/lib/content.js and shaped
	 * `{ slug, eyebrow, title, updated, intro, sections: [{ h, p[], li[] }] }`.
	 * Content keys derive from the slug and the indices, so every string here is
	 * editable on the live site through the same pipeline as the home page.
	 *
	 * The chrome is the real SiteHeader / SiteFooter, so the nav, the phone
	 * number, and the footer links stay in step with the home page — with
	 * `anchorBase` pointing the `#services`-style links back at it.
	 */
	import { base } from '$app/paths';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import InlineEdit from '$lib/inline-edit/InlineEdit.svelte';
	import { openBooking } from '$lib/booking.svelte.js';
	import { telHref, underWordPress } from '$lib/wp/client.js';
	import { wpEdit } from '$lib/wp/wpEdit.svelte.js';
	import { BRAND_LEGAL, CONTACT } from '$lib/content.js';

	let {
		/** One of the objects exported from src/lib/content.js (PRIVACY, TERMS…). */
		page
	} = $props();

	const t = (/** @type {string} */ key, /** @type {string} */ fallback) => wpEdit.text(key, fallback);

	const homeHref = $derived(`${base}/`);
	const phone = $derived(t('global_contact_phone', CONTACT.phone));
	const phoneLink = $derived(telHref(phone));
	const businessName = $derived(t('global_business_name', BRAND_LEGAL));

	const k = (/** @type {string} */ suffix) => `${page.slug}_${suffix}`;
	const headingId = (/** @type {number} */ i) => `${page.slug}-section-${i}`;

	/** On WordPress the theme's <head> is authoritative — see src/routes/+page.svelte. */
	const ownsHead = !underWordPress();
	const title = $derived(`${t(k('title'), page.title)} — ${businessName}`);
</script>

<svelte:head>
	{#if ownsHead}
		<title>{title}</title>
		<meta name="description" content={page.intro.replace(/\{\{[A-Z_]+\}\}/g, businessName)} />
		<!-- Policy pages carry no ranking intent and shouldn't compete with the
		     home page in search results, but they must stay crawlable so the
		     footer links resolve. -->
		<meta name="robots" content="index, follow" />
	{/if}
</svelte:head>

<div class="bt-page">
	<a class="xo-skip" href="#main">Skip to main content</a>

	<SiteHeader anchorBase={homeHref} {homeHref} />

	<main class="lg-main" id="main" tabindex="-1" data-skip-target>
		<article class="lg-doc">
			<!-- ---------------------------------------------------------- masthead -->
			<div class="bt-tile lg-masthead on-dark">
				<p class="bt-eyebrow bt-on-dark">
					<InlineEdit k={k('eyebrow')} value={page.eyebrow} />
				</p>
				<h1 class="lg-title"><InlineEdit k={k('title')} value={page.title} /></h1>
				<p class="lg-updated"><InlineEdit k={k('updated')} value={page.updated} /></p>
				<p class="lg-intro"><InlineEdit k={k('intro')} value={page.intro} multiline /></p>
			</div>

			<!-- --------------------------------------------------------- contents -->
			<!-- A second route to any section, which is the point of WCAG 2.4.5 —
			     and on a document this long it is also just faster. -->
			<nav class="bt-tile lg-toc" aria-labelledby="{page.slug}-toc-label">
				<p class="lg-toc-label" id="{page.slug}-toc-label">On this page</p>
				<ol class="lg-toc-list">
					{#each page.sections as section, i}
						<li>
							<a href="#{headingId(i)}">{t(`${page.slug}_s${i}_h`, section.h)}</a>
						</li>
					{/each}
				</ol>
			</nav>

			<!-- --------------------------------------------------------- the body -->
			<div class="bt-tile lg-body" class:numbered={page.numbered}>
				{#each page.sections as section, i}
					<section class="lg-section" aria-labelledby={headingId(i)}>
						<h2 class="lg-h2" id={headingId(i)}>
							<InlineEdit k="{page.slug}_s{i}_h" value={section.h} />
						</h2>
						{#each section.p as paragraph, pi}
							<p class="lg-p">
								<InlineEdit k="{page.slug}_s{i}_p{pi}" value={paragraph} multiline />
							</p>
						{/each}
						{#if section.li.length}
							<ul class="lg-list">
								{#each section.li as item, li}
									<li><InlineEdit k="{page.slug}_s{i}_li{li}" value={item} multiline /></li>
								{/each}
							</ul>
						{/if}
					</section>
				{/each}
			</div>

			<!-- ------------------------------------------------------------- CTA -->
			<div class="bt-tile lg-cta on-dark">
				<h2 class="lg-cta-title">
					<InlineEdit k={k('cta_title')} value="Still have a question?" />
				</h2>
				<p class="lg-cta-lead">
					<InlineEdit
						k={k('cta_lead')}
						value="Call or text and a person will answer — we would rather talk it through than have you guess."
						multiline
					/>
				</p>
				<div class="lg-cta-actions">
					{#if wpEdit.isEditing}
						<span class="bt-btn bt-btn-light">
							<InlineEdit k={k('cta_button')} value="Schedule an Inspection" />
						</span>
					{:else}
						<button class="bt-btn bt-btn-light" onclick={openBooking}>
							{t(k('cta_button'), 'Schedule an Inspection')}
						</button>
					{/if}
					<a href={phoneLink} class="bt-btn bt-btn-blur">
						<Icon name="phone" size={16} />
						{phone}
					</a>
				</div>
			</div>
		</article>
	</main>

	<SiteFooter anchorBase={homeHref} {homeHref} pageBase={base} />
</div>

<style>
	.lg-main {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: calc(var(--nav-h) + var(--gap)) var(--rail) 0;
	}
	.lg-main:focus {
		outline: none;
	}
	.lg-doc {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 290px;
		align-items: start;
		gap: var(--gap);
	}

	/* ------------------------------------------------------------- masthead */
	.lg-masthead {
		grid-column: 1 / -1;
		padding: clamp(30px, 3.6vw, 54px);
		border-color: transparent;
		background:
			radial-gradient(120% 130% at 12% 0%, rgba(46, 134, 224, 0.28), transparent 62%),
			linear-gradient(152deg, var(--navy-2), var(--navy) 62%);
		color: #fff;
	}
	.lg-title {
		font-family: var(--display);
		font-size: clamp(32px, 4.2vw, 52px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.002em;
		line-height: 1.04;
	}
	.lg-updated {
		margin-top: 12px;
		font-size: 12.5px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.72);
	}
	.lg-intro {
		margin-top: 18px;
		max-width: 62ch;
		font-size: clamp(15px, 1.3vw, 17.5px);
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.86);
		border-left: 2px solid var(--accent-bright);
		padding-left: 16px;
	}

	/* -------------------------------------------------------------- contents */
	.lg-toc {
		grid-column: 2;
		grid-row: 2;
		position: sticky;
		top: calc(var(--nav-h) + var(--gap));
		padding: clamp(20px, 2.2vw, 28px);
	}
	.lg-toc-label {
		font-size: 11.5px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--faint);
		margin-bottom: 12px;
	}
	.lg-toc-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		counter-reset: toc;
	}
	.lg-toc-list li {
		counter-increment: toc;
	}
	.lg-toc-list a {
		display: flex;
		gap: 10px;
		align-items: baseline;
		/* 24px minimum target height (WCAG 2.5.8) with room to spare */
		min-height: 32px;
		padding: 5px 0;
		font-size: 13.5px;
		line-height: 1.4;
		color: var(--soft);
		transition: color 0.2s;
	}
	.lg-toc-list a::before {
		content: counter(toc, decimal-leading-zero);
		flex: none;
		font-family: var(--display);
		font-size: 11.5px;
		font-weight: 600;
		color: var(--accent-ink);
	}
	.lg-toc-list a:hover {
		color: var(--accent-ink);
	}

	/* ------------------------------------------------------------------ body */
	.lg-body {
		grid-column: 1;
		grid-row: 2;
		padding: clamp(28px, 3.4vw, 48px);
		counter-reset: clause;
	}
	.lg-body.numbered .lg-section {
		counter-increment: clause;
	}
	/* The clause number is ordering, not content — it lives in CSS so the
	   content keys stay clean and renumbering a section never desyncs a
	   hand-typed "7." from its position. */
	.lg-body.numbered .lg-h2::before {
		content: counter(clause) '. ';
		color: var(--accent-ink);
	}
	.lg-section + .lg-section {
		margin-top: clamp(26px, 3vw, 38px);
		padding-top: clamp(26px, 3vw, 38px);
		border-top: 1px solid var(--line);
	}
	.lg-h2 {
		font-family: var(--display);
		font-size: clamp(19px, 1.9vw, 24px);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.01em;
		line-height: 1.15;
		color: var(--navy);
		margin-bottom: 14px;
	}
	.lg-p {
		font-size: clamp(14.5px, 1.25vw, 16px);
		line-height: 1.75;
		color: var(--soft);
		max-width: 72ch;
	}
	.lg-p + .lg-p {
		margin-top: 12px;
	}
	.lg-list {
		list-style: none;
		margin: 14px 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 72ch;
	}
	.lg-list li {
		position: relative;
		padding-left: 26px;
		font-size: clamp(14.5px, 1.25vw, 16px);
		line-height: 1.7;
		color: var(--soft);
	}
	.lg-list li::before {
		content: '';
		position: absolute;
		left: 6px;
		top: 0.72em;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent-ink);
	}

	/* ------------------------------------------------------------------- CTA */
	.lg-cta {
		grid-column: 1 / -1;
		margin-bottom: clamp(8px, 1vw, 16px);
		padding: clamp(28px, 3.4vw, 46px);
		border-color: transparent;
		background:
			radial-gradient(110% 120% at 88% 4%, rgba(46, 134, 224, 0.3), transparent 60%),
			linear-gradient(150deg, var(--navy-2), var(--navy) 65%);
		color: #fff;
	}
	.lg-cta-title {
		font-family: var(--display);
		font-size: clamp(23px, 2.6vw, 32px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.005em;
		line-height: 1.06;
	}
	.lg-cta-lead {
		margin-top: 12px;
		max-width: 52ch;
		font-size: clamp(14.5px, 1.3vw, 16.5px);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.86);
	}
	.lg-cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 20px;
	}

	/* ------------------------------------------------------------ responsive */
	@media (max-width: 900px) {
		.lg-doc {
			grid-template-columns: minmax(0, 1fr);
		}
		.lg-toc {
			grid-column: 1;
			grid-row: 2;
			position: static;
		}
		.lg-body {
			grid-column: 1;
			grid-row: 3;
		}
	}

	@media (max-width: 620px) {
		.lg-intro {
			max-width: none;
		}
		.lg-cta-actions {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
