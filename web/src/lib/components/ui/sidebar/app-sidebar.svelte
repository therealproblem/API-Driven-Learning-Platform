<script lang="ts">
	import * as Sidebar from './index.js';
	import SidebarProfile from './sidebar-profile.svelte';
	import SidebarDarkMode from './sidebar-dark-mode.svelte';
	import Book from '@tabler/icons-svelte/icons/book';
	import { page } from '$app/state';

	const path = $derived(page.url.pathname);
	let activeCSS =
		'min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground';
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem class="flex flex-row items-center justify-between">
				<a href="/" class="mx-5 my-5 flex flex-row items-center">
					<Book class="!size-7" />
					<span class="ml-2 text-lg font-semibold">LXP</span>
				</a>
				<SidebarDarkMode />
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group class="flex flex-col gap-2">
			<Sidebar.Menu>
				<Sidebar.MenuItem class="mx-5 flex items-center gap-2">
					<Sidebar.MenuButton class={path === '/' ? activeCSS : ''}>
						<a href="/">Courses</a>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
				<Sidebar.MenuItem class="mx-5 flex items-center gap-2">
					<Sidebar.MenuButton class={path === '/bookmarks' ? activeCSS : ''}>
						<a href="/bookmarks">Bookmark</a>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<SidebarProfile />
	</Sidebar.Footer>
</Sidebar.Root>
