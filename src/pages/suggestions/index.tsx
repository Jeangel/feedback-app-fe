import { EFeedbackCategory } from '@app-types/FeedbackCategory'
import { Stack, Box, useToast } from '@chakra-ui/react'
import SuggestionsList from '@components/feedback/SuggestionsList'
import FeedbackCategoriesCard from '@components/misc/FeedbackCategoriesCard'
import ProfileCard from '@components/misc/ProfileCard'
import RoadmapCard from '@components/misc/RoadmapCard'
import SuggestionsBar, {
  ESuggestionsSort,
  toSortArgs,
} from '@components/misc/SuggestionsBar'
import MainRightTemplate from '@components/template/MainRightTemplate'
import { useSaveFeedbackVote } from '@hooks/api/useSaveFeedbackVote'
import { useSuggestions } from '@hooks/api/useSuggestions'
import { ApiError } from '@utils/axios'
import withAuth from 'hocs/withAuth'
import type { NextPage } from 'next'

import React, { useState } from 'react'

const Suggestions: NextPage = (props) => {
  const toast = useToast()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<ESuggestionsSort>(ESuggestionsSort.mostUpVotes)
  const [feedbackCategories, setFeedbackCategories] = useState<EFeedbackCategory[]>([])
  const { data, pagination, isLoading } = useSuggestions({
    pagination: { limit: 5, page },
    sort: toSortArgs(sortBy),
    filters: {
      categories: feedbackCategories,
    },
  })
  const { mutate: saveFeedbackVote } = useSaveFeedbackVote()

  const onToggleVote = (args: { _id: string; value: boolean }) => {
    saveFeedbackVote(
      {
        feedbackId: args._id,
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

  return (
    <MainRightTemplate>
      <Stack
        display={{ base: 'none', md: 'flex' }}
        direction={{ base: 'row', lg: 'column' }}
        spacing='10px'
        w='full'
      >
        <ProfileCard />
        <FeedbackCategoriesCard
          onToggle={setFeedbackCategories}
          selectedValues={feedbackCategories}
        />
        <RoadmapCard planned={2} inProgress={3} live={1} />
      </Stack>
      <Box h='full'>
        <SuggestionsBar
          suggestionsCount={pagination?.total}
          onChangeSort={setSortBy}
          sortBy={sortBy}
        />
        <SuggestionsList
          data={data}
          pagination={pagination}
          onToggleVote={onToggleVote}
          isLoading={isLoading}
          onPageChange={setPage}
        />
      </Box>
    </MainRightTemplate>
  )
}

export default withAuth(Suggestions)
