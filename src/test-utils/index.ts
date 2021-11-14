/* eslint-disable import/export */
/* eslint-disable import/no-extraneous-dependencies */
// https://testing-library.com/docs/react-testing-library/setup/#custom-render
import { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import UnitTestsProviders from './UnitTestsProviders'
import userEvent from '@testing-library/user-event'

/**
 * Custom render that includes the Providers component
 * as wrapper for all rendered children
 */
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: UnitTestsProviders as FC, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render, userEvent }
