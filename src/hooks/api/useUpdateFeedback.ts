import { useMutation, useQueryClient } from 'react-query'
import Feedback from '@app-types/Feedback'
import { patch } from '@utils/axios'

interface IUpdateFeedbackArgs {
  feedback: Omit<Feedback, 'votesCount'|'commentsCount'|'myVote'>
}

interface IUpdateFeedbackResponse {
  feedback: Feedback
}

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ feedback }: IUpdateFeedbackArgs) => {
      const { _id, ...updates } = feedback
      return patch<IUpdateFeedbackResponse>({ path: `/feedback/${_id}`, body: updates })
    },
    {
      onSettled: () => queryClient.invalidateQueries('feedback'),
    }
  )
}
