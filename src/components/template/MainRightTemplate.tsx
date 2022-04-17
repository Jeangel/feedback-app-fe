import React from 'react'
import chunk from 'lodash.chunk'
import { Box, Grid } from '@chakra-ui/react'
import Navbar from '@components/layout/Navbar'
import BaseGrid from './BaseGrid'

const MainRightTemplate = ({ children }: { children: React.ReactNode }) => {
  const childrenInPairs = chunk(React.Children.toArray(children), 2)
  return (
    <>
      <Navbar display={{ sm: 'block', md: 'none' }} />
      <BaseGrid
        bg='gray.50'
        p={{
          sm: '0',
          md: '56px 40px',
          lg: '94px 165px',
        }}
      >
        {childrenInPairs.map(([left, right], i) => (
          <React.Fragment key={i}>
            <Box gridColumn={{ base: '1 / 13', lg: '1 / 5' }}>{left}</Box>
            <Box gridColumn={{ base: '1 / 13', lg: '5 / 13' }}>{right}</Box>
          </React.Fragment>
        ))}
      </BaseGrid>
    </>
  )
}

export default MainRightTemplate
