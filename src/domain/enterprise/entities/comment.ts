import { Entity } from '@/core/entities/entity'

export interface CommentPros {
  authorId: string
  content: string
  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Comment<Props extends CommentPros> extends Entity<Props> {
  get authorId(): string {
    return this.props.authorId
  }

  get content(): string {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content

    this.touch()
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }
}
