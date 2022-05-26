import { ComponentSingleStyleConfig } from '@chakra-ui/react'

const badge: ComponentSingleStyleConfig = {
  baseStyle: {
    borderRadius: 10,
    minHeight: 30,
    height: 'fit-content',
    padding: '5px 16px',
    fontSize: '13px',
    textTransform: 'initial',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    feedbackTag: {
      color: 'secondary.500',
      backgroundColor: 'gray.100',
    },
  },
}

export default badge
