// HERE ARE SOME EXAMPLES OF RAW HTTP REQUESTS (text)
// WE ARE GOING TO WRITE A COLLECTION OF FUNCTIONS THAT PARSE THE HTTP REQUEST
// AND CONVERT IT ALL INTO A Javascript object

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
//body will always start and end with {} and keys and values will be in double quotes 
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

  if (req.length === 0){ //Return unpopulated object if passed empty request
    return request
  }
  
  let splitReq = req.trim().split(' ')

  //Get method
  request.method = splitReq[0]

  //Get path
  if (splitReq[1].includes('?')){
    request.path = splitReq[1].slice(0, splitReq[1].indexOf('?'))
  } else {
    request.path = splitReq[1]
  }

  //Get header
  let beHeaded = req.slice(req.indexOf('Host'), req.length).split('\n')
  for (let i = 0; i < beHeaded.length - 1; i++){ 
    if (beHeaded[i].length === 0){
      beHeaded.splice(i, beHeaded.length)
    } else {
    request.headers[beHeaded[i].slice(beHeaded[i][0], beHeaded[i].indexOf(':'))] = beHeaded[i].slice(beHeaded[i].indexOf(':') +2, beHeaded[i].length)
    }
  }

  //Get body
  if (req.includes('{')){

  request.body = {}
  let bodySlice = req.slice(req.indexOf('{')+1, req.indexOf('}')).replaceAll('"','').split(' ')
 
  for (let i = 0; i < bodySlice.length-1; i+=2){
    request.body[bodySlice[i].replaceAll(':','')] = bodySlice[i+1].replaceAll(',', '') 
    }
  }

  // Get query 
  if (splitReq[1].includes('?')){
  request.query = {}
  slicedQuery = splitReq[1].slice(splitReq[1].indexOf('?')+1, splitReq[1].length).split('&')
 
  let tempSplit = []
  for (let i = 0; i < slicedQuery.length; i++){
    tempSplit.push(slicedQuery[i].split('='))
  }
 let finalSplit = tempSplit.flat()

for (let i = 0; i < finalSplit.length; i+=2){
  request.query[finalSplit[i]] = finalSplit[i+1]
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
 if (header.length !== 0){
  headers[header.split(':')[0]] = header.split(':')[1].trim()
  }
return headers
}

// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  
 if (body.length != 0){

  let bodySlice = body.slice(body.indexOf('{')+1, body.indexOf('}')).replaceAll('"','').split(' ') 
  body = {}
  for (let i = 0; i < bodySlice.length-1; i+=2){
    body[bodySlice[i].replaceAll(':','')] = bodySlice[i+1].replaceAll(',', '') 
    }
    return body
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
  if (path.includes('?')){
    splitPath = path.slice(path.indexOf('?')+1, path.length).split('&')
   
    let tempArr = []
    
    for (let i = 0; i < splitPath.length; i++){
      tempArr.push(splitPath[i].split('='))
    }
    
    let finalArr = tempArr.flat()

console.log(tempArr)
    path = {}
      for (let i = 0; i < finalArr.length; i += 2 ){
        path[finalArr[i]] = finalArr[i+1]
      }
 return path
}
return null
}
console.log(extractQuery(`/api/data/123?someValue=example&anotherValue=example`))


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
