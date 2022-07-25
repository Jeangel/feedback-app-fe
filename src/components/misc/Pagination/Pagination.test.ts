import { calculatePages } from './utils'

describe('Calculate pages', () => {
  it('return [1] when there is only 1 page', () => {
    const pages = calculatePages({
      currentPage: 1,
      totalPages: 1,
    })
    expect(pages).toEqual([1])
  })
  it('return [1,2] when there are 2 pages and current page is any of those', () => {
    const pages = calculatePages({
      currentPage: 1,
      totalPages: 2,
    })
    expect(pages).toEqual([1, 2])
  })
  it('return [1,2,3] when there are 3 pages and current page is any of those', () => {
    const pages = calculatePages({
      currentPage: 1,
      totalPages: 3,
    })
    expect(pages).toEqual([1, 2, 3])
  })
  it('return [1,2,3,4] when there are 4 pages and current page is any of those', () => {
    const pages = calculatePages({
      currentPage: 1,
      totalPages: 4,
    })
    expect(pages).toEqual([1, 2, 3, 4])
  })
  test('should return [1,2,3,4,5,6] when there are only 6 pages and current page is any and max visible items is 5', () => {
    const pages = calculatePages({
      currentPage: 3,
      totalPages: 6,
      maxVisibleItems: 5,
    })
    expect(pages).toEqual([1, 2, 3, 4, 5, 6])
  })
  test('should return [1,2,3,4,5] when there are 5 pages and current page is 3 and max visible items is 3.', () => {
    const pages = calculatePages({
      currentPage: 3,
      totalPages: 5,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 2, 3, 4, 5])
  })
  test('should return [1,0,4,5,6,0,10] when there are only 10 pages and current page is 5 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 5,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 0, 4, 5, 6, 0, 10])
  })
  test('should return [1,2,3,4,0,10] when there are only 10 pages and current page is 3 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 3,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 2, 3, 4, 0, 10])
  })
  test('should return [1,0,7,8,9,10] when there are only 10 pages and current page is 8 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 8,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 0, 7, 8, 9, 10])
  })
  test('should return [1,2,3,4,0,10] when there are only 10 pages and current page is 2 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 2,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 2, 3, 4, 0, 10])
  })
  test('should return [1,0,7,8,9,10] when there are only 10 pages and current page is 9 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 9,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 0, 7, 8, 9, 10])
  })
  test('should return [1,2,3,4,0,10] when there are only 10 pages and current page is 1 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 1,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 2, 3, 4, 0, 10])
  })
  test('should return [1,0,7,8,9,10] when there are only 10 pages and current page is 10 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 10,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 0, 7, 8, 9, 10])
  })
  test('should return [1, 0, 6, 7, 8, 0, 10] when there are only 10 pages and current page is 7 and max visible items is 3', () => {
    const pages = calculatePages({
      currentPage: 7,
      totalPages: 10,
      maxVisibleItems: 3,
    })
    expect(pages).toEqual([1, 0, 6, 7, 8, 0, 10])
  })
  test('should return [1, 0, 4, 5, 6, 7, 8, 0, 10] when there are only 10 pages and current page is 6 and max visible items is 5', () => {
    const pages = calculatePages({
      currentPage: 6,
      totalPages: 10,
      maxVisibleItems: 5,
    })
    expect(pages).toEqual([1, 0, 4, 5, 6, 7, 8, 0, 10])
  })
})
