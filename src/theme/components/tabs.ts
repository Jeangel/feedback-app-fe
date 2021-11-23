import { ComponentMultiStyleConfig } from '@chakra-ui/react'
import colors from '../foundations/colors'

const tabs: ComponentMultiStyleConfig = {
  parts: ['tab'],
  baseStyle: {
    tab: {
      _selected: {
        fontWeight: 'bold',
      },
    },
  },
  sizes: {},
  variants: {
    line: ({ colorScheme }) => ({
      tab: {
        _selected: {
          color: colors[colorScheme][500],
        },
      },
    }),
  },
  defaultProps: {
    colorScheme: 'primary'
  },
}

export default tabs
