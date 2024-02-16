const {
  rawGETRequest,
  rawGETRequestComplex,
  rawPOSTRequest,
  request,
  requestComplex,
  requestPOST,
  extractQuery,
  parseBody,
  parseHeader,
  parseRequest
} = require('../../src/advanced/advanced.js')

describe('HTTP Request Parser', () => {
  it('extracts query parameters from a path', () => {
    expect(extractQuery('/api/data/123?someValue=example')).toEqual({
      someValue: 'example'
    })
  })

  it('extracts multiple query parameters from a path', () => {
    expect(
      extractQuery('/api/data/123?someValue=example&anotherValue=example2')
    ).toEqual({
      someValue: 'example',
      anotherValue: 'example2'
    })
  })

  it('returns null when query parameters from a path without query parameters', () => {
    expect(extractQuery('/api/data/123')).toEqual(null)
  })

  it('parses a body from a request string', () => {
    expect(parseBody('{"key1": "value1", "key2": "value2"}')).toEqual({
      key1: 'value1',
      key2: 'value2'
    })
  })

  it('returns null when request body is empty', () => {
    expect(parseBody('')).toEqual(null)
  })

  it('parses a header from a request string', () => {
    const headers = {}
    parseHeader('Content-Type: application/json', headers)
    expect(headers).toEqual({
      'Content-Type': 'application/json'
    })
  })

  it('parses a header from a request string2', () => {
    const headers = { Host: 'www.example.com' }
    parseHeader('Content-Type: application/json', headers)
    expect(headers).toEqual({
      Host: 'www.example.com',
      'Content-Type': 'application/json'
    })
  })

  it('parses an empty header from a request string', () => {
    const headers = { Host: 'www.example.com' }
    parseHeader('', headers)
    expect(headers).toEqual({
      Host: 'www.example.com'
    })
  })

  it('parses an empty request', () => {
    expect(parseRequest('')).toEqual({
      method: '',
      path: '',
      headers: {},
      body: null,
      query: null
    })
  })

  it('parses a simple GET request', () => {
    expect(parseRequest(rawGETRequest)).toEqual(request)
  })

  it('parses a complex GET request', () => {
    expect(parseRequest(rawGETRequestComplex)).toEqual(requestComplex)
  })

  it('parses a POST request', () => {
    expect(parseRequest(rawPOSTRequest)).toEqual(requestPOST)
  })
})
