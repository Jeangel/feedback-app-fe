import { Flex, Heading } from '@chakra-ui/react'
import GoBackButton from '@components/navigation/GoBackButton'
import AddSuggestionButton from '@components/suggestion/AddSuggestionButton'

const RoadmapNav = () => (
  <Flex
    w='full'
    bg='tertiary.600'
    m={{ sm: '0', md: '40px 0 24px 0', lg: '0' }}
    borderRadius={{ sm: 0, md: '10px' }}
    p={{ base: '8px 24px', md: '18px 12px 18px 24px' }}
    flexWrap='wrap'
    justifyContent='space-between'
  >
    <Flex justifyContent='space-between' alignItems='center' w='full'>
      <Flex direction='column' alignItems='flex-start'>
        <GoBackButton color='white' iconProps={{ color: 'white' }} />
        <Heading variant='h1' color='white' mt='4px'>
          Roadmap
        </Heading>
      </Flex>
      <AddSuggestionButton />
    </Flex>
  </Flex>
)

export default RoadmapNav
