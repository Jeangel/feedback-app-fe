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
import ISuggestion from '@app-types/Suggestion'
import useOnSuggestionVote from '@hooks/actions/useOnSuggestionVote'
import { motion } from 'framer-motion'

export interface ISuggestionCardProps {
  hasVoted?: boolean
  suggestion?: ISuggestion | null
  onClick?: () => void
  isLoading?: boolean
  isFull?: boolean
}

const SuggestionCard = ({
  suggestion,
  hasVoted,
  isLoading,
  onClick,
  isFull,
}: ISuggestionCardProps) => {
  const onSuggestionVote = useOnSuggestionVote()
  const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
    sm: 'horizontal',
    md: 'vertical',
  })
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const handleOnToggleVote = (value: boolean) => {
    if (suggestion) {
      onSuggestionVote({ value, _id: suggestion._id })
    }
  }

  return (
    <Box
      as={motion.div}
      bg='white'
      flexDir='row'
      display='flex'
      flexWrap='wrap'
      w='full'
      maxW={{ sm: '327px', md: '689px', lg: '100%' }}
      h={isFull ? '100%' : { sm: '200px', md: '151px', lg: '151px' }}
      p={{ sm: '24px', md: '32px' }}
      borderRadius='10px'
      justifyContent='space-between'
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'auto'}
      variants={item}
    >
      <Flex
        h={isFull ? '100%' : '104px'}
        direction='column'
        justifyContent='space-between'
        marginBottom={{ sm: '16px', md: 0 }}
        width={{ sm: 'full', md: '75%' }}
        order={{ md: 1 }}
      >
        <Skeleton variant='text-body3' isLoaded={!isLoading}>
          <Text variant='body3' fontWeight='bold' fontSize={{ md: '18px' }}>
            {suggestion?.title}
          </Text>
        </Skeleton>
        <Skeleton
          variant='text-body3'
          isLoaded={!isLoading}
          my={isFull ? '12px' : undefined}
        >
          <Text
            variant='body3'
            fontWeight='normal'
            fontSize={{ md: '16px' }}
            noOfLines={isFull ? undefined : 1}
            py={isFull ? '12px' : undefined}
          >
            {suggestion?.description}
          </Text>
        </Skeleton>
        <Skeleton height='33px' width='112px' isLoaded={!isLoading}>
          <Badge variant='suggestionTag'>{suggestion?.category}</Badge>
        </Skeleton>
      </Flex>
      <Skeleton
        height={{ sm: '40px', md: '53px' }}
        width={{ sm: '72px', md: '46px' }}
        isLoaded={!isLoading}
      >
        <Toggle
          isToggled={!!hasVoted}
          label={suggestion?.votesCount?.toString() || ''}
          onToggle={handleOnToggleVote}
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
            color={suggestion?.commentsCount === 0 ? 'gray.400' : 'tertiary.500'}
            fontSize={{ md: '16px' }}
          >
            {suggestion?.commentsCount}
          </Text>
        </Skeleton>
      </Box>
    </Box>
  )
}

export default SuggestionCard
