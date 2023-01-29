import ISuggestion from '@app-types/Suggestion'
import { Box, Icon, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { FaComment } from 'react-icons/fa'

interface IVotesCountProps {
  suggestion: ISuggestion
}

const VotesCount = ({ suggestion }: IVotesCountProps) => {
  return (
    <Link href={`/suggestions/${suggestion._id}`} passHref>
      <a aria-label='Go to Suggestion detail' style={{ paddingTop: '4px', zIndex: 10 }}>
        <Box display='flex' flexDir='row' alignItems='center' order={{ md: 2 }}>
          <Icon
            as={FaComment}
            marginRight='4px'
            color='gray.300'
            fontSize={{ md: '16px' }}
          />
          <Heading
            variant='h4'
            as='span'
            color={suggestion?.commentsCount === 0 ? 'gray.400' : 'tertiary.500'}
          >
            {suggestion?.commentsCount}
          </Heading>
        </Box>
      </a>
    </Link>
  )
}

export default VotesCount
