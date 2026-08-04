// Svelte actions used across components.

/**
 * Reveal-on-scroll: fades/translates an element into view once.
 * Falls back to visible immediately if IntersectionObserver is unavailable.
 * @param {HTMLElement} node
 */
export function reveal(node) {
	node.classList.add('reveal');
	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('in');
		return;
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
}

/**
 * Adds `.scrolled` to the node once the window scrolls past `offset`px.
 * @param {HTMLElement} node
 * @param {number} offset
 */
export function scrolled(node, offset = 40) {
	const update = () => node.classList.toggle('scrolled', window.scrollY > offset);
	update();
	window.addEventListener('scroll', update, { passive: true });
	return {
		destroy() {
			window.removeEventListener('scroll', update);
		}
	};
}
