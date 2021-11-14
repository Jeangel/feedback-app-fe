import { extendTheme } from '@chakra-ui/react'
import fonts from './foundations/fonts'
import colors from './foundations/colors'

const theme = extendTheme({
  colors,
  fonts,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme
