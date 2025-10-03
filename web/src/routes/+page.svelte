<script>
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import Book from '@tabler/icons-svelte/icons/book';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<div class="flex flex-row">
		<Book class="!size-38" />
		<span class="ml-2 text-[100px] font-semibold">LXP</span>
	</div>
	<p>Leading learning platform, with tons of amazing resources!</p>
	<Button class="mt-10" onclick={() => goto('/courses')} variant="default">Explore Courses!</Button>
</div>
