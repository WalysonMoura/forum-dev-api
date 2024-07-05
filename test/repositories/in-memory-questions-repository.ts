import { QuestionsRepository } from '@/domain/application/repositories/questions-repository'
import { Question } from '@/domain/enterprise/entities/question'

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
}
