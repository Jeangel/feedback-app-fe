import { ESuggestionStatus } from '@app-types/SuggestionStatus'
import { Text, Circle, Flex } from '@chakra-ui/react'
import { colorsMap } from './util'

export interface IStatusBadgeProps {
  status: ESuggestionStatus
}

const StatusBadge = ({ status }: IStatusBadgeProps) => (
  <Flex alignItems='center'>
    <Circle size='8px' bg={colorsMap[status]} />
    <Text ml='16px' color='tertiary.200'>
      {status}
    </Text>
  </Flex>
)

export default StatusBadge
