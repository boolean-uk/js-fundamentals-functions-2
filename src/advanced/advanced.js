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
      return {
          method: '',
          path: '',
          headers: {},
          body: null,
          query: null
      };
  }

  const lines = req.trim().split('\n');
  const requestLineParts = lines[0] ? lines[0].split(' ') : [];
  const method = requestLineParts.length > 0 ? requestLineParts[0] : '';
  let path = requestLineParts.length > 1 ? requestLineParts[1] : '';
  const headers = {};
  let body = null;
  let query = null;

  if (path.includes('?')) {
      [path, query] = path.split('?');
      query = extractQuery(path + '?' + query) || null;
  }

  const emptyLineIndex = lines.findIndex(line => line.trim() === '');
  lines.slice(1, emptyLineIndex !== -1 ? emptyLineIndex : lines.length).forEach(line => {
      if (line.includes(':')) {
          parseHeader(line, headers);
      }
  });

  if (emptyLineIndex !== -1 && lines.length > emptyLineIndex) {
      const bodyLines = lines.slice(emptyLineIndex + 1);
      if (bodyLines.length > 0) {
          body = parseBody(bodyLines.join('\n')) || null;
      }
  }

  return {
      method: method,
      path: path,
      headers: headers,
      body: body,
      query: query
  };
}

  // call the other functions below as needed

// 2. Create a function named parseHeader that accepts two parameters:
// - a string for one header, and an object of current headers that must be augmented with the parsed header
// it doesnt return nothing, but updates the header object with the parsed header
// eg: parseHeader('Host: www.example.com', {})
//        => { Host: 'www.example.com' }
// eg: parseHeader('Authorization: Bearer your_access_token', { Host: 'www.example.com' })
//        => { Host: 'www.example.com', Authorization: 'Bearer your_access_token'}
// eg: parseHeader('', { Host: 'www.example.com' }) => { Host: 'www.example.com' }
function parseHeader(headerLine, headers) {
  if (!headerLine || headerLine.trim() === '') return;
  const [key, value] = headerLine.split(':').map(part => part.trim());
  if (key && value !== undefined) {
      headers[key] = value;
  }
}

// 3. Create a function named parseBody that accepts one parameter:
// - a string for the body
// It must return the parsed body as a JavaScript object
// search for JSON parsing
// eg: parseBody('{"key1": "value1", "key2": "value2"}') => { key1: 'value1', key2: 'value2' }
// eg: parseBody('') => null
function parseBody(body) {
  if (!body || body.trim() === '') return null;
  try {
    return JSON.parse(body);
  } catch (error) {
    return null;
  }
}
// 4. Create a function named extractQuery that accepts one parameter:
// - a string for the full path
// It must return the parsed query as a JavaScript object or null if no query ? is present
// eg: extractQuery('/api/data/123?someValue=example') => { someValue: 'example' }
// eg: extractQuery('/api/data/123') => null
function extractQuery(pathWithQuery) {
  const queryIndex = pathWithQuery.indexOf('?');
  if (queryIndex === -1 || queryIndex === pathWithQuery.length - 1) return null;
  const queryString = pathWithQuery.substring(queryIndex + 1);
  const queryParts = queryString.split('&');
  const query = {};
  queryParts.forEach(part => {
    const [key, value] = part.split('=');
    if (key && value) {
      query[key] = decodeURIComponent(value);
    }
  });
  return query;
}

module.exports = {
  rawGETRequest,
  rawGETRequestComplex,
  rawPOSTRequest,
  request,
  requestComplex,
  requestPOST,
  parseRequest ,
  parseHeader ,
  parseBody ,
  extractQuery 
}
