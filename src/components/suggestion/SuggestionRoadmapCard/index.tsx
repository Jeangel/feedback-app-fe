import ISuggestion from '@app-types/Suggestion'
import { Box, Flex } from '@chakra-ui/react'
import StatusBadge from './StatusBadge'
import { colorsMap } from './util'

export interface ISuggestionRoadmapCardProps {
  hasVoted?: boolean
  suggestion?: ISuggestion | null
  onClick?: () => void
  isLoading?: boolean
}

const SuggestionRoadmapCard = ({ suggestion }: ISuggestionRoadmapCardProps) => {
  if (!suggestion) return null
  return (
    <Box
      h='272px'
      maxW='350px'
      borderRadius='5px'
      bg='white'
      m='10px'
      p='32px'
      position='relative'
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
      <Flex direction='column'>
        {suggestion && <StatusBadge status={suggestion.status} />}
        <p>{suggestion.title}</p>
      </Flex>
    </Box>
  )
}

export default SuggestionRoadmapCard
