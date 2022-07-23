import IComment from '@app-types/Comment'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

interface IUseCommentsArgs {
  suggestionId: string
}

const fetchComments = ({ suggestionId }: IUseCommentsArgs) => {
  return get<IComment[]>({
    path: `/suggestions/${suggestionId}/comments`,
  })
}

export const useComments = ({ suggestionId }: IUseCommentsArgs) => {
  const { data: response, ...rest } = useQuery(
    [`suggestion.${suggestionId}.comments`],
    () => fetchComments({ suggestionId }),
    { keepPreviousData: true }
  )
  return { data: response?.data, ...rest }
}
