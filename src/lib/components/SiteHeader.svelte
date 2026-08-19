<script>
	/**
	 * The site header: logo, primary nav, phone link, and the Schedule CTA.
	 *
	 * Extracted from BentoPage so the legal pages (privacy, terms,
	 * accessibility) carry the same chrome and the same editable content keys —
	 * `nav_{i}_label` / `nav_{i}_url` and `header_cta_label` resolve identically
	 * wherever this renders.
	 *
	 * Accessibility notes:
	 *  • The mobile drawer is a disclosure: the hamburger owns `aria-expanded`
	 *    and `aria-controls`, and the drawer is `visibility: hidden` while
	 *    closed so its links leave the tab order instead of being focusable
	 *    off-screen (WCAG 2.4.3).
	 *  • Escape closes the drawer and returns focus to the hamburger
	 *    (WCAG 2.1.2 — no keyboard trap).
	 */
	import { openBooking } from '$lib/booking.svelte.js';
	import Icon from '$lib/components/Icon.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import InlineEdit from '$lib/inline-edit/InlineEdit.svelte';
	import LinkEdit from '$lib/inline-edit/LinkEdit.svelte';
	import { scrolled } from '$lib/actions.js';
	import { telHref } from '$lib/wp/client.js';
	import { wpEdit } from '$lib/wp/wpEdit.svelte.js';
	import { CONTACT, NAV_LINKS } from '$lib/content.js';

	let {
		/**
		 * Prefix for in-page `#anchor` hrefs. Empty on the home page, `/` (plus
		 * any base path) on a legal page, so "What We Look For" still lands on
		 * the right section instead of dead-ending on the current URL.
		 */
		anchorBase = '',
		/** Where the logo links. `#top` at home, the home URL elsewhere. */
		homeHref = '#top'
	} = $props();

	const t = (/** @type {string} */ key, /** @type {string} */ fallback) => wpEdit.text(key, fallback);

	const phone = $derived(t('global_contact_phone', CONTACT.phone));
	const phoneLink = $derived(telHref(phone));

	let navOpen = $state(false);
	/** @type {HTMLElement | undefined} */
	let navEl = $state();
	/** @type {HTMLButtonElement | undefined} */
	let toggleEl = $state();

	const closeNav = () => (navOpen = false);

	function toggleNav() {
		navOpen = !navOpen;
		// Move focus into the drawer so the next Tab walks the menu rather than
		// the page behind it.
		if (navOpen) {
			queueMicrotask(() => {
				const first = navEl?.querySelector('a, button');
				if (first instanceof HTMLElement) first.focus();
			});
		}
	}

	function dismiss() {
		if (!navOpen) return;
		navOpen = false;
		toggleEl?.focus();
	}

	/** @param {KeyboardEvent} event */
	function onKeydown(event) {
		if (event.key === 'Escape') dismiss();
	}
</script>

<svelte:window onkeydown={onKeydown} />

<header class="bt-header" id="top" class:nav-open={navOpen} use:scrolled>
	<div class="bt-header-inner">
		<a href={homeHref} class="bt-logo" onclick={closeNav}>
			<Logo />
		</a>

		<!-- The scrim only exists while the drawer is open, and only has a job on
		     touch/mouse — keyboard users close with Escape or the toggle, so it
		     stays out of the accessibility tree rather than posing as a control. -->
		{#if navOpen}
			<div class="bt-nav-scrim" onclick={dismiss} role="presentation"></div>
		{/if}

		<nav class="bt-nav" id="site-nav" aria-label="Primary" bind:this={navEl}>
			{#each NAV_LINKS as link, i}
				<LinkEdit urlKey="nav_{i}_url" defaultHref={link.href} {anchorBase} onclick={closeNav}>
					<InlineEdit k="nav_{i}_label" value={link.label} />
				</LinkEdit>
			{/each}
			<a class="bt-nav-tel" href={phoneLink} onclick={closeNav}>
				<Icon name="phone" size={15} />
				{phone}
			</a>
			{#if wpEdit.isEditing}
				<span class="bt-btn bt-btn-primary bt-btn-sm">
					<InlineEdit k="header_cta_label" value="Schedule" />
				</span>
			{:else}
				<button
					class="bt-btn bt-btn-primary bt-btn-sm"
					onclick={() => {
						openBooking();
						closeNav();
					}}
				>
					{t('header_cta_label', 'Schedule')}
				</button>
			{/if}
		</nav>

		<button
			class="bt-hamburger"
			aria-label={navOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={navOpen}
			aria-controls="site-nav"
			bind:this={toggleEl}
			onclick={toggleNav}
		>
			<span></span><span></span><span></span>
		</button>
	</div>
</header>

<style>
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
	.bt-nav :global(a:not(.bt-btn)) {
		font-size: 14px;
		font-weight: 600;
		color: var(--navy);
		opacity: 0.82;
		transition:
			opacity 0.2s,
			color 0.2s;
	}
	.bt-nav :global(a:not(.bt-btn):hover) {
		opacity: 1;
		color: var(--accent-ink);
	}
	.bt-nav-tel {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--accent-ink) !important;
		opacity: 1 !important;
	}
	.bt-nav-scrim {
		display: none;
	}
	.bt-hamburger {
		display: none;
		width: 44px;
		height: 44px;
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

	@media (max-width: 900px) {
		.bt-hamburger {
			display: flex;
			position: relative;
			z-index: 860; /* stays clickable above the open drawer */
		}
		/* Same containing-block trap as the drawer below: `.bt-header` sets
		   backdrop-filter, so `inset: 0` on a fixed child would resolve against
		   the 72px header rather than the viewport. Size it explicitly. */
		.bt-nav-scrim {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			height: 100dvh;
			z-index: 840;
			background: rgba(8, 18, 30, 0.45);
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
			/* `visibility` is what actually takes the closed drawer's links out of
			   the tab order — `transform` alone leaves them focusable off-screen,
			   which strands keyboard users on invisible controls (WCAG 2.4.3). */
			visibility: hidden;
			transition:
				transform 0.4s var(--ease),
				visibility 0s linear 0.4s;
			z-index: 850;
		}
		.nav-open .bt-nav {
			transform: none;
			visibility: visible;
			transition:
				transform 0.4s var(--ease),
				visibility 0s;
		}
		.bt-nav :global(a:not(.bt-btn)) {
			font-size: 17px;
		}
	}
</style>
