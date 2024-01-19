import ISuggestion from '@app-types/Suggestion'
import { colorsMap } from '@app-types/SuggestionStatus'
import { Badge, Box, Flex, Heading, Text, Tooltip } from '@chakra-ui/react'
import Toggle from '@components/forms/Toggle'
import useOnSuggestionVote from '@hooks/actions/useOnSuggestionVote'
import { FaChevronUp } from 'react-icons/fa'
import StatusBadge from './StatusBadge'
import VotesCount from './VotesCount'
import { EditIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export interface ISuggestionRoadmapCardProps {
  hasVoted?: boolean
  suggestion?: ISuggestion | null
  onClick?: () => void
  isLoading?: boolean
  isOwn?: boolean
}

const SuggestionRoadmapCard = ({ suggestion, isOwn }: ISuggestionRoadmapCardProps) => {
  const onSuggestionVote = useOnSuggestionVote()
  if (!suggestion) return null

  const hasVoted = suggestion.myVote?.value === 1
  const handleOnToggleVote = (value: boolean) => {
    onSuggestionVote({ _id: suggestion._id, value })
  }
  return (
    <Box
      h='272px'
      maxW='350px'
      borderRadius='5px'
      bg='white'
      m='10px'
      p='20px'
      position='relative'
      cursor='grab'
      opacity={isOwn ? 1 : 0.5}
    >
      {!isOwn && (
        <Tooltip label='You can only move your own suggestions' placement='top' hasArrow>
          <Box position='absolute' inset={0} cursor='not-allowed' />
        </Tooltip>
      )}
      <Box
        h='6px'
        borderRadius='5px 5px 0 0'
        bgColor={colorsMap[suggestion.status]}
        position='absolute'
        top='0'
        left='0'
        w='full'
      />
      <Flex direction='column' justify='space-between' h='full'>
        <Flex direction='column'>
          <Flex justify='space-between'>
            {suggestion && <StatusBadge status={suggestion.status} />}
            {isOwn && (
              <Link href={`/suggestions/${suggestion._id}/edit`} passHref>
                <a aria-label='Go to Edit Suggestion'>
                  <EditIcon
                    fontSize='14px'
                    color='gray.500'
                    _hover={{ color: 'gray.700' }}
                  />
                </a>
              </Link>
            )}
          </Flex>
          <Heading variant='h4' as='p' mt='14px' mb='11px' noOfLines={2}>
            {suggestion.title}
          </Heading>
          <Text variant='body4' noOfLines={3} mb='14px'>
            {suggestion.description}
          </Text>
        </Flex>
        <Flex direction='column'>
          <Badge variant='suggestionTag' maxH='30px' mb='16px'>
            {suggestion?.category}
          </Badge>
          <Flex justify='space-between'>
            <Toggle
              isToggled={!!hasVoted}
              label={suggestion.votesCount.toString()}
              onToggle={handleOnToggleVote}
              orientation='horizontal'
              leftIcon={FaChevronUp}
              size='xs'
            />
            <VotesCount suggestion={suggestion} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default SuggestionRoadmapCard
