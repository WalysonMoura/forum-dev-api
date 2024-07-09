export abstract class QuestionsAttachmentRepository {
  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
