import * as yup from 'yup'
import { YupSchemaKeys } from '@app-types/yup'
import {
  useToast,
  VStack,
  Heading,
  FormControl,
  Textarea,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react'
import FormControlError from '@components/forms/FormControlError'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePostComment } from '@hooks/api/comments/usePostComment'
import { ApiError } from '@utils/axios'
import { useForm } from 'react-hook-form'
import AutoFillButton from '@components/forms/AutoFillButton'
import { randomSentences } from '@utils/random'

interface ICommentFormProps {
  suggestionId?: string
}

interface ICommentForm {
  comment: string
}

const MAX_COMMENT_LENGTH = 500
const validationSchema = yup.object<YupSchemaKeys<ICommentForm>>({
  comment: yup.string().label('Comment').min(20).max(MAX_COMMENT_LENGTH),
})

const CommentForm = ({ suggestionId }: ICommentFormProps) => {
  const {
    register,
    handleSubmit: makeHandleOnSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<ICommentForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    delayError: 500,
    defaultValues: { comment: '' },
  })
  const { mutate: postComment, isLoading } = usePostComment()
  const toast = useToast()

  const handleOnSubmit = async (values: ICommentForm) => {
    if (!suggestionId) return

    postComment(
      {
        suggestionId,
        body: values.comment,
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            description: 'Comment was posted successfully',
          })
          reset()
        },
        onError: (error) => {
          const apiError = error as ApiError
          toast({ status: 'error', description: apiError.message })
        },
      }
    )
  }

  const handleOnAutoFill = () => {
    setValue('comment', randomSentences({ min: 2, max: 5 }))
    trigger()
  }
  return (
    <form onSubmit={makeHandleOnSubmit(handleOnSubmit)}>
      <VStack
        spacing='24px'
        background='white'
        borderRadius='10px'
        alignItems='flex-start'
        p='24px 32px 32px 34px'
      >
        <Flex justify='space-between' w='full'>
          <Heading variant='h3'>Add Comment</Heading>
          <AutoFillButton onClick={handleOnAutoFill} />
        </Flex>
        <FormControl id='comment' isInvalid={!!errors.comment}>
          <Textarea
            placeholder='Type your comment here'
            resize='block'
            {...register('comment')}
          />
          <FormControlError error={errors.comment} />
        </FormControl>
        <Flex justifyContent='space-between' w='full'>
          <Text color='tertiary.200'>
            {MAX_COMMENT_LENGTH - watch('comment').length} Characters left
          </Text>
          <Button
            colorScheme='primary'
            w={{ sm: 'full', lg: 'auto' }}
            type='submit'
            isLoading={isLoading}
            isDisabled={!isValid || isLoading || isSubmitSuccessful}
          >
            Post Comment
          </Button>
        </Flex>
      </VStack>
    </form>
  )
}

export default CommentForm
