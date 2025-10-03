<script lang="ts">
	import '../app.css';
	import favicon from '@/assets/favicon.svg';

	import { SiteHeader } from '@/components/ui/site-header/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import * as Sidebar from '@/components/ui/sidebar/index.js';
	import AppSidebar from '@/components/ui/sidebar/app-sidebar.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<ModeWatcher />
<Toaster />

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>LXP</title>
</svelte:head>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	{#if page.route.id !== '/'}
		<AppSidebar />
		<Sidebar.Inset>
			<SiteHeader />
			{@render children?.()}
		</Sidebar.Inset>
	{:else}
		{@render children?.()}
	{/if}
</Sidebar.Provider>
