import IComment, { IReply } from '@app-types/Comment'
import { Text, Avatar, Flex, Heading, Button, Box, useBoolean } from '@chakra-ui/react'
import ReplyForm from '../ReplyForm'

interface ICommentNodeProps {
  comment: IComment
}

const isComment = (commentOrReply: IComment | IReply): commentOrReply is IComment => {
  return (commentOrReply as IComment).replies !== undefined
}

interface ICommentBlockProps {
  author: IComment['author']
  body: string
  comment: IComment
}

const CommentBlock = ({ author, body, comment }: ICommentBlockProps) => {
  const [isReplyFormOpen, { toggle: toggleReplyForm, off: closeReplyForm }] =
    useBoolean(false)
  return (
    <Flex w='full' mb='20px'>
      <Avatar bg='transparent' name={author.fullName} src={author.avatarUrl} mr='32px' />
      <Flex direction='column' w='full'>
        <Flex direction='column' w='full'>
          <Heading variant='h4'>{author.fullName}</Heading>
          <Flex justifyContent='space-between' w='full'>
            <Text variant='body3' color='tertiary.200' fontWeight='normal'>
              @{author.username}
            </Text>
            <Button variant='link' colorScheme='secondary' onClick={toggleReplyForm}>
              Reply
            </Button>
          </Flex>
          <Box w='full' pt='17px'>
            <Text color='tertiary.200'>{body}</Text>
          </Box>
        </Flex>
        {isReplyFormOpen && (
          <Flex direction='column' w='full'>
            <ReplyForm comment={comment} onReplyPosted={closeReplyForm} />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

const CommentNode = ({ comment }: ICommentNodeProps) => {
  const { author, body, replies } = comment
  const hasReplies = replies.length > 0
  return (
    <Flex w='full' direction='column' pos='relative'>
      <CommentBlock author={author} body={body} comment={comment} />
      {hasReplies &&
        replies.map((reply) => (
          <Flex
            pl='50px'
            pt='32px'
            ml='23px'
            borderLeft='0.5px solid'
            borderLeftColor='gray.200'
            key={reply._id}
          >
            <CommentBlock author={reply.author} body={reply.body} comment={comment} />
          </Flex>
        ))}
    </Flex>
  )
}

export default CommentNode
