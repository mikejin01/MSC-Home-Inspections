/* =============================================================================
   MSC Home Inspections LLC — all site copy and data in one place.

   Everything here is drawn from the business flyer (docs/Business Flyer.jpg)
   and the brief in docs/business-profile.md.

   Anything the flyer did NOT establish is marked with a `TODO:` comment rather
   than invented. Home inspection is a licensed, liability-sensitive trade, so
   nothing on this site claims a credential, a turnaround time, a price, a
   rating, or a review that hasn't been confirmed by the business.
   ============================================================================= */

import { base } from '$app/paths';

const IMG = `${base}/assets/images`;

/* ---------------------------------------------------------------- business */

export const BRAND = 'MSC Home Inspections';
export const BRAND_LEGAL = 'MSC Home Inspections LLC';

export const CONTACT = {
	phone: '917-853-7100',
	phoneHref: 'tel:+19178537100',
	// TODO: replace with a branded address (e.g. info@mschomeinspections.com)
	// once the domain is registered; keep this one forwarding so nothing is lost.
	email: 'francocaruso19@icloud.com',
	serviceArea: 'the New Jersey area',
	serviceAreaShort: 'New Jersey'
	// TODO: confirm business hours, mailing address, and the specific NJ
	// counties / towns served — county pages are the single biggest local-SEO
	// win for a business like this.
};

// Where the "Schedule an Inspection" form posts.
// Leave empty and the form falls back to opening a pre-filled email to
// CONTACT.email — which works on a static host with no backend. To collect
// submissions properly, drop in a Formspree / Basin / Netlify Forms endpoint.
export const FORM_ENDPOINT = '';

// `dark`/`light` are the full stacked lockup from the flyer. They aren't placed
// anywhere right now — the stacked form goes illegible at header size, so the
// header and footer use the roof mark beside a typeset wordmark instead (see
// src/lib/components/Logo.svelte). Kept here for social cards, print, and for
// whenever the real vector logo arrives to replace them.
export const LOGO = {
	dark: `${IMG}/logo-msc.png`,
	light: `${IMG}/logo-msc-white.png`,
	mark: `${IMG}/mark-msc.png`,
	markLight: `${IMG}/mark-msc-white.png`,
	alt: 'MSC Home Inspections LLC'
};

export const NAV_LINKS = [
	{ label: 'What We Look For', href: '#services' },
	{ label: 'Your Inspector', href: '#about' },
	{ label: 'How It Works', href: '#process' },
	{ label: 'FAQ', href: '#faq' },
	{ label: 'Contact', href: '#contact' }
];

/* -------------------------------------------------------------------- hero */

export const HERO = {
	eyebrow: 'Thorough Inspections. Peace of Mind.',
	// Rendered as the flyer's two-tone headline: white / accent blue / white.
	titleTop: 'We Look Deeper',
	titleAccent: 'So You Can',
	titleBottom: 'Buy With Confidence.',
	lead: 'We help identify hidden issues early so you can make informed decisions about your home.',
	script: 'Protecting What Matters Most.',
	photo: `${IMG}/home-exterior.jpg`,
	photoAlt: 'A timber-and-glass home lit from within against a deep blue twilight sky'
};

/* ------------------------------------------------------------- trust strip */

export const TRUST = {
	left: 'Detailed. Professional. Reliable.',
	leftAccent: "That's the MSC Difference.",
	right: 'Serving the',
	rightAccent: 'New Jersey Area'
};

/* ---------------------------------------------------------------- services */
// The five pillars from the flyer, with the flyer's own descriptions, plus pool
// inspections — confirmed by the business after the flyer was printed, so it is
// presented as an additional service rather than a sixth flyer pillar.
// The hedged wording ("signs of", "visible", "may affect", "referrals for") is
// deliberate and load-bearing: MSC inspects and identifies, it does not test,
// diagnose, or remediate. Do not let marketing copy drift past that line.

export const SERVICES = {
	eyebrow: 'What We Do',
	title: 'What We Look For',
	lead: 'Five areas where small, easy-to-miss problems turn into expensive ones — and where a careful look pays for itself. We inspect pools, too.',
	cards: [
		{
			id: 'moisture',
			icon: 'droplet',
			title: 'Moisture Intrusion Detection',
			body: 'We identify signs of moisture intrusion before they lead to bigger problems.',
			img: `${IMG}/service-1.jpg`,
			alt: 'Dark damp staining and mould streaking down a pale interior wall',
			span: 'wide'
		},
		{
			id: 'water-damage',
			icon: 'waves',
			title: 'Water Damage Inspections',
			body: 'We assess visible water damage and help you understand the potential impact.',
			img: `${IMG}/service-2.jpg`,
			alt: 'A water-damaged ceiling fallen away to expose the lath above',
			span: 'wide'
		},
		{
			id: 'attic-crawl',
			icon: 'house',
			title: 'Attic & Crawl Space Evaluations',
			body: 'We check these often-overlooked areas for issues that could affect your home.',
			img: `${IMG}/service-3.jpg`,
			alt: 'An attic interior with exposed timber rafters and a boarded floor'
		},
		{
			id: 'air-quality',
			icon: 'air',
			title: 'Indoor Air Quality Concerns',
			body: 'We look for conditions that may affect indoor air quality in your home.',
			img: `${IMG}/service-4.jpg`,
			alt: 'Paint blistered and lifting away from a damp interior wall'
		},
		{
			id: 'referrals',
			icon: 'microscope',
			title: 'Referrals When Needed',
			body: 'When appropriate, we provide referrals for mold testing or remediation professionals.',
			img: `${IMG}/service-5.jpg`,
			alt: 'A laboratory technician in gloves pipetting a sample into a rack of tubes'
		},
		{
			// Not on the flyer — added at the business's request. Rendered as the
			// full-width feature tile under the five pillars, which keeps the
			// flyer's 2-wide-over-3-narrow rhythm intact and still gives the
			// newest service its own moment.
			id: 'pool',
			icon: 'pool',
			title: 'Pool Inspections',
			body: 'Have a pool? We inspect what can be seen — the shell and surround, the barrier and gates, and the visible condition of the pump, filter, and heater.',
			img: `${IMG}/service-pool.jpg`,
			alt: 'Sunlight rippling across the clear turquoise water of a swimming pool',
			span: 'feature'
		}
	]
};

/* ------------------------------------------------------------------- about */

export const ABOUT = {
	eyebrow: 'Your Inspector',
	// TODO: confirm the inspector's name. "Franco Caruso" is inferred from the
	// email address on the flyer and is NOT rendered anywhere on the site yet.
	title: 'One inspector. Every inspection.',
	body: `MSC Home Inspections is owner-operated, so the person who walks your home is the person who writes your report. No rotating crews, no rushed walkthroughs — just a careful look at the places problems actually start.`,
	body2: `We pay particular attention to moisture, water damage, attics and crawl spaces: the areas most often skipped, and the ones most likely to cost you later.`,
	photo: `${IMG}/inspector-hq.png`,
	photoAlt: 'The MSC Home Inspections inspector, in a branded MSC polo shirt',
	stats: [
		{ value: '5', label: 'focus areas on every inspection' },
		{ value: 'NJ', label: 'serving the New Jersey area' }
	]
	// TODO: once confirmed, this is the right place for years in business, the
	// NJ home inspector licence number, and any InterNACHI / ASHI affiliation.
	// Those are the strongest trust signals available to this business.
};

/* ----------------------------------------------------------------- process */
// Deliberately free of specifics (price, duration, report turnaround) until
// the business confirms them. See the TODOs.

export const PROCESS = {
	eyebrow: 'How It Works',
	title: 'Straightforward from Start to Report',
	steps: [
		{
			n: '01',
			title: 'Get in Touch',
			body: 'Call or text, or send the form below with the property address and your timeline. We will confirm a time that works.'
		},
		{
			n: '02',
			title: 'The Inspection',
			body: 'A methodical walkthrough inside and out — including the attic and crawl space — documenting what we find as we go. You are welcome to walk along and ask questions.'
			// TODO: confirm the business is happy for clients to attend, and add
			// a typical inspection duration here once known.
		},
		{
			n: '03',
			title: 'Your Report',
			body: 'A clear written report with photographs and plain-English explanations, so you know what matters, what can wait, and what to ask about next.'
			// TODO: add the report turnaround time (e.g. "within 24 hours") and
			// link a sample report once the business provides one.
		}
	]
};

/* --------------------------------------------------------------------- faq */
// Answers marked TODO restate general home-inspection practice and should be
// confirmed against how this business actually operates before launch.

export const FAQS = {
	eyebrow: 'Questions',
	title: 'Frequently Asked Questions',
	list: [
		{
			q: 'Do you test for mold?',
			a: `No — and that distinction matters. We inspect: we identify visible signs of moisture intrusion, water damage, and conditions that may affect indoor air quality. When a situation calls for laboratory testing or remediation, we refer you to professionals who specialise in that work. Keeping inspection separate from remediation means our findings stay impartial.`
		},
		{
			q: 'Why do you focus so much on moisture and water damage?',
			a: `Because water causes the damage you cannot see. Moisture that gets behind a wall, under a floor, or into an attic quietly feeds rot, compromises structure, and creates the conditions mould needs — often long before anything shows on the surface. Catching the source early is far cheaper than repairing what it leads to.`
		},
		{
			q: 'Do you inspect attics and crawl spaces?',
			a: `Yes. They are two of the most commonly skipped areas in a home inspection and two of the most revealing. Ventilation problems, insulation gaps, pest activity, standing water, and failing vapour barriers all tend to show up there first.`
		},
		{
			q: 'Do you inspect swimming pools?',
			a: `Yes. Alongside the home itself we inspect the pool: the visible condition of the shell or liner, the deck and surround, the barrier, gates and latches, and the visible condition of the pump, filter, and heater. As everywhere else, this is a visual inspection — we do not test water chemistry, carry out leak detection, or service equipment. Where something needs a specialist, we say so and can refer you on.`
			// TODO: confirm with the business — in-ground only or above-ground
			// too, whether spas and hot tubs are included, and whether the pool
			// inspection is part of the standard fee or priced as an add-on.
		},
		{
			q: 'Can I be there during the inspection?',
			a: `You are welcome to walk along. Seeing a concern in person — and being able to ask about it on the spot — usually makes the written report far easier to act on.`
			// TODO: confirm with the business.
		},
		{
			q: 'What areas do you serve?',
			a: `We serve the New Jersey area. If you are not sure whether your property is within range, call or text and we will let you know.`
			// TODO: replace with the specific counties and towns covered. Naming
			// them here is the simplest local-SEO improvement available.
		},
		{
			q: 'How do I schedule an inspection?',
			a: `Call or text ${CONTACT.phone}, or send the form on this page with the property address and your timeline. Tell us what is prompting the inspection — a purchase, a specific concern, or a general check — and we will take it from there.`
		}
	]
};

/* ----------------------------------------------------------------- contact */

export const CONTACT_SECTION = {
	eyebrow: 'Get Started',
	title: 'Schedule Your Inspection Today',
	lead: 'Tell us about the property and what is prompting the inspection. We will get back to you to confirm a time.'
};

export const REASONS = [
	'Buying a home',
	'Selling a home',
	'Moisture or water concern',
	'Attic or crawl space concern',
	'Indoor air quality concern',
	'Pool inspection',
	'General inspection'
];

/* ------------------------------------------------------------------ footer */

export const FOOTER = {
	blurb: 'Thorough home and pool inspections across the New Jersey area — helping you identify hidden issues early so you can make informed decisions about your home.',
	columns: [
		{
			label: 'Inspections',
			links: [
				{ label: 'Moisture Intrusion', href: '#services' },
				{ label: 'Water Damage', href: '#services' },
				{ label: 'Attic & Crawl Space', href: '#services' },
				{ label: 'Indoor Air Quality', href: '#services' },
				{ label: 'Pool Inspections', href: '#services' }
			]
		},
		{
			label: 'Company',
			links: [
				{ label: 'Your Inspector', href: '#about' },
				{ label: 'How It Works', href: '#process' },
				{ label: 'FAQ', href: '#faq' }
			]
		},
		{
			label: 'Get in Touch',
			links: [
				{ label: 'Schedule an Inspection', href: '#contact' },
				{ label: CONTACT.phone, href: CONTACT.phoneHref },
				{ label: 'Email Us', href: `mailto:${CONTACT.email}` }
			]
		}
	]
	// TODO: add the NJ home inspector licence number to the footer legal line —
	// it is both a trust signal and commonly expected on an inspector's site.
	// TODO: add real Privacy / Terms / Accessibility pages before launch; the
	// footer intentionally does not link to placeholder pages that don't exist.
};
