import { Question } from '../../enterprise/entities/question'

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>
  abstract findById(questionId: string): Promise<Question | null>

  abstract delete(question: Question): Promise<void>
}
