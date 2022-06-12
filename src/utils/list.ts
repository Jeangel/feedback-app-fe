interface IMakeLoadableListArgs<T> {
  list: T[] | undefined
  isLoading: boolean
  skeletons: number
}

type MakeLoadableListResponse<T> = T[] | null[]

export const makeLoadableList = <T>({
  isLoading,
  list,
  skeletons,
}: IMakeLoadableListArgs<T>): MakeLoadableListResponse<T> => {
  return !isLoading ? list! : new Array(skeletons).fill(null)
}
