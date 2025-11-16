import { test, expect } from '@playwright/test';

test('Login as Admin and check dashboard', async ({ page, browserName }) => {
    await page.goto('http://localhost:4200/login');

    await page.fill('input[formControlName="email"]', 'admin@ems.com');
    await page.fill('input[formControlName="password"]', 'Admin@123');

    await page.click('button[type="submit"]');

    // Handle WebKit-specific behavior
    if (browserName === 'webkit') {
        console.log('Running on WebKit...');
        await page.waitForTimeout(1000); // Add a delay for WebKit
        await page.waitForURL(/.*employees/); // Explicit wait for URL
    } else {
        await expect(page).toHaveURL(/.*employees/); // Standard assertion for other browsers
    }
    await page.waitForURL(/.*employees/);
    // await expect(page).toHaveURL(/.*employees/);
    await expect(page.locator('h2')).toContainText('Employee List');
});