import { Stack } from '@chakra-ui/react'
import FeedbackCategoriesCard from '@components/misc/FeedbackCategoriesCard'
import ProfileCard from '@components/misc/ProfileCard'
import RoadmapCard from '@components/misc/RoadmapCard'
import SuggestionsBar from '@components/misc/SuggestionsBar'
import MainRightTemplate from '@components/template/MainRightTemplate'
import { useSuggestions } from '@hooks/api/useSuggestions'
import withAuth from 'hocs/withAuth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Suggestions: NextPage = (props) => {
  const router = useRouter()
  const { data } = useSuggestions()
  const onSuggestionClick = (id: string) => {
    router.push(`/suggestions/${id}`)
  }
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
        <RoadmapCard planned={2} inProgress={3} live={1} />
      </Stack>
      <div>
        <SuggestionsBar />
        <div>
          {data?.map((e) => (
            <React.Fragment key={e._id}>
              <p onClick={() => onSuggestionClick(e._id)}>{JSON.stringify(e)}</p>
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </MainRightTemplate>
  )
}

export default withAuth(Suggestions)
