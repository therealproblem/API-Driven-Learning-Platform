<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { id, player = $bindable(), onReady, onChange, onTick } = $props();

	player = null;
	let container: HTMLDivElement;
	const loadYouTubeAPI = () => {
		return new Promise<void>((resolve) => {
			// @ts-expect-error
			if (window.YT && window.YT.Player) {
				resolve();
				return;
			}
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			document.body.appendChild(tag);

			(window as any).onYouTubeIframeAPIReady = () => resolve();
		});
	};

	onMount(async () => {
		await loadYouTubeAPI();
		// @ts-expect-error
		player = new YT.Player(container, {
			videoId: id,
			playerVars: {
				playsinline: 1
			},
			events: {
				onReady: () => {
					setInterval(onTick, 1000);
					onReady();
				},
				onStateChange: () => onChange()
			}
		});
	});

	onDestroy(() => {
		if (player) {
			player.destroy();
			player = null;
		}
	});
</script>

<div
	id="player"
	bind:this={container}
	class="aspect-video !h-full max-h-[80vh] w-full max-w-[80vh]"
></div>
