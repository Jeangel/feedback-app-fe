import IUser from './User'

export enum ECommentableResourceType {
  suggestion = 'Suggestion',
}

export interface IReply {
  _id: string
  body: string
  commentId: string
  author: IUser
  createdAt: string
}

interface IComment {
  _id: string
  body: string
  author: IUser
  resourceId: string
  resourceType: ECommentableResourceType
  createdAt: string
  replies: IReply[]
}

export default IComment