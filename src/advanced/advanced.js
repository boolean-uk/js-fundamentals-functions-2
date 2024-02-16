// HERE ARE SOME EXAMPLES OF RAW HTTP REQUESTS (text)
// WE ARE GOING TO WRITE A COLLECTION OF FUNCTIONS THAT PARSE THE HTTP REQUEST
// AND CONVERTS IT ALL INTO A Javascript object

// EXAMPLE INPUT 1
const rawGETRequest = `
GET / HTTP/1.1
Host: www.example.com
`
// OUTPUT
const request = {
  method: 'GET',
  path: '/',
  headers: {
    Host: 'www.example.com'
  },
  body: null,
  query: null
}
// EXAMPLE 2
const rawGETRequestComplex = `
GET /api/data/123?someValue=example HTTP/1.1
Host: www.example.com
Authorization: Bearer your_access_token
`
const requestComplex = {
  method: 'GET',
  path: '/api/data/123',
  headers: {
    Host: 'www.example.com',
    Authorization: 'Bearer your_access_token'
  },
  body: null,
  query: {
    someValue: 'example'
  }
}
// EXAMPLE 3: NOTE the BODY is separated from the HEADERS via an empty line
const rawPOSTRequest = `
POST /api/data HTTP/1.1
Host: www.example.com
Content-Type: application/json
Content-Length: 36

{"key1": "value1", "key2": "value2"}
`
const requestPOST = {
  method: 'POST',
  path: '/api/data',
  headers: {
    Host: 'www.example.com',
    'Content-Type': 'application/json',
    'Content-Length': '36'
  },
  body: {
    key1: 'value1',
    key2: 'value2'
  },
  query: null
}

// IMPLEMENTATION
// WE WILL provide different tests for the different functions

// 1. Create a function named parseRequest that accepts one parameter:
// - the raw HTTP request string
// It must return an object with the following properties:
// - method: the HTTP method used in the request
// - path: the path in the request
// - headers: an object with the headers in the request
// - body: the body in the request
// - query: an object with the query parameters in the request
function parseRequest(req) {
  const request = {
    method: '',
    path: '',
    headers: {},
    body: null,
    query: null
  }
  // call the other functions below as needed
  let parsedString = req
  let snip = parsedString.indexOf(' ')
  request.method = parsedString.substring(1, snip)
  parsedString = parsedString.slice(snip + 1)

  snip = parsedString.indexOf(' ')
  const pathAndQuery = parsedString.substring(0, snip)
  if (pathAndQuery.indexOf('?') !== -1) {
    request.path = pathAndQuery.substring(0, pathAndQuery.indexOf('?'))
  } else {
    request.path = pathAndQuery
  }
  request.query = extractQuery(pathAndQuery)

  snip = parsedString.indexOf('\n')
  parsedString = parsedString.slice(snip + 1)

  snip = parsedString.indexOf('\n')
  parseHeader(parsedString.substring(0, snip), request.headers)

  while (
    parsedString.indexOf(':') < parsedString.indexOf('{') ||
    (parsedString.indexOf(':') !== -1 && parsedString.indexOf('{') === -1)
  ) {
    snip = parsedString.indexOf('\n')
    parseHeader(parsedString.substring(0, snip), request.headers)
    parsedString = parsedString.slice(snip + 1)
  }

  request.body = parseBody(parsedString)

  return request
}

// 2. Create a function named parseHeader that accepts two parameters:
// - a string for one header, and an object of current headers that must be augmented with the parsed header
// it doesnt return nothing, but updates the header object with the parsed header
// eg: parseHeader('Host: www.example.com', {})
//        => { Host: 'www.example.com' }
// eg: parseHeader('Authorization: Bearer your_access_token', { Host: 'www.example.com' })
//        => { Host: 'www.example.com', Authorization: 'Bearer your_access_token'}
// eg: parseHeader('', { Host: 'www.example.com' }) => { Host: 'www.example.com' }
function parseHeader(header, headers) {
  if (header.length === 0) {
    return headers
  }
  const split = header.indexOf(' ')
  const objName = header.substring(0, split - 1)
  const objString = header.slice(split + 1)
  headers[objName] = objString
  return headers
}

// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  if (body.length === 0) {
    return null
  }
  const Obj = {}
  let bodyValuesExist = true
  let parsedString = body
  while (bodyValuesExist) {
    const snipOne = parsedString.indexOf('"')
    parsedString = parsedString.slice(snipOne + 1)
    const snipTwo = parsedString.indexOf('"')
    const keyName = parsedString.substring(0, snipTwo)
    parsedString = parsedString.slice(snipTwo + 1)

    const snipThree = parsedString.indexOf('"')
    parsedString = parsedString.slice(snipThree + 1)
    const snipFour = parsedString.indexOf('"')
    const valueName = parsedString.substring(0, snipFour)
    parsedString = parsedString.slice(snipFour + 1)

    Obj[keyName] = valueName

    if (parsedString.indexOf('"') === -1) {
      bodyValuesExist = false
    }
  }
  return Obj
}

// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(path) {
  if (path.indexOf('?') === -1) {
    return null
  }
  const Obj = {}
  let hasQueriesLeft = true
  let parsedString = path

  let snipOne = parsedString.indexOf('?')
  parsedString = parsedString.slice(snipOne + 1)
  const snipTwo = parsedString.indexOf('=')
  let keyName = parsedString.substring(0, snipTwo)
  parsedString = parsedString.slice(snipTwo + 1)

  snipOne = parsedString.indexOf('&')
  if (snipOne === -1) {
    Obj[keyName] = parsedString
    hasQueriesLeft = false
  } else {
    const valueName = parsedString.substring(0, snipOne)
    parsedString = parsedString.slice(snipOne + 1)
    Obj[keyName] = valueName
  }
  while (hasQueriesLeft) {
    snipOne = parsedString.indexOf('=')
    keyName = parsedString.substring(0, snipOne)
    parsedString = parsedString.slice(snipOne + 1)

    snipOne = parsedString.indexOf('&')
    if (snipOne === -1) {
      Obj[keyName] = parsedString
      hasQueriesLeft = false
    } else {
      const valueName = parsedString.substring(0, snipOne)
      parsedString = parsedString.slice(snipOne + 1)
      Obj[keyName] = valueName
    }
  }
  return Obj
}

module.exports = {
  rawGETRequest,
  rawGETRequestComplex,
  rawPOSTRequest,
  request,
  requestComplex,
  requestPOST,
  parseRequest /* eslint-disable-line no-undef */,
  parseHeader /* eslint-disable-line no-undef */,
  parseBody /* eslint-disable-line no-undef */,
  extractQuery /* eslint-disable-line no-undef */
}
