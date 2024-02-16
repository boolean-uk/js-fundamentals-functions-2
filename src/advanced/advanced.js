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
  if (req === '') {
    const requ = {
      method: '',
      path: '',
      headers: {},
      body: null,
      query: null
    }
    return requ
  }

  const hdr = req.split('{')[0].split('\n').slice(2, 20)

  const arr = req.replace('\n', '').split(' ')
  const request = {
    method: arr[0],
    path: arr[1].split('?')[0],
    headers: {},
    body: {},
    query: {}
  }
  for (const el of hdr) {
    if (el === '') {
      continue
    }
    const r = el.split(': ')
    request.headers[r[0]] = r[1]
  }

  if (!req.includes('{')) {
    request.body = null
  } else {
    const bd = req.split('{')[1].replace('{', '').replace('}', '')
    const r = bd.split(',')
    for (const el of r) {
      const rr = el.split(': ')
      const v1 = rr[0].replace(`"`, '').replace(`"`, '').replace(' ', '')
      const v2 = rr[1].replace(`"`, '').replace(`"`, '').replace('\n', '')
      request.body[v1] = v2
    }
  }

  // /api/data/123?someValue=example&anotherValue=example2
  if (arr[1].includes('?')) {
    const res = arr[1].split('&')

    for (const a of res) {
      const r2 = a.split('=')
      if (r2[0].includes('?')) {
        const fr = r2[0].split('?')[1]
        request.query[fr] = r2[1]
      } else {
        request.query[r2[0]] = r2[1]
      }
    }
  } else {
    request.query = null
  }

  return request
}

// console.log(parseRequest(rawPOSTRequest))
// 2. Create a function named parseHeader that accepts two parameters:
// - a string for one header, and an object of current headers that must be augmented with the parsed header
// it doesnt return nothing, but updates the header object with the parsed header
// eg: parseHeader('Host: www.example.com', {})
//        => { Host: 'www.example.com' }
// eg: parseHeader('Authorization: Bearer your_access_token', { Host: 'www.example.com' })
//        => { Host: 'www.example.com', Authorization: 'Bearer your_access_token'}
// eg: parseHeader('', { Host: 'www.example.com' }) => { Host: 'www.example.com' }
function parseHeader(header, headers) {
  if (header === '') {
    return headers
  }
  if (Object.keys(headers).length === 0) {
    const r = header.split(': ')
    headers[r[0]] = r[1]
    return headers
  }

  const l = header.split(': ')
  headers[l[0]] = l[1]
  return headers
}

// console.log(parseHeader('Content-Type: application/json', {}))
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
  const obj = JSON.parse(body)
  return obj
}

// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(path) {
  if (!path.includes('?')) {
    return null
  }

  const res = path.split('&')
  const obj = {}

  for (const a of res) {
    const r2 = a.split('=')
    if (r2[0].includes('?')) {
      const fr = r2[0].split('?')[1]
      obj[fr] = r2[1]
    } else {
      obj[r2[0]] = r2[1]
    }
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
