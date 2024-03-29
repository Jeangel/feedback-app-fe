import { ComponentMultiStyleConfig } from '@chakra-ui/react'

const toggle: ComponentMultiStyleConfig = {
  parts: ['trigger', 'text', 'icon'],
  baseStyle: ({ isToggled, orientation }) => ({
    trigger: {
      padding: '0 10px',
      justifyContent: 'center',
      alignItems: 'center',
      bg: isToggled ? 'secondary.500' : 'gray.100',
      _groupHover: { bg: 'tertiary.50' },
    },
    text: {
      fontSize: '2xs',
      fontWeight: 'bold',
      color: isToggled ? 'white' : 'tertiary.500',
      _groupHover: { color: 'tertiary.500' },
    },
    icon: {
      color: isToggled ? 'white' : 'secondary.500',
      _groupHover: { color: 'secondary.500' },
    },
  }),
  sizes: {
    xs: ({ orientation }) => ({
      trigger: {
        minH: orientation === 'horizontal' ? '28px' : '50px',
        minW: orientation === 'horizontal' ? '40px' : '30px',
      },
      icon: {
        fontSize: '10px',
      },
    }),
    sm: ({ orientation }) => ({
      trigger: {
        minH: orientation === 'horizontal' ? '30px' : '50px',
        minW: orientation === 'horizontal' ? '50px' : '30px',
      },
    }),
    md: ({ orientation }) => ({
      trigger: {
        minH: orientation === 'horizontal' ? '40px' : '53px',
        minW: orientation === 'horizontal' ? '53px' : '40px',
      },
    }),
    lg: ({ orientation }) => ({
      trigger: {
        minH: orientation === 'horizontal' ? '32px' : '69px',
        minW: orientation === 'horizontal' ? '69px' : '32px',
      },
    }),
  },
  variants: {
    primary: ({ isToggled }) => ({
      trigger: {
        bg: isToggled ? 'secondary.500' : 'gray.100',
        _hover: { bg: 'tertiary.50' },
      },
      text: {
        color: isToggled ? 'white' : 'secondary.500',
        _groupHover: { color: 'secondary.500' },
      },
      icon: {
        color: isToggled ? 'white' : 'secondary.500',
        _groupHover: { color: 'secondary.500' },
      },
    }),
  },
  defaultProps: {
    size: 'md',
    orientation: 'horizontal',
    variant: 'primary',
  },
}

export default toggle
