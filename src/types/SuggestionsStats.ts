import { SuggestionStatusValue } from './SuggestionStatus'

export interface ISuggestionsStats {
  countByStatus: {
    [K in SuggestionStatusValue]: number
  }
}
