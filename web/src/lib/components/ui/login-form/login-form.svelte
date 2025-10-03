<script lang="ts">
	import Book from '@tabler/icons-svelte/icons/book';
	import Close from '@tabler/icons-svelte/icons/x';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Button } from '@/components/ui/button/index.js';
	import * as Card from '@/components/ui/card/index.js';
	import { Label } from '@/components/ui/label/index.js';
	import { Input } from '@/components/ui/input/index.js';
	import { cn } from '@/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { enhance } from '$app/forms';
	import Profile from '@/stores/user-store';

	let {
		class: className,
		onclose,
		isLogin,
		...restProps
	} = $props<HTMLAttributes<HTMLDivElement> & { onclose: () => void; isLogin: boolean }>();

	let formError = $state('');
</script>

<div
	class="absolute top-0 left-0 z-1000 flex min-h-svh min-w-svw flex-col items-center justify-center gap-6 bg-black/80 p-6 md:p-10"
>
	<Button variant="ghost" onclick={onclose} class="absolute top-20 right-20 z-1001 cursor-pointer">
		<Close class="size-10" />
	</Button>
	<div class="flex w-full max-w-sm flex-col gap-6">
		<div class="flex items-center gap-2 self-center text-3xl font-medium">
			<div class="flex size-10 items-center justify-center">
				<Book class="size-10" />
			</div>
			LXP
		</div>
		<div class={cn('flex flex-col gap-6', className)} {...restProps}>
			<Card.Root>
				<Card.Header class="text-center">
					<Card.Title class="text-xl">Welcome back!</Card.Title>
				</Card.Header>
				<Card.Content>
					{#if formError !== ''}
						<Alert.Root variant="destructive" class="mb-5">
							<Alert.Description>{formError}</Alert.Description>
						</Alert.Root>
					{/if}
					<form
						method="post"
						action={isLogin ? '/user?/login' : '/user?/register'}
						use:enhance={() => {
							return async ({ result }) => {
								switch (result.type) {
									case 'failure':
										formError = String(result.data?.message ?? '');
										break;
									case 'success':
										Profile.alias.set(String(result.data?.alias ?? 'P'));
										Profile.name.set(String(result.data?.name ?? ''));
										Profile.email.set(String(result.data?.email ?? ''));
										break;
								}

								onclose();
							};
						}}
					>
						<div class="grid gap-6">
							<div class="grid gap-6">
								{#if !isLogin}
									<div class="grid gap-3">
										<Label for="name">Name</Label>
										<Input id="name" type="name" name="name" placeholder="John Doe" required />
									</div>
								{/if}
								<div class="grid gap-3">
									<Label for="email">Email</Label>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="john-doe@example.com"
										required
									/>
								</div>
								<div class="grid gap-3">
									<div class="flex items-center">
										<Label for="password">Password</Label>
										{#if isLogin}
											<a href="##" class="ml-auto text-sm underline-offset-4 hover:underline">
												Forgot your password?
											</a>
										{/if}
									</div>
									<Input
										id="password"
										type="password"
										name="password"
										placeholder="********"
										required
									/>
								</div>
								{#if !isLogin}
									<div class="grid gap-3">
										<Label for="passsword-confirm">Retype Password</Label>
										<Input
											id="password-confirm"
											type="password"
											name="confirmPassword"
											placeholder="********"
											required
										/>
									</div>
								{/if}
								<Button type="submit" class="w-full">{isLogin ? 'Login' : 'Register'}</Button>
							</div>
							<div class="text-center text-sm">
								{#if isLogin}
									Don&apos;t have an account?
								{:else}
									Already have an account?
								{/if}
								<a
									href="##"
									class="underline underline-offset-4"
									onclick={() => (isLogin = !isLogin)}
								>
									{isLogin ? 'Sign up' : 'Log in'}
								</a>
							</div>
						</div>
					</form>
				</Card.Content>
			</Card.Root>
			<div
				class="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary"
			>
				By clicking continue, you agree to our <a href="##">Terms of Service</a>
				and <a href="##">Privacy Policy</a>.
			</div>
		</div>
	</div>
</div>
