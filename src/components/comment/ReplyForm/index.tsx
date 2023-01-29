import * as yup from 'yup'
import { YupSchemaKeys } from '@app-types/yup'
import {
  useToast,
  VStack,
  FormControl,
  Textarea,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react'
import FormControlError from '@components/forms/FormControlError'
import { yupResolver } from '@hookform/resolvers/yup'
import { ApiError } from '@utils/axios'
import { useForm } from 'react-hook-form'
import IComment from '@app-types/Comment'
import { usePostReply } from '@hooks/api/comments/usePostReply'
import AutoFillButton from '@components/forms/AutoFillButton'
import { randomSentences } from '@utils/random'

interface IReplyFormProps {
  comment: IComment
  onReplyPosted?: () => void
}

interface IReplyForm {
  body: string
}

const MAX_COMMENT_LENGTH = 500
const validationSchema = yup.object<YupSchemaKeys<IReplyForm>>({
  body: yup.string().label('Comment').min(20).max(MAX_COMMENT_LENGTH),
})

const ReplyForm = ({ comment, onReplyPosted }: IReplyFormProps) => {
  const {
    register,
    handleSubmit: makeHandleOnSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<IReplyForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    delayError: 500,
    defaultValues: { body: '' },
  })
  const { mutate: postReply, isLoading } = usePostReply()
  const toast = useToast()

  const handleOnSubmit = async (values: IReplyForm) => {
    postReply(
      {
        suggestionId: comment.resourceId,
        commentId: comment._id,
        body: values.body,
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            description: 'Reply was posted successfully',
          })
          reset()
          onReplyPosted && onReplyPosted()
        },
        onError: (error) => {
          const apiError = error as ApiError
          toast({ status: 'error', description: apiError.message })
        },
      }
    )
  }

  const handleOnAutoFill = () => {
    setValue('body', randomSentences({ min: 2, max: 5 }))
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
        <FormControl id='body' isInvalid={!!errors.body}>
          <Flex justify='flex-end' pb='8px'>
            <AutoFillButton onClick={handleOnAutoFill} />
          </Flex>
          <Textarea
            placeholder='Type your Reply here'
            resize='block'
            {...register('body')}
          />
          <FormControlError error={errors.body} />
        </FormControl>
        <Flex justifyContent='space-between' w='full'>
          <Text color='tertiary.200'>
            {MAX_COMMENT_LENGTH - watch('body').length} Characters left
          </Text>
          <Button
            colorScheme='primary'
            w={{ sm: 'full', lg: 'auto' }}
            type='submit'
            isLoading={isLoading}
            isDisabled={!isValid || isLoading || isSubmitSuccessful}
          >
            Post Reply
          </Button>
        </Flex>
      </VStack>
    </form>
  )
}

export default ReplyForm
