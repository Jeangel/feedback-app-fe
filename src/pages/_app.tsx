import '@fontsource/jost/400.css'
import '@fontsource/jost/600.css'
import '@fontsource/jost/700.css'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import theme from '../theme'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Base>
            <Component {...pageProps} />
          </Base>
        </ChakraProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

const Base = ({ children }: { children: React.ReactNode }) => {
  const { setColorMode } = useColorMode()
  useEffect(() => {
    setColorMode('light')
  }, [])
  return <>{children}</>
}

export default MyApp
