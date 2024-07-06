import { Question } from '../../enterprise/entities/question'

export abstract class QuestionsRepository {
  public abstract create(question: Question): Promise<void>
}
