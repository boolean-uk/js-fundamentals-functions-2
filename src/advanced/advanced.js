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
function parseRequest(request) {
  if (!request) {
    return {
      method: '',
      path: '',
      headers: {},
      body: null,
      query: null
    }
  }

  const lines = request.trim().split('\n')
  const [method, fullPath] = lines[0].split(' ')
  let path = fullPath
  let query = null

  if (fullPath.includes('?')) {
    const splitPath = fullPath.split('?')
    path = splitPath[0]
    query = extractQuery(fullPath)
  }

  const headers = {}
  let body = null

  let lineIndex = 1
  while (lineIndex < lines.length && lines[lineIndex].trim() !== '') {
    parseHeader(lines[lineIndex], headers)
    lineIndex++
  }

  if (lines[lineIndex] === '' && lines.length > lineIndex + 1) {
    body = parseBody(lines.slice(lineIndex + 1).join('\n'))
  }

  return {
    method,
    path,
    headers,
    body,
    query
  }
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
  if (header.trim() === '') {
    return
  }
  const [key, value] = header.split(': ')
  headers[key] = value
}

// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  if (!body.trim()) {
    return null
  }

  // Remove the curly braces and split the string by comma
  const entries = body.trim().slice(1, -1).split(',')

  const result = {}
  entries.forEach((entry) => {
    // Split each entry by colon to get key and value
    const [key, value] = entry.split(':').map((part) => part.trim())
    // Remove the quotes from keys and values
    const cleanKey = key.slice(1, -1)
    const cleanValue = value.slice(1, -1)
    result[cleanKey] = cleanValue
  })
  return result
}

// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(path) {
  const queryStart = path.indexOf('?')
  if (queryStart === -1) {
    return null
  }
  const queryString = path.substring(queryStart + 1)
  const queries = queryString.split('&')
  const queryObj = {}

  queries.forEach((query) => {
    const [key, value] = query.split('=')
    queryObj[key] = value
  })

  return queryObj
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
