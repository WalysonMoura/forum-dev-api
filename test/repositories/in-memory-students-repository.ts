import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = []
  async create(student: Student): Promise<void> {
    await this.students.push(student)
  }
  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.students.find(
      (student) => student.email === email
    )

    if (!student) {
      return null
    }

    return student
  }
}
