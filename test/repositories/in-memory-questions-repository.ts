import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { InMemoryQuestionsAttachmentRepository } from './in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionsAttachmentRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentsRepository: InMemoryStudentsRepository
  ) {}

  async create(question: Question): Promise<void> {
    await this.questions.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems()
    )
  }
  async findById(questionId: string): Promise<Question | null> {
    const question = await this.questions.find(
      (question) => question.id.toString() === questionId
    )

    if (!question) {
      return null
    }

    return question
  }
  async delete(question: Question): Promise<void> {
    const index = this.questions.findIndex(
      (itemQuestion) => itemQuestion.id === question.id
    )

    await this.questions.splice(index, 1)

    await this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString()
    )
  }
}
