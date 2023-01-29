import { colorsMap } from '@app-types/SuggestionStatus'
import { Box, Heading, Button, Text, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import RoadmapLine from './RoadmapLine'

interface IRoadmapCardProps {
  suggestion?: number
  planned?: number
  inProgress?: number
  live?: number
}

const RoadmapCard = ({
  planned = 0,
  inProgress = 0,
  live = 0,
  suggestion = 0,
}: IRoadmapCardProps) => {
  const router = useRouter()
  const redirect = () => {
    router.push('/roadmap')
  }

  return (
    <Box h='178px' w='full' minW='223px' bg='white' borderRadius='10px' p='24px'>
      <Flex direction='row' justify='space-between' marginBottom='10px'>
        <Heading variant='h3'>Roadmap</Heading>
        <Button variant='link' textDecoration='underline' onClick={redirect}>
          <Text variant='body3' color='secondary.500'>
            View
          </Text>
        </Button>
      </Flex>
      <Flex direction='column'>
        <RoadmapLine
          bulletColor={colorsMap.Suggestion}
          concept='Suggestion'
          amount={suggestion}
        />
        <RoadmapLine bulletColor={colorsMap.Planned} concept='Planned' amount={planned} />
        <RoadmapLine
          bulletColor={colorsMap['In-Progress']}
          concept='In-Progress'
          amount={inProgress}
        />
        <RoadmapLine bulletColor={colorsMap.Live} concept='Live' amount={live} />
      </Flex>
    </Box>
  )
}

export default RoadmapCard
