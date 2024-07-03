import { describe, expect, test } from 'vitest'

import { Either, left, right } from './either.ts'

function doSomeThing(shouldSucess: boolean): Either<string, number> {
  if (shouldSucess) {
    return right(1)
  } else {
    return left('error')
  }
}

describe('either', () => {
  test('sucess result', async () => {
    const result = doSomeThing(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  test('error result', async () => {
    const result = doSomeThing(false)

    expect(result.isLeft()).toBe(true)
    expect(result.isRight()).toBe(false)
  })
})
