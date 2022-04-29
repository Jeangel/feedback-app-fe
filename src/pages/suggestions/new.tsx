import React from 'react'
import type { NextPage } from 'next'
import withAuth from '@hocs/withAuth'
import { Box, Flex, Heading, Icon } from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'
import RoundedBadge from '@components/misc/RoundedBadge'
import GoBackButton from '@components/navigation/GoBackButton'
import CenterTemplate from '@components/template/CenterTemplate'

const NewSuggestion: NextPage = (props) => {
  return (
    <CenterTemplate withNavbar={false}>
      <GoBackButton />
      <Flex h='full' w='full' pt='40px' justifyContent='center'>
        <Flex
          w='100%'
          px='24px'
          py='44px'
          bg='white'
          pos='relative'
          borderRadius='10px'
          maxW={{ sm: '100%', md: '540px', lg: '540px' }}
        >
          <RoundedBadge
            boxSize='40px'
            icon={HiPlus}
            pos='absolute'
            left='24px'
            top='-20px'
          />
          <Heading variant='h3'>Create New Feedback</Heading>
        </Flex>
      </Flex>
    </CenterTemplate>
  )
}

export default withAuth(NewSuggestion)
