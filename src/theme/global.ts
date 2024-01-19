import { CSSObject } from '@chakra-ui/react'

const globalStyles: Record<string, CSSObject> = {
  'html, body, #__next': {
    height: '100%',
    width: '100%',
    backgroundColor: 'gray.50',
  },
  '#__next': {
    display: 'flex',
    justifyContent: 'center',
  },
}

export default globalStyles
