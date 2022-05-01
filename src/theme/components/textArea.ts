const textArea = {
  baseStyle: {
    borderWidth: '1px',
  },
  sizes: {
    md: {
      fontSize: 'sm',
    },
  },
  variants: {
    filled: {
      border: '1px solid',
      backgroundColor: 'gray.50',
      color: 'tertiary.500',
      _focus: {
        bg: 'gray.100',
        borderColor: 'secondary.500',
      },
      _invalid: {
        borderColor: 'danger.500',
      },
      _hover: {
        backgroundColor: 'gray.100',
      },
    },
  },
  defaultProps: {
    resize: 'none',
    size: 'md',
    variant: 'filled',
    focusBorderColor: 'secondary.500',
    errorBorderColor: 'danger.500',
  },
}

export default textArea
