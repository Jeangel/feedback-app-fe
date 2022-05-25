import { useMutation, useQueryClient } from 'react-query'
import Feedback from '@app-types/Feedback'
import { post } from '@utils/axios'

interface ICreateFeedbackArgs {
  feedback: Omit<Feedback, '_id'>
}

interface ICreateFeedbackResponse {
  feedback: Feedback
}

export const useCreateFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ feedback }: ICreateFeedbackArgs) =>
      post<ICreateFeedbackResponse>({ path: '/feedback', body: feedback }),
    {
      onSettled: () => queryClient.invalidateQueries('feedback'),
    }
  )
}
