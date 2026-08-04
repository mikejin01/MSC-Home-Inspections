<script>
	import BentoPage from '$lib/bento/BentoPage.svelte';
	import { BRAND_LEGAL, CONTACT } from '$lib/content.js';

	const title = 'MSC Home Inspections LLC — Home Inspections in New Jersey';
	const description =
		'Thorough home inspections across the New Jersey area. Moisture intrusion detection, water damage inspections, attic & crawl space evaluations, and indoor air quality concerns. Call or text 917-853-7100.';

	// LocalBusiness structured data — the single highest-leverage SEO addition
	// for a service business like this. Fields the flyer doesn't establish
	// (address, hours, priceRange, aggregateRating) are deliberately omitted
	// rather than guessed; see the TODOs in src/lib/content.js.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'HomeAndConstructionBusiness',
		name: BRAND_LEGAL,
		description,
		telephone: `+1-${CONTACT.phone}`,
		email: CONTACT.email,
		areaServed: { '@type': 'State', name: 'New Jersey' },
		knowsAbout: [
			'Home inspection',
			'Moisture intrusion detection',
			'Water damage inspection',
			'Attic and crawl space evaluation',
			'Indoor air quality'
		],
		slogan: 'Thorough Inspections. Peace of Mind.'
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>

<BentoPage />
