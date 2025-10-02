import { describe, expect, it } from 'vitest';
import { createAlias } from './+page.server.ts';

describe('/+page.svelte', () => {
	it('should return the alias of the user given their full name', async () => {
		const res = createAlias('Joseph Woo');
		expect(res).toBe('JW');
	});
});
