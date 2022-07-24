import { useMutation, useQueryClient } from 'react-query'
import Suggestion from '@app-types/Suggestion'
import { post } from '@utils/axios'

interface IPostReplyArgs {
  body: string
  commentId: string
  suggestionId: string
}

interface IPostReplyResponse {
  suggestion: Suggestion
}

export const usePostReply = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ body, commentId }: IPostReplyArgs) =>
      post<IPostReplyResponse>({
        path: `/comments/${commentId}/reply`,
        body: {
          body,
        },
      }),
    {
      onSettled: (data, error, variables) => {
        console.log(variables.suggestionId)
        queryClient.invalidateQueries(`suggestions.${variables.suggestionId}.comments`)
      },
    }
  )
}
