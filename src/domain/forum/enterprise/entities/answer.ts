import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AnsweProps {}

export class Answe extends Entity<AnsweProps> {
  static create(props: AnsweProps, id?: UniqueEntityID) {
    const anser = new Answe({ ...props }, id)

    return anser
  }
}
