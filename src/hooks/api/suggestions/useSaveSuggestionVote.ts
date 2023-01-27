import { useMutation, useQueryClient } from 'react-query'
import Suggestion from '@app-types/Suggestion'
import { post } from '@utils/axios'
import { EVotableResourceType } from '@app-types/Vote'

interface ISaveSuggestionVoteArgs {
  suggestionId: string
  value: 0 | 1
}

interface ISaveSuggestionVoterResponse {
  suggestion: Suggestion
}

export const useSaveSuggestionVote = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({ suggestionId, value }: ISaveSuggestionVoteArgs) => {
      const body = {
        value,
        resourceId: suggestionId,
        resourceType: EVotableResourceType.suggestion,
      }
      return post<ISaveSuggestionVoterResponse>({ path: `/votes`, body })
    },
    {
      onSettled: (data, error, variables) => {
        queryClient.invalidateQueries('suggestions')
        queryClient.invalidateQueries(`suggestions.${variables.suggestionId}`)
        queryClient.invalidateQueries('board-suggestions')
      },
    }
  )
}
