import { ISuggestionsStats } from '@app-types/SuggestionsStats'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

export const useSuggestionsStats = () => {
  const { data: response, ...rest } = useQuery(
    ['suggestions'],
    () => get<ISuggestionsStats>({ path: '/suggestions-stats' }),
    { keepPreviousData: true }
  )
  const stats = response?.data
  return { data: stats, ...rest }
}
