import type { Page, Locator } from '@playwright/test'

export class SuggestionsPage {
  private readonly username: Locator

  constructor(public readonly page: Page) {
    this.username = this.page.getByText('@demouser')
  }

  async goto() {
    await this.page.goto('/suggestions')
  }

  async intercept() {
    await this.page.route(
      /^http:\/\/localhost:3030\/suggestions(?:\?.*)?$/,
      async (route) => {
        const json = {
          results: [
            {
              _id: '62a5433d0bb97da1c334ce9c',
              title: 'Ability to follow others (MOCKED)',
              description: 'Stay updated on comments and solutions other people post.',
              category: 'Feature',
              authorId: '62a5416e0bb97da1c334ce49',
              commentsCount: 1,
              votesCount: 2,
              myVote: {
                _id: '62c778cda090ac219c1cae53',
                value: 1,
              },
            },
            {
              _id: '62a544150bb97da1c334ced6',
              title: 'Add micro-interactions (MOCKED)',
              description: 'Small animations at specific points can add delight.',
              category: 'Enhancement',
              authorId: '62a544000bb97da1c334cecd',
              commentsCount: 3,
              votesCount: 2,
              myVote: {
                _id: '62dc61ca98eaa30ab0bb0e27',
                value: 1,
              },
            },
            {
              _id: '62a543990bb97da1c334ceb8',
              title: 'One-click portfolio generation (MOCKED)',
              description:
                'Add ability to create professional looking portfolio from profile.',
              category: 'Feature',
              authorId: '62a5416e0bb97da1c334ce49',
              commentsCount: 0,
              votesCount: 1,
              myVote: {
                _id: '63d4eba1a2e370d7f91ea607',
                value: 1,
              },
            },
            {
              _id: '62a542d50bb97da1c334ce82',
              title: 'Add a dark theme option (MOCKED)',
              description:
                'It would help people with light sensitivities and who prefer dark mode.',
              category: 'Feature',
              authorId: '62a4fbed2b92dfe9ac834368',
              commentsCount: 4,
              votesCount: 1,
              myVote: {
                _id: '62c778d9a090ac219c1cae60',
                value: 1,
              },
            },
          ],
          pagination: {
            total: 20,
            pages: 4,
            currentPage: 1,
          },
        }
        await route.fulfill({ json })
      }
    )
  }
}
