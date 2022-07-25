import { Box, Flex, Text } from '@chakra-ui/react'

interface IRoadmapLineProps {
  bulletColor: string
  concept: string
  amount: number
}

const RoadmapLine = ({ bulletColor, concept, amount }: IRoadmapLineProps) => {
  return (
    <Flex direction='row' justify='space-between' align='center' marginBottom='8px'>
      <Flex direction='row' align='center'>
        <Box
          bgColor={bulletColor}
          w='8px'
          h='8px'
          borderRadius='50px'
          marginRight='16px'
        />
        <Text variant='body' color='tertiary.200'>
          {concept}
        </Text>
      </Flex>
      <Text variant='body' fontWeight='bold' color='tertiary.200'>
        {amount}
      </Text>
    </Flex>
  )
}

export default RoadmapLine
