import { EFeedbackCategory } from './FeedbackCategory'
import { EFeedbackStatus } from './FeedbackStatus'

interface IFeedback {
  _id: string
  title: string
  description: string
  category: EFeedbackCategory
  status: EFeedbackStatus
}

export default IFeedback
