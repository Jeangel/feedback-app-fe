const heading = {
  variants: {
    h1: {
      fontSize: 'md',
      fontWeight: 'bold',
      lineHeight: 'tallest',
      color: 'tertiary.500',
    },
    h2: {
      fontSize: 'sm',
      fontWeight: 'bold',
      lineHeight: 'taller',
      color: 'tertiary.500',
    },
    h3: {
      fontSize: 'lg',
      fontWeight: 'bold',
      color: 'tertiary.500',
      lineHeight: 'tall'
    },
    h4: {
      fontSize: 'xs',
      fontWeight: 'bold',
      lineHeight: 'shorter',
      color: 'tertiary.500',
    }
  },
  defaultProps: {
    variant: 'h1',
  },
}

export default heading
