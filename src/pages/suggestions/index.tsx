import { useState } from 'react'
import { ESuggestionCategory } from '@app-types/SuggestionCategory'
import { Stack, Box } from '@chakra-ui/react'
import SuggestionsList from '@components/suggestion/SuggestionsList'
import SuggestionCategoriesCard from '@components/suggestion/SuggestionCategoriesCard'
import ProfileCard from '@components/profile/ProfileCard'
import RoadmapCard from '@components/roadmap/RoadmapCard'
import SuggestionsBar, {
  ESuggestionsSort,
  toSortArgs,
} from '@components/suggestion/SuggestionsBar'
import Navbar from '@components/navigation/Navbar'
import MainRightTemplate from '@components/template/MainRightTemplate'
import { useSuggestions } from '@hooks/api/suggestions/useSuggestions'
import withAuth from 'hocs/withAuth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSuggestionsStats } from '@hooks/api/suggestions/useSuggestionsStats'

const Suggestions: NextPage = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<ESuggestionsSort>(ESuggestionsSort.mostUpVotes)
  const [suggestionCategories, setSuggestionCategories] = useState<ESuggestionCategory[]>(
    []
  )
  const { data, pagination, isLoading } = useSuggestions({
    pagination: { limit: 5, page },
    sort: toSortArgs(sortBy),
    filters: {
      categories: suggestionCategories,
    },
  })
  const { data: stats } = useSuggestionsStats()

  const onSuggestionClick = (id: string) => {
    router.push(`/suggestions/${id}`)
  }

  const Components = (
    <>
      <SuggestionCategoriesCard
        onToggle={setSuggestionCategories}
        selectedValues={suggestionCategories}
      />
      <RoadmapCard
        suggestion={stats?.countByStatus.Suggestion}
        planned={stats?.countByStatus.Planned}
        inProgress={stats?.countByStatus['In-Progress']}
        live={stats?.countByStatus.Live}
      />
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
            onSuggestionClick={onSuggestionClick}
            isLoading={isLoading}
            onPageChange={setPage}
          />
        </Box>
      </MainRightTemplate>
    </>
  )
}

export default withAuth(Suggestions)
