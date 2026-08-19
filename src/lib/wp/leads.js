/* =============================================================================
   Form submission, with a working path on every host this site runs on.

     WordPress  → POST /wp-json/xo/v1/lead  → saved under Leads + emailed to the
                  address set in X.O. Admin.
     Static     → POST to FORM_ENDPOINT if one is configured.
     Neither    → open the visitor's mail client, pre-filled (the original
                  behaviour; never leave someone with nothing).
   ============================================================================= */

import { restRoot, underWordPress } from './client.js';

/**
 * @typedef {{
 *   name: string, email: string, phone: string, property: string,
 *   reason: string, preferredDate: string, notes: string, company?: string
 * }} LeadPayload
 */

/** The message body used for the dashboard record and the mailto fallback. */
export function leadMessage(/** @type {LeadPayload} */ lead) {
	return [
		`Property: ${lead.property}`,
		`Reason: ${lead.reason}`,
		`Preferred date: ${lead.preferredDate}`,
		'',
		lead.notes || '(no additional notes)'
	].join('\n');
}

/**
 * Send a lead to WordPress.
 * @param {LeadPayload} lead
 * @returns {Promise<{ ok: boolean, message?: string }>}
 */
export async function submitToWordPress(lead) {
	const response = await fetch(`${restRoot()}xo/v1/lead`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: lead.name,
			email: lead.email,
			phone: lead.phone,
			message: leadMessage(lead),
			property: lead.property,
			reason: lead.reason,
			preferredDate: lead.preferredDate,
			notes: lead.notes,
			page: location.pathname,
			// Honeypot — only bots fill this in. The server returns success
			// either way so they get no signal from the difference.
			company: lead.company ?? ''
		})
	});
	const result = await response.json().catch(() => ({}));
	if (!response.ok || result?.success === false) {
		return { ok: false, message: result?.message || `Request failed (${response.status})` };
	}
	return { ok: true };
}

/** True when the WordPress lead endpoint is the right destination. */
export const wordPressAvailable = () => underWordPress();
