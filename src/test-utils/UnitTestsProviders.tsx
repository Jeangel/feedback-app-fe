import { ThemeProvider } from '@chakra-ui/react'
import theme from '../theme'

const UnitTestsProviders = ({ children }: { children: JSX.Element }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
export default UnitTestsProviders
