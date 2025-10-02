import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const createPersistentStore = (key, initialValue) => {
	// Use browser check for SvelteKit to avoid SSR errors
	if (browser) {
		const storedValue = localStorage.getItem(key);
		const initial = storedValue ? JSON.parse(storedValue) : initialValue;
		const store = writable(initial);

		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});

		return store;
	}

	// Return a normal writable for SSR or environments without localStorage
	return writable(initialValue);
};

export default createPersistentStore;
