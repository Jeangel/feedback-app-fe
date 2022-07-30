import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd'
import Column from './Column'

interface IColumnData<T> {
  name: string
  description: string
  items: T[]
}

const tempDataArr: IColumnData<string>[] = [
  {
    name: 'Todo',
    description: 'Ideas prioritized for research',
    items: ['hello', 'hallo', 'alo', 'ola'],
  },
  {
    name: 'In Progress',
    description: 'Currently being developed',
    items: ['good', 'gut', 'bem', 'bien'],
  },
  { name: 'Done', description: 'Released features', items: ['abc', 'def', 'ghi', 'jkl'] },
]

const RoadmapBoard = () => {
  const [isWindowReady, setIsWindowReady] = useState(false)
  const [columns, setColumns] = useState<IColumnData<string>[]>(tempDataArr)
  useEffect(() => {
    setIsWindowReady(typeof window !== 'undefined')
  }, [])

  if (!isWindowReady) return null

  const handleOnDragEnd: DragDropContextProps['onDragEnd'] = (result) => {
    const { source, destination, draggableId: element } = result
    if (!destination) return

    // Remove element from source
    let newColumns = columns.map((e) => {
      const isSource = e.name === source.droppableId
      if (!isSource) return e
      return { ...e, items: e.items.filter((e) => e !== element) }
    })
    // Add element to destination
    newColumns = newColumns.map((e) => {
      const isDestination = e.name === destination.droppableId
      if (!isDestination) return e
      const items = [...e.items]
      items.splice(destination.index, 0, element)
      return { ...e, items }
    })
    setColumns(newColumns)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Box display='flex'>
        {columns.map((column) => (
          <Column
            items={column.items}
            key={column.name}
            name={column.name}
            description={column.description}
            width={`${Math.floor(100 / columns.length)}%`}
          />
        ))}
      </Box>
    </DragDropContext>
  )
}

export default RoadmapBoard
