import IFeedback from '@app-types/Feedback'
import { IPaginatedResults, IPaginationArgs } from '@app-types/Pagination'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

interface IUseSuggestionsArgs extends IPaginationArgs {}

export const useSuggestions = (params?: IUseSuggestionsArgs) => {
  const { data: response, ...rest } = useQuery('suggestions', () =>
    get<IPaginatedResults<IFeedback>>({
      path: '/feedback',
      urlParams: {
        pagination: JSON.stringify(params?.pagination),
      },
    })
  )
  const { results, total } = response?.data || {}
  return { data: results, ...rest, pagination: { total: total } }
}
