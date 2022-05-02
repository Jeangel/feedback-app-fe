import { 
  Box, 
  Flex, 
  Text, 
  Badge 
} from '@chakra-ui/react'

import { ChevronUpIcon,  } from '@chakra-ui/icons'

import Toggle from '@components/forms/Toggle'

interface IFeedbackCardProps{
  title: string,
  description: string,
  category: string,
  votesCount: number,
  commentsCount: number,
}

const FeedbackCard = ({title, description, category, votesCount, commentsCount}: IFeedbackCardProps) => {
  const toggle = () => {
    console.log('toggled!!')
  }

  return <Box w={[327, 689, 825]} h={[200, 151, 151]} bg='white' borderRadius='10px' p='24px'>
    <Flex h='104px' direction='column' justifyContent='space-between' marginBottom='16px'>
      <Text variant='body3' fontWeight='bold'>{title}</Text>
      <Text variant='body3' fontWeight='normal'>{description}</Text>
      <Badge variant='feedbackTag'>{category}</Badge>
    </Flex>
    <Toggle 
      isToggled={false}
      label={String(votesCount)}
      onToggle={toggle}
      orientation='horizontal'
      leftIcon={ChevronUpIcon}
    />
    {/* Add the comments part */}
  </Box>
}

export default FeedbackCard