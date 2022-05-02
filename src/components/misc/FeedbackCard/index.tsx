import { 
  Box, 
  Flex, 
  Text, 
  Badge,
  Icon,
} from '@chakra-ui/react'

import { FaChevronUp, FaComment } from 'react-icons/fa'

interface IFeedbackCardProps{
  title: string,
  description: string,
  category: string,
  votesCount: number,
  commentsCount: number,
}

const FeedbackCard = ({title, description, category, votesCount, commentsCount}: IFeedbackCardProps) => {
  return (
    <Box 
      bg='white'
      flexDir='row'
      display='flex'
      flexWrap='wrap'
      w={[327, 689, 825]} 
      h={[200, 151, 151]} 
      borderRadius='10px' p='24px' 
      justifyContent='space-between'
      sx={{
        '@media screen and (min-width: 768px)': {
          padding: '32px',
          height: 'fit-content'
        }
      }}
    >
      <Flex 
        h='104px' 
        direction='column' 
        justifyContent='space-between' 
        marginBottom='16px'
        sx={{
          '@media screen and (min-width: 768px)': {
            order: 1,
            width: '75%',
            marginBottom: 0
          }
        }}
      >
        <Text 
          variant='body3' 
          fontWeight='bold'
          sx={{
            '@media screen and (min-width: 768px)': {
              fontSize: '18px'
            }
          }}
        >
          {title}
        </Text>
        <Text 
          variant='body3' 
          fontWeight='normal'
          sx={{
            '@media screen and (min-width: 768px)': {
              fontSize: '16px'
            }
          }}
        >
          {description}
        </Text>
        <Badge variant='feedbackTag'>{category}</Badge>
      </Flex>
      <Badge 
        variant='feedbackTag' 
        color='tertiary.500'
        sx={{
          '@media screen and (min-width: 768px)': {
            order: 0,
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 15px'
          }
        }}
      >
        <Icon 
          as={FaChevronUp} 
          marginRight='10px' 
          color='secondary.500'
          sx={{
            '@media screen and (min-width: 768px)': {
              marginRight: 0
            }
          }}
        /> 
        {votesCount}
      </Badge>
      <Box 
        display='flex' 
        flexDir='row' 
        alignItems='center'
        sx={{
          '@media screen and (min-width: 768px)': {
            order: 2
          }
        }}
      >
        <Icon 
          as={FaComment} 
          marginRight='4px' 
          color='#CDD2EE'
          sx={{
            '@media screen and (min-width: 768px)': {
              fontSize: '18px'
            }
          }}
        />
        <Text 
          variant='body3' 
          fontWeight='bold'
          color={commentsCount === 0 ? 'gray.400' : 'tertiary.500'}
          sx={{
            '@media screen and (min-width: 768px)': {
              fontSize: '16px'
            }
          }}
        >
          {commentsCount}
        </Text>
      </Box>
    </Box>
  )
}

export default FeedbackCard