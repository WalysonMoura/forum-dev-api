import { QuestionsAttachmentRepository } from '@/domain/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/enterprise/entities/question-attachment'

export class InMemoryQuestionsAttachmentRepository
  implements QuestionsAttachmentRepository
{
  public attachments: QuestionAttachment[] = []

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.attachments.push(...attachments)
  }
}
