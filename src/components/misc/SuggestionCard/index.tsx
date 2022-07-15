import React from 'react'

import {
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  useBreakpointValue,
  Skeleton,
} from '@chakra-ui/react'
import { FaChevronUp, FaComment } from 'react-icons/fa'
import Toggle from 'components/forms/Toggle'

export interface ISuggestionCardProps {
  _id?: string
  title?: string
  description?: string
  category?: string
  votesCount?: number
  hasVoted?: boolean
  commentsCount?: number
  onToggleVote: (args: { value: boolean; _id: string }) => void
  isLoading?: boolean
}

const SuggestionCard = ({
  _id,
  title,
  description,
  category,
  votesCount,
  commentsCount,
  hasVoted,
  onToggleVote,
  isLoading,
}: ISuggestionCardProps) => {
  const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
    sm: 'horizontal',
    md: 'vertical',
  })

  return (
    <Box
      bg='white'
      flexDir='row'
      display='flex'
      flexWrap='wrap'
      w='full'
      maxW={{ sm: '327px', md: '689px', lg: '825px' }}
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
        width={{ sm: 'full', md: '75%' }}
        order={{ md: 1 }}
      >
        <Skeleton variant='text-body3' isLoaded={!isLoading}>
          <Text variant='body3' fontWeight='bold' fontSize={{ md: '18px' }}>
            {title}
          </Text>
        </Skeleton>
        <Skeleton variant='text-body3' isLoaded={!isLoading}>
          <Text
            variant='body3'
            fontWeight='normal'
            fontSize={{ md: '16px' }}
            noOfLines={1}
          >
            {description}
          </Text>
        </Skeleton>
        <Skeleton height='33px' width='112px' isLoaded={!isLoading}>
          <Badge variant='suggestionTag'>{category}</Badge>
        </Skeleton>
      </Flex>
      <Skeleton
        height={{ sm: '40px', md: '53px' }}
        width={{ sm: '72px', md: '46px' }}
        isLoaded={!isLoading}
      >
        <Toggle
          isToggled={hasVoted!}
          label={votesCount?.toString() || ''}
          onToggle={(value) => onToggleVote({ value, _id: _id! })}
          orientation={orientation}
          topIcon={orientation === 'vertical' ? FaChevronUp : undefined}
          leftIcon={orientation === 'horizontal' ? FaChevronUp : undefined}
        />
      </Skeleton>
      <Box display='flex' flexDir='row' alignItems='center' order={{ md: 2 }}>
        <Skeleton display='flex' flexDir='row' width='32px' isLoaded={!isLoading}>
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
        </Skeleton>
      </Box>
    </Box>
  )
}

export default SuggestionCard
