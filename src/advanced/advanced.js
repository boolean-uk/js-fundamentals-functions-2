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
  if (req === ' ' || req.length <= 0 || req === undefined) {
    return {
      method: '',
      path: '',
      headers: {},
      body: null,
      query: null
    }
  }
  const requestElements = req.split('\n')
  for (let i = 0; i < requestElements.length; i++) {
    requestElements[i].replace(' ', '')
  }
  if (requestElements[requestElements.length - 1] === '') {
    requestElements.pop()
  }
  const reqBody = req.split('\n\n')
  let header
  if (requestElements !== undefined) {
    const tempheader = requestElements.splice(1, 1)
    if (tempheader[0] !== undefined) {
      header = tempheader[0].split(' ')
    }
  }
  const request = {
    method: header[0].length < 6 ? header[0] : '',
    path: getPath(header[1]),
    headers: {},
    body: reqBody[1] !== undefined ? parseBody(reqBody[1]) : null,
    query: header[1] !== undefined ? extractQuery(header[1]) : null
  }

  for (let i = 1; i < requestElements.length; i++) {
    if (requestElements[i] === '') {
      break
    }
    request.headers = parseHeader(requestElements[i], request.headers)
  }
  // call the other functions below as needed

  return request
}
console.log(
  'parseRequest - rawPOSTRequest:',
  parseRequest(rawPOSTRequest),
  'result headers:',
  parseRequest(rawPOSTRequest).headers
)
console.log('parseRequest - rawGETRequest:', parseRequest(rawGETRequest))
console.log(
  'parseRequest - rawGETRequestComplex:',
  parseRequest(rawGETRequestComplex)
)
console.log(parseRequest(' '))

function getPath(fullpath) {
  if (fullpath.indexOf('?') >= 0) {
    return fullpath.substring(0, fullpath.indexOf('?'))
  } else if (fullpath.indexOf('?') < 0) {
    return fullpath
  }
  return ''
}

// 2. Create a function named parseHeader that accepts two parameters:
// - a string for one header, and an object of current headers that must be augmented with the parsed header
// it doesnt return nothing, but updates the header object with the parsed header
// eg: parseHeader('Host: www.example.com', {})
//        => { Host: 'www.example.com' }
// eg: parseHeader('Authorization: Bearer your_access_token', { Host: 'www.example.com' })
//        => { Host: 'www.example.com', Authorization: 'Bearer your_access_token'}
// eg: parseHeader('', { Host: 'www.example.com' }) => { Host: 'www.example.com' }
function parseHeader(headerString, headers) {
  const arr = headerString.split(':')

  if (arr.length <= 1) {
    return headers
  }
  headers[arr[0]] = arr[1].trim()
  return headers
}
console.log(
  'parseHeader(Host: www.example.com, {}):',
  parseHeader('Host: www.example.com', {})
)
console.log(
  'parseHeader(Authorization: Bearer your_access_token, { Host: www.example.com }):',
  parseHeader('Authorization: Bearer your_access_token', {
    Host: 'www.example.com'
  })
)
console.log(
  `'parseHeader('', { Host: 'www.example.com' }):'`,
  parseHeader('', { Host: 'www.example.com' })
)
// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  try {
    const bodyObj = JSON.parse(body)
    return bodyObj
  } catch {
    return null
  }
}
// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(pathString) {
  const pathSplit = pathString.split('?')
  let Queries = ''
  if (pathSplit.length <= 1) {
    return null
  }
  let obj = {}
  const multipleQueries = pathSplit[1].split('&')
  multipleQueries.forEach((query) => {
    // eslint-disable-next-line no-unused-expressions
    if (Queries !== '') {
      Queries += ',"' + query.replace('=', '":"') + '"'
    } else {
      Queries += '"' + query.replace('=', '":"') + '"'
    }
  })
  obj = JSON.parse('{' + Queries + '}')
  console.log(Queries)
  console.log(obj)
  return obj
}
console.log(
  "extractQuery('/api/data/123?someValue=example')",
  extractQuery('/api/data/123?someValue=example')
)
console.log("extractQuery('/api/data/123')", extractQuery('/api/data/123'))
console.log(
  "extractQuery('/api/data/123?someValue=example&anotherVlaue=ecample')",
  extractQuery('/api/data/123?someValue=example&anotherVlaue=ecample')
)

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
