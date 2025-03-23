export function flatten<T>(obj: T): Record<string, any> {
  const flattenedObj: Record<string, any> = {} // Define the return type explicitly

  // Loop through key value pairs
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key as keyof T]

      // If key points to an object which is not an array, recursively flatten
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const tempObj = flatten(value)
        for (const tempKey in tempObj) {
          if (Object.prototype.hasOwnProperty.call(tempObj, tempKey)) {
            flattenedObj[`${key}.${tempKey}`] = tempObj[tempKey]
          }
        }
        // If key points to an array, recursively flatten any objects in the array
      } else if (Array.isArray(value)) {
        if (value.some((e) => typeof e === 'object' && e !== null)) {
          flattenedObj[key] = value.map((element) =>
            typeof element === 'object' && element !== null ? flatten(element) : element,
          )
        } else {
          flattenedObj[key] = value
        }
      } else {
        flattenedObj[key] = value
      }
    }
  }

  return flattenedObj
}
