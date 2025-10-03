<script lang="ts">
	import CourseCard from '@/components/ui/course-card/course-card.svelte';
	import UI from '../../lib/stores/ui-store.js';
	import type Course from '@/types/Course.js';
	import { onMount } from 'svelte';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	UI.siteHeaderTitle.set('Bookmarks');

	let courses: Course[] = $state([]);

	let total = $state(0);
	const perPage = 12;
	let currentPage = $state(1);

	const onPageChange = (page) => {
		if (currentPage == page) return;
		currentPage = page;
		getCourses();
	};

	const getCourses = async () => {
		const formData = new FormData();
		formData.append('page', currentPage.toString());
		formData.append('count', perPage.toString());
		const res = await fetch('/bookmarks?/list', {
			method: 'POST',
			body: formData
		});

		let data = await res.json();
		if (data.type !== 'success') return;

		data = JSON.parse(JSON.parse(data.data)[0]);
		total = data.total;
		courses = data.courses;
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};

	onMount(() => getCourses());
</script>

<div class="flex flex-row flex-wrap justify-evenly gap-5 p-5">
	{#each courses as course (course.id)}
		<CourseCard {...course} />
	{/each}
	<Pagination.Root count={total} {perPage} {onPageChange}>
		{#snippet children({ pages, currentPage })}
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link {page} isActive={currentPage === page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		{/snippet}
	</Pagination.Root>
</div>
