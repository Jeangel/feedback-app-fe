import { LoremIpsum } from 'lorem-ipsum'
import { capitalize } from './string'

const loremIpsum = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

interface RandomRangeOptions {
  min: number
  max: number
}

export const randomNumber = ({ min, max }: RandomRangeOptions) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const sampleArrayItem = <T>(array: T[]) => {
  return array[randomNumber({ min: 0, max: array.length - 1 })]
}

export const sampleEnumValue = <V extends string, T extends Record<string, V>>(
  enumObject: T
): V => {
  const values = Object.keys(enumObject)
  return values[Math.floor(Math.random() * values.length)] as V
}

export const randomWords = (options: RandomRangeOptions) => {
  const amount = randomNumber(options)
  return capitalize(loremIpsum.generateWords(amount))
}

export const randomSentences = (options: RandomRangeOptions) => {
  const amount = randomNumber(options)
  return capitalize(loremIpsum.generateSentences(amount))
}

export const randomParagraphs = (options: RandomRangeOptions) => {
  const amount = randomNumber(options)
  return capitalize(loremIpsum.generateParagraphs(amount))
}
