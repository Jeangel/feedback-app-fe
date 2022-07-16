import React, { useEffect, useState } from 'react'
import type { NextPage, GetServerSidePropsContext } from 'next'
import withAuth from '@hocs/withAuth'
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Textarea,
  VStack,
  Button,
  useToast,
  Stack,
} from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'
import RoundedBadge from '@components/misc/RoundedBadge'
import GoBackButton from '@components/navigation/GoBackButton'
import CenterTemplate from '@components/template/CenterTemplate'
import FormControlError from '@components/forms/FormControlError'
import * as yup from 'yup'
import { YupSchemaKeys } from 'types/yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Select from '@components/forms/Select'
import { useRouter } from 'next/router'
import { ApiError } from '@utils/axios'
import {
  ESuggestionCategory,
  suggestionCategoryOptions,
} from '@app-types/SuggestionCategory'
import { useUpdateSuggestion } from '@hooks/api/useUpdateSuggestion'
import { ESuggestionStatus, suggestionStatusOptions } from '@app-types/SuggestionStatus'
import { fetchSuggestion } from '@hooks/api/useSuggestion'
import ISuggestion from '@app-types/Suggestion'
import SuggestionCard from '@components/suggestion/SuggestionCard'

interface IEditSuggestionForm {
  title: string
  category: ESuggestionCategory
  status: ESuggestionStatus
  description: string
}

const validationSchema = yup.object<YupSchemaKeys<IEditSuggestionForm>>({
  title: yup.string().label('Suggestion Title').required().min(5).max(50),
  category: yup.string().label('Category').required(),
  status: yup.string().label('Status').required(),
  description: yup.string().label('Suggestion Detail').required().min(20).max(200),
})

interface IEditSuggestionProps {
  suggestion: ISuggestion | null
}

const EditSuggestion: NextPage<IEditSuggestionProps> = ({ suggestion }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit: makeHandleOnSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<IEditSuggestionForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
    defaultValues: suggestion || {},
  })
  const { mutate: updateSuggestion, isLoading } = useUpdateSuggestion()
  const [category, setCategory] = useState<ESuggestionCategory | undefined>(
    suggestion?.category
  )
  const [status, setStatus] = useState<ESuggestionStatus | undefined>(suggestion?.status)
  const toast = useToast()

  const handleOnCategoryChange = (value: ESuggestionCategory) => {
    setValue('category', value)
    setCategory(value)
  }

  const handleOnStatusChange = (value: ESuggestionStatus) => {
    setValue('status', value)
    setStatus(value)
  }

  const handleOnCancel = () => {
    router.back()
  }

  const handleOnSubmit = async (values: IEditSuggestionForm) => {
    if (!suggestion) return

    const updates = { ...values, _id: suggestion._id }
    updateSuggestion(
      { suggestion: updates },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            description: 'Suggestion was updated successfully',
          })
          router.back()
        },
        onError: (error) => {
          const apiError = error as ApiError
          toast({ status: 'error', description: apiError.message })
        },
      }
    )
  }

  useEffect(() => {
    register('category')
    register('status')
  }, [])

  return (
    <CenterTemplate gridColumn={{ base: '1 / 13', md: '3 / 11', lg: '3 / 11' }}>
      <Flex justifyContent='flex-start'>
        <GoBackButton />
      </Flex>
      <Flex w='full' pt='55px' justifyContent='center'>
        <SuggestionCard
          suggestion={suggestion}
          hasVoted={false}
          onToggleVote={() => {}}
          isLoading={!suggestion}
        />
      </Flex>
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

export default withAuth(EditSuggestion)
