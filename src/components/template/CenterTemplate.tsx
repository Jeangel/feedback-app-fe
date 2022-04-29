import React from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from '@components/navigation/Navbar'
import BaseGrid from './BaseGrid'
import { ITemplateProps } from './types'

const CenterTemplate = ({ children, withNavbar = true }: ITemplateProps) => {
  return (
    <>
      {withNavbar && <Navbar display={{ sm: 'block', md: 'none' }} />}
      <BaseGrid
        bg='gray.50'
        p={{
          base: '24px',
          md: '56px',
          lg: '94px',
        }}
      >
        <Box h='full' w='full' gridColumn={{ base: '1 / 13', lg: '1 / 13' }}>
          {children}
        </Box>
      </BaseGrid>
    </>
  )
}

export default CenterTemplate
