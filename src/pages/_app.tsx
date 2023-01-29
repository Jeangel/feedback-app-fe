import '@fontsource/jost/400.css'
import '@fontsource/jost/600.css'
import '@fontsource/jost/700.css'
import { useEffect } from 'react'
import { hotjar } from 'react-hotjar'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import {
  Center,
  ChakraProvider,
  Heading,
  Hide,
  Show,
  useColorMode,
} from '@chakra-ui/react'
import theme from '../theme'
import NavigationProgressBar from '@components/navigation/NavigationProgressBar'
import useIsWindowReady from '@hooks/useIsWindowReady'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const isWindowReady = useIsWindowReady()
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ChakraProvider theme={theme}>
          <Base>
            <NavigationProgressBar />
            <Show above='sm'>
              <Component {...pageProps} />
            </Show>
            {isWindowReady && (
              <Hide above='sm'>
                <Center height='full'>
                  <Heading textAlign='center'>No way! 🤷🏻‍♂️</Heading>
                </Center>
              </Hide>
            )}
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
  }, [setColorMode])
  useEffect(() => {
    const HJID = process.env.NEXT_PUBLIC_HOTJAR_HJID
    const HJSV = process.env.NEXT_PUBLIC_HOTJAR_HJSV
    if (HJID && HJSV) {
      hotjar.initialize(Number(HJID), Number(HJSV))
    }
  }, [])
  return <>{children}</>
}

export default MyApp
