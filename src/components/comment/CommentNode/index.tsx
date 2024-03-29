import IComment from '@app-types/Comment'
import {
  Text,
  Avatar,
  Flex,
  Heading,
  Button,
  Box,
  useBoolean,
  Collapse,
  SlideFade,
} from '@chakra-ui/react'
import ReplyForm from '../ReplyForm'
import { API_URL } from '@hooks/useRandomAvatar'

interface ICommentNodeProps {
  comment: IComment
}

interface ICommentBlockProps {
  author: IComment['author']
  body: string
  comment: IComment
}

const CommentBlock = ({ author, body, comment }: ICommentBlockProps) => {
  const [isReplyFormOpen, { toggle: toggleReplyForm, off: closeReplyForm }] =
    useBoolean(false)
  const sanitizeAvatarUrl = (avatar: string) => {
    if (avatar.startsWith(API_URL)) {
      return avatar
    }
    const imageName = avatar.split('/').pop()
    return `${API_URL}?seed=${imageName?.split('.').shift() || 'default'}`
  }
  return (
    <Flex w='full' mb='20px'>
      <Avatar
        bg='transparent'
        name={author.fullName}
        src={sanitizeAvatarUrl(author.avatarUrl)}
        mr='32px'
      />
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
        <Collapse in={isReplyFormOpen} animateOpacity>
          <Flex direction='column' w='full'>
            <ReplyForm comment={comment} onReplyPosted={closeReplyForm} />
          </Flex>
        </Collapse>
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
      <SlideFade in={hasReplies}>
        {replies.map((reply) => (
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
      </SlideFade>
    </Flex>
  )
}

export default CommentNode
