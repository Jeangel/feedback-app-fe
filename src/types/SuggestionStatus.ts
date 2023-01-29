export enum ESuggestionStatus {
  suggestion = 'Suggestion',
  planned = 'Planned',
  inProgress = 'In-Progress',
  live = 'Live',
}

export type SuggestionStatusValue = 'Suggestion' | 'Planned' | 'In-Progress' | 'Live'

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

export const colorsMap = {
  [ESuggestionStatus.suggestion]: 'gray.400',
  [ESuggestionStatus.planned]: 'warning.300',
  [ESuggestionStatus.inProgress]: 'primary.500',
  [ESuggestionStatus.live]: 'info.300',
}

export const isSuggestionStatus = (value: string): value is ESuggestionStatus => {
  return Object.values(ESuggestionStatus).includes(value as ESuggestionStatus)
}
