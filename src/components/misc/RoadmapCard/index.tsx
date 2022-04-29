import { Box, Heading, Button, Text, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import RoadmapLine from './RoadmapLine'

interface IRoadmapCardProps {
  planned: number,
  inProgress: number,
  live: number,
}

const RoadmapCard = ({ planned, inProgress, live }: IRoadmapCardProps) => {
  const router = useRouter()
  const redirect = () => {
    router.push('/roadmap')
  }

  return (
    <Box h='178px' w='full' bg='white' borderRadius='10px' p="24px">
      <Flex direction="row" justify="space-between" marginBottom="20px">
        <Heading variant="h3">Roadmap</Heading>
        <Button variant="link" textDecoration="underline" onClick={redirect}>
          <Text variant="body3" color="secondary.500">View</Text>
        </Button>
      </Flex>
      <Flex direction="column">
        <RoadmapLine bulletColor="#F49F85" concept="Planned" amount={planned}/>
        <RoadmapLine bulletColor="#AD1FEA" concept="In-Progress" amount={inProgress}/>
        <RoadmapLine bulletColor="#62BCFA" concept="Live" amount={live}/>
      </Flex>
    </Box>
  )
}

export default RoadmapCard
