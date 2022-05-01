export enum EFeedbackCategory {
  UI = 'UI',
  UX = 'UX',
  Enhancement = 'Enhancement',
  Bug = 'Bug',
  Feature = 'Feature',
}

export const feedbackCategoryOptions = [
  {
    value: EFeedbackCategory.UI,
    label: 'UI',
  },
  {
    value: EFeedbackCategory.UX,
    label: 'UX',
  },
  {
    value: EFeedbackCategory.Enhancement,
    label: 'Enhancement',
  },
  {
    value: EFeedbackCategory.Bug,
    label: 'Bug',
  },
  {
    value: EFeedbackCategory.Feature,
    label: 'Feature',
  },
]
