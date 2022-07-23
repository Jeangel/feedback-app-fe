import IComment from '@app-types/Comment'
import { get } from '@utils/axios'
import { useQuery } from 'react-query'

interface IUseCommentsArgs {
  suggestionId: string
}

export const useComments = (params?: IUseCommentsArgs) => {
  const { data: response, ...rest } = useQuery(
    [`suggestion-${params?.suggestionId}-comments`],
    () =>
      get<IComment[]>({
        path: `/suggestions/${params?.suggestionId}/comments`,
      }),
    { keepPreviousData: true }
  )
  return { data: response?.data, ...rest }
}
