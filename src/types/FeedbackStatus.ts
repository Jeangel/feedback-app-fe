export enum EFeedbackStatus {
  suggestion = 'Suggestion',
  planned = 'Planned',
  InProgress = 'In-Progress',
  Live = 'Live',
}

export const feedbackStatusOptions = [
  {
    value: EFeedbackStatus.suggestion,
    label: 'Suggestion',
  },
  {
    value: EFeedbackStatus.planned,
    label: 'Planned',
  },
  {
    value: EFeedbackStatus.InProgress,
    label: 'In-Progress',
  },
  {
    value: EFeedbackStatus.Live,
    label: 'Live',
  },
]
