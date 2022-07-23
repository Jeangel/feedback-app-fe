import IComment from '@app-types/Comment'
import { Text, Avatar, Flex, Heading, Button, Box } from '@chakra-ui/react'

interface ICommentNodeProps {
  comment: IComment
}

const CommentNode = ({ comment }: ICommentNodeProps) => {
  const { author, body } = comment
  return (
    <Flex w='full'>
      <Avatar bg='transparent' name={author.fullName} src={author.avatarUrl} mr='32px' />
      <Flex direction='column' w='full'>
        <Heading variant='h4'>{author.fullName}</Heading>
        <Flex justifyContent='space-between' w='full'>
          <Text variant='body3' color='tertiary.200' fontWeight='normal'>
            @{author.username}
          </Text>
          <Button variant='link' colorScheme='secondary'>
            Reply
          </Button>
        </Flex>
        <Box w='full' pt='17px'><Text color='tertiary.200'>{body}</Text></Box>
      </Flex>
    </Flex>
  )
}

export default CommentNode
