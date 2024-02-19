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

  // IF request is empty there just return the un-filled object
  if (req === '' || req === null || req === undefined) {
    return request
  }
  // call the other functions below as needed
  // Split all lines into array
  const requestAsStringArray = req.trim().split('\n')
  // The first line in array contains method, path, and query params
  const requestPathingString = requestAsStringArray.shift()

  parseRequestPath(requestPathingString, request)

  parseRequestBody(requestAsStringArray, request)

  return request
}

/**
 * Process and parse elements related to request pathing into the provided request object
 * @param {string} requestPathingString The first line of the query containing request method, address, and any potential parameters
 * @param {Object} request The request object to be filled into
 */
function parseRequestPath(requestPathingString, request) {
  // Split the string into three parts
  // eslint-disable-next-line no-unused-vars
  const [requestMethod, requestPath, requestProtocol] =
    requestPathingString.split(' ', 3)
  // eslint-enable-next-line no-unused-vars
  // Set request method
  request.method = requestMethod

  // Set request path
  let pathWithoutQuery = requestPath
  // If params ('?') found, remove them, these will be handled in query
  if (requestPath.includes('?')) {
    pathWithoutQuery = requestPath.split('?')[0]
  }
  request.path = pathWithoutQuery

  // Set request query
  request.query = extractQuery(requestPath)
}

/**
 * Extract and parse the header and body elements from the provided Array of strings
 * @param {Array<string>} requestBodyArray Array of strings with request headers and body
 * @param {Object} request The request object to be filled into
 */
function parseRequestBody(requestBodyArray, request) {
  // Iterate through to find the headers and potential body elements
  let bodyReached = false
  for (let i = 0; i < requestBodyArray.length; i++) {
    // Find the body by identifying the empty line
    if (requestBodyArray[i].trim() === '') {
      // Flip the switch to swap from parsing header content to parsing body content
      bodyReached = true
      continue // break the current iteration of the for loop
    }
    // When body reached only parse body elements
    if (bodyReached) {
      request.body = parseBody(requestBodyArray[i])
    } else {
      // If body not reached parse as header element
      parseHeader(requestBodyArray[i], request.headers)
    }
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
  const [key, content] = header.split(':').map((s) => s.trim())

  if (key !== '') {
    headers[key] = content
  }
}

// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  if (body.trim() !== '') {
    return JSON.parse(body)
  } else {
    return null
  }
}

// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(path) {
  const queryStartIndex = path.indexOf('?')
  // If no '?' character found -1 is returned
  if (queryStartIndex === -1) {
    return null
  }
  const query = path.substring(queryStartIndex + 1)
  const queryObj = {}
  query.split('&').forEach((q) => {
    const [key, value] = q.split('=')
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
