// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginUser', ({ username, password }) => {
  // async/awaitia ei tarvita -> Cypress huolehtii
  cy.request('POST',
    'http://localhost:3003/api/login',
    { username, password })
    .then(response => {
      window.localStorage.setItem('loggedUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('addBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    headers: {
      'Authorization': `BEARER ${JSON.parse(window.localStorage.getItem('loggedUser')).token}`
    },
    body: {
      title: title,
      author: author,
      url: url,
      likes: likes
    }
  })

  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addUser', ({ username, password, name }) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username: username,
    password: password,
    name: name
  })
})

Cypress.Commands.add('getBlogs', () => {
  return cy.request('GET', 'http://localhost:3000/api/blogs')
})
