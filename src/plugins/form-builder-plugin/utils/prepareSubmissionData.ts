// Flattens data and converts to array of {field, value} where all values are strings
export function prepareSubmissionData<T>(data: T): Array<{ field: string; value: string }> {
  const flattenedObj = flatten(data);
  return Object.entries(flattenedObj).map(([fieldName, fieldValue]) => ({
    field: fieldName,
    value: stringifyValue(fieldValue),
  }));
}

// Helper function to stringify any value
function stringifyValue(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  
  return String(value);
}

export function flatten<T>(obj: T): Record<string, any> {
  const flattenedObj: Record<string, any> = {};

  // Loop through key value pairs
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key as keyof T];

      // If key points to an object which is not an array, recursively flatten
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const tempObj = flatten(value);
        for (const tempKey in tempObj) {
          if (Object.prototype.hasOwnProperty.call(tempObj, tempKey)) {
            flattenedObj[`${key}.${tempKey}`] = tempObj[tempKey];
          }
        }
      } 
      // If key points to an array, handle each element without storing the whole array
      else if (Array.isArray(value)) {
        // Only flatten each array element with index, don't store the whole array
        value.forEach((element, index) => {
          if (typeof element === 'object' && element !== null) {
            const nestedObj = flatten(element);
            for (const nestedKey in nestedObj) {
              if (Object.prototype.hasOwnProperty.call(nestedObj, nestedKey)) {
                flattenedObj[`${key}[${index}].${nestedKey}`] = nestedObj[nestedKey];
              }
            }
          } else {
            flattenedObj[`${key}[${index}]`] = element;
          }
        });
      } 
      // Handle primitive values
      else {
        flattenedObj[key] = value;
      }
    }
  }

  return flattenedObj;
}