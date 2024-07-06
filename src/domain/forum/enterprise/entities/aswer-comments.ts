import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Comment, CommentPros } from './comment'

export interface AnswerCommentPros extends CommentPros {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentPros> {
  static create(
    props: Optional<AnswerCommentPros, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const comment = new AnswerComment(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    )

    return comment
  }
}
