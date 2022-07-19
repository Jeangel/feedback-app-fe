import ISuggestion from '@app-types/Suggestion'
import { get, IExtraRequestOptions } from '@utils/axios'
import { useQuery } from 'react-query'

interface IFetchSuggestionRequest extends IExtraRequestOptions {
  id: string
}

interface IFetchSuggestionResponse {
  suggestion: ISuggestion[]
}

export const fetchSuggestion = async ({ id, ssr }: IFetchSuggestionRequest) => {
  return get<IFetchSuggestionResponse>({ path: `/suggestions/${id}`, ssr })
}

export const useSuggestion = ({ id }: IFetchSuggestionRequest) => {
  const { data, ...rest } = useQuery([id], () => fetchSuggestion({ id }))
  return { data: data?.data, ...rest }
}
