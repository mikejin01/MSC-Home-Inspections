<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import BookingModal from '$lib/components/BookingModal.svelte';
	import EditToolbar from '$lib/inline-edit/EditToolbar.svelte';
	import { wpEdit } from '$lib/wp/wpEdit.svelte.js';
	import { BRAND_LEGAL, CONTACT } from '$lib/content.js';

	let { children } = $props();

	// Code defaults for the site-wide keys. These back the {{TOKEN}} resolver
	// until (and unless) WordPress supplies its own values from X.O. Admin.
	// Registered here in the script body, not onMount, so tokens also resolve
	// while the static build is being prerendered.
	wpEdit.setGlobals({
		global_business_name: BRAND_LEGAL,
		global_contact_phone: CONTACT.phone,
		global_contact_email: CONTACT.email,
		global_service_area: CONTACT.serviceArea,
		global_city_state: CONTACT.serviceAreaShort
	});

	onMount(() => wpEdit.init());
</script>

{@render children()}

<BookingModal />

{#if wpEdit.isLoggedIn}
	<EditToolbar />
{/if}
