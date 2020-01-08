export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Check whether the object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key){
  return hasOwnProperty.call(obj, key)
}