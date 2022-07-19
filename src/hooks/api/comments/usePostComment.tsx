import { useMutation, useQueryClient } from 'react-query'
import Suggestion from '@app-types/Suggestion'
import { post } from '@utils/axios'

interface IPostCommentArgs {
  body: string
  suggestionId: string
}

interface IPostCommentResponse {
  suggestion: Suggestion
}

export const usePostComment = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ body, suggestionId }: IPostCommentArgs) =>
      post<IPostCommentResponse>({
        path: `/suggestions/${suggestionId}/comments`,
        body: {
          body,
        },
      }),
    {
      onSettled: (data, error, variables) =>
        queryClient.invalidateQueries(`suggestion-${variables.suggestionId}-comments`),
    }
  )
}
