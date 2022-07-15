import ISuggestion from '@app-types/Suggestion'
import { IPagination } from '@app-types/Pagination'
import { Box, Center, Heading, Button, Icon, Text } from '@chakra-ui/react'
import EmptyBox from '@components/animations/EmptyBox'
import SuggestionCard, { ISuggestionCardProps } from '@components/misc/SuggestionCard'
import Pagination from '@components/misc/Pagination'
import { makeLoadableList } from '@utils/list'
import router from 'next/router'
import { HiPlusSm } from 'react-icons/hi'

interface ISuggestionsListProps {
  onToggleVote: ISuggestionCardProps['onToggleVote']
  isLoading: boolean
  data: ISuggestion[] | undefined
  pagination?: IPagination
  onPageChange: (page: number) => void
}

const SuggestionsList = ({
  data,
  isLoading,
  onToggleVote,
  pagination,
  onPageChange,
}: ISuggestionsListProps) => {
  const suggestions = makeLoadableList({
    isLoading,
    skeletons: 4,
    list: data,
  })
  return (
    <>
      <Box
        display='flex'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        rowGap='20px'
        mt={suggestions.length ? '24px' : 0}
        minH={suggestions.length ? 'auto' : '475px'}
      >
        {!suggestions.length && (
          <Center h='full' w='full' flexDir='column'>
            <EmptyBox style={{ height: 200, width: 200 }} />
            <Heading variant='h1'>There is no suggestion yet</Heading>
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
            {...e}
            key={e?._id || i}
            commentsCount={0}
            hasVoted={e?.myVote?.value === 1}
            onToggleVote={onToggleVote}
            isLoading={isLoading}
          />
        ))}
      </Box>
      {!!suggestions.length && pagination && (
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
