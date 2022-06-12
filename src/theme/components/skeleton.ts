import fonts from '../foundations/fonts'

const { fontSizes } = fonts

const skeleton = {
  variants: {
    'text-body': {
      height: fontSizes.md,
      as: 'span',
    },
    'text-body2': {
      height: fontSizes.sm,
      as: 'span',
    },
    'text-body3': {
      height: fontSizes.xs,
      as: 'span',
    },
    'text-controlDescription': {
      height: fontSizes.xs,
      as: 'span',
    },
    'heading-h1': {
      height: fontSizes.md,
      as: 'span',
    },
    'heading-h2': {
      height: fontSizes.sm,
      as: 'span',
    },
    'heading-h3': {
      height: fontSizes.lg,
      as: 'span',
    },
    'heading-h4': {
      height: fontSizes['2xs'],
      as: 'span',
    },
  },
  defaultProps: {
    variant: 'body',
  },
}

export default skeleton
