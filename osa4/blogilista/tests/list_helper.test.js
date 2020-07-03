const listHelper = require('../utils/list_helper')

describe('listHelper', () => {
  test('dummy returns one', () => {
    const blogs = []

    const testResult = listHelper.dummy(blogs)
    expect(testResult).toBe(1)
  })
})
