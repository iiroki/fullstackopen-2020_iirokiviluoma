import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogList from './BlogList'

describe('Bloglist tests', () => {
  test('A single blog is rendered with its content', () => {
    const blogToRender = {
      title: 'testrender',
      author: 'fortesting',
      url: 'www.test.com',
      likes: 1
    }
  })
})
