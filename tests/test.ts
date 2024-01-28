import { test as base } from '@playwright/test'
import { LoginPage } from './fixtures/LoginPageFixture'
import { SuggestionsPage } from './fixtures/SuggestionsPageFixture'

type Fixtures = {
  loginPage: LoginPage
  suggestionsPage: SuggestionsPage
}

declare global {
  interface Window {
    isUnderTest: boolean
  }
}

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  suggestionsPage: async ({ page }, use) => {
    const suggestionsPage = new SuggestionsPage(page)
    await use(suggestionsPage)
  },
})

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => (window.isUnderTest = true))
})

export { expect } from '@playwright/test'
