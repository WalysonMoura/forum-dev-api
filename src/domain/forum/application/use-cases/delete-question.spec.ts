import { makeQuestion } from '@test/factories/make-question'
import { makeQuestionAttachments } from '@test/factories/make-questionn-attachments'
import { InMemoryAttachmentsRepository } from '@test/repositories/in-memory-attachments-repository'
import { InMemoryQuestionsAttachmentRepository } from '@test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { beforeEach, describe, expect, test } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/use-cases/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/use-cases/resource-not-found-error'

import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionsAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question UseCase', () => {
  beforeEach(async () => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionsAttachmentRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository
    )
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  test('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.attachments.push(
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachments({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      })
    )

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
    expect(inMemoryQuestionAttachmentsRepository.attachments).toHaveLength(0)
    expect(result.isRight()).toBe(true)
  })
  test('should not delete a question if the author does not match', async () => {
    const newQuestion = await makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  test('should not delete a question if the question does not exist', async () => {
    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
