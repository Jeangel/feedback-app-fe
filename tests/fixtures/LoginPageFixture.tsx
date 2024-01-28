import type { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly userInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  constructor(public readonly page: Page) {
    this.userInput = this.page.getByRole('textbox', { name: 'username' })
    this.passwordInput = this.page.getByRole('textbox', { name: 'password' })
    this.submitButton = this.page.getByRole('button', { name: 'Login' })
  }

  async goto() {
    await this.page.goto('/login')
  }

  async fillForm({ username, password }: { username: string; password: string }) {
    await this.userInput.clear()
    await this.passwordInput.clear()
    await this.userInput.fill(username)
    await this.passwordInput.fill(password)
  }

  async submit() {
    this.submitButton.click()
  }

  async login() {
    await this.page.route('/api/auth/session', async (route) => {
      const json = {
        user: {
          _id: '62a5416e0bb97da1c334ce49',
          fullName: 'Demo user (mocked)',
          avatarUrl: 'https://avatars.dicebear.com/api/bottts/901.svg',
          username: 'demouser',
        },
        expires: '2024-02-27T11:35:28.321Z',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW91c2VyIiwidXNlcklkIjoiNjJhNTQxNmUwYmI5N2RhMWMzMzRjZTQ5Iiwic3ViIjoiNjJhNTQxNmUwYmI5N2RhMWMzMzRjZTQ5IiwiaWF0IjoxNzA2NDQxNzI3LCJleHAiOjE3MDY1MjgxMjd9.vGh6x85Tuwt5rWdOfe1uPzkpjpvjJHVDShGnC7MdP2o',
      }
      await route.fulfill({ json })
    })
    await this.userInput.fill('demoUser')
    await this.passwordInput.fill('demoPassword')
    await this.submitButton.click()
  }
}
