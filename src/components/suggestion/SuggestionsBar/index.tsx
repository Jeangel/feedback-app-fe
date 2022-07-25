import { ISortArgs } from '@app-types/Pagination'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Skeleton,
} from '@chakra-ui/react'
import Select from '@components/forms/Select'
import { useRouter } from 'next/router'
import { HiOutlineLightBulb, HiPlusSm } from 'react-icons/hi'

export enum ESuggestionsSort {
  mostUpVotes = 'most-upvotes',
  leastUpVotes = 'least-upvotes',
  mostComments = 'most-comments',
  leastComments = 'least-comments',
}

const sortingOptions = [
  { label: 'Most Upvotes', value: ESuggestionsSort.mostUpVotes },
  { label: 'Least Upvotes', value: ESuggestionsSort.leastUpVotes },
  { label: 'Most Comments', value: ESuggestionsSort.mostComments },
  { label: 'Least Comments', value: ESuggestionsSort.leastComments },
]

export const toSortArgs = (value: ESuggestionsSort): ISortArgs => {
  switch (value) {
    case ESuggestionsSort.mostUpVotes:
      return { by: 'votesCount', order: -1 }
    case ESuggestionsSort.leastUpVotes:
      return { by: 'votesCount', order: 1 }
    case ESuggestionsSort.mostComments:
      return { by: 'commentsCount', order: -1 }
    case ESuggestionsSort.leastComments:
      return { by: 'commentsCount', order: 1 }
  }
}

export const fromSortArgs = (value: ISortArgs) => {
  if (value.by === 'votesCount' && value.order === -1) {
    return ESuggestionsSort.mostUpVotes
  } else if (value.by === 'votesCount' && value.order === 1) {
    return ESuggestionsSort.mostUpVotes
  }
}

interface ISuggestionBarProps {
  suggestionsCount?: number
  onChangeSort: (value: ESuggestionsSort) => void
  sortBy: ESuggestionsSort
}

const SuggestionsBar = ({
  suggestionsCount,
  onChangeSort,
  sortBy,
}: ISuggestionBarProps) => {
  const router = useRouter()
  return (
    <Flex
      w='full'
      bg='tertiary.600'
      m={{ sm: '0', md: '40px 0 24px 0', lg: '0' }}
      borderRadius={{ sm: 0, md: '10px' }}
      p={{ base: '8px 24px', md: '18px 12px 18px 24px' }}
      flexWrap='wrap'
      justifyContent='space-between'
    >
      <HStack display={{ base: 'none', md: 'flex' }} spacing='16px' pr='38px'>
        <Icon as={HiOutlineLightBulb} color='white' fontSize='23px' />
        <Skeleton
          variant='heading-h3'
          minWidth='120px'
          isLoaded={suggestionsCount !== undefined}
        >
          <Heading variant='h3' color='white'>
            {suggestionsCount} {suggestionsCount === 1 ? 'Suggestion' : 'Suggestions'}
          </Heading>
        </Skeleton>
      </HStack>
      <FormControl position='static' w='auto'>
        <Flex alignItems='center' columnGap='4px'>
          <FormLabel
            color='white'
            variant='body3'
            fontWeight='normal'
            m='0'
            htmlFor='sortBy'
            w='50%'
          >
            Sort By:
          </FormLabel>
          <Select
            id='sortBy'
            value={sortBy}
            variant='select-ghost'
            triggerProps={{ color: 'white', px: 0, fontSize: 'xs' }}
            iconProps={{ color: 'white' }}
            placeholderProps={{ color: 'white' }}
            options={sortingOptions}
            onChange={onChangeSort}
          />
        </Flex>
      </FormControl>
      <Button
        minW={{ sm: '130px', base: '145px' }}
        marginLeft={{ sm: 'auto' }}
        colorScheme='primary'
        leftIcon={<Icon as={HiPlusSm} />}
        onClick={() => router.push('/suggestions/new')}
      >
        Add Suggestion
      </Button>
    </Flex>
  )
}

export default SuggestionsBar
