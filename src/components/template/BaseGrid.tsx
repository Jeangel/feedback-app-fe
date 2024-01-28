import { ComponentWithAs, Grid, GridProps } from '@chakra-ui/react'

const BaseGrid: ComponentWithAs<'div', GridProps> = ({ children, ...rest }) => {
  return (
    <Grid
      display={{ base: 'block', lg: 'grid' }}
      {...rest}
      w='full'
      minH='full'
      maxW='1440px'
      gridTemplateColumns='repeat(12, 1fr)'
      columnGap='30px'
      margin='0 auto'
    >
      {children}
    </Grid>
  )
}

export default BaseGrid
