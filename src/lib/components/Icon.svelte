<script>
	/**
	 * Single-colour line icons, drawn to match the flyer's badge glyphs
	 * (white strokes inside a solid blue circle). `currentColor` throughout so
	 * the caller controls the colour.
	 */
	let { name, size = 24, stroke = 1.7, ...rest } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	width={size}
	height={size}
	fill="none"
	stroke="currentColor"
	stroke-width={stroke}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
	{...rest}
>
	{#if name === 'droplet'}
		<path d="M12 2.8c3.4 3.9 5.6 6.9 5.6 9.7a5.6 5.6 0 0 1-11.2 0c0-2.8 2.2-5.8 5.6-9.7Z" />
	{:else if name === 'waves'}
		<path d="M2.5 8.4c1.6-1.3 3.2-1.3 4.8 0s3.2 1.3 4.8 0 3.2-1.3 4.8 0 3.2 1.3 4.8 0" />
		<path d="M2.5 13.2c1.6-1.3 3.2-1.3 4.8 0s3.2 1.3 4.8 0 3.2-1.3 4.8 0 3.2 1.3 4.8 0" />
		<path d="M2.5 18c1.6-1.3 3.2-1.3 4.8 0s3.2 1.3 4.8 0 3.2-1.3 4.8 0 3.2 1.3 4.8 0" />
	{:else if name === 'house'}
		<path d="M3.2 10.6 12 3.4l8.8 7.2" />
		<path d="M5.4 12.4v7.8a.9.9 0 0 0 .9.9h11.4a.9.9 0 0 0 .9-.9v-7.8" />
		<path d="M10 21.1v-5.2h4v5.2" />
	{:else if name === 'air'}
		<path d="M2.8 9.2h11.6a3 3 0 1 0-3-3" />
		<path d="M2.8 14.4h14.4a3 3 0 1 1-3 3" />
		<path d="M2.8 11.8h7.6" />
	{:else if name === 'microscope'}
		<path d="M7 20h11" />
		<path d="M9.4 20a5.6 5.6 0 0 0 5.6-5.6c0-1.6-.7-3.1-1.8-4.1" />
		<path d="m10.6 4.1 3.1 3.1a1.4 1.4 0 0 1 0 2l-1.6 1.6a1.4 1.4 0 0 1-2 0L7 7.7a1.4 1.4 0 0 1 0-2l1.6-1.6a1.4 1.4 0 0 1 2 0Z" />
		<path d="m6.6 11.4 2.6 2.6" />
	{:else if name === 'shield-check'}
		<path d="M12 2.6 4.6 5.6v5.6c0 4.6 3.1 8.9 7.4 10.2 4.3-1.3 7.4-5.6 7.4-10.2V5.6Z" />
		<path d="m8.9 11.8 2.2 2.2 4-4.2" />
	{:else if name === 'check-circle'}
		<circle cx="12" cy="12" r="9.2" />
		<path d="m8.2 12.2 2.6 2.6 5-5.4" />
	{:else if name === 'check'}
		<path d="m5 12.8 4.4 4.4L19 6.6" />
	{:else if name === 'phone'}
		<path
			d="M21.4 16.9v2.8a1.9 1.9 0 0 1-2.1 1.9 18.8 18.8 0 0 1-8.2-2.9 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.5 4.7 1.9 1.9 0 0 1 4.4 2.6h2.8a1.9 1.9 0 0 1 1.9 1.6c.1.9.3 1.8.7 2.7a1.9 1.9 0 0 1-.4 2L8.2 10.2a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.8.6 2.7.7a1.9 1.9 0 0 1 1.6 1.9Z"
		/>
	{:else if name === 'mail'}
		<rect x="2.6" y="4.6" width="18.8" height="14.8" rx="2.2" />
		<path d="m3.4 6.6 8.6 6 8.6-6" />
	{:else if name === 'pin'}
		<path d="M20.4 10.4c0 6.4-8.4 11.8-8.4 11.8s-8.4-5.4-8.4-11.8a8.4 8.4 0 0 1 16.8 0Z" />
		<circle cx="12" cy="10.2" r="2.9" />
	{:else if name === 'clock'}
		<circle cx="12" cy="12" r="9.2" />
		<path d="M12 6.8V12l3.4 2" />
	{:else if name === 'calendar'}
		<rect x="3.2" y="5" width="17.6" height="16.2" rx="2.2" />
		<path d="M3.2 10h17.6M8.2 2.8v4.2M15.8 2.8v4.2" />
	{:else if name === 'search'}
		<circle cx="10.8" cy="10.8" r="7.2" />
		<path d="m16.2 16.2 5 5" />
	{:else if name === 'file'}
		<path d="M13.6 2.8H7a2.2 2.2 0 0 0-2.2 2.2v14a2.2 2.2 0 0 0 2.2 2.2h10a2.2 2.2 0 0 0 2.2-2.2V8.4Z" />
		<path d="M13.6 2.8v5.6h5.6M8.6 13.4h6.8M8.6 17h4.6" />
	{:else if name === 'arrow-right'}
		<path d="M4.6 12h14.2M13 6.2 18.8 12 13 17.8" />
	{:else if name === 'chevron-down'}
		<path d="m6 9.4 6 6 6-6" />
	{:else if name === 'close'}
		<path d="M6 6l12 12M18 6 6 18" />
	{/if}
</svg>
