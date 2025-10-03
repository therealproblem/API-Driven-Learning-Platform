<script lang="ts">
	import * as Avatar from '@/components/ui/avatar/index.js';
	import * as DropdownMenu from '@/components/ui/dropdown-menu/index.js';
	import * as Sidebar from './index.js';
	import { LoginForm } from '@/components/ui/login-form/index.js';

	import Profile from '@/stores/user-store';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let alias = $state(get(Profile.alias));
	let name = $state(get(Profile.name));
	let email = $state(get(Profile.email));

	Profile.alias.subscribe((value) => (alias = value));
	Profile.name.subscribe((value) => (name = value));
	Profile.email.subscribe((value) => (email = value));

	let showLogin = $state(true);
	let isLogin = $state(true);

	const logout = () => {
		fetch('/user?/logout', { method: 'POST', body: '' });
		Profile.alias.set('P');
		Profile.email.set('');
		Profile.name.set('');
		goto('/');
	};

	onMount(() => {
		(window as any).showLogin = () => {
			showLogin = true;
			Profile.alias.set('P');
			Profile.email.set('');
			Profile.name.set('');
		};
	});
</script>

{#if showLogin}
	<LoginForm onclose={() => (showLogin = false)} {isLogin} />
{/if}
<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
					<Avatar.Root class="size-8 rounded-lg">
						<Avatar.Fallback>{alias}</Avatar.Fallback>
					</Avatar.Root>
					<div class="grid flex-1 text-left text-sm leading-tight">
						<span class="truncate font-medium">{name ?? 'Create Account'}</span>
						<span class="truncate text-xs text-muted-foreground">
							{email ?? 'Get started!'}
						</span>
					</div>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="start">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Group>
					<DropdownMenu.Item>Profile</DropdownMenu.Item>
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				{#if email !== ''}
					<DropdownMenu.Item class="text-red-500" onclick={() => logout()}
						>Log out</DropdownMenu.Item
					>
				{:else}
					<DropdownMenu.Item
						onclick={() => {
							showLogin = true;
							isLogin = true;
						}}>Log In</DropdownMenu.Item
					>
					<DropdownMenu.Item
						onclick={() => {
							showLogin = true;
							isLogin = false;
						}}>Sign Up</DropdownMenu.Item
					>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
