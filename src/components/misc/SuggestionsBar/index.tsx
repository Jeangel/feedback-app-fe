import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
} from '@chakra-ui/react'
import Select from '@components/forms/Select'
import { HiOutlineLightBulb, HiPlusSm } from 'react-icons/hi'

const sortingOptions = [
  { label: 'Most Upvotes', value: 'most-upvotes' },
  { label: 'Least Upvotes', value: 'least-upvotes' },
  { label: 'Most Comments', value: 'most-comments' },
  { label: 'Least Comments', value: 'least-comments' },
]

const SuggestionsBar = () => {
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
        <Heading variant='h3' color='white'>
          6 Suggestions
        </Heading>
      </HStack>
      <FormControl position='static' w='auto'>
        <HStack>
          <FormLabel
            color='white'
            variant='body3'
            fontWeight='normal'
            m='0'
            htmlFor='sortBy'
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
        </HStack>
      </FormControl>
      <Button
        minW={{ sm: '130px', base: '145px' }}
        marginLeft={{ sm: 'auto' }}
        colorScheme='primary'
        leftIcon={<Icon as={HiPlusSm} />}
      >
        Add Feedback
      </Button>
    </Flex>
  )
}

export default SuggestionsBar
