const generateRandomIndex = (to: number) => Math.floor(Math.random() * to)

const generateRandomInteger = (from: number, to: number, includeBoth = false) =>
  Math.floor(Math.random() * (to - from + Number(includeBoth))) + from

export const MathUtils = {
  generateRandomIndex,
  generateRandomInteger,
}
