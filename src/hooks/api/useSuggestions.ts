import IFeedback from '@app-types/Feedback'
import { EFeedbackCategory } from '@app-types/FeedbackCategory'
import { IPaginatedResults, IPaginationArgs } from '@app-types/Pagination'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

interface IUseSuggestionsArgs extends IPaginationArgs {
  filters?: {
    categories?: EFeedbackCategory[]
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
      get<IPaginatedResults<IFeedback>>({
        path: '/feedback',
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
