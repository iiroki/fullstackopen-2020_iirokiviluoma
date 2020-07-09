import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog tests', () => {
  test('A single blog is rendered with its content', () => {
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
    expect(div).toHaveTextContent(blogToRender.title)
    expect(div).toHaveTextContent(blogToRender.author)
    expect(div).not.toHaveTextContent(blogToRender.url)
    expect(div).not.toHaveTextContent(blogToRender.likes)
  })
})
