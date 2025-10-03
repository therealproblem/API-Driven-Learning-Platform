<script lang="ts">
	import Profile from '@/stores/user-store';
	import { goto } from '$app/navigation';
	import Loader from '@/components/ui/loader/loader.svelte';

	Profile.alias.set('P');
	Profile.email.set('');
	Profile.name.set('');
	goto('/');
</script>

<div class="flex flex-row flex-wrap justify-evenly gap-5 p-5">
	<div class="flex min-h-80 w-full flex-col items-center justify-center">
		<Loader />Logging out...
	</div>
</div>
