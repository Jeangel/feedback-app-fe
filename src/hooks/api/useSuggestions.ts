import IFeedback from '@app-types/Feedback'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

export const useSuggestions = () => {
  const { data, ...rest } = useQuery('suggestions', () =>
    get<IFeedback[]>({ path: '/feedback' })
  )
  return { data: data?.data, ...rest }
}
