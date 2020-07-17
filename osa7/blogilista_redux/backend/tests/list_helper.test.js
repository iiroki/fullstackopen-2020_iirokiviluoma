const listHelper = require('../utils/list_helper')

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
    author: 'Heikki Testihenkilö',
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

const blogMostLikes =
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'Testing for dummies',
    author: 'Heikki Testihenkilö',
    url: 'www.testiblogi5.com',
    likes: 18,
    __v: 0
  }

const mostBlogsOneBlog =
  {
    author: "Teppo Testaaja",
    blogs: 1
  }

const mostBlogs =
{
  author: "Heikki Testihenkilö",
  blogs: 2
}

const bloggerMostLikes =
{
  author: 'Heikki Testihenkilö',
  likes: 30
}

const bloggerMostLikesOneBlog =
{
  author: "Teppo Testaaja",
  likes: 5
}

test('Dummy returns one', () => {
  const blogs = []

  const testResult = listHelper.dummy(blogs)
  expect(testResult).toBe(1)
})

describe('Total likes', () => {
  test('Empty list: Total likes equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('One blog: Total likes = the only blog\'s likes', () => {
    const result = listHelper.totalLikes(listOneBlog)
    expect(result).toBe(listOneBlog[0].likes)
  })

  test('Multiple blogs: Total likes of the blogs is calculated correctly', () => {
    const result = listHelper.totalLikes(listMultipleBlogs)
    expect(result).toBe(47)
  })
})

describe('Favorite blogs', () => {
  test('One blog: The only blog is favorite', () => {
    const result = listHelper.favoriteBlog(listOneBlog)
    expect(result).toEqual(listOneBlog[0])
  })

  test('Multiple blogs: Favorite blog is the one with most likes', () => {
    const result = listHelper.favoriteBlog(listMultipleBlogs)
    expect(result).toEqual(blogMostLikes)
  })
})

describe('Most blogs', () => {
  test('One blog: Blogger with the only blog has most blogs.', () => {
    const result = listHelper.mostBlogs(listOneBlog)
    expect(result).toEqual(mostBlogsOneBlog)
  })

  test('Multiple blogs: Blogger with most blogs is returned correctly', () => {
    const result = listHelper.mostBlogs(listMultipleBlogs)
    expect(result).toEqual(mostBlogs)
  })
})

describe('Most likes', () => {
  test('One blog: Blogger with most likes is the only blogger', () => {
    const result = listHelper.mostLikes(listOneBlog)
    expect(result).toEqual(bloggerMostLikesOneBlog)
  })

  test('Multiple blogs: Blogger with most likes is returned correctly', () => {
    const result = listHelper.mostLikes(listMultipleBlogs)
    expect(result).toEqual(bloggerMostLikes)
  })
})
