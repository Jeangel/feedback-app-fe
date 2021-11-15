import { extendTheme } from '@chakra-ui/react'
import fonts from './foundations/fonts'
import colors from './foundations/colors'
import Text from './components/text'
import Heading from './components/heading'
import Button from './components/button'
import Input from './components/input'

export const theme = extendTheme({
  colors,
  ...fonts,
  components: {
    Text,
    Input,
    Button,
    Heading,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme
