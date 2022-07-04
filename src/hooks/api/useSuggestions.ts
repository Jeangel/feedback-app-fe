import IFeedback from '@app-types/Feedback'
import { IPaginatedResults, IPaginationArgs } from '@app-types/Pagination'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

interface IUseSuggestionsArgs extends IPaginationArgs {}

export const useSuggestions = (params?: IUseSuggestionsArgs) => {
  const {
    data: response,
    ...rest
  } = useQuery(
    ['suggestions', params?.pagination.page, params?.sort?.by, params?.sort?.order],
    () =>
      get<IPaginatedResults<IFeedback>>({
        path: '/feedback',
        urlParams: {
          pagination: JSON.stringify(params?.pagination),
          sort: JSON.stringify(params?.sort),
        },
      }),
    { keepPreviousData: true }
  )
  const { results, pagination } = response?.data || {}
  return { data: results, ...rest, pagination }
}
