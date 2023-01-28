import type { GetServerSidePropsContext, NextPage } from 'next'
import withAuth from '@hocs/withAuth'
import { Button, Flex } from '@chakra-ui/react'
import GoBackButton from '@components/navigation/GoBackButton'
import CenterTemplate from '@components/template/CenterTemplate'
import { useSuggestion } from '@hooks/api/suggestions/useSuggestion'
import SuggestionCard from '@components/suggestion/SuggestionCard'
import { useComments } from '@hooks/api/comments/useComments'
import CommentsList from '@components/comment/CommentsList'
import CommentForm from '@components/comment/CommentForm'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
interface ISuggestionDetailProps {
  suggestionId: string
}

const SuggestionDetail: NextPage<ISuggestionDetailProps> = ({ suggestionId }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { data: suggestion } = useSuggestion({ id: suggestionId })
  const { data: comments, isLoading: isLoadingComments } = useComments({
    suggestionId: suggestionId,
  })

  const onEditSuggestion = () => {
    router.push(`/suggestions/${suggestionId}/edit`)
  }

  const isOwn = suggestion?.authorId === session?.user._id

  return (
    <CenterTemplate gridColumn={{ base: '1 / 13', md: '3 / 11', lg: '3 / 11' }}>
      <Flex justifyContent='space-between'>
        <GoBackButton />
        {suggestion && session && isOwn && (
          <Button colorScheme='secondary' onClick={onEditSuggestion}>
            Edit Suggestion
          </Button>
        )}
      </Flex>
      <Flex w='full' pt='55px' justifyContent='center'>
        <SuggestionCard
          suggestion={
            suggestion ? { ...suggestion, commentsCount: comments?.length } : undefined
          }
          hasVoted={suggestion?.myVote?.value === 1}
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
  if (context.params?.id) {
    return { props: { suggestionId: context.params.id } }
  }

  return { props: { suggestionId: undefined } }
}

export default withAuth(SuggestionDetail)
