/* =============================================================================
   MSC Home Inspections LLC — all site copy and data in one place.

   Everything here is drawn from the business flyer (docs/Business Flyer.jpg)
   and the brief in docs/business-profile.md.

   Anything the flyer did NOT establish is marked with a `TODO:` comment rather
   than invented. Home inspection is a licensed, liability-sensitive trade, so
   nothing on this site claims a credential, a turnaround time, a price, a
   rating, or a review that hasn't been confirmed by the business.
   ============================================================================= */

// Image paths are stored theme-relative and resolved at render time by
// assetUrl() in src/lib/wp/assets.js — the same value has to work under the
// GitHub Pages base path, under /wp-content/themes/<slug>/ on WordPress, and
// alongside /wp-content/uploads/… URLs a client picks in the Media Library.
const IMG = '/assets/images';

/* ---------------------------------------------------------------- business */

export const BRAND = 'MSC Home Inspections';
export const BRAND_LEGAL = 'MSC Home Inspections LLC';

export const CONTACT = {
	// `tel:` and `mailto:` hrefs are derived from these at render time
	// (telHref/mailHref in src/lib/wp/client.js) rather than stored, so a phone
	// number changed in X.O. Admin can never disagree with the link beside it.
	phone: '917-853-7100',
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
			a: `Call or text {{PHONE}}, or send the form on this page with the property address and your timeline. Tell us what is prompting the inspection — a purchase, a specific concern, or a general check — and we will take it from there.`
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
				// {{TOKENS}} resolve from the live business details (X.O. Admin on
				// WordPress, CONTACT here otherwise), so changing the phone number
				// in one place updates the footer too.
				{ label: '{{PHONE}}', href: '{{PHONE_HREF}}' },
				{ label: 'Email Us', href: '{{EMAIL_HREF}}' }
			]
		}
	]
	// TODO: add the NJ home inspector licence number to the footer legal line —
	// it is both a trust signal and commonly expected on an inspector's site.
};

/* ------------------------------------------------------------- legal links */
// Rendered in the footer's legal row by src/lib/components/SiteFooter.svelte.
// `href` is a real route (src/routes/<slug>/+page.svelte) and, on WordPress, a
// real page — the slugs are registered in scripts/build-wordpress-theme.mjs
// under THEME.pages, so activating the theme creates them. Keep the three in
// step: SvelteKit route folder === WordPress slug === the href below.

export const LEGAL_LINKS = [
	{ label: 'Privacy Policy', href: '/privacy-policy/' },
	{ label: 'Terms of Service', href: '/terms-of-service/' },
	{ label: 'Accessibility', href: '/accessibility/' }
];

/* =============================================================================
   LEGAL & ACCESSIBILITY PAGES

   Structure, section order, and voice follow the X.O. house template already
   live on the iDeal Auto Broker sites — numbered clauses for the policy and
   terms, unnumbered prose for the accessibility statement, a shared
   "Last Updated" line, and a contact section closing each page.

   The FACTS are MSC's, not the template's: the auto-broker clauses (VTL §415
   broker disclosure, vehicle pricing) are replaced by the ones a licensed
   inspector needs — what a visual inspection is and is not, and the primacy of
   the signed inspection agreement over anything said here.

   ⚠️  Still not legal advice, and not reviewed by an attorney. The remaining
   TODOs are the NJ home inspector licence number and the mailing address.

   Shape: each page is `{ eyebrow, title, updated, intro, sections[] }` and
   every section is `{ h, p[], li[] }`. Content keys derive from the page slug
   and the indices — `privacy_s3_h`, `privacy_s3_p1`, `privacy_s3_li0` — so
   they stay flat and stable. Adding a section at the END is safe; inserting
   one in the middle renumbers every key after it and orphans the client's
   live edits for them.
   ============================================================================= */

const UPDATED = 'Last Updated: August 19, 2026';

/** Closing contact line, shared so one edit updates all three pages. */
const CONTACT_LINE =
	'If you have questions about this page, contact {{BUSINESS_NAME}} by phone or text at {{PHONE}}, or by email at {{EMAIL}}.';

export const PRIVACY = {
	slug: 'privacy',
	eyebrow: 'Legal',
	title: 'Privacy Policy',
	updated: UPDATED,
	// `numbered` renders "1." … "7." before each heading, matching the house
	// template used across the X.O. client sites.
	numbered: true,
	intro:
		'{{BUSINESS_NAME}} respects your privacy. This policy explains what personal information this website collects, how we use it, and the choices you have.',
	sections: [
		{
			h: 'Information We Collect',
			p: [
				'We collect information you provide directly to us through the inspection request form on this website, or when you call, text, or email us. That includes:'
			],
			li: [
				'your name, email address, and phone number',
				'the address of the property you would like inspected',
				'what is prompting the inspection, and any preferred date',
				'anything else you choose to tell us in the notes field'
			]
		},
		{
			h: 'How We Use Your Information',
			p: ['We use the information we collect to:'],
			li: [
				'respond to your enquiry and confirm a time for the inspection',
				'carry out the inspection and deliver your written report',
				'follow up with you about that inspection or its findings',
				'keep the records our profession and our insurers require us to keep'
			]
		},
		{
			h: 'Information Sharing',
			p: [
				'We do not sell, trade, or rent your personal information to third parties, and we do not use it for advertising.',
				'We may share it with service providers who help us operate this website and our email, and only to the extent they need it to provide that service. Where you ask us to refer you to a specialist — for example a mould testing or remediation professional — we share only what is needed to make that introduction. We will also share information where the law requires it.'
			],
			li: []
		},
		{
			h: 'Data Security',
			p: [
				'This website is served over HTTPS, and we implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.',
				'No method of transmission over the internet is completely secure. Please do not send financial account details or government identifiers through the website form.'
			],
			li: []
		},
		{
			h: 'Your Rights',
			p: ['You have the right to:'],
			li: [
				'access the personal information we hold about you',
				'correct information that is inaccurate',
				'request deletion of your information',
				'opt out of any non-essential communication from us'
			]
		},
		{
			h: 'Data Retention',
			p: [
				'We keep enquiry details for as long as we need them to answer you. Where an inspection goes ahead, our records of that inspection are retained for as long as our professional and insurance obligations require — commonly several years. Enquiries that do not lead to an inspection are deleted once they are no longer useful.',
				'If you ask us to delete your information we will do so, except where we are required to retain it.'
			],
			li: []
		},
		{
			h: 'Cookies',
			p: [
				'This website does not set advertising or cross-site tracking cookies, and we do not currently run third-party analytics on it. It uses only strictly necessary cookies — for example, to keep an administrator signed in while they edit the site.',
				'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Nothing on this site stops working if you do.'
				// Verified 19 Aug 2026: no GA4 property exists for
				// mschomeinspections.com in the X.O. Analytics network. Connecting
				// one makes both sentences above false — update them in the same
				// change. See docs/Google-Analytics-Connection-Guide.md.
			],
			li: []
		},
		{
			h: 'Changes to This Policy',
			p: [
				'We may update this policy from time to time. The date at the top of this page shows when it last changed.'
			],
			li: []
		},
		{
			h: 'Contact Us',
			p: [CONTACT_LINE],
			li: []
		}
	]
};

export const TERMS = {
	slug: 'terms',
	eyebrow: 'Legal',
	title: 'Terms of Service',
	updated: UPDATED,
	numbered: true,
	intro:
		'These terms govern your use of this website. They are not the agreement for an inspection — that is a separate written agreement you receive and sign before any inspection takes place.',
	sections: [
		{
			h: 'Acceptance of Terms',
			p: [
				'By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use this website.'
			],
			li: []
		},
		{
			h: 'Use of Website',
			p: [
				'This website is provided for informational purposes related to our home and pool inspection services in {{SERVICE_AREA}}. You agree to use it only for lawful purposes and in accordance with these Terms of Service.',
				'Nothing on this website is professional, legal, or engineering advice, and nothing here should be relied on in place of an inspection of your specific property.'
			],
			li: []
		},
		{
			h: 'Inspection Services Disclosure',
			p: [
				'A home inspection is a visual, non-invasive examination of the readily accessible parts of a property on the day of the inspection. We identify what can be seen and reached; we do not dismantle, open up finished surfaces, or move stored belongings.',
				'An inspection is not a warranty, a guarantee, or an insurance policy against future problems, and it does not predict how long any component will last. It is not an engineering, code-compliance, environmental, or pest-control evaluation, and we do not test for the presence of mould. Where something calls for a specialist, we say so and can refer you on.',
				'The scope, exclusions, and limitations that apply to your inspection are set out in full in the written inspection agreement you sign and in the report itself. If those documents and this page ever disagree, the inspection agreement controls.'
				// TODO: New Jersey licenses home inspectors under the Home Inspection
				// Professional Licensing Act. Add the licence number here and in the
				// footer once the business provides it — a regulated-trade disclosure
				// is the analogue of the broker disclosure on the iDeal sites.
			],
			li: []
		},
		{
			h: 'Scheduling and Availability',
			p: [
				'Submitting the form on this website, or calling or texting us, is a request — not a confirmed booking. An inspection is scheduled only when we confirm it with you directly and you have received and agreed to our inspection agreement.',
				'Please give us accurate information about the property. We rely on it to prepare for the inspection and to reach you. Availability is subject to change, and we may be unable to take a particular property or date.'
			],
			li: []
		},
		{
			h: 'Fees',
			p: [
				'This website does not display prices. Any figure discussed before an inspection is an estimate based on what you have told us about the property; the fee is confirmed with you in writing before the inspection takes place. Additional fees and charges may apply.'
			],
			li: []
		},
		{
			h: 'Intellectual Property',
			p: [
				'The content, features, and functionality of this website — including its text, photographs, and logos — are owned by {{BUSINESS_NAME}} or used with permission, and are protected by copyright, trademark, and other intellectual property laws.',
				'You may read, print, and share pages for your own non-commercial use. You may not republish the site or its contents for commercial purposes without our written permission.'
			],
			li: []
		},
		{
			h: 'Third-Party Links',
			p: [
				'This website may link to businesses or resources we do not control. We provide those links for convenience; we do not endorse them, and we are not responsible for their content, their services, or their privacy practices.'
			],
			li: []
		},
		{
			h: 'Limitation of Liability',
			p: [
				'{{BUSINESS_NAME}} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, this website.',
				'This limitation applies to the website only. It does not limit any liability arising from an inspection we actually perform — that is governed by the inspection agreement and by New Jersey law — and it does not exclude any liability that cannot lawfully be excluded.'
			],
			li: []
		},
		{
			h: 'Governing Law',
			p: [
				'These terms are governed by the laws of the State of New Jersey, without regard to its conflict-of-laws rules. Any dispute about this website will be brought in the state or federal courts located in New Jersey.'
			],
			li: []
		},
		{
			h: 'Changes to Terms',
			p: [
				'We reserve the right to modify these terms at any time. The date at the top of this page shows when they last changed, and your continued use of the website following any change constitutes acceptance of it.'
			],
			li: []
		},
		{
			h: 'Contact Information',
			p: [CONTACT_LINE],
			li: []
		}
	]
};

export const ACCESSIBILITY = {
	slug: 'accessibility',
	eyebrow: 'Accessibility',
	title: 'Accessibility Statement',
	updated: UPDATED,
	// Unnumbered, matching the house template — this one reads as prose, not
	// as clauses.
	numbered: false,
	intro:
		'{{BUSINESS_NAME}} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.',
	sections: [
		{
			h: 'Our Commitment',
			p: [
				'We want everyone to be able to find out about our inspections and get in touch with us, whatever technology they use to browse the web. That includes people who use screen readers, magnification, speech input, or a keyboard alone.',
				'Accessibility is treated as part of building and maintaining this site, not as an afterthought.'
			],
			li: []
		},
		{
			h: 'Accessibility Features',
			p: ['We strive to make this website accessible by:'],
			li: [
				'providing a "Skip to main content" link so keyboard users can bypass the header',
				'checking text and background colours against the WCAG contrast ratios',
				'showing a visible focus outline on every link, button, and form field',
				'aiming to make all functionality available from a keyboard, including the menu, the FAQ, and the booking form',
				'providing text alternatives for photographs, and hiding decorative images from screen readers',
				'labelling form fields visibly and announcing errors rather than signalling them by colour alone',
				'using semantic HTML — headings, landmarks, and lists — for better screen reader support',
				'respecting the operating system’s "reduce motion" setting'
			]
		},
		{
			h: 'Standards',
			p: [
				'We are working toward conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. This website is partially conformant — some content may not yet fully meet the standard. These guidelines explain how to make web content more accessible for people with disabilities, and are the benchmark most commonly referenced in relation to the Americans with Disabilities Act (ADA) and Section 508.'
			],
			li: []
		},
		{
			h: 'Feedback',
			p: [
				'We welcome your feedback on the accessibility of this website. If you encounter any accessibility barriers or have suggestions for improvement, please let us know — telling us what page you were on, what you were trying to do, and what technology you were using is usually enough for us to reproduce and fix it. We aim to respond within 2 business days:'
			],
			li: ['Phone or text: {{PHONE}}', 'Email: {{EMAIL}}']
		},
		{
			h: 'Technical Specifications',
			p: ['This website is designed to be compatible with the following assistive technologies:'],
			li: [
				'Screen readers (JAWS, NVDA, VoiceOver)',
				'Screen magnification software',
				'Speech recognition software',
				'Keyboard navigation'
			]
		},
		{
			h: 'Limitations and Alternatives',
			p: [
				'Despite our efforts to ensure accessibility, there may be some limitations. Inspection reports and other documents we send are produced outside this website and may not yet meet the same standard, and any third-party component added to the site in future may not be fully under our control.',
				'If you find an issue, please contact us and we will work to provide the information in an alternative format. You never have to use this website to reach us — call or text {{PHONE}} and we will take your inspection request that way.'
			],
			li: []
		},
		{
			h: 'Assessment and Testing',
			p: [
				'The accessibility of this website is evaluated through internal self-assessment. We review it periodically to identify and fix accessibility issues, including checks with assistive technologies where possible.',
				'The most recent review, in August 2026, checked colour contrast ratios across the site, keyboard operation of every interactive element, and the page structure exposed to screen readers. It has not been through a formal third-party audit.'
				// TODO: if the business commissions an independent audit, name the
				// auditor and the date here — it is the single strongest thing an
				// accessibility statement can say.
			],
			li: []
		}
	]
};

/** Slug → page content, so the route components stay one line each. */
export const LEGAL_PAGES = {
	privacy: PRIVACY,
	terms: TERMS,
	accessibility: ACCESSIBILITY
};
