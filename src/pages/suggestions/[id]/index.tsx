import React from 'react'
import type { NextPage, GetServerSidePropsContext } from 'next'
import withAuth from '@hocs/withAuth'
import { Flex } from '@chakra-ui/react'
import GoBackButton from '@components/navigation/GoBackButton'
import CenterTemplate from '@components/template/CenterTemplate'
import { fetchSuggestion } from '@hooks/api/suggestions/useSuggestion'
import ISuggestion from '@app-types/Suggestion'
import SuggestionCard from '@components/suggestion/SuggestionCard'
import { useComments } from '@hooks/api/comments/useComments'
import CommentsList from '@components/comment/CommentsList'
import CommentForm from '@components/comment/CommentForm'
interface ISuggestionDetailProps {
  suggestion: ISuggestion | null
}

const SuggestionDetail: NextPage<ISuggestionDetailProps> = ({ suggestion }) => {
  const { data: comments, isLoading: isLoadingComments } = useComments({
    suggestionId: suggestion?._id!,
  })

  return (
    <CenterTemplate gridColumn={{ base: '1 / 13', md: '3 / 11', lg: '3 / 11' }}>
      <Flex justifyContent='flex-start'>
        <GoBackButton />
      </Flex>
      <Flex w='full' pt='55px' justifyContent='center'>
        <SuggestionCard
          suggestion={suggestion}
          hasVoted={suggestion?.myVote?.value === 1}
          onToggleVote={() => {}}
          isLoading={!suggestion}
          isFull
        />
      </Flex>
      <Flex my='24px'>
        <CommentsList comments={comments} isLoading={isLoadingComments} />
      </Flex>
      <CommentForm suggestionId={suggestion?._id} />
    </CenterTemplate>
  )
}

interface IPageParams {
  id: string
  [k: string]: string | string[] | undefined
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<IPageParams>
) {
  let suggestion = null
  if (context.params?.id) {
    try {
      const suggestionId = context.params.id
      const response = await fetchSuggestion({
        id: suggestionId,
        ssr: {
          contextOrRequest: context,
        },
      })
      suggestion = response.data
    } catch (error) {}
  }

  return { props: { suggestion } }
}

export default withAuth(SuggestionDetail)
