import { HashCompare } from '@/domain/forum/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

export class FakeHasher implements HashGenerator, HashCompare {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare({
    hash,
    plain,
  }: {
    hash: string
    plain: string
  }): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
