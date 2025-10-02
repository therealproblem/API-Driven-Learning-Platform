import { expect, test } from '@playwright/test';

test('', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Courses');
});
