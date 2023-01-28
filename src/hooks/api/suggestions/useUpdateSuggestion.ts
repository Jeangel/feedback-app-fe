import { useMutation, useQueryClient } from 'react-query'
import Suggestion from '@app-types/Suggestion'
import { patch } from '@utils/axios'

interface IUpdateSuggestionArgs {
  suggestion: Partial<
    Omit<Suggestion, 'votesCount' | 'commentsCount' | 'myVote' | 'authorId'>
  >
}

interface IUpdateSuggestionResponse {
  suggestion: Suggestion
}

export const useUpdateSuggestion = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ suggestion }: IUpdateSuggestionArgs) => {
      const { _id, ...updates } = suggestion
      return patch<IUpdateSuggestionResponse>({
        path: `/suggestions/${_id}`,
        body: updates,
      })
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('suggestion')
        queryClient.invalidateQueries('board-suggestions')
      },
    }
  )
}
