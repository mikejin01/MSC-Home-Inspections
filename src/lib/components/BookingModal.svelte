<script>
	import { booking, closeBooking } from '$lib/booking.svelte.js';
	import { BRAND, CONTACT, FORM_ENDPOINT, REASONS } from '$lib/content.js';
	import { telHref } from '$lib/wp/client.js';
	import { leadMessage, submitToWordPress, wordPressAvailable } from '$lib/wp/leads.js';
	import { wpEdit } from '$lib/wp/wpEdit.svelte.js';
	import Icon from './Icon.svelte';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let address = $state('');
	let reason = $state(REASONS[0]);
	let when = $state('');
	let notes = $state('');
	/** Honeypot. Real people never see this field, so anything in it is a bot. */
	let company = $state('');
	let errors = $state({});
	let sending = $state(false);
	let done = $state(false);
	let dialog = $state(null);
	/** The element that opened the dialog, so focus can go back to it. */
	let opener = null;
	/** Bumped on every failed submit so the alert re-announces each time. */
	let attempts = $state(0);
	/** 'wordpress' | 'endpoint' | 'mailto' — drives what the confirmation says. */
	let deliveredBy = $state('');

	/* Business details come from the content layer, so X.O. Admin drives them
	   on WordPress and src/lib/content.js everywhere else. */
	const brand = $derived(wpEdit.text('global_business_name', BRAND));
	const bizPhone = $derived(wpEdit.text('global_contact_phone', CONTACT.phone));
	const bizPhoneHref = $derived(telHref(bizPhone));
	const bizEmail = $derived(wpEdit.text('global_contact_email', CONTACT.email));

	const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	/** Field order, so "the first problem" means the first one on screen. */
	const FIELD_ORDER = ['name', 'phone', 'email', 'address'];

	function validate() {
		const e = {};
		if (!name.trim()) e.name = 'Please tell us your name.';
		if (!EMAIL.test(email.trim())) e.email = 'A valid email address is required.';
		if (!phone.trim()) e.phone = 'A phone number helps us confirm faster.';
		if (!address.trim()) e.address = 'Which property should we inspect?';
		errors = e;
		return Object.keys(e).length === 0;
	}

	/**
	 * Error Identification (WCAG 3.3.1) needs the problem announced, not just
	 * shown: the summary is a live region, and focus lands on the first field
	 * that needs fixing so its label and message are read straight away.
	 */
	function reportErrors() {
		attempts += 1;
		const first = FIELD_ORDER.find((f) => errors[f]);
		if (first) queueMicrotask(() => document.getElementById(`bk-${first}`)?.focus());
	}

	const errorCount = $derived(Object.keys(errors).length);

	function payload() {
		return {
			name: name.trim(),
			email: email.trim(),
			phone: phone.trim(),
			property: address.trim(),
			reason,
			preferredDate: when || 'No preference given',
			notes: notes.trim()
		};
	}

	/** No-backend fallback: open a pre-filled email to the business. */
	function mailtoFallback() {
		const d = payload();
		const body = [`Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`, '', leadMessage(d)].join(
			'\n'
		);
		window.location.href =
			`mailto:${bizEmail}` +
			`?subject=${encodeURIComponent(`Inspection request — ${d.property}`)}` +
			`&body=${encodeURIComponent(body)}`;
	}

	/**
	 * Where a submission goes, in order of preference:
	 *   WordPress   → /wp-json/xo/v1/lead: saved under Leads, emailed to the
	 *                 address in X.O. Admin.
	 *   FORM_ENDPOINT → a form service, for the static build.
	 *   neither     → the visitor's mail client, pre-filled.
	 * Any failure falls through to the next option rather than stranding someone
	 * who has just typed out their details.
	 */
	async function submit(ev) {
		ev.preventDefault();
		if (!validate()) {
			reportErrors();
			return;
		}
		sending = true;
		deliveredBy = '';

		try {
			if (wordPressAvailable()) {
				const result = await submitToWordPress({ ...payload(), company });
				if (!result.ok) throw new Error(result.message);
				deliveredBy = 'wordpress';
			} else if (FORM_ENDPOINT) {
				const response = await fetch(FORM_ENDPOINT, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
					body: JSON.stringify(payload())
				});
				if (!response.ok) throw new Error('Form endpoint rejected the request.');
				deliveredBy = 'endpoint';
			} else {
				mailtoFallback();
				deliveredBy = 'mailto';
			}
		} catch {
			mailtoFallback();
			deliveredBy = 'mailto';
		}

		sending = false;
		done = true;
	}

	function close() {
		closeBooking();
		// Return focus to whatever opened the dialog (WCAG 2.4.3). The stored
		// element can be gone if the page re-rendered, hence the guard.
		if (opener && document.contains(opener)) opener.focus();
		opener = null;
		setTimeout(() => {
			done = false;
			errors = {};
			name = email = phone = address = notes = when = company = '';
			deliveredBy = '';
			reason = REASONS[0];
		}, 260);
	}

	// Focus the panel when it opens so keyboard and screen-reader users land inside it.
	$effect(() => {
		if (!booking.open || !dialog) return;
		opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		dialog.focus();
	});

	// A modal dialog owns the page while it is open: the document behind it must
	// not scroll, and Tab must not walk out into it (WCAG 2.4.3).
	$effect(() => {
		if (!booking.open) return;
		const { body } = document;
		const previous = body.style.overflow;
		body.style.overflow = 'hidden';
		return () => {
			body.style.overflow = previous;
		};
	});

	const FOCUSABLE =
		'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

	/** Wrap Tab and Shift+Tab around the dialog's own controls. */
	function trapFocus(/** @type {KeyboardEvent} */ event) {
		if (event.key !== 'Tab' || !dialog) return;
		const items = [...dialog.querySelectorAll(FOCUSABLE)].filter(
			(el) => el.offsetParent !== null || el === document.activeElement
		);
		if (!items.length) return;
		const first = items[0];
		const last = items[items.length - 1];
		const active = document.activeElement;

		if (event.shiftKey && (active === first || active === dialog)) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && active === last) {
			event.preventDefault();
			first.focus();
		}
	}

	/** @param {KeyboardEvent} event */
	function onKeydown(event) {
		if (!booking.open) return;
		if (event.key === 'Escape') close();
		else trapFocus(event);
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if booking.open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- The backdrop is a pointer convenience, not a control: keyboard users
	     dismiss with Escape (handled on window) or the labelled close button,
	     so it stays out of the accessibility tree rather than posing as one. -->
	<div class="bk-backdrop" onclick={close} role="presentation">
		<div
			class="bk-panel"
			role="dialog"
			aria-modal="true"
			aria-labelledby="bk-heading"
			tabindex="-1"
			bind:this={dialog}
			onclick={(e) => e.stopPropagation()}
		>
			<button class="bk-x" onclick={close} aria-label="Close">
				<Icon name="close" size={20} />
			</button>

			<div class="bk-inner">
				{#if done}
					<div class="bk-done" role="status" aria-live="polite">
						<span class="bk-check"><Icon name="check" size={26} stroke={2.4} /></span>
						<h2 id="bk-heading" class="bk-title">Request sent</h2>
						<p class="bk-sub">
							Thanks{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''} — we have your details for
							{address.trim() || 'your property'} and will be in touch to confirm a time.
						</p>
						{#if deliveredBy === 'mailto'}
							<p class="bk-note">
								Your email client should have opened with the request ready to send. If it didn't,
								call or text <a href={bizPhoneHref}>{bizPhone}</a> instead.
							</p>
						{/if}
						<button class="bk-btn bk-btn-primary" onclick={close}>Done</button>
					</div>
				{:else}
					<p class="bk-eyebrow">Schedule</p>
					<h2 id="bk-heading" class="bk-title">Book an Inspection</h2>
					<p class="bk-sub">
						Tell us about the property and we'll get back to you to confirm a time. Prefer to talk?
						Call or text <a href={bizPhoneHref}>{bizPhone}</a>.
					</p>

					<!-- Live region for the validation summary. It stays in the DOM so
					     assistive tech is already watching it when it fills. -->
					<div class="bk-summary-live" role="alert">
						{#if errorCount}
							{#key attempts}
								<p class="bk-summary">
									{errorCount === 1
										? 'One detail needs fixing before we can send this.'
										: `${errorCount} details need fixing before we can send this.`}
								</p>
							{/key}
						{/if}
					</div>

					<form onsubmit={submit} novalidate aria-busy={sending}>
						<div class="bk-grid">
							<div class="bk-field" class:invalid={errors.name}>
								<label for="bk-name">Your name</label>
								<input
									id="bk-name"
									bind:value={name}
									autocomplete="name"
									required
									aria-required="true"
									aria-invalid={errors.name ? 'true' : undefined}
									aria-describedby={errors.name ? 'bk-name-err' : undefined}
								/>
								<span class="bk-err" id="bk-name-err">{errors.name ?? ''}</span>
							</div>
							<div class="bk-field" class:invalid={errors.phone}>
								<label for="bk-phone">Phone</label>
								<input
									id="bk-phone"
									type="tel"
									bind:value={phone}
									autocomplete="tel"
									required
									aria-required="true"
									aria-invalid={errors.phone ? 'true' : undefined}
									aria-describedby={errors.phone ? 'bk-phone-err' : undefined}
								/>
								<span class="bk-err" id="bk-phone-err">{errors.phone ?? ''}</span>
							</div>
							<div class="bk-field full" class:invalid={errors.email}>
								<label for="bk-email">Email</label>
								<input
									id="bk-email"
									type="email"
									bind:value={email}
									autocomplete="email"
									required
									aria-required="true"
									aria-invalid={errors.email ? 'true' : undefined}
									aria-describedby={errors.email ? 'bk-email-err' : undefined}
								/>
								<span class="bk-err" id="bk-email-err">{errors.email ?? ''}</span>
							</div>
							<div class="bk-field full" class:invalid={errors.address}>
								<label for="bk-address">Property address</label>
								<input
									id="bk-address"
									bind:value={address}
									autocomplete="street-address"
									required
									aria-required="true"
									aria-invalid={errors.address ? 'true' : undefined}
									aria-describedby={errors.address ? 'bk-address-err' : undefined}
								/>
								<span class="bk-err" id="bk-address-err">{errors.address ?? ''}</span>
							</div>
							<div class="bk-field">
								<label for="bk-reason">What's prompting the inspection?</label>
								<select id="bk-reason" bind:value={reason}>
									{#each REASONS as r}
										<option value={r}>{r}</option>
									{/each}
								</select>
								<span class="bk-err"></span>
							</div>
							<div class="bk-field">
								<label for="bk-when">Preferred date <span class="bk-opt">(optional)</span></label>
								<input id="bk-when" type="date" bind:value={when} />
								<span class="bk-err"></span>
							</div>
							<div class="bk-field full">
								<label for="bk-notes">Anything we should know? <span class="bk-opt">(optional)</span></label>
								<textarea
									id="bk-notes"
									bind:value={notes}
									placeholder="A damp smell in the basement, a stain on the ceiling, an inspection deadline…"
								></textarea>
							</div>
						</div>

						<!-- Honeypot: off-screen, out of the tab order, hidden from screen
						     readers. Only bots fill it in; the server accepts and discards
						     those submissions so they get no signal from the difference. -->
						<div class="bk-hp" aria-hidden="true">
							<label for="bk-company">Company</label>
							<input id="bk-company" bind:value={company} tabindex="-1" autocomplete="off" />
						</div>

						<button type="submit" class="bk-btn bk-btn-primary bk-submit" disabled={sending}>
							{sending ? 'Sending…' : 'Request My Inspection'}
						</button>
						<p class="bk-note">
							{brand} will only use these details to respond to your request.
						</p>
					</form>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.bk-backdrop {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		place-items: center;
		padding: clamp(12px, 4vw, 32px);
		background: rgba(8, 18, 30, 0.62);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		animation: bk-fade 0.22s ease;
		overflow-y: auto;
	}
	@keyframes bk-fade {
		from {
			opacity: 0;
		}
	}
	.bk-panel {
		position: relative;
		width: min(100%, 620px);
		max-height: 92vh;
		overflow-y: auto;
		background: #fff;
		border-radius: 24px;
		box-shadow: 0 40px 90px -30px rgba(8, 18, 30, 0.6);
		animation: bk-rise 0.28s cubic-bezier(0.22, 0.61, 0.36, 1);
	}
	.bk-panel:focus {
		outline: none;
	}
	@keyframes bk-rise {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.985);
		}
	}
	.bk-x {
		position: absolute;
		top: 14px;
		right: 14px;
		z-index: 2;
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		color: #4a5765;
		transition:
			background-color 0.2s,
			color 0.2s;
	}
	.bk-x:hover {
		background: #eff2f7;
		color: #0b1622;
	}
	.bk-inner {
		padding: clamp(28px, 4vw, 40px);
	}

	.bk-eyebrow {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #1c6fc9;
		margin-bottom: 8px;
	}
	.bk-title {
		font-family: 'Oswald', 'Open Sans', sans-serif;
		font-size: clamp(26px, 3.4vw, 34px);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.005em;
		line-height: 1.08;
		color: #0e2135;
	}
	.bk-sub {
		font-size: 14.5px;
		line-height: 1.6;
		color: #4a5765;
		margin-top: 10px;
		max-width: 46ch;
	}
	.bk-sub a {
		color: #1c6fc9;
		font-weight: 600;
	}
	.bk-sub a:hover {
		text-decoration: underline;
	}

	.bk-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4px 16px;
		margin: 24px 0 4px;
	}
	.bk-field.full {
		grid-column: 1 / -1;
	}
	.bk-field label {
		display: block;
		font-size: 12.5px;
		font-weight: 600;
		color: #0e2135;
		margin-bottom: 6px;
	}
	.bk-opt {
		font-weight: 400;
		/* was #7b8798 — 3.65:1 on white, short of the 4.5:1 body text needs */
		color: #626e80;
	}
	.bk-field input,
	.bk-field select,
	.bk-field textarea {
		width: 100%;
		padding: 11px 14px;
		border: 1px solid rgba(14, 33, 53, 0.16);
		border-radius: 12px;
		background: #f8fafc;
		font-size: 15px;
		color: #0b1622;
		transition:
			border-color 0.18s,
			background-color 0.18s,
			box-shadow 0.18s;
	}
	.bk-field textarea {
		min-height: 92px;
		resize: vertical;
	}
	.bk-field input:focus,
	.bk-field select:focus,
	.bk-field textarea:focus {
		outline: none;
		background: #fff;
		border-color: #1c6fc9;
		box-shadow: 0 0 0 3px rgba(28, 111, 201, 0.16);
	}
	.bk-field.invalid input {
		border-color: #c0392b;
		background: #fdf5f4;
	}
	.bk-hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.bk-summary-live:empty {
		display: none;
	}
	.bk-summary {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 18px;
		padding: 11px 14px;
		border: 1px solid rgba(192, 57, 43, 0.35);
		border-left: 3px solid #c0392b;
		border-radius: 12px;
		background: #fdf5f4;
		font-size: 13px;
		font-weight: 600;
		color: #96271b;
	}

	.bk-err {
		display: block;
		min-height: 17px;
		font-size: 11.5px;
		font-weight: 600;
		color: #c0392b;
		padding: 2px 2px 0;
	}

	.bk-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
		font-family: 'Oswald', 'Open Sans', sans-serif;
		font-size: 15px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 13px 26px;
		border-radius: 999px;
		transition:
			background-color 0.2s,
			transform 0.2s,
			opacity 0.2s;
	}
	.bk-btn:active {
		transform: scale(0.985);
	}
	.bk-btn-primary {
		background: #1c6fc9;
		color: #fff;
	}
	.bk-btn-primary:hover {
		background: #15558f;
	}
	.bk-btn[disabled] {
		opacity: 0.6;
		cursor: progress;
	}
	.bk-submit {
		width: 100%;
		margin-top: 14px;
	}
	.bk-note {
		font-size: 12px;
		line-height: 1.5;
		color: #626e80;
		margin-top: 14px;
		text-align: center;
	}
	.bk-note a {
		color: #1c6fc9;
		font-weight: 600;
	}

	.bk-done {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 14px;
		padding: 12px 0;
	}
	.bk-done .bk-sub {
		margin-top: 0;
	}
	.bk-check {
		width: 58px;
		height: 58px;
		display: grid;
		place-items: center;
		border-radius: 50%;
		background: rgba(28, 111, 201, 0.12);
		color: #1c6fc9;
	}
	.bk-done .bk-btn {
		margin-top: 6px;
	}

	@media (max-width: 520px) {
		.bk-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
