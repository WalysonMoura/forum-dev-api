import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'

import { Student } from '../../enterprise/entities/student'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentsRepository } from '../repositories/students-repository'
import { StudentAlreadyExistError } from './errors/student-already-exists-erros'

interface ResgisterStudentResquest {
  name: string
  email: string
  password: string
}

type ResgisterStudentResponse = Either<
  StudentAlreadyExistError,
  { student: Student }
>

@Injectable()
export class ResgisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator
  ) {}
  async execute({
    name,
    email,
    password,
  }: ResgisterStudentResquest): Promise<ResgisterStudentResponse> {
    const studentAlreadyExists =
      await this.studentsRepository.findByEmail(email)

    if (studentAlreadyExists) {
      return left(new StudentAlreadyExistError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({ student })
  }
}
