import { ComponentSingleStyleConfig } from '@chakra-ui/react'

const formLabel: ComponentSingleStyleConfig = {
  baseStyle: {
    fontSize: 'xs',
    fontWeight: 'bold',
    color: 'tertiary.500',
  },
  variants: {
    body3: {
      fontSize: 'xs',
      fontWeight: 'semibold',
      lineHeight: 'shortest',
    },
  },
}

export default formLabel
