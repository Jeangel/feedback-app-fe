import '@fontsource/jost/400.css'
import '@fontsource/jost/600.css'
import '@fontsource/jost/700.css'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import theme from '../theme'
import NavigationProgressBar from '@components/navigation/NavigationProgressBar'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Base>
            <NavigationProgressBar />
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
  useEffect(() => {
    const HJID = process.env.NEXT_HOTJAR_HJID
    const HJSV = process.env.NEXT_HOTJAR_HJSV
    if (HJID && HJSV) {
      hotjar.initialize(HJID, HJSV)
    }
  }, [])
  return <>{children}</>
}

export default MyApp
