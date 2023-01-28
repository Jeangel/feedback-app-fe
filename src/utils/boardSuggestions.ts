import { IBoard } from '@app-types/Board'
import { ESuggestionStatus } from '@app-types/SuggestionStatus'

interface ISuggestionArgs {
  board: IBoard
  from: ESuggestionStatus
  to: ESuggestionStatus
  suggestionId: string
}

export const moveSuggestion = ({
  board,
  from,
  to,
  suggestionId,
}: ISuggestionArgs): IBoard => {
  const previousColumn = board.columns.find((e) => e._id === from)
  const nextColumn = board.columns.find((e) => e._id === to)
  const suggestion = previousColumn?.suggestions.find((e) => e._id === suggestionId)
  if (!previousColumn || !nextColumn || !suggestion) {
    return board
  }
  const updatedSuggestion = {
    ...suggestion,
    status: to,
  }
  const updatedColumns = board.columns.map((column) => {
    if (column._id === from) {
      return {
        ...column,
        suggestions: column.suggestions.filter((e) => e._id !== suggestionId),
      }
    }
    if (column._id === to) {
      return {
        ...column,
        suggestions: column.suggestions.concat(updatedSuggestion),
      }
    }
    return column
  })
  return {
    columns: updatedColumns,
  }
}
