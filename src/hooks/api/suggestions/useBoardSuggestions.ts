import { get } from '@utils/axios'
import { useQuery } from 'react-query'
import { IBoard } from '@app-types/Board'

export const useBoardSuggestions = () => {
  const { data: response, ...rest } = useQuery(['board-suggestions'], () =>
    get<IBoard>({
      path: '/board-suggestions',
    })
  )
  const { columns } = response?.data || { columns: [] }
  return { columns, ...rest }
}
