interface CompareProps {
  plain: string
  hash: string
}

export abstract class HashCompare {
  abstract compare({ hash, plain }: CompareProps): Promise<boolean>
}
