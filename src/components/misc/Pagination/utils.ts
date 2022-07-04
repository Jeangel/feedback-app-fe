import { makeRange } from '@utils/number'

interface ICalculatePagesArgs {
  currentPage: number
  totalPages: number
  maxVisibleItems?: number
}

export const DOTS = 0

export const calculatePages = ({
  currentPage,
  maxVisibleItems = 3,
  totalPages,
}: ICalculatePagesArgs): number[] => {
  const pages = []
  const firstPage = 1
  const lastPage = totalPages
  const sanitizedCurrentPage = Math.max(firstPage, Math.min(lastPage, currentPage))
  let from = 0
  let to = 0
  pages.push(firstPage)

  if (totalPages === 0) return []

  if (totalPages === 1) {
    return pages
  }

  if (maxVisibleItems >= totalPages - 2) {
    const range = makeRange({ from: firstPage + 1, to: lastPage })
    pages.push(...range)
    return pages
  }

  const expectedSiblingsPerSide = (maxVisibleItems - 1) / 2

  const howManySiblingsCanLeftHave = Math.max(currentPage - 2, 0) // (minus self and the first page)
  let leftSiblings =
    currentPage - expectedSiblingsPerSide <= firstPage
      ? howManySiblingsCanLeftHave
      : expectedSiblingsPerSide
  const howManySiblingsCanRightHave = lastPage - currentPage - 1 // (minus self)
  let rightSiblings =
    currentPage + expectedSiblingsPerSide >= lastPage
      ? howManySiblingsCanRightHave
      : expectedSiblingsPerSide

  const leftHasProblems = leftSiblings !== expectedSiblingsPerSide
  const rightHasProblems = rightSiblings !== expectedSiblingsPerSide

  if (leftHasProblems) {
    const unsetLeftSiblings = expectedSiblingsPerSide - howManySiblingsCanLeftHave
    /**
     * In most cases the current page is part of the middle numbers.
     * In the scenario that the current page is 1, current page is not included
     * in the middle numbers. That's why we add 1 here in case current page is the first one
     */
    rightSiblings += currentPage === firstPage ? unsetLeftSiblings + 1 : unsetLeftSiblings
  } else if (rightHasProblems) {
    const unsetRightSiblings = expectedSiblingsPerSide - howManySiblingsCanRightHave
    leftSiblings += unsetRightSiblings
  }

  from = Math.max(sanitizedCurrentPage - leftSiblings, firstPage + 1)
  to = Math.min(sanitizedCurrentPage + rightSiblings, lastPage - 1)
  const middleNumbers = makeRange({ from, to })

  const shouldShowLeftDots = from > 2
  if (shouldShowLeftDots) {
    pages.push(DOTS)
  }

  pages.push(...middleNumbers)

  const shouldShowRightDots = to + 1 < lastPage
  if (shouldShowRightDots) {
    pages.push(DOTS)
  }

  if (totalPages > 1) {
    pages.push(lastPage)
  }
  return pages
}
