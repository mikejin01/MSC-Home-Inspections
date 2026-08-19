<script>
	import BentoPage from '$lib/bento/BentoPage.svelte';
	import { BRAND_LEGAL, CONTACT } from '$lib/content.js';
	import { underWordPress } from '$lib/wp/client.js';
	import { wpEdit } from '$lib/wp/wpEdit.svelte.js';

	const title = 'MSC Home Inspections LLC — Home Inspections in New Jersey';
	const description =
		'Thorough home inspections across the New Jersey area. Moisture intrusion detection, water damage inspections, attic & crawl space evaluations, and indoor air quality concerns. Call or text 917-853-7100.';

	// On WordPress the theme's <head> is authoritative: functions.php emits the
	// title, description, and LocalBusiness JSON-LD (deferring to Yoast SEO when
	// it's active). Emitting a second set from the SPA after hydration would
	// just fight it, so this block only runs on the static build.
	const ownsHead = !underWordPress();

	// LocalBusiness structured data — the single highest-leverage SEO addition
	// for a service business like this. Fields the flyer doesn't establish
	// (address, hours, priceRange, aggregateRating) are deliberately omitted
	// rather than guessed; see the TODOs in src/lib/content.js.
	// Phone and email read through the content layer so a `make pull-content`
	// sync keeps the static build's schema matching the live site.
	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'HomeAndConstructionBusiness',
		name: wpEdit.text('global_business_name', BRAND_LEGAL),
		description,
		telephone: `+1-${wpEdit.text('global_contact_phone', CONTACT.phone)}`,
		email: wpEdit.text('global_contact_email', CONTACT.email),
		areaServed: { '@type': 'State', name: 'New Jersey' },
		knowsAbout: [
			'Home inspection',
			'Moisture intrusion detection',
			'Water damage inspection',
			'Attic and crawl space evaluation',
			'Indoor air quality'
		],
		slogan: 'Thorough Inspections. Peace of Mind.'
	});
</script>

<svelte:head>
	{#if ownsHead}
		<title>{title}</title>
		<meta name="description" content={description} />

		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />

		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />

		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
	{/if}
</svelte:head>

<BentoPage />
