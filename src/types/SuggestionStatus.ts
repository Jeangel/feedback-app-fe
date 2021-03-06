export enum ESuggestionStatus {
  suggestion = 'Suggestion',
  planned = 'Planned',
  inProgress = 'In-Progress',
  live = 'Live',
}

export const suggestionStatusOptions = [
  {
    value: ESuggestionStatus.suggestion,
    label: 'Suggestion',
  },
  {
    value: ESuggestionStatus.planned,
    label: 'Planned',
  },
  {
    value: ESuggestionStatus.inProgress,
    label: 'In-Progress',
  },
  {
    value: ESuggestionStatus.live,
    label: 'Live',
  },
]
