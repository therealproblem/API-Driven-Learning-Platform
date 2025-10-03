<script lang="ts">
	import VideoPlayer from '@/components/ui/video-player/video-player.svelte';
	import { onDestroy } from 'svelte';
	import UI from '../../../lib/stores/ui-store.js';
	import { Button } from '@/components/ui/button/index.js';
	import { IconBookmark, IconBookmarkFilled } from '@tabler/icons-svelte';
	import { toast } from 'svelte-sonner';
	// @ts-expect-error
	let player: YT.Player | null = $state(null);
	let { data } = $props();
	let lastKnownVideoTime = $state(data.lastWatched);
	let title = $state('');
	let creator = data.creatorName;
	let bookmarked = $state(data.bookmarked);

	const resumeProgress = () => {
		if (player === null) return;
		const resumeAtSeconds = data.lastWatched;
		lastKnownVideoTime = resumeAtSeconds;
		player.seekTo(resumeAtSeconds);
		title = player.videoTitle;
		UI.siteHeaderTitle.set(title);
	};

	const onReady = () => resumeProgress();

	const onChange = () => {};

	const onTick = async () => {
		lastKnownVideoTime = player?.playerInfo.mediaReferenceTime ?? 0;
		const formData = new FormData();
		formData.append('lastWatched', lastKnownVideoTime.toString());
		formData.append('id', data.id);
		await fetch('/progress?/update', {
			method: 'POST',
			body: formData
		});
	};

	onDestroy(function () {});

	const toggleBookmark = async () => {
		bookmarked = !bookmarked;
		let res: Response | null = null;
		const formData = new FormData();
		formData.append('bookmarked', bookmarked ? 'true' : 'false');
		formData.append('id', data.id);
		await fetch('/bookmarks?/update', {
			method: 'POST',
			body: formData
		});
		toast(`"${title}" ${bookmarked ? 'added to' : 'removed from'} bookmarks!`);
	};
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>
<div class="flex h-max w-full flex-row flex-wrap justify-evenly gap-2 p-5">
	<VideoPlayer bind:player id={data.id} {onReady} {onChange} {onTick} />
	<div class="align-center mt-2 flex w-full flex-row items-center justify-between">
		<p class="w-full">By: {creator}</p>
		<Button variant="outline" size="sm" onclick={toggleBookmark}>
			{#if bookmarked}
				<IconBookmarkFilled class="size-5 text-red-500" />
			{:else}
				<IconBookmark class="size-5" />
			{/if}
			Bookmark
		</Button>
	</div>
</div>
