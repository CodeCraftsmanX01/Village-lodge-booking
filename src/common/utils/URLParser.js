import QS from 'query-string'

const isJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const removeNeseting = (json) => {
  const returnValue = { ...json }
  Object.keys(returnValue).forEach(function(key) {
    if (typeof json[key] === 'object') {
      returnValue[key] = JSON.stringify(returnValue[key])
    }
  })
  return returnValue
}

const addNesting = (json) => {
  const returnValue = { ...json }
  Object.keys(returnValue).forEach(function(key) {
    if (isJson(json[key])) {
      returnValue[key] = JSON.parse(returnValue[key])
    }
  })
  return returnValue
}

export const encodeURL = (json) => QS.stringify(removeNeseting(json))

export const decodeURL = (queryString) => addNesting(QS.parse(queryString))
