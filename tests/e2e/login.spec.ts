import { test, expect } from '../test'

test('Login form validations', async ({ loginPage, page }) => {
  await loginPage.goto()
  await expect(loginPage.submitButton).toBeDisabled()
  await loginPage.fillForm({ username: 'something', password: 'something' })
  await expect(loginPage.submitButton).toBeEnabled()
  await loginPage.submit()
  await expect(page.getByText(/invalid username or password/i)).toBeVisible()
})

test('User can login', async ({ loginPage, page, suggestionsPage }) => {
  await suggestionsPage.intercept()
  await loginPage.goto()
  await loginPage.login()
  await expect(page.getByText('@demouser')).toBeVisible()
})
