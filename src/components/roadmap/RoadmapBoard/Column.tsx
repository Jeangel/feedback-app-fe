import { Box, Heading, Text } from '@chakra-ui/react'
import { StrictModeDroppable } from '@components/helper/StrictModeDroppable'
import Card from './Card'

interface IColumnProps {
  width: number | string
  items: string[]
  name: string
  description: string
}

const Column = ({ items, name, width, description }: IColumnProps) => {
  return (
    <StrictModeDroppable droppableId={name}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.droppableProps} w={width}>
          <Box px='10px' mb='24px'>
            <Heading variant='h4' mb='4px'>
              {name} ({items.length})
            </Heading>
            <Text variant='body2' color='tertiary.200'>
              {description}
            </Text>
          </Box>
          {items.map((e, i) => (
            <Card name={e} key={e} index={i} />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </StrictModeDroppable>
  )
}

export default Column