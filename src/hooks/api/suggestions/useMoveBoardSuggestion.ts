import { useMutation, useQueryClient } from 'react-query'
import Suggestion from '@app-types/Suggestion'
import { patch } from '@utils/axios'
import { IBoard } from '@app-types/Board'
import { ESuggestionStatus } from '@app-types/SuggestionStatus'
import { AxiosResponse } from 'axios'
import { moveSuggestion } from '@utils/boardSuggestions'

interface IMoveBoardSuggestionArgs {
  suggestionId: string
  from: ESuggestionStatus
  to: ESuggestionStatus
}

interface IMoveBoardSuggestionResponse {
  suggestion: Suggestion
}

type QueryResponse = AxiosResponse<IBoard>

export const useMoveSuggestion = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ suggestionId, to }: IMoveBoardSuggestionArgs) => {
      return patch<IMoveBoardSuggestionResponse>({
        path: `/suggestions/${suggestionId}`,
        body: { status: to },
      })
    },
    {
      onMutate: async ({
        suggestionId,
        from,
        to,
      }): Promise<QueryResponse | undefined> => {
        await queryClient.cancelQueries({ queryKey: 'board-suggestions' })

        // Snapshot the previous value
        const previousResponse =
          queryClient.getQueryData<QueryResponse>('board-suggestions')
        const previousBoard = previousResponse?.data

        if (!previousBoard) return previousResponse

        // Optimistically update to the new value
        const board = moveSuggestion({ board: previousBoard, suggestionId, from, to })
        queryClient.setQueryData<QueryResponse>('board-suggestions', {
          ...previousResponse,
          data: board,
        })

        return previousResponse
      },
      // If the mutation fails,
      // use the context returned from onMutate to roll back
      onError: (_err, variables, context) => {
        const previousResponse = context
        if (previousResponse) {
          queryClient.setQueryData<QueryResponse>('board-suggestions', previousResponse)
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: 'board-suggestions' })
      },
    }
  )
}
