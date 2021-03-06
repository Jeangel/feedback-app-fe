import ISuggestion from '@app-types/Suggestion'
import { IPagination } from '@app-types/Pagination'
import { Box, Center, Heading, Button, Icon, Text } from '@chakra-ui/react'
import EmptyBox from '@components/animations/EmptyBox'
import SuggestionCard, {
  ISuggestionCardProps,
} from '@components/suggestion/SuggestionCard'
import Pagination from '@components/misc/Pagination'
import { makeLoadableList } from '@utils/list'
import router from 'next/router'
import { HiPlusSm } from 'react-icons/hi'

interface ISuggestionsListProps {
  onSuggestionVote: ISuggestionCardProps['onToggleVote']
  isLoading: boolean
  data: ISuggestion[] | undefined
  pagination?: IPagination
  onPageChange: (page: number) => void
  onSuggestionClick?: (id: string) => void
}

const SuggestionsList = ({
  data,
  isLoading,
  onSuggestionVote,
  pagination,
  onPageChange,
  onSuggestionClick,
}: ISuggestionsListProps) => {
  const suggestions = makeLoadableList({
    isLoading,
    skeletons: 4,
    list: data,
  })
  const handleOnSuggestionClick = (id?: string) => {
    if (id && onSuggestionClick) onSuggestionClick(id)
  }
  const hasSuggestions = !!suggestions.length
  return (
    <>
      <Box
        display='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        rowGap='20px'
        mt={hasSuggestions ? '24px' : 0}
        minH={hasSuggestions ? 'auto' : '475px'}
      >
        {!hasSuggestions && (
          <Center h='full' w='full' flexDir='column'>
            <EmptyBox style={{ height: 200, width: 200 }} />
            <Heading variant='h1'>There are no suggestions</Heading>
            <Text textAlign='center' whiteSpace='pre-wrap' color='tertiary.200'>
              Got a suggestion? Found a bug that needs to be squashed? {'\n'} We love
              hearing about new ideas to improve our app.
            </Text>
            <Button
              mt='48px'
              minW={{ sm: '130px', base: '145px' }}
              colorScheme='primary'
              leftIcon={<Icon as={HiPlusSm} />}
              onClick={() => router.push('/suggestions/new')}
            >
              Add Suggestion
            </Button>
          </Center>
        )}
        {suggestions.map((e, i) => (
          <SuggestionCard
            key={e?._id || i}
            hasVoted={e?.myVote?.value === 1}
            suggestion={e}
            onToggleVote={onSuggestionVote}
            isLoading={isLoading}
            onClick={() => handleOnSuggestionClick(e?._id)}
          />
        ))}
      </Box>
      {hasSuggestions && pagination && (
        <Box mt='10'>
          <Pagination
            currentPage={pagination.currentPage}
            onPageChange={onPageChange}
            totalPages={pagination.pages}
          />
        </Box>
      )}
    </>
  )
}

export default SuggestionsList
