import { EFeedbackCategory } from './FeedbackCategory'

interface IFeedback {
  _id: string
  title: string
  description: string
  category: EFeedbackCategory
}

export default IFeedback
