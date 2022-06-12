import IFeedback from '@app-types/Feedback'
import { Stack, Box, useToast } from '@chakra-ui/react'
import FeedbackCard from '@components/misc/FeedbackCard'
import FeedbackCategoriesCard from '@components/misc/FeedbackCategoriesCard'
import ProfileCard from '@components/misc/ProfileCard'
import RoadmapCard from '@components/misc/RoadmapCard'
import SuggestionsBar from '@components/misc/SuggestionsBar'
import MainRightTemplate from '@components/template/MainRightTemplate'
import { useSaveFeedbackVote } from '@hooks/api/useSaveFeedbackVote'
import { useSuggestions } from '@hooks/api/useSuggestions'
import { ApiError } from '@utils/axios'
import { makeLoadableList } from '@utils/list'
import withAuth from 'hocs/withAuth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Suggestions: NextPage = (props) => {
  const toast = useToast()
  const router = useRouter()
  const { data, isLoading } = useSuggestions({ pagination: { limit: 6 } })
  const { mutate: saveFeedbackVote } = useSaveFeedbackVote()
  const onSuggestionClick = (id: string) => {
    router.push(`/suggestions/${id}`)
  }
  const onToggleVote = (args: { id: string; value: boolean }) => {
    saveFeedbackVote(
      {
        feedbackId: args.id,
        value: args.value ? 1 : 0,
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            description: 'Voted was saved successfully',
          })
        },
        onError: (error) => {
          const apiError = error as ApiError
          toast({ status: 'error', description: apiError.message })
        },
      }
    )
  }

  const suggestions = makeLoadableList({
    isLoading,
    skeletons: 4,
    list: data,
  })

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
        <SuggestionsBar suggestionsCount={data?.length} />
        <Box
          display='flex'
          flexDir='column'
          justifyContent='center'
          alignItems='center'
          rowGap='20px'
          mt='24px'
        >
          {suggestions.map((e, i) => (
            <FeedbackCard
              {...e}
              key={e?._id || i}
              commentsCount={0}
              hasVoted={e?.myVote?.value === 1}
              onToggleVote={onToggleVote}
              isLoading={isLoading}
            />
          ))}
        </Box>
      </div>
    </MainRightTemplate>
  )
}

export default withAuth(Suggestions)
