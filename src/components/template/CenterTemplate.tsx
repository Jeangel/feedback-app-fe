import { Flex, GridProps, ChakraProps } from '@chakra-ui/react'
import BaseGrid from './BaseGrid'
import { ITemplateProps } from './types'

interface ICenterTemplateProps extends ITemplateProps, ChakraProps {
  gridColumn?: GridProps['gridColumn']
  baseGridProps?: ChakraProps
}

const CenterTemplate = ({
  children,
  gridColumn,
  baseGridProps,
}: ICenterTemplateProps) => {
  return (
    <>
      <BaseGrid
        bg='gray.50'
        display={{ sm: 'block', md: 'grid', lg: 'grid' }}
        p={{
          base: '24px',
          md: '30px',
          lg: '30px',
        }}
        {...baseGridProps}
      >
        <Flex
          direction='column'
          minH='full'
          w='full'
          gridColumn={gridColumn || { base: '1 / 13', md: '3 / 11', lg: '4 / 10' }}
        >
          {children}
        </Flex>
      </BaseGrid>
    </>
  )
}

export default CenterTemplate
