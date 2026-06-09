import { test, expect, Page } from '@playwright/test';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fillForm(page: Page, opts: {
  username?: string;
  password?: string;
  confirmPassword?: string;
}) {
  if (opts.username     !== undefined) await page.fill('#username',        opts.username);
  if (opts.password     !== undefined) await page.fill('#password',        opts.password);
  if (opts.confirmPassword !== undefined) await page.fill('#confirmPassword', opts.confirmPassword);
}

async function submit(page: Page) {
  await page.click('button[type=submit]');
}

// ---------------------------------------------------------------------------
// Candidate test scaffold — add your test cases here.
//
// Run with:
//   npx playwright test
//   npx playwright test --headed     (watch the browser)
//   npx playwright test --ui         (interactive UI mode)
//
// Hint: work through the requirements table row by row.
// For each rule, write at least one "should pass" and one "should fail" case.
// ---------------------------------------------------------------------------

test.describe('Registration form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // -----------------------------------------------------------------------
  // Submit button state
  // -----------------------------------------------------------------------

  test('submit button is disabled on page load', async ({ page }) => {
    const btn = page.locator('button[type=submit]');
    await expect(btn).toBeDisabled();
  });

  // TODO: Submit button remains disabled when only username is filled.
  // TODO: Submit button remains disabled when password is invalid.
  // TODO: Submit button is enabled only when all fields are valid.

  // -----------------------------------------------------------------------
  // Happy path
  // -----------------------------------------------------------------------

  test('successful registration shows success message', async ({ page }) => {
    // TODO: Fill valid data and assert success message appears.
    // Hint: use a unique username each run to avoid "already taken" errors.
    test.fail(); // remove this line once implemented
  });

  // -----------------------------------------------------------------------
  // Password validation — minimum length
  // -----------------------------------------------------------------------

  // TODO: 7-character password shows "At least 8 characters required."
  // TODO: Exactly 8-character password — does the error disappear? (Hint: check for Bug B1)

  // -----------------------------------------------------------------------
  // Password validation — maximum length
  // -----------------------------------------------------------------------

  // TODO: 64-character password should pass.
  // TODO: 65-character password should show max-length error.

  // -----------------------------------------------------------------------
  // Password validation — character classes
  // -----------------------------------------------------------------------

  // TODO: Password with no uppercase shows correct error.
  // TODO: Password with no digit shows correct error.
  // TODO: Password with no special char shows correct error.
  // TODO: Password with a space shows correct error.

  // -----------------------------------------------------------------------
  // Password validation — consecutive characters
  // -----------------------------------------------------------------------

  // TODO: "aaPass1!" (2 consecutive) — no consecutive error shown.
  // TODO: "aaaPass1!" (3 consecutive) — consecutive error shown.

  // -----------------------------------------------------------------------
  // Confirm password
  // -----------------------------------------------------------------------

  test('mismatch error shown when passwords differ', async ({ page }) => {
    await fillForm(page, { username: 'alice', password: 'Secure!9x', confirmPassword: 'Secure!9y' });
    await page.locator('#confirmPassword').blur();
    await expect(page.locator('.error', { hasText: 'Passwords do not match' })).toBeVisible();
  });

  // TODO: Change the password after filling confirmPassword — does the mismatch error appear?
  //       (Hint: check for Bug F1)

  // -----------------------------------------------------------------------
  // Strength indicator
  // -----------------------------------------------------------------------

  // TODO: Type a short password — indicator shows "Weak".
  // TODO: Type a password that meets only the length rule but nothing else —
  //       what does the strength indicator show? Is it accurate? (Hint: Bug F4)

  // -----------------------------------------------------------------------
  // API error handling
  // -----------------------------------------------------------------------

  // TODO: Submit a valid form where the username is already taken.
  //       Are the API error messages displayed to the user? (Hint: Bug F3)

  // -----------------------------------------------------------------------
  // Ambiguous requirements — document and ask
  // -----------------------------------------------------------------------

  // TODO: What counts as a "special character"?  The spec lists !@#$%^&* but
  //       what about £, €, -, _, ., etc.?  Write a test that exposes the boundary.

  // TODO: "Must not contain the username" — does a partial match count?
  //       e.g. username = "ali", password = "Salice!9" — should this fail?
});
