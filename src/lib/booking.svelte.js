// Shared state for the "Schedule an Inspection" modal, opened by any booking CTA.

export const booking = $state({ open: false });

export function openBooking() {
	booking.open = true;
}

export function closeBooking() {
	booking.open = false;
}
