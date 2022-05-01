import { ComponentWithAs, Grid, GridProps } from '@chakra-ui/react'

const BaseGrid: ComponentWithAs<'div', GridProps> = ({ children, ...rest }) => {
  return (
    <Grid
      {...rest}
      w='full'
      minH='full'
      maxW='1440px'
      gridTemplateColumns='repeat(12, 1fr)'
      columnGap='30px'
      display={{ base: 'block', lg: 'grid' }}
    >
      {children}
    </Grid>
  )
}

export default BaseGrid
