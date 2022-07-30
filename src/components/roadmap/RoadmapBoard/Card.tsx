import { Center } from '@chakra-ui/react'
import { Draggable } from 'react-beautiful-dnd'

const Card = ({ name, index }: { name: string; index: number }) => (
  <Draggable draggableId={name} index={index}>
    {(dragProvided) => (
      <div
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
      >
        <Center h='100' w='100' outline='1px solid black' m='10px'>
          {name}
        </Center>
      </div>
    )}
  </Draggable>
)

export default Card
