import React from 'react'
import { Flex } from '@chakra-ui/react'
import BaseGrid from './BaseGrid'
import { ITemplateProps } from './types'

const CenterTemplate = ({ children }: ITemplateProps) => {
  return (
    <>
      <BaseGrid
        bg='gray.50'
        p={{
          base: '24px',
          md: '30px',
          lg: '30px',
        }}
      >
        <Flex
          direction='column'
          minH='full'
          w='full'
          gridColumn={{ base: '1 / 13', lg: '1 / 13' }}
        >
          {children}
        </Flex>
      </BaseGrid>
    </>
  )
}

export default CenterTemplate
