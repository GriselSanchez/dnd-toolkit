const formatToUpperFirstLetter = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

const getQueryParamsFromObject = <T>(filters: T) => new URLSearchParams(filters as Record<string, string>)

export const StringUtils = {
  formatToUpperFirstLetter,
  getQueryParamsFromObject,
}
