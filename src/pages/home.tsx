import { Box, HStack, Stack, VStack } from '@chakra-ui/react'
import Select from '@components/forms/Select'
import FeedbackCategoriesCard from '@components/misc/FeedbackCategoriesCard'
import ProfileCard from '@components/misc/ProfileCard'
import RoadmapCard from '@components/misc/RoadmapCard'
import MainRightTemplate from '@components/template/MainRightTemplate'
import withAuth from 'hocs/withAuth'
import type { NextPage } from 'next'
import React from 'react'

const Suggestions: NextPage = (props) => {
  return (
    <MainRightTemplate>
      <Stack
        display={{ base: 'none', md: 'flex' }}
        direction={{ base: 'row', lg: 'column' }}
        spacing='10px'
        w='full'
      >
        <ProfileCard />
        <FeedbackCategoriesCard />
        <RoadmapCard />
      </Stack>
      <HStack w='full' bg='tertiary.600'>
        <Select
          placeholder='testy'
          variant='select-ghost'
          triggerProps={{ color: 'white' }}
          iconProps={{ color: 'white' }}
          placeholderProps={{ color: 'white', fontWeight: 600 }}
          options={[{ value: 'test', label: 'Test' }]}
          onChange={() => {}}
        />
      </HStack>
    </MainRightTemplate>
  )
}

export default withAuth(Suggestions)
