<script>
	/* ===========================================================================
	   MSC HOME INSPECTIONS — bento layout.

	   Art direction is taken directly from docs/Business Flyer.jpg:
	     • deep navy (#0e2135) for authority, one bright blue accent (#1c6fc9)
	       for emphasis — no third colour, the same restraint the flyer shows
	     • condensed uppercase display type (Oswald) with the flyer's signature
	       two-tone headline: part white, the emphasised phrase in accent blue
	     • the script tagline used exactly once, as the flyer does
	     • blue circular icon badges with white line glyphs
	     • alternating light field / dark bands

	   The bento translation: every block is a rounded tile on a light field
	   (#eff2f7), sized asymmetrically so the eye moves — a tall photo tile
	   beside a wide statement, two wide service tiles over three narrow ones.

	   Everything is namespaced `bt-*` and scoped to this component.
	   =========================================================================== */
	import { base } from '$app/paths';
	import { reveal } from '$lib/actions.js';
	import { openBooking } from '$lib/booking.svelte.js';
	import Icon from '$lib/components/Icon.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import InlineEdit from '$lib/inline-edit/InlineEdit.svelte';
	import ImageEdit from '$lib/inline-edit/ImageEdit.svelte';
	import LinkEdit from '$lib/inline-edit/LinkEdit.svelte';
	import { assetUrl } from '$lib/wp/assets.js';
	import { mailHref, telHref } from '$lib/wp/client.js';
	import { wpEdit } from '$lib/wp/wpEdit.svelte.js';
	import {
		CONTACT,
		LOGO,
		HERO,
		TRUST,
		SERVICES,
		ABOUT,
		PROCESS,
		FAQS,
		CONTACT_SECTION
	} from '$lib/content.js';

	/* ---------- content layer ----------
	   Every string below reads through `t(key, default)`. The default is the
	   value in src/lib/content.js; the WordPress database can shadow any key at
	   runtime, and logged-in users edit them in place. See src/lib/wp/. */
	const t = (/** @type {string} */ key, /** @type {string} */ fallback) => wpEdit.text(key, fallback);

	/* Site-wide details. Editing the phone number in X.O. Admin updates every
	   place it appears, including the tel: links, which are derived not stored. */
	const phone = $derived(t('global_contact_phone', CONTACT.phone));
	const phoneLink = $derived(telHref(phone));
	const email = $derived(t('global_contact_email', CONTACT.email));
	const emailLink = $derived(mailHref(email));

	/* ---------- FAQ accordion ----------
	   `openFaq` is the index of the one open panel, or -1 for none. The closed
	   panels are hidden with `visibility` rather than height alone, so their
	   text leaves both the tab order and the screen-reader flow and matches
	   what `aria-expanded` on the trigger claims. */
	let openFaq = $state(0);
	const toggleFaq = (/** @type {number} */ i) => (openFaq = openFaq === i ? -1 : i);

	/**
	 * In edit mode, links must not navigate — a click is how you open the URL
	 * popover or place a caret in editable text. LinkEdit handles its own
	 * anchors, so those are left alone.
	 * @param {MouseEvent} event
	 */
	function suppressNavigation(event) {
		if (!wpEdit.isEditing) return;
		const anchor = /** @type {HTMLElement} */ (event.target)?.closest?.('a');
		if (anchor && !anchor.closest('.xo-le')) event.preventDefault();
	}
</script>

<!-- Call-to-action buttons carry editable labels. A contenteditable node inside
     a <button> is not reliably focusable, so edit mode renders the same classes
     on a <span> instead — identical styling, no swallowed clicks. -->
{#snippet cta(/** @type {string} */ cls, /** @type {string} */ key, /** @type {string} */ label, /** @type {() => void} */ onclick)}
	{#if wpEdit.isEditing}
		<span class={cls}><InlineEdit k={key} value={label} /></span>
	{:else}
		<button class={cls} {onclick}>{t(key, label)}</button>
	{/if}
{/snippet}

<div class="bt-page" onclickcapture={suppressNavigation}>
	<!-- Bypass Blocks (WCAG 2.4.1): first thing in the tab order, visible only
	     while focused. -->
	<a class="xo-skip" href="#main">Skip to main content</a>

	<SiteHeader />

	<main class="bt-main" id="main" tabindex="-1" data-skip-target>
		<!-- ================================ HERO ================================ -->
		<section class="bt-hero" aria-label="Welcome">
			<!-- statement tile -->
			<div class="bt-tile bt-hero-main on-dark">
				<p class="bt-eyebrow bt-on-dark"><InlineEdit k="hero_eyebrow" value={HERO.eyebrow} /></p>
				<h1 class="bt-hero-title">
					<InlineEdit k="hero_title_top" value={HERO.titleTop} /><br />
					<span class="bt-accent-text"><InlineEdit k="hero_title_accent" value={HERO.titleAccent} /></span><br />
					<InlineEdit k="hero_title_bottom" value={HERO.titleBottom} />
				</h1>
				<p class="bt-hero-lead"><InlineEdit k="hero_lead" value={HERO.lead} multiline /></p>
				<div class="bt-hero-cta">
					{@render cta('bt-btn bt-btn-primary', 'hero_cta_primary', 'Schedule an Inspection', openBooking)}
					<LinkEdit urlKey="hero_cta_secondary_url" defaultHref="#services" class="bt-btn bt-btn-blur">
						<InlineEdit k="hero_cta_secondary" value="What We Look For" />
					</LinkEdit>
				</div>
			</div>

			<!-- tall photo tile -->
			<figure class="bt-tile bt-hero-photo">
				<ImageEdit
					k="hero_photo"
					src={HERO.photo}
					altKey="hero_photo_alt"
					alt={HERO.photoAlt}
					width="1800"
					height="1200"
					fetchpriority="high"
				/>
				<figcaption class="bt-photo-badge">
					<Icon name="pin" size={15} />
					<!-- quoted as an expression: a bare {{ in an attribute would parse as Svelte syntax -->
					<InlineEdit k="hero_badge" value={'Serving {{SERVICE_AREA}}'} />
				</figcaption>
			</figure>

			<!-- script tagline tile -->
			<div class="bt-tile bt-hero-script">
				<img class="bt-hero-mark" src={assetUrl(t('global_logo_mark', LOGO.mark))} alt="" width="270" height="120" />
				<p class="bt-script"><InlineEdit k="hero_script" value={HERO.script} /></p>
			</div>

			<!-- call tile -->
			<a class="bt-tile bt-hero-call on-dark" href={phoneLink}>
				<span class="bt-call-icon"><Icon name="phone" size={20} /></span>
				<span class="bt-call-body">
					<span class="bt-call-label"><InlineEdit k="hero_call_label" value="Call or text" /></span>
					<span class="bt-call-number">{phone}</span>
				</span>
			</a>
		</section>

		<!-- ============================= TRUST STRIP ============================= -->
		<section class="bt-tile bt-trust on-dark" use:reveal aria-label="Why MSC">
			<div class="bt-trust-half">
				<span class="bt-trust-icon"><Icon name="shield-check" size={26} /></span>
				<p>
					<strong><InlineEdit k="trust_left" value={TRUST.left} /></strong><br />
					<span class="bt-accent-text"><InlineEdit k="trust_left_accent" value={TRUST.leftAccent} /></span>
				</p>
			</div>
			<div class="bt-trust-rule" aria-hidden="true"></div>
			<div class="bt-trust-half">
				<span class="bt-trust-icon"><Icon name="check-circle" size={26} /></span>
				<p>
					<strong><InlineEdit k="trust_right" value={TRUST.right} /></strong><br />
					<span class="bt-accent-text"><InlineEdit k="trust_right_accent" value={TRUST.rightAccent} /></span>
				</p>
			</div>
		</section>

		<!-- =============================== SERVICES =============================== -->
		<section class="bt-block" id="services" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow"><InlineEdit k="services_eyebrow" value={SERVICES.eyebrow} /></p>
				<h2 class="bt-title"><InlineEdit k="services_title" value={SERVICES.title} /></h2>
				<p class="bt-lead"><InlineEdit k="services_lead" value={SERVICES.lead} multiline /></p>
			</div>

			<div class="bt-services">
				{#each SERVICES.cards as s}
					<article
						class="bt-svc"
						class:wide={s.span === 'wide'}
						class:feature={s.span === 'feature'}
						id={s.id}
						aria-labelledby="svc-{s.id}-title"
					>
						<ImageEdit
							class="bt-svc-bg"
							k="service_{s.id}_img"
							src={s.img}
							altKey="service_{s.id}_alt"
							alt={s.alt}
							loading="lazy"
						/>
						<div class="bt-svc-overlay">
							<span class="bt-badge"><Icon name={s.icon} size={22} /></span>
							<h3 class="bt-svc-title" id="svc-{s.id}-title">
								<InlineEdit k="service_{s.id}_title" value={s.title} />
							</h3>
							<p class="bt-svc-body"><InlineEdit k="service_{s.id}_body" value={s.body} multiline /></p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ================================ ABOUT ================================ -->
		<section class="bt-block" id="about" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow"><InlineEdit k="about_eyebrow" value={ABOUT.eyebrow} /></p>
				<h2 class="bt-title"><InlineEdit k="about_title" value={ABOUT.title} /></h2>
			</div>

			<div class="bt-about">
				<figure class="bt-tile bt-about-photo">
					<ImageEdit
						k="about_photo"
						src={ABOUT.photo}
						altKey="about_photo_alt"
						alt={ABOUT.photoAlt}
						width="469"
						height="558"
						loading="lazy"
					/>
				</figure>

				<div class="bt-tile bt-about-copy">
					<p><InlineEdit k="about_body" value={ABOUT.body} multiline /></p>
					<p><InlineEdit k="about_body2" value={ABOUT.body2} multiline /></p>
					<div class="bt-about-cta">
						{@render cta('bt-btn bt-btn-primary', 'about_cta_primary', 'Schedule an Inspection', openBooking)}
						<LinkEdit urlKey="about_cta_secondary_url" defaultHref="#process" class="bt-btn bt-btn-line">
							<InlineEdit k="about_cta_secondary" value="How It Works" />
						</LinkEdit>
					</div>
				</div>

				{#each ABOUT.stats as stat, i}
					<div class="bt-tile bt-stat {i === 0 ? 'bt-stat-navy' : 'bt-stat-accent'}">
						<span class="bt-stat-num"><InlineEdit k="about_stat_{i}_value" value={stat.value} /></span>
						<span class="bt-stat-label"><InlineEdit k="about_stat_{i}_label" value={stat.label} /></span>
					</div>
				{/each}
			</div>
		</section>

		<!-- =============================== PROCESS =============================== -->
		<section class="bt-block" id="process" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow"><InlineEdit k="process_eyebrow" value={PROCESS.eyebrow} /></p>
				<h2 class="bt-title"><InlineEdit k="process_title" value={PROCESS.title} /></h2>
			</div>

			<div class="bt-process">
				{#each PROCESS.steps as step, i}
					<article class="bt-tile bt-step">
						<span class="bt-step-num" aria-hidden="true">{t(`step_${i}_n`, step.n)}</span>
						<span class="bt-step-icon">
							<Icon name={['calendar', 'search', 'file'][i]} size={22} />
						</span>
						<h3 class="bt-step-title"><InlineEdit k="step_{i}_title" value={step.title} /></h3>
						<p class="bt-step-body"><InlineEdit k="step_{i}_body" value={step.body} multiline /></p>
					</article>
				{/each}
			</div>
		</section>

		<!-- ================================= FAQ ================================= -->
		<section class="bt-block" id="faq" use:reveal>
			<div class="bt-head bt-head-center">
				<p class="bt-eyebrow"><InlineEdit k="faq_eyebrow" value={FAQS.eyebrow} /></p>
				<h2 class="bt-title"><InlineEdit k="faq_title" value={FAQS.title} /></h2>
			</div>

			<div class="bt-faq">
				{#each FAQS.list as f, i}
					<!-- Edit mode opens every panel and drops the accordion <button>:
					     questions and answers both need to be reachable, and a
					     contenteditable inside a button is not. -->
					<div class="bt-tile bt-faq-item" class:open={wpEdit.isEditing || openFaq === i}>
						{#if wpEdit.isEditing}
							<span class="bt-faq-q" id="bt-faq-q-{i}">
								<span class="bt-faq-question"><InlineEdit k="faq_{i}_q" value={f.q} /></span>
							</span>
						{:else}
							<button
								class="bt-faq-q"
								id="bt-faq-q-{i}"
								aria-expanded={openFaq === i}
								aria-controls="bt-faq-panel-{i}"
								onclick={() => toggleFaq(i)}
							>
								<span class="bt-faq-question">{t(`faq_${i}_q`, f.q)}</span>
								<span class="bt-faq-icon" aria-hidden="true"></span>
							</button>
						{/if}
						<div
							class="bt-faq-panel"
							id="bt-faq-panel-{i}"
							role="region"
							aria-labelledby="bt-faq-q-{i}"
						>
							<div class="bt-faq-panel-inner">
								<p><InlineEdit k="faq_{i}_a" value={f.a} multiline /></p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- =============================== CONTACT =============================== -->
		<section class="bt-block" id="contact" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow"><InlineEdit k="contact_eyebrow" value={CONTACT_SECTION.eyebrow} /></p>
				<h2 class="bt-title"><InlineEdit k="contact_title" value={CONTACT_SECTION.title} /></h2>
			</div>

			<div class="bt-contact">
				<div class="bt-tile bt-contact-cta on-dark">
					<h3 class="bt-contact-cta-title">
						<InlineEdit k="contact_cta_title" value="Book your inspection" /><br />
						<span class="bt-accent-text">
							<InlineEdit k="contact_cta_title_accent" value="and buy with confidence." />
						</span>
					</h3>
					<p class="bt-contact-cta-lead">
						<InlineEdit k="contact_cta_lead" value={CONTACT_SECTION.lead} multiline />
					</p>
					<div class="bt-contact-cta-actions">
						{@render cta('bt-btn bt-btn-light', 'contact_cta_button', 'Request an Inspection', openBooking)}
						<a href={phoneLink} class="bt-btn bt-btn-blur">
							<Icon name="phone" size={16} />
							{phone}
						</a>
					</div>
				</div>

				<a class="bt-tile bt-info" href={phoneLink}>
					<span class="bt-badge bt-badge-soft"><Icon name="phone" size={19} /></span>
					<span class="bt-info-label"><InlineEdit k="contact_phone_label" value="Call or text" /></span>
					<span class="bt-info-value">{phone}</span>
				</a>

				<a class="bt-tile bt-info" href={emailLink}>
					<span class="bt-badge bt-badge-soft"><Icon name="mail" size={19} /></span>
					<span class="bt-info-label"><InlineEdit k="contact_email_label" value="Email" /></span>
					<span class="bt-info-value bt-info-email">{email}</span>
				</a>

				<div class="bt-tile bt-info">
					<span class="bt-badge bt-badge-soft"><Icon name="pin" size={19} /></span>
					<span class="bt-info-label"><InlineEdit k="contact_area_label" value="Service area" /></span>
					<span class="bt-info-value">{t('global_city_state', CONTACT.serviceAreaShort)}</span>
				</div>
			</div>
		</section>
	</main>

	<SiteFooter pageBase={base} />
</div>

<style>
	/* ======================================================================
	   LAYOUT SHELL
	   ====================================================================== */
	.bt-main {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: calc(var(--nav-h) + var(--gap)) var(--rail) 0;
		display: flex;
		flex-direction: column;
		gap: clamp(48px, 6vw, 92px);
	}

	/* ======================================================================
	   HERO — the bento mosaic: wide statement + tall photo + two small tiles
	   ====================================================================== */
	.bt-hero {
		display: grid;
		grid-template-columns: 1fr 1fr 1.02fr;
		gap: var(--gap);
	}
	.bt-hero-main {
		grid-column: 1 / 3;
		grid-row: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 18px;
		padding: clamp(30px, 3.6vw, 54px);
		border-color: transparent;
		background:
			radial-gradient(120% 130% at 12% 0%, rgba(46, 134, 224, 0.28), transparent 62%),
			linear-gradient(152deg, var(--navy-2), var(--navy) 62%);
		color: #fff;
	}
	.bt-hero-title {
		font-family: var(--display);
		font-size: clamp(32px, 4.5vw, 58px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.002em;
		line-height: 1.02;
	}
	.bt-hero-lead {
		font-size: clamp(15px, 1.3vw, 17.5px);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.84);
		max-width: 44ch;
		border-left: 2px solid var(--accent-bright);
		padding-left: 16px;
	}
	.bt-hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 6px;
	}

	.bt-hero-photo {
		grid-column: 3;
		grid-row: 1 / 3;
		margin: 0;
		min-height: clamp(420px, 52vw, 620px);
		background: var(--navy);
	}
	.bt-hero-photo :global(img) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 34%;
	}
	.bt-photo-badge {
		position: absolute;
		left: 14px;
		right: 14px;
		bottom: 14px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 14px;
		border-radius: var(--pill);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		font-size: 13px;
		font-weight: 600;
		color: var(--navy);
		text-align: center;
	}

	.bt-hero-script {
		grid-column: 1;
		grid-row: 2;
		display: flex;
		align-items: center;
		gap: clamp(14px, 1.6vw, 22px);
		padding: clamp(20px, 2.2vw, 30px);
	}
	.bt-hero-mark {
		width: clamp(58px, 6vw, 84px);
		height: auto;
		flex: none;
	}
	.bt-hero-script .bt-script {
		font-size: clamp(21px, 2.3vw, 30px);
	}

	.bt-hero-call {
		grid-column: 2;
		grid-row: 2;
		display: flex;
		align-items: center;
		gap: 16px;
		padding: clamp(20px, 2.2vw, 30px);
		border-color: transparent;
		/* the gradient starts at --accent, not --accent-bright: white text on
		   #2e86e0 is 3.75:1, short of the 4.5:1 the phone number needs */
		background: linear-gradient(140deg, var(--accent), var(--accent) 22%, var(--accent-deep));
		color: #fff;
		transition:
			transform 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}
	.bt-hero-call:hover {
		transform: translateY(-3px);
		box-shadow: 0 18px 34px -18px rgba(14, 33, 53, 0.55);
	}
	.bt-call-icon {
		width: 46px;
		height: 46px;
		flex: none;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.18);
	}
	.bt-call-body {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.bt-call-label {
		font-size: 11.5px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		/* .78 measured 3.71:1 on --accent; .94 clears 4.5:1 and still reads as
		   the quieter half of the pair */
		color: rgba(255, 255, 255, 0.94);
	}
	.bt-call-number {
		font-family: var(--display);
		font-size: clamp(21px, 2.2vw, 29px);
		font-weight: 600;
		letter-spacing: 0.01em;
		line-height: 1.1;
	}

	/* ======================================================================
	   TRUST STRIP — the flyer's navy band, as one tile
	   ====================================================================== */
	.bt-trust {
		display: flex;
		align-items: center;
		gap: clamp(20px, 3vw, 48px);
		padding: clamp(22px, 2.4vw, 32px) clamp(24px, 3vw, 44px);
		border-color: transparent;
		background: linear-gradient(100deg, var(--navy), var(--navy-2));
		color: #fff;
	}
	.bt-trust-half {
		display: flex;
		align-items: center;
		gap: 16px;
		flex: 1;
	}
	.bt-trust-icon {
		flex: none;
		color: var(--accent-bright);
	}
	.bt-trust-half p {
		font-family: var(--display);
		font-size: clamp(15px, 1.6vw, 21px);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1.25;
	}
	.bt-trust-half strong {
		font-weight: 500;
		color: rgba(255, 255, 255, 0.92);
	}
	.bt-trust-half .bt-accent-text {
		font-weight: 600;
	}
	.bt-trust-rule {
		width: 1px;
		align-self: stretch;
		background: rgba(255, 255, 255, 0.18);
	}

	/* ======================================================================
	   SERVICES — two wide tiles over three narrow ones, then the pool tile
	   full-width beneath. Every row totals exactly 6 columns (3+3, 2+2+2, 6),
	   so the flyer's five pillars keep their rhythm and the newest service
	   gets its own banner rather than orphaning a half-empty row.
	   ====================================================================== */
	.bt-services {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: var(--gap);
	}
	.bt-svc {
		grid-column: span 2;
		position: relative;
		min-height: 360px;
		border-radius: var(--r);
		overflow: hidden;
		color: #fff;
		transition:
			transform 0.35s var(--ease),
			box-shadow 0.35s var(--ease);
	}
	.bt-svc.wide {
		grid-column: span 3;
		min-height: 420px;
	}
	.bt-svc.feature {
		grid-column: span 6;
		min-height: 340px;
	}
	.bt-svc:hover {
		transform: translateY(-3px);
		box-shadow: 0 20px 40px -20px rgba(14, 33, 53, 0.5);
	}
	.bt-svc :global(.bt-svc-bg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s var(--ease);
	}
	.bt-svc:hover :global(.bt-svc-bg) {
		transform: scale(1.06);
	}
	.bt-svc-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		gap: 12px;
		padding: clamp(22px, 2.4vw, 32px);
		background: linear-gradient(
			0deg,
			rgba(11, 22, 34, 0.94) 4%,
			rgba(11, 22, 34, 0.7) 40%,
			rgba(11, 22, 34, 0.18) 74%,
			rgba(11, 22, 34, 0.04) 100%
		);
	}
	.bt-svc-title {
		font-family: var(--display);
		font-size: clamp(20px, 2vw, 26px);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.01em;
		line-height: 1.12;
	}
	.bt-svc-body {
		font-size: 14.5px;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.86);
		max-width: 40ch;
	}
	/* the feature tile is ~3.5× wider than it is tall, so the 40ch column that
	   suits a narrow card would stack into four lines against a lot of empty
	   photo — let it run wide enough to read as a banner line */
	.bt-svc.feature .bt-svc-body {
		max-width: 64ch;
	}

	/* ======================================================================
	   ABOUT — tall portrait beside a copy tile and two stat tiles
	   ====================================================================== */
	.bt-about {
		display: grid;
		grid-template-columns: 0.9fr 1.15fr 0.9fr;
		gap: var(--gap);
	}
	.bt-about-photo {
		grid-column: 1;
		grid-row: 1 / 3;
		margin: 0;
		min-height: clamp(380px, 44vw, 520px);
		/* matches the portrait's studio backdrop, so no seam shows at the edges */
		background: #fcfcfc;
	}
	.bt-about-photo :global(img) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* the portrait is framed tight to the top of the head — anchoring the
		   crop at 0% keeps it intact when the tile goes wide at smaller widths */
		object-position: 50% 0%;
	}
	.bt-about-copy {
		grid-column: 2 / 4;
		grid-row: 1;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: clamp(26px, 3vw, 40px);
	}
	.bt-about-copy p {
		font-size: clamp(15px, 1.3vw, 16.5px);
		line-height: 1.7;
		color: var(--soft);
	}
	.bt-about-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 6px;
	}
	.bt-stat {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		padding: clamp(22px, 2.4vw, 32px);
		border-color: transparent;
		min-height: clamp(140px, 14vw, 180px);
	}
	.bt-stat-navy {
		grid-column: 2;
		grid-row: 2;
		background: linear-gradient(150deg, var(--navy-2), var(--navy));
		color: #fff;
	}
	.bt-stat-accent {
		grid-column: 3;
		grid-row: 2;
		/* --accent rather than --accent-bright, so the label below clears 4.5:1 */
		background: linear-gradient(150deg, var(--accent), var(--accent-deep));
		color: #fff;
	}
	.bt-stat-num {
		font-family: var(--display);
		font-size: clamp(40px, 4.6vw, 60px);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.01em;
	}
	.bt-stat-label {
		font-size: 13.5px;
		line-height: 1.45;
		color: rgba(255, 255, 255, 0.94);
		max-width: 20ch;
	}

	/* ======================================================================
	   PROCESS
	   ====================================================================== */
	.bt-process {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: var(--gap);
	}
	.bt-step {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: clamp(26px, 2.8vw, 36px);
		transition:
			transform 0.35s var(--ease),
			box-shadow 0.35s var(--ease);
	}
	.bt-step:hover {
		transform: translateY(-3px);
		box-shadow: 0 18px 36px -22px rgba(14, 33, 53, 0.4);
	}
	.bt-step-num {
		position: absolute;
		top: clamp(14px, 1.6vw, 20px);
		right: clamp(16px, 1.8vw, 24px);
		font-family: var(--display);
		font-size: clamp(46px, 5vw, 68px);
		font-weight: 700;
		line-height: 1;
		color: rgba(14, 33, 53, 0.07);
	}
	.bt-step-icon {
		width: 46px;
		height: 46px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: rgba(28, 111, 201, 0.1);
		color: var(--accent-ink);
	}
	.bt-step-title {
		font-family: var(--display);
		font-size: clamp(19px, 1.8vw, 23px);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.01em;
		color: var(--navy);
	}
	.bt-step-body {
		font-size: 14.5px;
		line-height: 1.65;
		color: var(--soft);
	}

	/* ======================================================================
	   FAQ
	   ====================================================================== */
	.bt-faq {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 860px;
		margin: 0 auto;
	}
	.bt-faq-item {
		transition: border-color 0.2s var(--ease);
	}
	.bt-faq-item.open {
		border-color: var(--line-strong);
	}
	.bt-faq-q {
		width: 100%;
		min-height: 48px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		padding: clamp(16px, 1.8vw, 22px) clamp(18px, 2vw, 26px);
		text-align: left;
	}
	.bt-faq-question {
		font-family: var(--display);
		font-size: clamp(15px, 1.4vw, 18px);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1.25;
		color: var(--navy);
	}
	.bt-faq-icon {
		position: relative;
		flex: none;
		width: 18px;
		height: 18px;
	}
	.bt-faq-icon::before,
	.bt-faq-icon::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 14px;
		height: 2px;
		border-radius: 2px;
		background: var(--accent-ink);
		transform: translate(-50%, -50%);
		transition: transform 0.3s var(--ease);
	}
	.bt-faq-icon::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}
	.bt-faq-item.open .bt-faq-icon::after {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	.bt-faq-panel {
		display: grid;
		grid-template-rows: 0fr;
		/* `visibility` is the part that matters for assistive tech: a 0fr row
		   still exposes its text and any link inside it, which would contradict
		   the aria-expanded="false" on the trigger. */
		visibility: hidden;
		transition:
			grid-template-rows 0.32s var(--ease),
			visibility 0s linear 0.32s;
	}
	.bt-faq-item.open .bt-faq-panel {
		grid-template-rows: 1fr;
		visibility: visible;
		transition:
			grid-template-rows 0.32s var(--ease),
			visibility 0s;
	}
	.bt-faq-panel-inner {
		overflow: hidden;
	}
	.bt-faq-panel-inner p {
		padding: 0 clamp(18px, 2vw, 26px) clamp(18px, 2vw, 24px);
		font-size: 14.5px;
		line-height: 1.7;
		color: var(--soft);
		max-width: 68ch;
	}

	/* ======================================================================
	   CONTACT
	   ====================================================================== */
	.bt-contact {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--gap);
	}
	.bt-contact-cta {
		grid-column: 1 / 3;
		grid-row: 1 / 4;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 16px;
		padding: clamp(30px, 3.6vw, 52px);
		border-color: transparent;
		background:
			radial-gradient(110% 120% at 88% 4%, rgba(46, 134, 224, 0.3), transparent 60%),
			linear-gradient(150deg, var(--navy-2), var(--navy) 65%);
		color: #fff;
	}
	.bt-contact-cta-title {
		font-family: var(--display);
		font-size: clamp(26px, 3.2vw, 42px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.005em;
		line-height: 1.04;
	}
	.bt-contact-cta-lead {
		font-size: clamp(14.5px, 1.3vw, 16.5px);
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.82);
		max-width: 46ch;
	}
	.bt-contact-cta-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 8px;
	}
	.bt-info {
		grid-column: 3;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: clamp(20px, 2.2vw, 28px);
		transition:
			transform 0.3s var(--ease),
			border-color 0.3s var(--ease);
	}
	a.bt-info:hover {
		transform: translateY(-3px);
		border-color: var(--accent);
	}
	.bt-info .bt-badge {
		margin-bottom: 10px;
	}
	.bt-info-label {
		font-size: 11.5px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--faint);
	}
	.bt-info-value {
		font-family: var(--display);
		font-size: clamp(18px, 1.8vw, 23px);
		font-weight: 600;
		letter-spacing: 0.01em;
		line-height: 1.2;
		color: var(--navy);
	}
	.bt-info-email {
		font-size: clamp(14px, 1.25vw, 16px);
		letter-spacing: 0;
		overflow-wrap: anywhere;
	}

	/* ======================================================================
	   RESPONSIVE
	   ====================================================================== */
	@media (max-width: 1040px) {
		.bt-hero {
			grid-template-columns: 1fr 1fr;
		}
		.bt-hero-main {
			grid-column: 1 / 3;
			grid-row: 1;
		}
		.bt-hero-photo {
			grid-column: 1 / 3;
			grid-row: 2;
			min-height: clamp(280px, 40vw, 400px);
		}
		.bt-hero-photo :global(img) {
			object-position: 50% 42%;
		}
		.bt-hero-script {
			grid-column: 1;
			grid-row: 3;
		}
		.bt-hero-call {
			grid-column: 2;
			grid-row: 3;
		}

		.bt-about {
			grid-template-columns: 1fr 1fr;
		}
		/* the portrait keeps its own column here rather than stretching to a
		   full-width banner, which would crop it down to just the face */
		.bt-about-photo {
			grid-column: 1;
			grid-row: 1 / 3;
			min-height: clamp(340px, 46vw, 460px);
		}
		.bt-about-photo :global(img) {
			object-position: 50% 0%;
		}
		.bt-about-copy {
			grid-column: 1 / 3;
			grid-row: 3;
		}
		.bt-stat-navy {
			grid-column: 2;
			grid-row: 1;
		}
		.bt-stat-accent {
			grid-column: 2;
			grid-row: 2;
		}
	}

	@media (max-width: 980px) {
		.bt-services {
			grid-template-columns: repeat(2, 1fr);
		}
		/* six cards divide evenly across two columns, so — unlike the five-card
		   layout this replaced — nothing has to stretch to fill an orphan row */
		.bt-svc,
		.bt-svc.wide,
		.bt-svc.feature {
			grid-column: span 1;
			min-height: 340px;
		}

		.bt-contact {
			grid-template-columns: repeat(3, 1fr);
		}
		.bt-contact-cta {
			grid-column: 1 / 4;
			grid-row: 1;
		}
		.bt-info {
			grid-column: auto;
			grid-row: 2;
		}
	}

	@media (max-width: 900px) {
		.bt-trust {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}
		.bt-trust-rule {
			width: 100%;
			height: 1px;
			align-self: auto;
		}

	}

	@media (max-width: 620px) {
		.bt-hero {
			grid-template-columns: 1fr;
		}
		.bt-hero-main,
		.bt-hero-photo,
		.bt-hero-script,
		.bt-hero-call {
			grid-column: 1;
			grid-row: auto;
		}
		.bt-hero-cta {
			flex-direction: column;
			align-items: stretch;
		}
		.bt-hero-lead {
			max-width: none;
		}

		.bt-services {
			grid-template-columns: 1fr;
		}
		.bt-svc,
		.bt-svc.wide,
		.bt-svc.feature {
			grid-column: 1;
			min-height: 300px;
		}

		.bt-about {
			grid-template-columns: 1fr;
		}
		.bt-about-photo,
		.bt-about-copy,
		.bt-stat-navy,
		.bt-stat-accent {
			grid-column: 1;
			grid-row: auto;
		}
		.bt-about-cta {
			flex-direction: column;
			align-items: stretch;
		}

		.bt-contact {
			grid-template-columns: 1fr;
		}
		.bt-contact-cta,
		.bt-info {
			grid-column: 1;
			grid-row: auto;
		}
		.bt-contact-cta-actions {
			flex-direction: column;
			align-items: stretch;
		}

	}
</style>
