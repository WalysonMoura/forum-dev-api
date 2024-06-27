import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface InstructorProps {
  name: string
  email: string
  password: string
}

export class Instructor extends Entity<InstructorProps> {
  get email(): string {
    return this.props.email
  }

  get name(): string {
    return this.props.name
  }

  get password(): string {
    return this.props.password
  }

  static create(props: InstructorProps, id?: UniqueEntityID): Instructor {
    const instructor = new Instructor({ ...props }, id)

    return instructor
  }
}
