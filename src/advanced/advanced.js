// HERE ARE SOME EXAMPLES OF RAW HTTP REQUESTS (text)
// WE ARE GOING TO WRITE A COLLECTION OF FUNCTIONS THAT PARSE THE HTTP REQUEST
// AND CONVERTS IT ALL INTO A Javascript object

const { parse } = require('path')

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

function parseRawMethodAndPath(str) {
  const method = str.match(/POST|GET|PATCH|DELETE/g)[0].trim()
  const fullPath = str.match(/\/.*[ ]/gi)[0],
    path = fullPath.split('?')[0].trim()
  const query = extractQuery(fullPath)
  return { method, path, query }
}
function parseRawRequestIntoArr(request) {
  const req = request.split('\n')
  //trim arr
  if (['\n', '', ' '].includes(req[0])) req.shift()
  if (['\n', '', ' '].includes(req[req.length - 1])) req.pop()
  return req
}

function parseRequest(req) {
  const request = {
    method: '',
    path: '',
    headers: {},
    body: null,
    query: null
  }

  if (!req) return request
  const rawRequestArr = parseRawRequestIntoArr(req)
  // 0 -> method && path && query
  const { method, path, query } = parseRawMethodAndPath(rawRequestArr[0])
  request.method = method
  request.path = path
  request.query = query
  // 1 : n -> headers
  // on empty line divider -> body
  let allHeadersParsed = false
  for (let i = 1; i < rawRequestArr.length; i++) {
    if (rawRequestArr[i]) {
      if (allHeadersParsed) {
        //body
        request.body = parseBody(rawRequestArr[i])
      } else {
        //header
        parseHeader(rawRequestArr[i], request.headers)
      }
    } else {
      allHeadersParsed = true
    }
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
function parseHeader(header, headers) {
  if (header) {
    let [prop, value] = header.split(':')
    prop = prop.trim()
    value = value.trim()
    console.log('prop', prop)
    headers[prop] = value
  }
}
// console.log('parseHeader', header)
// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  return body ? JSON.parse(body) : null
}

// console.log('parseBody', parseBody('{"key1": "value1", "key2": "value2"}'))

// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(path) {
  const query = path.split('?')[1]
  if (query) {
    const paramsArr = query.split('&')
    const params = {}
    for (const param of paramsArr) {
      let [prop, value] = param.split('=')
      prop = prop.trim()
      value = value.trim()
      params[prop] = value
    }
    return params
  } else return null
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
