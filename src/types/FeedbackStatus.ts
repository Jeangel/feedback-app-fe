export enum EFeedbackStatus {
  suggestion = 'Suggestion',
  planned = 'Planned',
  inProgress = 'In-Progress',
  live = 'Live',
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
    value: EFeedbackStatus.inProgress,
    label: 'In-Progress',
  },
  {
    value: EFeedbackStatus.live,
    label: 'Live',
  },
]
