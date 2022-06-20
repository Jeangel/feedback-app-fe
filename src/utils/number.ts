interface IMakeRangeArgs {
  from: number
  to: number
}

export const makeRange = ({ from, to }: IMakeRangeArgs) => {
  if (to < from) throw new Error('Invalid arguments, "to" must be greater than "from"')

  const length = to - from + 1
  const range: number[] = []
  let current = from
  for (let i = 0; i < length; i++) {
    range.push(current)
    current++
  }
  return range
}
