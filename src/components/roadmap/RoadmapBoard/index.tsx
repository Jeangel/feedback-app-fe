import { useState, useEffect } from 'react'
import { Box, Show, useToast } from '@chakra-ui/react'
import { DragDropContext, DragDropContextProps, DropResult } from 'react-beautiful-dnd'
import Column from './Column'
import { IBoardColumn } from '@app-types/Board'
import { isSuggestionStatus } from '@app-types/SuggestionStatus'
import { ApiError } from '@utils/axios'
import { useMoveSuggestion } from '@hooks/api/suggestions/useMoveBoardSuggestion'

interface IRoadmapBoardProps {
  columns: IBoardColumn[]
}

const RoadmapBoard = ({ columns }: IRoadmapBoardProps) => {
  const { mutate: moveSuggestion } = useMoveSuggestion()
  const [isWindowReady, setIsWindowReady] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const toast = useToast()

  useEffect(() => {
    setIsWindowReady(typeof window !== 'undefined')
  }, [])

  if (!isWindowReady) return null

  const handleOnDragInColumn = async (result: DropResult) => {
    const { source, destination, draggableId: element } = result
    if (!destination) return

    const newStatus = destination.droppableId
    const oldStatus = source.droppableId
    if (isSuggestionStatus(newStatus) && isSuggestionStatus(oldStatus)) {
      moveSuggestion(
        {
          suggestionId: element,
          from: oldStatus,
          to: newStatus,
        },
        {
          onError: (error) => {
            const apiError = error as ApiError
            if (apiError.httpStatusCode === 403) {
              toast({
                status: 'error',
                description: 'You can only update your own suggestions',
              })
            } else {
              toast({ status: 'error', description: apiError.message })
            }
          },
        }
      )
    }
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
        <Show above='sm'>
          <Box display='flex'>
            {columns.map((column) => (
              <Column
                items={column.suggestions}
                key={column._id}
                name={column._id}
                description={column.description}
                width={{
                  sm: '100%',
                  md: `${Math.floor(100 / columns.length)}%`,
                }}
              />
            ))}
          </Box>
        </Show>
      </DragDropContext>
    </Box>
  )
}

export default RoadmapBoard
