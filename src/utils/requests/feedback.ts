import Feedback from '@app-types/Feedback'
import { post } from '@utils/axios'

interface ICreateFeedbackArgs {
  feedback: Omit<Feedback, '_id'>
}

interface ICreateFeedbackResponse {
  feedback: Feedback
}

export const createFeedback = async ({ feedback }: ICreateFeedbackArgs) => {
  return post<ICreateFeedbackResponse>({ path: '/feedback', body: feedback })
}
