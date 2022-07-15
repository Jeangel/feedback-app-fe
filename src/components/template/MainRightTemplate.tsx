import React from 'react'
import chunk from 'lodash.chunk'
import { Box } from '@chakra-ui/react'
import BaseGrid from './BaseGrid'
import { ITemplateProps } from './types'

const MainRightTemplate = ({ children }: ITemplateProps) => {
  const childrenInPairs = chunk(React.Children.toArray(children), 2)
  return (
    <>
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
            <Box gridColumn={{ base: '1 / 13', lg: '1 / 4' }}>{left}</Box>
            <Box gridColumn={{ base: '1 / 13', lg: '4 / 13' }}>{right}</Box>
          </React.Fragment>
        ))}
      </BaseGrid>
    </>
  )
}

export default MainRightTemplate
