import { ESuggestionCategory } from '@app-types/SuggestionCategory'
import { Stack, Box, useToast } from '@chakra-ui/react'
import SuggestionsList from '@components/suggestion/SuggestionsList'
import SuggestionCategoriesCard from '@components/misc/SuggestionCategoriesCard'
import ProfileCard from '@components/misc/ProfileCard'
import RoadmapCard from '@components/misc/RoadmapCard'
import SuggestionsBar, {
  ESuggestionsSort,
  toSortArgs,
} from '@components/misc/SuggestionsBar'
import Navbar from '@components/navigation/Navbar'
import MainRightTemplate from '@components/template/MainRightTemplate'
import { useSaveSuggestionVote } from '@hooks/api/useSaveSuggestionVote'
import { useSuggestions } from '@hooks/api/useSuggestions'
import { ApiError } from '@utils/axios'
import withAuth from 'hocs/withAuth'
import type { NextPage } from 'next'
import React, { useState } from 'react'

const Suggestions: NextPage = (props) => {
  const toast = useToast()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<ESuggestionsSort>(ESuggestionsSort.mostUpVotes)
  const [suggestionCategories, setSuggestionCategories] = useState<ESuggestionCategory[]>([])
  const { data, pagination, isLoading } = useSuggestions({
    pagination: { limit: 5, page },
    sort: toSortArgs(sortBy),
    filters: {
      categories: suggestionCategories,
    },
  })
  const { mutate: saveSuggestionVote } = useSaveSuggestionVote()

  const onToggleVote = (args: { _id: string; value: boolean }) => {
    saveSuggestionVote(
      {
        suggestionId: args._id,
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

  const Components = (
    <>
      <SuggestionCategoriesCard
        onToggle={setSuggestionCategories}
        selectedValues={suggestionCategories}
      />
      <RoadmapCard planned={2} inProgress={3} live={1} />
    </>
  )

  return (
    <>
      <Navbar>{Components}</Navbar>
      <MainRightTemplate>
        <Stack
          display={{ base: 'none', md: 'flex' }}
          direction={{ base: 'row', lg: 'column' }}
          spacing='10px'
          w='full'
        >
          <ProfileCard />
          {Components}
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
    </>
  )
}

export default withAuth(Suggestions)
