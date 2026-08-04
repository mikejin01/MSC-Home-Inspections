<script>
	import '../app.css';
	import BookingModal from '$lib/components/BookingModal.svelte';

	let { children } = $props();
</script>

{@render children()}

<BookingModal />
