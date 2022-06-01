import { useMutation, useQueryClient } from 'react-query'
import Feedback from '@app-types/Feedback'
import { post } from '@utils/axios'
import { EVotableResourceType } from '@app-types/Vote'

interface ISaveFeedbackVoteArgs {
  feedbackId: string
  value: 0 | 1
}

interface ISaveFeedbackVoterResponse {
  feedback: Feedback
}

export const useSaveFeedbackVote = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ feedbackId, value }: ISaveFeedbackVoteArgs) => {
      const body = {
        value,
        resourceId: feedbackId,
        resourceType: EVotableResourceType.feedback,
      }
      return post<ISaveFeedbackVoterResponse>({ path: `/votes`, body })
    },
    {
      onSettled: () => queryClient.invalidateQueries('suggestions'),
    }
  )
}
