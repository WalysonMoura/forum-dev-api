import { FakeHasher } from '@test/cryptography/fake-hasher'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResgisterStudentUseCase } from './register-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher

let sut: ResgisterStudentUseCase

describe('ResgisterStudentUseCase', () => {
  beforeEach(async () => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()

    sut = new ResgisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able to create a student', async () => {
    const result = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '12345678',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.students).toHaveLength(1)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.students[0],
    })
  })

  it('should not be able to create a student with an existing email', async () => {
    await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '12345678',
    })

    const result = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '12345678',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
    expect(inMemoryStudentsRepository.students).toHaveLength(1)
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Jonh Doe',
      email: 'jonhdoe@example.com',
      password: '12345678',
    })

    const hashedPassword = await fakeHasher.hash('12345678')

    expect(inMemoryStudentsRepository.students[0].password).toEqual(
      hashedPassword
    )
    expect(result.isRight()).toBe(true)
  })
})
