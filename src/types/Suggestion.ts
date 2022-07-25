import { ESuggestionCategory } from './SuggestionCategory'
import { ESuggestionStatus } from './SuggestionStatus'

interface ISuggestion {
  _id: string
  title: string
  description: string
  category: ESuggestionCategory
  status: ESuggestionStatus
  votesCount: number
  commentsCount?: number
  authorId: string
  myVote?: {
    _id: string
    value: number
  }
}

export default ISuggestion
