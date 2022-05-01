import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, ResponseType } from 'axios'
import queryString from 'query-string'
import { getSession } from 'next-auth/react'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export type ApiResponse = AxiosResponse

interface IRequest {
  path: string
  urlParams?: Record<string, any>
  body?: any
  responseType?: ResponseType
  headers?: Record<string, any>
}

const isAxiosError = (error: AxiosError | Error): error is AxiosError =>
  axios.isAxiosError(error)

const isAxiosCancel = (error: AxiosError | Error) => axios.isCancel(error)

const logApiError = (logMessage: string | undefined, error?: Error) => {
  const message = `[api] ${logMessage}`
  error ? console.error(message, error) : console.error(message)
}

interface IErrorData {
  message: string | string[]
  statusCode: number
  error: string
}

export class ApiError extends Error {
  isCancel: boolean

  httpStatusCode: number | undefined

  constructor(error: AxiosError<IErrorData> | Error) {
    if (isAxiosError(error)) {
      let message = 'There was a problem making your request.'
      let httpStatusCode: number | undefined
      if (error.response) {
        const apiResponseMessage = error.response.data.message
        httpStatusCode = error.response.status

        logApiError(`Axios: http status code ${httpStatusCode}`)
        logApiError(JSON.stringify(error.toJSON()))

        if (apiResponseMessage) {
          message = Array.isArray(apiResponseMessage)
            ? apiResponseMessage[0]
            : apiResponseMessage
        } else if (httpStatusCode === 401) {
          message = 'Unauthorized'
        } else if (httpStatusCode === 403) {
          message = 'Forbidden'
        }
        if (httpStatusCode === 404) {
          message = 'Not found'
        } else if (httpStatusCode > 501) {
          message = 'Server error'
        }
      } else if (error.request) {
        logApiError(`Axios: The request was made but no response was received`)
        logApiError(JSON.stringify(error.toJSON()))
      }
      super(message)
      this.httpStatusCode = httpStatusCode
      this.isCancel = false
    } else if (isAxiosCancel(error)) {
      const message = error.message || 'Request was cancelled'
      super(message)
      logApiError(`${message}`)
      this.isCancel = true
    } else {
      super(error.message)
      logApiError(`${error.name}: ${error.message}`)
      logApiError(`Stack: ${error.stack}`)
      this.isCancel = false
    }
  }
}

const request = async <Response = any>(url: string, options?: AxiosRequestConfig) => {
  let headers: { [index: string]: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options?.headers,
  }

  try {
    const session = await getSession()

    if (session) {
      headers = {
        ...headers,
        Authorization: `Bearer ${session.accessToken}`,
      }
    }

    const response = await axios.request<Response>({
      ...options,
      headers,
      method: options?.method || 'GET',
      data: options?.data || undefined,
      baseURL,
      url,
    })

    return response
  } catch (error) {
    throw new ApiError(error as Error)
  }
}

export const get = async <Response = any>({
  path,
  urlParams,
  responseType,
}: Omit<IRequest, 'body'>) => {
  const params = urlParams
    ? queryString.stringify(urlParams, { arrayFormat: 'bracket' })
    : ''

  return request<Response>(`${path}?${params}`, {
    method: 'GET',
    responseType,
  })
}

export const post = async <Response = any>({ path, body }: Omit<IRequest, 'urlParams'>) =>
  request<Response>(path, {
    method: 'POST',
    data: body,
  })

export const put = async <Response = any>({
  path,
  body,
  headers,
}: Omit<IRequest, 'urlParams'>) =>
  request<Response>(path, {
    method: 'PUT',
    data: body,
    headers,
  })

export const patch = async <Response = any>({
  path,
  body,
}: Omit<IRequest, 'urlParams'>) =>
  request<Response>(path, {
    method: 'PATCH',
    data: body,
  })
