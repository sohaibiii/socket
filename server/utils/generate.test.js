const expect = require('expect')

const { generator } = require('./generator')

describe('test the generator function', () => {
  it('generator func', () => {
    var from = 'sohaib'
    var para = 'hello guys whats up'
    var res = generator(from, text)
    // expect(typeof res.createdAt).toBe('number')
    expect(res).toMatchObject({
      from,
      para
    })
  })
})
