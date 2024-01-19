import ISuggestion from '@app-types/Suggestion'
import { IPagination } from '@app-types/Pagination'
import { Box, Center, Heading, Text } from '@chakra-ui/react'
import EmptyBox from '@components/animations/EmptyBox'
import SuggestionCard from '@components/suggestion/SuggestionCard'
import Pagination from '@components/misc/Pagination'
import { makeLoadableList } from '@utils/list'
import AddSuggestionButton from '../AddSuggestionButton'
import { AnimatePresence, motion } from 'framer-motion'

interface ISuggestionsListProps {
  isLoading: boolean
  data: ISuggestion[] | undefined
  pagination?: IPagination
  onPageChange: (page: number) => void
  onSuggestionClick?: (id: string) => void
}

const SuggestionsList = ({
  data,
  isLoading,
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

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }
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
        as={motion.div}
        variants={container}
        initial='hidden'
        animate='visible'
      >
        {!hasSuggestions && (
          <Center h='full' w='full' flexDir='column'>
            <EmptyBox style={{ height: 200, width: 200 }} />
            <Heading variant='h1'>There are no suggestions</Heading>
            <Text textAlign='center' whiteSpace='pre-wrap' color='tertiary.200'>
              Got a suggestion? Found a bug that needs to be squashed? {'\n'} We love
              hearing about new ideas to improve our app.
            </Text>
            <AddSuggestionButton mt='48px' />
          </Center>
        )}
        <AnimatePresence>
          {suggestions.map((e, i) => (
            <SuggestionCard
              key={e?._id || i}
              hasVoted={e?.myVote?.value === 1}
              suggestion={e}
              isLoading={isLoading}
              onClick={() => handleOnSuggestionClick(e?._id)}
            />
          ))}
        </AnimatePresence>
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
