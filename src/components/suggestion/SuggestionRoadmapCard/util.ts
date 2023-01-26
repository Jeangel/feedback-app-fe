import { ESuggestionStatus } from '@app-types/SuggestionStatus'

export const colorsMap = {
  [ESuggestionStatus.suggestion]: 'gray.400',
  [ESuggestionStatus.planned]: 'warning.300',
  [ESuggestionStatus.inProgress]: 'primary.500',
  [ESuggestionStatus.live]: 'info.300',
}
