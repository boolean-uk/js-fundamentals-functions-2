/* eslint-disable no-undef */
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

  if (!req || req.trim() === '') return request

  const lines = req.trim().split('\n')

  const lineOne = lines[0].split(' ')
  request.method = lineOne[0]

  if (lineOne[1].includes('?')) {
    const path = lineOne[1].split('?')
    request.path = path[0]
  } else {
    request.path = lineOne[1]
  }

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) break
    parseHeader(line, request.headers)
  }

  const emptyLineIndex = lines.findIndex((line) => line.trim() === '')
  if (emptyLineIndex !== -1 && emptyLineIndex < lines.length - 1) {
    const body = lines
      .slice(emptyLineIndex + 1)
      .join('\n')
      .trim()
    request.body = parseBody(body)
  }

  request.query = extractQuery(lineOne[1])

  return request
}

// 2. Create a function named parseHeader that accepts two parameters:
// - a string for one header,
// - an object of current headers that must be augmented with the parsed header
// it doesnt return nothing, but updates the header object with the parsed header
// eg: parseHeader('Host: www.example.com', {})
//        => { Host: 'www.example.com' }
// eg: parseHeader('Authorization: Bearer your_access_token', { Host: 'www.example.com' })
//        => { Host: 'www.example.com', Authorization: 'Bearer your_access_token'}
// eg: parseHeader('', { Host: 'www.example.com' }) => { Host: 'www.example.com' }

function parseHeader(header, headers) {
  if (!header) return
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
  try {
    return JSON.parse(body)
  } catch (error) {
    return null
  }
}

// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null

// eslint-disable-next-line no-unused-vars
function extractQuery(path) {
  let obj = null
  if (!(typeof path === 'string')) return obj

  if (path.includes('?')) {
    obj = {}
    const div = path.split('?')
    request.path = div[0]
    let params

    if (path.includes('&')) {
      params = div[1].split('&')
    } else {
      params = [div[1]]
    }

    params.forEach((param) => {
      const [key, value] = param.split('=')
      obj[key] = value
    })
  }

  return obj
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
