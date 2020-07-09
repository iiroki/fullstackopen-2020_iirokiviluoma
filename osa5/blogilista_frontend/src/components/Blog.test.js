import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog tests', () => {
  test('A single blog is rendered with title and author by default', () => {
    const blogToRender = {
      title: 'testrender',
      author: 'fortesting',
      url: 'www.test.com',
      likes: 1
    }

    const component = render(
      <Blog blog={blogToRender} />
    )

    const div = component.container.querySelector('.blog')
    // Title ja author renderöidään, urlia ja likejä ei
    expect(div).toHaveTextContent(blogToRender.title)
    expect(div).toHaveTextContent(blogToRender.author)
    expect(div).not.toHaveTextContent(blogToRender.url)
    expect(div).not.toHaveTextContent(blogToRender.likes)
  })

  test('A single blog is rendered with all its content after pressing it', () => {
    const blogToRender = {
      title: 'testrender',
      author: 'fortesting',
      url: 'www.test.com',
      likes: 1,
      user: {
        username: 'test',
        name: 'Testi'
      }
    }

    const component = render(
      <Blog blog={blogToRender} currentUser={blogToRender.user.username} />
    )

    const blogExpand = component.container.querySelector('.blogExpand')
    fireEvent.click(blogExpand)
    const div = component.container.querySelector('.blog')
    // Title, author, url, likes ja käyttäjä renderöidään
    expect(div).toHaveTextContent(blogToRender.title)
    expect(div).toHaveTextContent(blogToRender.author)
    expect(div).toHaveTextContent(blogToRender.url)
    expect(div).toHaveTextContent(blogToRender.likes)
    expect(div).toHaveTextContent(blogToRender.user.name)
  })

  test('Clicking "Like"-button twice calls the event handler twice', () => {
    const blogToRender = {
      title: 'testrender',
      author: 'fortesting',
      url: 'www.test.com',
      likes: 1,
      user: {
        username: 'test',
        name: 'Testi'
      }
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blogToRender}
        currentUser={blogToRender.user.username}
        handleLike={mockHandler}
      />
    )

    const blogExpand = component.container.querySelector('.blogExpand')
    fireEvent.click(blogExpand)
    const blogLike = component.container.querySelector('.likeButton')
    fireEvent.click(blogLike)
    fireEvent.click(blogLike)
    // mockHandleriä on kutsuttu kaksi kertaa
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
