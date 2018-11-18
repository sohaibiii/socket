const expect = require('expect')

const { generator, generatorlocation } = require('./generator')

describe('test the generator function', () => {
  it('generator func', () => {
    var from = 'sohaib'
    var para = 'hello guys whats up'
    var res = generator(from, para)
    expect(typeof res.createdAt).toBe('number')
    expect(res).toMatchObject({
      from,
      para
    })
  })
})
describe('test the generatorlocation function', () => {
  it('generatorlocation func', () => {
    var from = 'sohaib'
    var longitude = 213
    var latitude = 4343
    var url = `https://www.google.com/maps/?q=${longitude},${latitude}`
    var res = generatorlocation(from, longitude, latitude)
    expect(typeof res.createdAt).toBe('number')
    expect(res).toMatchObject({
      from,
      url
    })
  })
})
