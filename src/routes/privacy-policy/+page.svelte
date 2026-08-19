<script>
	// Route folder, WordPress slug (scripts/build-wordpress-theme.mjs → THEME.pages)
	// and the footer href in LEGAL_LINKS all have to read `privacy-policy`.
	import LegalPage from '$lib/legal/LegalPage.svelte';
	import { PRIVACY } from '$lib/content.js';
</script>

<LegalPage page={PRIVACY} />
