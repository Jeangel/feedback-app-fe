import { useState, useEffect } from 'react'
import {
  Box,
  Hide,
  Show,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { DragDropContext, DragDropContextProps, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import { IBoardColumn } from '@app-types/Board'

interface IRoadmapBoardProps {
  columns: IBoardColumn[]
}

const RoadmapBoard = ({ columns }: IRoadmapBoardProps) => {
  const [isWindowReady, setIsWindowReady] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  // const [columns, setColumns] = useState<IBoardColumn[]>(initialColumns)
  useEffect(() => {
    setIsWindowReady(typeof window !== 'undefined')
  }, [])

  if (!isWindowReady) return null

  const handleOnDragInColumn = (result: DropResult) => {
    const { source, destination, draggableId: element } = result
    if (!destination) return

    // Remove element from source
    let newColumns = columns.map((e) => {
      const isSource = e._id === source.droppableId
      if (!isSource) return e
      return { ...e, suggestions: e.suggestions.filter((e) => e._id !== element) }
    })
    // Add element to destination
    newColumns = newColumns.map((e) => {
      const isDestination = e._id === destination.droppableId
      if (!isDestination) return e
      const suggestions = [...e.suggestions]
      // suggestions.splice(destination.index, 0, element)
      return { ...e, suggestions }
    })
    // setColumns(newColumns)
  }

  const handleOnDragInTab = (result: DropResult) => {
    const { destination } = result
    if (!destination) return
    setTabIndex(columns.findIndex((e) => e._id === destination?.droppableId))
  }

  const handleOnDragEnd: DragDropContextProps['onDragEnd'] = (result) => {
    const { destination } = result
    if (!destination) return

    if (destination.droppableId.startsWith('tab')) {
      handleOnDragInTab(result)
    } else {
      handleOnDragInColumn(result)
    }
  }

  return (
    <Box>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Hide above='sm'>
          <Tabs index={tabIndex} onChange={setTabIndex} isFitted>
            <TabList>
              {columns.map((column) => (
                <Tab fontSize='12px' key={column._id}>
                  {column._id} ({column.suggestions.length})
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {columns.map((column) => (
                <TabPanel key={column._id}>
                  <Column
                    items={column.suggestions}
                    key={column._id}
                    name={column._id}
                    description={column.description}
                    width='100%'
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Hide>
        <Show above='sm'>
          <Box display='flex'>
            {columns.map((column) => (
              <Column
                items={column.suggestions}
                key={column._id}
                name={column._id}
                description={column.description}
                width={`${Math.floor(100 / columns.length)}%`}
              />
            ))}
          </Box>
        </Show>
      </DragDropContext>
    </Box>
  )
}

export default RoadmapBoard
