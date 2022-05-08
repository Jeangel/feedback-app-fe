const menu = {
  parts: ['menu', 'list', 'divider', 'item'],
  baseStyle: {
    menu: {},
    list: {
      bgColor: 'white',
      py: '2px',
      border: 'none',
      boxShadow: '0px 10px 40px -7px rgba(55, 63, 104, 0.350492);',
      borderRadius: '8px',
    },
    item: {
      py: '12px',
      bgColor: 'white',
      borderRadius: '8px',
      color: 'tertiary.200',
      _hover: {
        color: 'primary.500',
        bgColor: 'white',
      },
      _focus: {
        color: 'primary.500',
        bgColor: 'white',
      },
    },
    divider: {
      my: 0,
    },
  },
  sizes: {},
  variants: {},
  defaultProps: {},
}

export default menu
