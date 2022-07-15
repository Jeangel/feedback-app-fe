import { useMutation, useQueryClient } from 'react-query'
import Suggestion from '@app-types/Suggestion'
import { patch } from '@utils/axios'

interface IUpdateSuggestionArgs {
  suggestion: Omit<Suggestion, 'votesCount'|'commentsCount'|'myVote'>
}

interface IUpdateSuggestionResponse {
  suggestion: Suggestion
}

export const useUpdateSuggestion = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ suggestion }: IUpdateSuggestionArgs) => {
      const { _id, ...updates } = suggestion
      return patch<IUpdateSuggestionResponse>({ path: `/suggestion/${_id}`, body: updates })
    },
    {
      onSettled: () => queryClient.invalidateQueries('suggestion'),
    }
  )
}
