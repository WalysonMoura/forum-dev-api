import { Entity } from './entity'
import { UniqueEntityID } from './unique-entity-id'

export interface AttachmentProps {
  url: string
  title: string
}
export class Attachment extends Entity<AttachmentProps> {
  get title(): string {
    return this.props.title
  }

  get url(): string {
    return this.props.url
  }
  static create(props: AttachmentProps, id?: UniqueEntityID): Attachment {
    const attachment = new Attachment({ ...props }, id)

    return attachment
  }
}
