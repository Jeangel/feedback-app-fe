import '@fontsource/jost/400.css'
import '@fontsource/jost/600.css'
import '@fontsource/jost/700.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import theme from '../theme'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <Base>
          <Component {...pageProps} />
        </Base>
      </ChakraProvider>
    </SessionProvider>
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
