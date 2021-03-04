//need to parse/format backend data in forms

export function convertDataForReferenceArrayInput(data) {
  return data?.map((element) => {
    if (typeof element === 'number') {
      return element
    } else if (typeof element === 'string') {
      return element
    } else {
      return element?.id
    }
  })
}

export function convertDataForReferenceInput(data) {
  if (typeof data === 'number') {
    return data
  } else {
    return data?.id
  }
}
