import { extendTheme } from '@chakra-ui/react'
import global from './global'
import fonts from './foundations/fonts'
import colors from './foundations/colors'
import shadows from './foundations/shadows'
import breakpoints from './foundations/breakpoints'
import Tabs from './components/tabs'
import Text from './components/text'
import Menu from './components/menu'
import Input from './components/input'
import Button from './components/button'
import Toggle from './components/toggle'
import Heading from './components/heading'
import FormLabel from './components/label'
import Badge from './components/badge'
import Textarea from './components/textArea'
import Skeleton from './components/skeleton'

export const theme = extendTheme({
  colors,
  ...fonts,
  shadows,
  breakpoints,
  components: {
    Menu,
    Text,
    Input,
    Button,
    Heading,
    Toggle,
    Tabs,
    FormLabel,
    Badge,
    Textarea,
    Skeleton
  },
  styles: {
    global,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})

export default theme
