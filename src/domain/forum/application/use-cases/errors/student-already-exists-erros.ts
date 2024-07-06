import { UseCaseError } from '@/core/types/use-case-error'

export class StudentAlreadyExistError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" already exist`)
  }
}
