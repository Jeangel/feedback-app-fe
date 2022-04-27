import { Stack } from '@chakra-ui/react'
import Select from '@components/forms/Select'
import FeedbackCategoriesCard from '@components/misc/FeedbackCategoriesCard'
import ProfileCard from '@components/misc/ProfileCard'
import RoadmapCard from '@components/misc/RoadmapCard'
import SuggestionsBar from '@components/misc/SuggestionsBar'
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
      <SuggestionsBar />
    </MainRightTemplate>
  )
}

export default withAuth(Suggestions)
