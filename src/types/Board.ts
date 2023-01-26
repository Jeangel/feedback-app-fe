import ISuggestion from './Suggestion'
import { ESuggestionStatus } from './SuggestionStatus'

export interface IBoardColumn {
  _id: ESuggestionStatus
  description: string
  suggestions: ISuggestion[]
}

export interface IBoard {
  columns: IBoardColumn[]
}
