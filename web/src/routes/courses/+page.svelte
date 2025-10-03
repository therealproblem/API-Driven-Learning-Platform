<script lang="ts">
	import CourseCard from '@/components/ui/course-card/course-card.svelte';
	import UI from '$lib/stores/ui-store.js';
	import type Course from '@/types/Course.js';
	import { onMount } from 'svelte';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Input } from '@/components/ui/input/index.js';
	import type { HttpClientRequest } from '@/types/API.js';
	import config from '../../config/config.js';
	UI.siteHeaderTitle.set('Courses');
	import HttpClient, { validators } from '@/utils/httpClient.js';

	const { data } = $props();

	let courses: Course[] = $state([]);

	let total = $state(0);
	const perPage = 12;
	let currentPage = $state(1);
	let searchTerm = $state('');

	const onPageChange = (page) => {
		if (currentPage == page) return;
		currentPage = page;
		getCourses();
	};

	const getCourses = async (event?) => {
		if (event) event.preventDefault();

		const req: HttpClientRequest = {
			url: `${config.api}/courses/list`,
			method: 'POST',
			validator: validators.courseListSchema,
			body: { searchTerm, page: currentPage, count: perPage }
		};

		const res = await HttpClient.send(req);
		const data = res.data;
		total = data.total ?? 0;
		courses = data.result ?? [];
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};

	onMount(() => {
		if (!data.loggedIn) (window as any).showLogin();
		else getCourses();
	});
</script>

<form class="flex flex-row flex-wrap justify-evenly gap-5 p-5" onsubmit={getCourses}>
	<Input
		id="searchTerm"
		type="text"
		name="searchTerm"
		placeholder="Search"
		bind:value={searchTerm}
	/>
</form>

<div class="flex flex-row flex-wrap justify-evenly gap-5 p-5">
	{#if total === 0}
		<div class="flex min-h-80 w-full flex-col items-center justify-center">
			Could not find what you are looking for :(
		</div>
	{:else}
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
	{/if}
</div>
