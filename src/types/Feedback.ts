import { EFeedbackCategory } from './FeedbackCategory'
import { EFeedbackStatus } from './FeedbackStatus'

interface IFeedback {
  _id: string
  title: string
  description: string
  category: EFeedbackCategory
  status: EFeedbackStatus
  votesCount: number
  commentsCount: number
  myVote?: {
    _id: string
    value: number
  }
}

export default IFeedback
