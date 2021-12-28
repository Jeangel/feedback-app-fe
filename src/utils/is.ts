export const isFunction = (fn: any): fn is Function => {
  return fn && typeof fn === 'function'
}
export const isNumber = (number: any): number is Number => {
  return number && typeof number === 'number' && !isNaN(number)
}
export const isString = (str: any): str is String => {
  return str && typeof str === 'string'
}
export const isNil = (param: any): param is null | undefined => {
  return param === null || param === undefined
}
