import { Question } from '@/domain/enterprise/entities/question'

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>
}
