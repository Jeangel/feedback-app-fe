const button = {
  baseStyle: {
    borderRadius: 10,
    outline: 0,
  },
  sizes: {
    xs: {
      fontSize: '2xs',
    },
    sm: {
      fontSize: 'xs',
    },
    md: {
      fontSize: 'xs',
    },
    lg: {
      fontSize: 'md',
    },
    xl: {
      h: '56px',
      fontSize: 'lg',
      px: '32px',
    },
  },
  variants: {
    'select-input': {
      backgroundColor: 'gray.50',
      color: 'tertiary.500',
      borderRadius: 'md',
      fontSize: 'sm',
      fontWeight: 'normal',
      _active: {
        borderWidth: '1px',
        borderColor: 'secondary.500',
      },
    },
    'select-ghost': {
      backgroundColor: 'transparent',
      fontWeight: 'normal',
      fontSize: 'sm',
      color: 'tertiary.500',
    },
  },
}

export default button
