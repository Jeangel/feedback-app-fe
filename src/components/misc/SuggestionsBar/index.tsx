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

const sortingOptions = [
  { label: 'Most Upvotes', value: 'most-upvotes' },
  { label: 'Least Upvotes', value: 'least-upvotes' },
  { label: 'Most Comments', value: 'most-comments' },
  { label: 'Least Comments', value: 'least-comments' },
]

interface ISuggestionBarProps {
  suggestionsCount?: number
}

const SuggestionsBar = ({ suggestionsCount }: ISuggestionBarProps) => {
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
        <Skeleton variant='heading-h3' minWidth='120px' isLoaded={suggestionsCount !== undefined}>
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
            value='most-upvotes'
            variant='select-ghost'
            triggerProps={{ color: 'white', px: 0, fontSize: 'xs' }}
            iconProps={{ color: 'white' }}
            placeholderProps={{ color: 'white' }}
            options={sortingOptions}
            onChange={() => {}}
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
        Add Feedback
      </Button>
    </Flex>
  )
}

export default SuggestionsBar
