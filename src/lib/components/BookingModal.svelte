<script>
	import { booking, closeBooking } from '$lib/booking.svelte.js';
	import { BRAND, CONTACT, FORM_ENDPOINT, REASONS } from '$lib/content.js';
	import Icon from './Icon.svelte';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let address = $state('');
	let reason = $state(REASONS[0]);
	let when = $state('');
	let notes = $state('');
	let errors = $state({});
	let sending = $state(false);
	let done = $state(false);
	let dialog = $state(null);

	const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate() {
		const e = {};
		if (!name.trim()) e.name = 'Please tell us your name.';
		if (!EMAIL.test(email.trim())) e.email = 'A valid email address is required.';
		if (!phone.trim()) e.phone = 'A phone number helps us confirm faster.';
		if (!address.trim()) e.address = 'Which property should we inspect?';
		errors = e;
		return Object.keys(e).length === 0;
	}

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
		const body = [
			`Name: ${d.name}`,
			`Email: ${d.email}`,
			`Phone: ${d.phone}`,
			`Property: ${d.property}`,
			`Reason: ${d.reason}`,
			`Preferred date: ${d.preferredDate}`,
			'',
			d.notes || '(no additional notes)'
		].join('\n');
		window.location.href =
			`mailto:${CONTACT.email}` +
			`?subject=${encodeURIComponent(`Inspection request — ${d.property}`)}` +
			`&body=${encodeURIComponent(body)}`;
	}

	async function submit(ev) {
		ev.preventDefault();
		if (!validate()) return;
		sending = true;
		if (FORM_ENDPOINT) {
			try {
				await fetch(FORM_ENDPOINT, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
					body: JSON.stringify(payload())
				});
			} catch {
				// Network failure shouldn't strand the visitor — hand them the email route.
				mailtoFallback();
			}
		} else {
			mailtoFallback();
		}
		sending = false;
		done = true;
	}

	function close() {
		closeBooking();
		setTimeout(() => {
			done = false;
			errors = {};
			name = email = phone = address = notes = when = '';
			reason = REASONS[0];
		}, 260);
	}

	// Focus the panel when it opens so keyboard and screen-reader users land inside it.
	$effect(() => {
		if (booking.open && dialog) dialog.focus();
	});
</script>

<svelte:window onkeydown={(e) => booking.open && e.key === 'Escape' && close()} />

{#if booking.open}
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
					<div class="bk-done">
						<span class="bk-check"><Icon name="check" size={26} stroke={2.4} /></span>
						<h2 id="bk-heading" class="bk-title">Request sent</h2>
						<p class="bk-sub">
							Thanks{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''} — we have your details for
							{address.trim() || 'your property'} and will be in touch to confirm a time.
						</p>
						{#if !FORM_ENDPOINT}
							<p class="bk-note">
								Your email client should have opened with the request ready to send. If it didn't,
								call or text <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> instead.
							</p>
						{/if}
						<button class="bk-btn bk-btn-primary" onclick={close}>Done</button>
					</div>
				{:else}
					<p class="bk-eyebrow">Schedule</p>
					<h2 id="bk-heading" class="bk-title">Book an Inspection</h2>
					<p class="bk-sub">
						Tell us about the property and we'll get back to you to confirm a time. Prefer to talk?
						Call or text <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.
					</p>

					<form onsubmit={submit} novalidate>
						<div class="bk-grid">
							<div class="bk-field" class:invalid={errors.name}>
								<label for="bk-name">Your name</label>
								<input id="bk-name" bind:value={name} autocomplete="name" />
								<span class="bk-err">{errors.name ?? ''}</span>
							</div>
							<div class="bk-field" class:invalid={errors.phone}>
								<label for="bk-phone">Phone</label>
								<input id="bk-phone" type="tel" bind:value={phone} autocomplete="tel" />
								<span class="bk-err">{errors.phone ?? ''}</span>
							</div>
							<div class="bk-field full" class:invalid={errors.email}>
								<label for="bk-email">Email</label>
								<input id="bk-email" type="email" bind:value={email} autocomplete="email" />
								<span class="bk-err">{errors.email ?? ''}</span>
							</div>
							<div class="bk-field full" class:invalid={errors.address}>
								<label for="bk-address">Property address</label>
								<input id="bk-address" bind:value={address} autocomplete="street-address" />
								<span class="bk-err">{errors.address ?? ''}</span>
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

						<button type="submit" class="bk-btn bk-btn-primary bk-submit" disabled={sending}>
							{sending ? 'Sending…' : 'Request My Inspection'}
						</button>
						<p class="bk-note">
							{BRAND} will only use these details to respond to your request.
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
		width: 38px;
		height: 38px;
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
		color: #7b8798;
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
	.bk-field.invalid input,
	.bk-field.invalid select {
		border-color: #c0392b;
		background: #fdf5f4;
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
		color: #7b8798;
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
