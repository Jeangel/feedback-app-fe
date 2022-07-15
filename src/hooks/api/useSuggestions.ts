import ISuggestion from '@app-types/Suggestion'
import { ESuggestionCategory } from '@app-types/SuggestionCategory'
import { IPaginatedResults, IPaginationArgs } from '@app-types/Pagination'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

interface IUseSuggestionsArgs extends IPaginationArgs {
  filters?: {
    categories?: ESuggestionCategory[]
  }
}

export const useSuggestions = (params?: IUseSuggestionsArgs) => {
  const { data: response, ...rest } = useQuery(
    [
      'suggestions',
      params?.pagination.page,
      params?.sort?.by,
      params?.sort?.order,
      params?.filters?.categories?.join(''),
    ],
    () =>
      get<IPaginatedResults<ISuggestion>>({
        path: '/suggestions',
        urlParams: {
          pagination: JSON.stringify(params?.pagination),
          sort: JSON.stringify(params?.sort),
          filters: JSON.stringify(params?.filters)
        },
      }),
    { keepPreviousData: true }
  )
  const { results, pagination } = response?.data || {}
  return { data: results, ...rest, pagination }
}
