import { extendTheme } from '@chakra-ui/react'
import fonts from './foundations/fonts'
import colors from './foundations/colors'
import Text from './components/text'
import Menu from './components/menu'
import Input from './components/input'
import Button from './components/button'
import Toggle from './components/toggle'
import Heading from './components/heading'

export const theme = extendTheme({
  colors,
  ...fonts,
  components: {
    Menu,
    Text,
    Input,
    Button,
    Heading,
    Toggle
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme
