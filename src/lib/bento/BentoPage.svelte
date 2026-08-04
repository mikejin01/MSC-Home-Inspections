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
	import { reveal, scrolled } from '$lib/actions.js';
	import { openBooking } from '$lib/booking.svelte.js';
	import Icon from '$lib/components/Icon.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import {
		BRAND_LEGAL,
		CONTACT,
		LOGO,
		NAV_LINKS,
		HERO,
		TRUST,
		SERVICES,
		ABOUT,
		PROCESS,
		FAQS,
		CONTACT_SECTION,
		FOOTER
	} from '$lib/content.js';

	/* ---------- mobile nav ---------- */
	let navOpen = $state(false);
	const closeNav = () => (navOpen = false);

	/* ---------- FAQ accordion ---------- */
	let openFaq = $state(0);
	const toggleFaq = (i) => (openFaq = openFaq === i ? -1 : i);

	const year = 2026;
</script>

<div class="bt-page">
	<!-- ================================ HEADER ================================ -->
	<header class="bt-header" id="top" class:nav-open={navOpen} use:scrolled>
		<div class="bt-header-inner">
			<a href="#top" class="bt-logo" onclick={closeNav}>
				<Logo />
			</a>

			<nav class="bt-nav" aria-label="Primary">
				{#each NAV_LINKS as link}
					<a href={link.href} onclick={closeNav}>{link.label}</a>
				{/each}
				<a class="bt-nav-tel" href={CONTACT.phoneHref} onclick={closeNav}>
					<Icon name="phone" size={15} />
					{CONTACT.phone}
				</a>
				<button
					class="bt-btn bt-btn-primary bt-btn-sm"
					onclick={() => {
						openBooking();
						closeNav();
					}}
				>
					Schedule
				</button>
			</nav>

			<button
				class="bt-hamburger"
				aria-label="Toggle menu"
				aria-expanded={navOpen}
				onclick={() => (navOpen = !navOpen)}
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</header>

	<main class="bt-main">
		<!-- ================================ HERO ================================ -->
		<section class="bt-hero" aria-label="Welcome">
			<!-- statement tile -->
			<div class="bt-tile bt-hero-main">
				<p class="bt-eyebrow bt-on-dark">{HERO.eyebrow}</p>
				<h1 class="bt-hero-title">
					{HERO.titleTop}<br />
					<span class="bt-accent-text">{HERO.titleAccent}</span><br />
					{HERO.titleBottom}
				</h1>
				<p class="bt-hero-lead">{HERO.lead}</p>
				<div class="bt-hero-cta">
					<button class="bt-btn bt-btn-primary" onclick={openBooking}>Schedule an Inspection</button>
					<a href="#services" class="bt-btn bt-btn-blur">What We Look For</a>
				</div>
			</div>

			<!-- tall photo tile -->
			<figure class="bt-tile bt-hero-photo">
				<img src={HERO.photo} alt={HERO.photoAlt} width="813" height="1591" fetchpriority="high" />
				<figcaption class="bt-photo-badge">
					<Icon name="pin" size={15} />
					Serving {CONTACT.serviceArea}
				</figcaption>
			</figure>

			<!-- script tagline tile -->
			<div class="bt-tile bt-hero-script">
				<img class="bt-hero-mark" src={LOGO.mark} alt="" width="270" height="120" />
				<p class="bt-script">{HERO.script}</p>
			</div>

			<!-- call tile -->
			<a class="bt-tile bt-hero-call" href={CONTACT.phoneHref}>
				<span class="bt-call-icon"><Icon name="phone" size={20} /></span>
				<span class="bt-call-body">
					<span class="bt-call-label">Call or text</span>
					<span class="bt-call-number">{CONTACT.phone}</span>
				</span>
			</a>
		</section>

		<!-- ============================= TRUST STRIP ============================= -->
		<section class="bt-tile bt-trust" use:reveal aria-label="Why MSC">
			<div class="bt-trust-half">
				<span class="bt-trust-icon"><Icon name="shield-check" size={26} /></span>
				<p>
					<strong>{TRUST.left}</strong><br />
					<span class="bt-accent-text">{TRUST.leftAccent}</span>
				</p>
			</div>
			<div class="bt-trust-rule" aria-hidden="true"></div>
			<div class="bt-trust-half">
				<span class="bt-trust-icon"><Icon name="check-circle" size={26} /></span>
				<p>
					<strong>{TRUST.right}</strong><br />
					<span class="bt-accent-text">{TRUST.rightAccent}</span>
				</p>
			</div>
		</section>

		<!-- =============================== SERVICES =============================== -->
		<section class="bt-block" id="services" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow">{SERVICES.eyebrow}</p>
				<h2 class="bt-title">{SERVICES.title}</h2>
				<p class="bt-lead">{SERVICES.lead}</p>
			</div>

			<div class="bt-services">
				{#each SERVICES.cards as s}
					<article class="bt-svc" class:wide={s.span === 'wide'} id={s.id}>
						<img class="bt-svc-bg" src={s.img} alt={s.alt} loading="lazy" />
						<div class="bt-svc-overlay">
							<span class="bt-badge"><Icon name={s.icon} size={22} /></span>
							<h3 class="bt-svc-title">{s.title}</h3>
							<p class="bt-svc-body">{s.body}</p>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- ================================ ABOUT ================================ -->
		<section class="bt-block" id="about" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow">{ABOUT.eyebrow}</p>
				<h2 class="bt-title">{ABOUT.title}</h2>
			</div>

			<div class="bt-about">
				<figure class="bt-tile bt-about-photo">
					<img src={ABOUT.photo} alt={ABOUT.photoAlt} width="688" height="1363" loading="lazy" />
				</figure>

				<div class="bt-tile bt-about-copy">
					<p>{ABOUT.body}</p>
					<p>{ABOUT.body2}</p>
					<div class="bt-about-cta">
						<button class="bt-btn bt-btn-primary" onclick={openBooking}>Schedule an Inspection</button>
						<a href="#process" class="bt-btn bt-btn-line">How It Works</a>
					</div>
				</div>

				<div class="bt-tile bt-stat bt-stat-navy">
					<span class="bt-stat-num">{ABOUT.stats[0].value}</span>
					<span class="bt-stat-label">{ABOUT.stats[0].label}</span>
				</div>

				<div class="bt-tile bt-stat bt-stat-accent">
					<span class="bt-stat-num">{ABOUT.stats[1].value}</span>
					<span class="bt-stat-label">{ABOUT.stats[1].label}</span>
				</div>
			</div>
		</section>

		<!-- =============================== PROCESS =============================== -->
		<section class="bt-block" id="process" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow">{PROCESS.eyebrow}</p>
				<h2 class="bt-title">{PROCESS.title}</h2>
			</div>

			<div class="bt-process">
				{#each PROCESS.steps as step, i}
					<article class="bt-tile bt-step">
						<span class="bt-step-num" aria-hidden="true">{step.n}</span>
						<span class="bt-step-icon">
							<Icon name={['calendar', 'search', 'file'][i]} size={22} />
						</span>
						<h3 class="bt-step-title">{step.title}</h3>
						<p class="bt-step-body">{step.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<!-- ================================= FAQ ================================= -->
		<section class="bt-block" id="faq" use:reveal>
			<div class="bt-head bt-head-center">
				<p class="bt-eyebrow">{FAQS.eyebrow}</p>
				<h2 class="bt-title">{FAQS.title}</h2>
			</div>

			<div class="bt-faq">
				{#each FAQS.list as f, i}
					<div class="bt-tile bt-faq-item" class:open={openFaq === i}>
						<button
							class="bt-faq-q"
							aria-expanded={openFaq === i}
							aria-controls="bt-faq-panel-{i}"
							onclick={() => toggleFaq(i)}
						>
							<span class="bt-faq-question">{f.q}</span>
							<span class="bt-faq-icon" aria-hidden="true"></span>
						</button>
						<div class="bt-faq-panel" id="bt-faq-panel-{i}">
							<div class="bt-faq-panel-inner"><p>{f.a}</p></div>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- =============================== CONTACT =============================== -->
		<section class="bt-block" id="contact" use:reveal>
			<div class="bt-head">
				<p class="bt-eyebrow">{CONTACT_SECTION.eyebrow}</p>
				<h2 class="bt-title">{CONTACT_SECTION.title}</h2>
			</div>

			<div class="bt-contact">
				<div class="bt-tile bt-contact-cta">
					<h3 class="bt-contact-cta-title">
						Book your inspection<br />
						<span class="bt-accent-text">and buy with confidence.</span>
					</h3>
					<p class="bt-contact-cta-lead">{CONTACT_SECTION.lead}</p>
					<div class="bt-contact-cta-actions">
						<button class="bt-btn bt-btn-light" onclick={openBooking}>Request an Inspection</button>
						<a href={CONTACT.phoneHref} class="bt-btn bt-btn-blur">
							<Icon name="phone" size={16} />
							{CONTACT.phone}
						</a>
					</div>
				</div>

				<a class="bt-tile bt-info" href={CONTACT.phoneHref}>
					<span class="bt-badge bt-badge-soft"><Icon name="phone" size={19} /></span>
					<span class="bt-info-label">Call or text</span>
					<span class="bt-info-value">{CONTACT.phone}</span>
				</a>

				<a class="bt-tile bt-info" href="mailto:{CONTACT.email}">
					<span class="bt-badge bt-badge-soft"><Icon name="mail" size={19} /></span>
					<span class="bt-info-label">Email</span>
					<span class="bt-info-value bt-info-email">{CONTACT.email}</span>
				</a>

				<div class="bt-tile bt-info">
					<span class="bt-badge bt-badge-soft"><Icon name="pin" size={19} /></span>
					<span class="bt-info-label">Service area</span>
					<span class="bt-info-value">{CONTACT.serviceAreaShort}</span>
				</div>
			</div>
		</section>
	</main>

	<!-- ================================ FOOTER ================================ -->
	<footer class="bt-footer">
		<div class="bt-footer-card">
			<div class="bt-footer-inner">
				<div class="bt-footer-brand">
					<a href="#top" class="bt-footer-logo">
						<Logo light size="lg" />
					</a>
					<p>{FOOTER.blurb}</p>
					<p class="bt-footer-contact">
						<a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br />
						<a href="mailto:{CONTACT.email}">{CONTACT.email}</a>
					</p>
				</div>

				<nav class="bt-footer-links" aria-label="Footer">
					{#each FOOTER.columns as col}
						<div class="bt-footer-col">
							<span class="bt-footer-label">{col.label}</span>
							{#each col.links as l}
								<a href={l.href}>{l.label}</a>
							{/each}
						</div>
					{/each}
				</nav>
			</div>

			<div class="bt-footer-legal">
				<span>© {year} {BRAND_LEGAL}. All rights reserved.</span>
				<span class="bt-footer-tag">Protecting What Matters Most.</span>
			</div>
		</div>
	</footer>
</div>

<style>
	/* =====================================================================
	   DESIGN TOKENS — lifted from the flyer (see docs/business-profile.md §4)
	   ===================================================================== */
	.bt-page {
		--bg: #eff2f7;
		--tile: #ffffff;
		--ink: #0b1622;
		--navy: #0e2135;
		--navy-2: #16304c;
		--soft: #4a5765;
		--faint: #7b8798;
		--line: rgba(14, 33, 53, 0.09);
		--line-strong: rgba(14, 33, 53, 0.16);
		--accent: #1c6fc9;
		--accent-deep: #15558f;
		--accent-bright: #2e86e0;

		--display: 'Oswald', 'Arial Narrow', system-ui, sans-serif;
		--body: 'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
		--script: 'Yellowtail', 'Segoe Script', cursive;

		--r: 20px;
		--r-lg: 28px;
		--r-sm: 14px;
		--pill: 999px;
		--gap: clamp(12px, 1.15vw, 16px);
		--maxw: 1240px;
		--rail: clamp(16px, 4vw, 40px);
		--nav-h: 72px;
		--ease: cubic-bezier(0.22, 0.61, 0.36, 1);

		font-family: var(--body);
		font-size: 16px;
		line-height: 1.6;
		color: var(--ink);
		background: var(--bg);
		-webkit-font-smoothing: antialiased;
	}
	.bt-page :global([id]) {
		scroll-margin-top: calc(var(--nav-h) + 16px);
	}

	/* --------------------------------------------------------- shared type */
	.bt-eyebrow {
		font-family: var(--body);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 12px;
	}
	.bt-eyebrow.bt-on-dark {
		color: var(--accent-bright);
	}
	.bt-title {
		font-family: var(--display);
		font-size: clamp(28px, 3.6vw, 46px);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.005em;
		line-height: 1.06;
		color: var(--navy);
	}
	.bt-lead {
		font-size: clamp(15px, 1.3vw, 17px);
		line-height: 1.65;
		color: var(--soft);
		max-width: 58ch;
		margin-top: 14px;
	}
	.bt-head {
		margin-bottom: clamp(20px, 2.4vw, 30px);
	}
	.bt-head-center {
		text-align: center;
	}
	.bt-head-center .bt-lead {
		margin-inline: auto;
	}
	/* the flyer's signature move: one phrase of a headline in accent blue */
	.bt-accent-text {
		color: var(--accent-bright);
	}
	.bt-script {
		font-family: var(--script);
		font-weight: 400;
		line-height: 1.25;
		color: var(--navy);
	}

	/* ------------------------------------------------------------- buttons */
	.bt-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		font-family: var(--display);
		font-size: 15px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 12px 26px;
		border-radius: var(--pill);
		border: 1px solid transparent;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color 0.22s var(--ease),
			border-color 0.22s var(--ease),
			color 0.22s var(--ease),
			transform 0.22s var(--ease);
	}
	.bt-btn:active {
		transform: scale(0.97);
	}
	.bt-btn-sm {
		font-size: 13.5px;
		padding: 9px 18px;
	}
	.bt-btn-primary {
		background: var(--accent);
		color: #fff;
	}
	.bt-btn-primary:hover {
		background: var(--accent-deep);
	}
	.bt-btn-light {
		background: #fff;
		color: var(--navy);
	}
	.bt-btn-light:hover {
		background: rgba(255, 255, 255, 0.86);
	}
	.bt-btn-blur {
		background: rgba(255, 255, 255, 0.12);
		color: #fff;
		border-color: rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	.bt-btn-blur:hover {
		background: rgba(255, 255, 255, 0.22);
	}
	.bt-btn-line {
		background: transparent;
		color: var(--navy);
		border-color: var(--line-strong);
	}
	.bt-btn-line:hover {
		border-color: var(--navy);
	}

	/* ------------------------------------------------------ tile primitive */
	.bt-tile {
		position: relative;
		background: var(--tile);
		border: 1px solid var(--line);
		border-radius: var(--r);
		overflow: hidden;
	}
	.bt-badge {
		width: 46px;
		height: 46px;
		flex: none;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: var(--accent);
		color: #fff;
	}
	.bt-badge-soft {
		background: rgba(28, 111, 201, 0.1);
		color: var(--accent);
	}

	/* ======================================================================
	   HEADER
	   ====================================================================== */
	.bt-header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 900;
		height: var(--nav-h);
		display: flex;
		align-items: center;
		background: color-mix(in srgb, var(--bg) 76%, transparent);
		backdrop-filter: saturate(1.4) blur(18px);
		-webkit-backdrop-filter: saturate(1.4) blur(18px);
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.3s var(--ease),
			border-color 0.3s var(--ease);
	}
	.bt-header:global(.scrolled) {
		background: color-mix(in srgb, var(--bg) 92%, transparent);
		border-color: var(--line);
	}
	.bt-header-inner {
		width: 100%;
		max-width: var(--maxw);
		margin: 0 auto;
		padding: 0 var(--rail);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}
	.bt-logo {
		display: inline-flex;
		flex: none;
	}
	.bt-nav {
		display: flex;
		align-items: center;
		gap: clamp(14px, 1.7vw, 26px);
	}
	.bt-nav a:not(.bt-btn) {
		font-size: 14px;
		font-weight: 600;
		color: var(--navy);
		opacity: 0.82;
		transition:
			opacity 0.2s,
			color 0.2s;
	}
	.bt-nav a:not(.bt-btn):hover {
		opacity: 1;
		color: var(--accent);
	}
	.bt-nav-tel {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--accent) !important;
		opacity: 1 !important;
	}
	.bt-hamburger {
		display: none;
		width: 42px;
		height: 42px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}
	.bt-hamburger span {
		display: block;
		width: 21px;
		height: 2px;
		background: var(--navy);
		border-radius: 2px;
		transition:
			transform 0.3s var(--ease),
			opacity 0.3s;
	}
	.nav-open .bt-hamburger span:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.nav-open .bt-hamburger span:nth-child(2) {
		opacity: 0;
	}
	.nav-open .bt-hamburger span:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

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
	.bt-page :global(.reveal) {
		opacity: 0;
		transform: translateY(18px);
		transition:
			opacity 0.7s var(--ease),
			transform 0.7s var(--ease);
	}
	.bt-page :global(.reveal.in) {
		opacity: 1;
		transform: none;
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
	.bt-hero-photo img {
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
		background: linear-gradient(140deg, var(--accent-bright), var(--accent) 58%, var(--accent-deep));
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
		color: rgba(255, 255, 255, 0.78);
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
	   SERVICES — two wide tiles over three narrow ones
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
	.bt-svc:hover {
		transform: translateY(-3px);
		box-shadow: 0 20px 40px -20px rgba(14, 33, 53, 0.5);
	}
	.bt-svc-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.8s var(--ease);
	}
	.bt-svc:hover .bt-svc-bg {
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
		background: #e6ebf2;
	}
	.bt-about-photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 22%;
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
		background: linear-gradient(150deg, var(--accent-bright), var(--accent-deep));
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
		color: rgba(255, 255, 255, 0.78);
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
		color: var(--accent);
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
		background: var(--accent);
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
		transition: grid-template-rows 0.32s var(--ease);
	}
	.bt-faq-item.open .bt-faq-panel {
		grid-template-rows: 1fr;
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
	   FOOTER
	   ====================================================================== */
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
		color: var(--accent-bright);
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
	.bt-footer-col a {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.72);
		transition: color 0.2s;
	}
	.bt-footer-col a:hover {
		color: var(--accent-bright);
	}
	.bt-footer-legal {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: clamp(28px, 4vw, 48px);
		padding-top: 20px;
		border-top: 1px solid rgba(255, 255, 255, 0.14);
		font-size: 12.5px;
		color: rgba(255, 255, 255, 0.55);
	}
	.bt-footer-tag {
		font-family: var(--script);
		font-size: 17px;
		color: rgba(255, 255, 255, 0.72);
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
		.bt-hero-photo img {
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
		.bt-about-photo {
			grid-column: 1 / 3;
			grid-row: 1;
			min-height: clamp(300px, 42vw, 400px);
		}
		.bt-about-photo img {
			object-position: 50% 18%;
		}
		.bt-about-copy {
			grid-column: 1 / 3;
			grid-row: 2;
		}
		.bt-stat-navy {
			grid-column: 1;
			grid-row: 3;
		}
		.bt-stat-accent {
			grid-column: 2;
			grid-row: 3;
		}
	}

	@media (max-width: 980px) {
		.bt-services {
			grid-template-columns: repeat(2, 1fr);
		}
		.bt-svc,
		.bt-svc.wide {
			grid-column: span 1;
			min-height: 340px;
		}
		.bt-svc:last-child {
			grid-column: span 2;
			min-height: 300px;
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
		.bt-hamburger {
			display: flex;
			position: relative;
			z-index: 860; /* stays clickable above the open drawer */
		}
		/* `.bt-header` sets backdrop-filter, which makes it the containing block
		   for its position:fixed descendants — so the drawer must be sized
		   explicitly rather than with `inset: 0`, which would resolve against
		   the 72px-tall header. */
		.bt-nav {
			position: fixed;
			top: 0;
			right: 0;
			height: 100vh;
			height: 100dvh;
			width: min(84vw, 330px);
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			gap: 26px;
			padding: 90px 40px;
			overflow-y: auto;
			background: var(--bg);
			border-left: 1px solid var(--line);
			box-shadow: -24px 0 48px -24px rgba(14, 33, 53, 0.45);
			transform: translateX(100%);
			transition: transform 0.4s var(--ease);
			z-index: 850;
		}
		.nav-open .bt-nav {
			transform: none;
		}
		.bt-nav a:not(.bt-btn) {
			font-size: 17px;
		}

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

		.bt-footer-inner {
			grid-template-columns: 1fr 1fr;
		}
		.bt-footer-brand {
			grid-column: 1 / -1;
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
		.bt-svc:last-child {
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

		.bt-footer-inner {
			grid-template-columns: 1fr;
		}
		.bt-footer-legal {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
