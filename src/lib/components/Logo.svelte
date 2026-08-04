<script>
	/**
	 * Horizontal logo lockup.
	 *
	 * The flyer's logo is a stacked lockup — roof mark over "MSC" over
	 * "HOME INSPECTIONS" over "LLC" — which goes illegible in a site header:
	 * at 44px tall the two lower lines are unreadable. So the header uses the
	 * roof mark beside a typeset wordmark (Montserrat, the closest free match
	 * to the flyer's heavy geometric sans), and the footer, which has room,
	 * uses the real stacked lockup image.
	 *
	 * TODO: swap in the original vector logo once the client provides it —
	 * `mark-msc*.png` here is extracted from the flyer JPEG.
	 */
	import { LOGO, BRAND_LEGAL } from '$lib/content.js';

	let { light = false, size = 'md' } = $props();
</script>

<span class="lk lk-{size}" class:light>
	<img class="lk-mark" src={light ? LOGO.markLight : LOGO.mark} alt="" width="270" height="120" />
	<!-- the wordmark is decorative here; the accessible name comes from .lk-sr -->
	<span class="lk-text" aria-hidden="true">
		<span class="lk-name">MSC</span>
		<span class="lk-sub">Home Inspections</span>
	</span>
	<span class="lk-sr">{BRAND_LEGAL}</span>
</span>

<style>
	.lk {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}
	.lk-mark {
		height: 32px;
		width: auto;
		flex: none;
	}
	.lk-text {
		display: flex;
		flex-direction: column;
		line-height: 1;
	}
	.lk-name {
		font-family: 'Montserrat', system-ui, sans-serif;
		font-size: 23px;
		font-weight: 800;
		letter-spacing: -0.005em;
		color: #0b1622;
	}
	.lk-sub {
		font-family: 'Montserrat', system-ui, sans-serif;
		font-size: 8.5px;
		font-weight: 600;
		letter-spacing: 0.21em;
		text-transform: uppercase;
		color: #4a5765;
		margin-top: 4px;
	}
	.lk.light .lk-name {
		color: #fff;
	}
	.lk.light .lk-sub {
		color: rgba(255, 255, 255, 0.72);
	}

	.lk-lg .lk-mark {
		height: 46px;
	}
	.lk-lg .lk-name {
		font-size: 33px;
	}
	.lk-lg .lk-sub {
		font-size: 11.5px;
		letter-spacing: 0.235em;
		margin-top: 5px;
	}

	/* accessible name for the lockup, since the mark is decorative */
	.lk-sr {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 900px) {
		.lk-md .lk-mark {
			height: 28px;
		}
		.lk-md .lk-name {
			font-size: 20px;
		}
		.lk-md .lk-sub {
			font-size: 7.5px;
		}
	}
</style>
