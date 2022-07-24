import { useToast } from '@chakra-ui/react'
import { useSaveSuggestionVote } from '@hooks/api/suggestions/useSaveSuggestionVote'
import { ApiError } from 'next/dist/server/api-utils'

const useOnSuggestionVote = () => {
  const toast = useToast()
  const { mutate: saveSuggestionVote } = useSaveSuggestionVote()

  const onSuggestionVote = (args: { _id: string; value: boolean }) => {
    saveSuggestionVote(
      {
        suggestionId: args._id,
        value: args.value ? 1 : 0,
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            description: 'Vote was saved successfully',
          })
        },
        onError: (error) => {
          const apiError = error as ApiError
          toast({ status: 'error', description: apiError.message })
        },
      }
    )
  }
  return onSuggestionVote
}

export default useOnSuggestionVote
