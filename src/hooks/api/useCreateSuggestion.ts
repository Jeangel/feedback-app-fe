import { useMutation, useQueryClient } from 'react-query'
import Suggestion from '@app-types/Suggestion'
import { post } from '@utils/axios'

interface ICreateSuggestionArgs {
  suggestion: Pick<Suggestion, 'title' | 'category' | 'description'>
}

interface ICreateSuggestionResponse {
  suggestion: Suggestion
}

export const useCreateSuggestion = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ suggestion }: ICreateSuggestionArgs) =>
      post<ICreateSuggestionResponse>({ path: '/suggestions', body: suggestion }),
    {
      onSettled: () => queryClient.invalidateQueries('suggestion'),
    }
  )
}
