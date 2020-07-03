const listHelper = require('../utils/list_helper')

test('Dummy returns one', () => {
  const blogs = []

  const testResult = listHelper.dummy(blogs)
  expect(testResult).toBe(1)
})

describe('Total likes:', () => {
  const listOneBlog = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'Test automation',
      author: 'Teppo Testaaja',
      url: 'www.testiblogi1.com',
      likes: 5,
      __v: 0
    }
  ]

  const listMultipleBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'Test automation',
      author: 'Teppo Testaaja',
      url: 'www.testiblogi1.com',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Testaajan blogi',
      author: 'Matti Mäkinen',
      url: 'www.testiblogi2.com',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Mä joka päivä testejä teen',
      author: 'Jose Mattila',
      url: 'www.testiblogi3.com',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'Kiven kovaa testausta',
      author: 'Timo Testimies',
      url: 'www.testiblogi4.com',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'Testing for dummies',
      author: 'Tuija Testinainen',
      url: 'www.testiblogi5.com',
      likes: 18,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Testiblogi',
      author: 'Heikki Testihenkilö',
      url: 'www.testiblogi6.com',
      likes: 12,
      __v: 0
    }
  ]

  test('Empty list has total likes of zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('One blog has total likes equal to its likes', () => {
    const result = listHelper.totalLikes(listOneBlog)
    expect(result).toBe(listOneBlog[0].likes)
  })

  test('Total likes of multiple blogs is calculated right', () => {
    const result = listHelper.totalLikes(listMultipleBlogs)
    expect(result).toBe(47)
  })
})
