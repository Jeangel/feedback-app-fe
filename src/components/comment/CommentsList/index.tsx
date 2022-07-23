import IComment from '@app-types/Comment'
import { Box, Divider, Heading, Skeleton } from '@chakra-ui/react'
import React from 'react'
import CommentNode from '../CommentNode'

interface ICommentsListProps {
  comments?: IComment[]
  isLoading?: boolean
}

const CommentsList = ({ comments, isLoading }: ICommentsListProps) => {
  return (
    <Box
      background='white'
      borderRadius='10px'
      alignItems='flex-start'
      p='24px 32px 32px 34px'
      width='100%'
    >
      <Skeleton variant='heading-h3' isLoaded={!isLoading}>
        <Heading variant='h3' mb='24px'>
          {comments?.length} Comment{comments?.length !== 1 ? 's' : ''}
        </Heading>
      </Skeleton>
      <Box>
        {comments?.map((comment, index) => (
          <React.Fragment key={comment._id}>
            <CommentNode comment={comment} />
            {index < comments.length - 1 && <Divider my='32px' />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}

export default CommentsList
