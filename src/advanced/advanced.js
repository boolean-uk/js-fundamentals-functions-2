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
GET /api/data/123  HTTP/1.1
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

  if (req === '' || req === undefined) {
    return request
  }

  const lines = req.split('\n') // Split in lines
  const requestLineParts = lines[0].split(' ') // Split the request line into parts

  // // Extract method, path, and HTTP version
  const method = requestLineParts[0]
  const fullPath = requestLineParts[1] // This might contain both the path and query
  // Split the fullPath into path and query (if applicable)

  // const queryIndex = requestLineParts[1].indexOf('?')
  // if (queryIndex !== -1) {
  //   const [pathPart, queryPart] = fullPath.split('?')
  // } else {
  //   const [pathPart, queryPart] = [fullPath, null]
  // }
  const [pathPart, queryPart] = fullPath.includes('?')
    ? fullPath.split('?')
    : [fullPath, null]

  // const queryIndex = requestLineParts[1].indexOf('?')

  // const pathPart =
  //   queryIndex === -1
  //     ? requestLineParts[1]
  //     : requestLineParts[1].substring(0, queryIndex)

  // Extract headers from subsequent lines until an empty line is found
  let i = 1
  // const headers = {}
  while (lines[i] !== '\r' && lines[i] !== '') {
    // const [name, value] = lines[i].split(': ')
    // headers[name] = value
    parseHeader(lines[i], request.headers)
    i++
  }

  // let body = null
  if (lines[i] === '\r' && lines[i + 1]) {
    // '\r' check empty
    // const bodies = lines[i]
    request.body = parseBody(lines.slice(i + 1).join('\n'))
  }

  // Assigning
  request.method = method
  request.path = pathPart
  if (queryPart !== null) {
    request.query = extractQuery(fullPath)
  }

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
// parseHeader(header, request.header)
// Header = object of "name" : value pair
function parseHeader(header, headers) {
  if (header === '') {
    return headers
  } else if (Object.keys(headers) === 0) {
    return headers
  } else {
    const [key, value] = header.split(': ')
    headers[key] = value

    return headers
  }
}

// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  if (body === '') {
    return null
  }
  // const pair = body.split(',')
  // const keyValuePairs = body.split(',').map(pair => pair.split(':').map(str => str.trim()));
  // const key = pair[0].slice(1, -1); // Remove double quotes
  // Using JSON.parse
  else {
    const obj = JSON.parse(body)
    return obj
  }
}

// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(path) {
  if (path === '' || !path.includes('?')) {
    return null
  } else {
    const queriesObj = {}
    const queryIndex = path.indexOf('?') + 1
    const queryString = path.slice(queryIndex)
    // split the queries into an array --> then split it again to [key, value]
    queryString.split('&').forEach((param) => {
      const [key, value] = param.split('=')
      queriesObj[key] = value
    })
    return queriesObj
  }
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
