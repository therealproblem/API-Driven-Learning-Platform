<script lang="ts">
	import * as Card from '@/components/ui/card/index.js';
	import Progress from '@/components/ui/progress/progress.svelte';
	import { IconBookmarkFilled } from '@tabler/icons-svelte/icons';

	let { id, bookmarked, pctComplete, title, creator } = $props();

	const thumbnailURL = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
</script>

<a href={id ? `/courses/${id}` : '#'} data-sveltekit-preload-data="tap">
	<Card.Root
		class="relative aspect-square w-80 cursor-pointer justify-between gap-2 overflow-hidden p-0"
	>
		<div class="absolute -top-3 right-0 cursor-pointer">
			{#if bookmarked}
				<IconBookmarkFilled class="size-10 text-red-500" />
			{/if}
		</div>
		<Card.Header class="p-0">
			<img src={thumbnailURL} alt={title} />
		</Card.Header>
		<Card.Content class="my-0 px-5">
			<Card.Title class="line-clamp-2 text-ellipsis">{title}</Card.Title>
			<Card.Description>{creator}</Card.Description>
		</Card.Content>
		<Card.Footer class="mb-2 flex flex-col items-start px-5">
			<Progress value={pctComplete} />
			<p class="mt-1 w-full text-sm">{pctComplete}% complete</p>
		</Card.Footer>
	</Card.Root>
</a>
