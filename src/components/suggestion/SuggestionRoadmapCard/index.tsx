import ISuggestion from '@app-types/Suggestion'
import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import Toggle from '@components/forms/Toggle'
import { FaChevronUp } from 'react-icons/fa'
import StatusBadge from './StatusBadge'
import { colorsMap } from './util'
import VotesCount from './VotesCount'

export interface ISuggestionRoadmapCardProps {
  hasVoted?: boolean
  suggestion?: ISuggestion | null
  onClick?: () => void
  isLoading?: boolean
}

const SuggestionRoadmapCard = ({ suggestion }: ISuggestionRoadmapCardProps) => {
  if (!suggestion) return null

  const hasVoted = suggestion.myVote?.value === 1
  const handleOnToggleVote = () => {}
  return (
    <Box
      h='272px'
      maxW='350px'
      borderRadius='5px'
      bg='white'
      m='10px'
      p='20px'
      position='relative'
      _active={{
        cursor: 'grab',
      }}
    >
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
          {suggestion && <StatusBadge status={suggestion.status} />}
          <Heading variant='h4' as='p' mt='14px' mb='11px'>
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
              label={suggestion?.votesCount?.toString() || ''}
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
