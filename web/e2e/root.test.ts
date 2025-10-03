import { expect, test } from '@playwright/test';

test('', async ({ page }) => {
	await page.goto('/courses');
	await expect(page).toHaveTitle('Courses');
});
