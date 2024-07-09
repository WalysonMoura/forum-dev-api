import { QuestionsAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionsAttachmentRepository
  implements QuestionsAttachmentRepository
{
  public attachments: QuestionAttachment[] = []

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.attachments.push(...attachments)
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = this.attachments.filter(
      (question) => question.questionId.toString() !== questionId
    )

    this.attachments = questionAttachments
  }
}
