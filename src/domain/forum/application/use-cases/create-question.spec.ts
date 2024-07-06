import { InMemoryAttachmentsRepository } from '@test/repositories/in-memory-attachments-repository'
import { InMemoryQuestionsAttachmentRepository } from '@test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '@test/repositories/in-memory-questions-repository'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionsAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
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
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      attachmentsIds: ['1', '2'],
      authorId: '1',
      content: 'content question example',
      title: 'title question example',
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.questions[0]).toEqual(
      result.value.question
    )
    expect(
      inMemoryQuestionsRepository.questions[0].attachments.currentItems
    ).toHaveLength(2)

    expect(
      inMemoryQuestionsRepository.questions[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })

  it('should persist attachments when creating a new question', async () => {
    const result = await sut.execute({
      attachmentsIds: ['1', '2'],
      authorId: '1',
      content: 'content question example',
      title: 'title question example',
    })

    expect(result.isLeft()).toBe(false)
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionAttachmentsRepository.attachments).toHaveLength(2)
    expect(inMemoryQuestionAttachmentsRepository.attachments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
      ])
    )
  })
})
