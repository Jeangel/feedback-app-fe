import React from 'react'

import { Box, Flex, Text, Badge, Icon, useBreakpointValue } from '@chakra-ui/react'

import { FaChevronUp, FaComment } from 'react-icons/fa'

import Toggle from '../../forms/Toggle'

interface IFeedbackCardProps {
  title: string
  description: string
  category: string
  votesCount: number
  commentsCount: number
}

const FeedbackCard = ({
  title,
  description,
  category,
  votesCount,
  commentsCount,
}: IFeedbackCardProps) => {
  const [isToggled, setIsToggled] = React.useState(false)
  const [votes, setVotes] = React.useState(votesCount)
  const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
    sm: 'horizontal',
    md: 'vertical',
  })

  React.useEffect(() => {
    setVotes((oldValue) => (isToggled ? oldValue + 1 : oldValue - 1))
  }, [isToggled])

  const toggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <Box
      bg='white'
      flexDir='row'
      display='flex'
      flexWrap='wrap'
      w={{ sm: '327px', md: '689px', lg: '825px' }}
      h={{ sm: '200px', md: '151px', lg: '151px' }}
      p={{ sm: '24px', md: '32px' }}
      borderRadius='10px'
      justifyContent='space-between'
    >
      <Flex
        h='104px'
        direction='column'
        justifyContent='space-between'
        marginBottom={{ sm: '16px', md: 0 }}
        width={{ md: '75%' }}
        order={{ md: 1 }}
      >
        <Text variant='body3' fontWeight='bold' fontSize={{ md: '18px' }}>
          {title}
        </Text>
        <Text variant='body3' fontWeight='normal' fontSize={{ md: '16px' }}>
          {description}
        </Text>
        <Badge variant='feedbackTag'>{category}</Badge>
      </Flex>
      <Toggle
        isToggled={isToggled}
        label={votes.toString()}
        onToggle={toggle}
        orientation={orientation}
        topIcon={orientation === 'vertical' ? FaChevronUp : undefined}
        leftIcon={orientation === 'horizontal' ? FaChevronUp : undefined}
      />
      <Box display='flex' flexDir='row' alignItems='center' order={{ md: 2 }}>
        <Icon
          as={FaComment}
          marginRight='4px'
          color='gray.300'
          fontSize={{ md: '18px' }}
        />
        <Text
          variant='body3'
          fontWeight='bold'
          color={commentsCount === 0 ? 'gray.400' : 'tertiary.500'}
          fontSize={{ md: '16px' }}
        >
          {commentsCount}
        </Text>
      </Box>
    </Box>
  )
}

export default FeedbackCard
