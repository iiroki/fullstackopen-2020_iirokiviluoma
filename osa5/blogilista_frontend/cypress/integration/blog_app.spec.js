describe('User has not logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  // Vain kirjautumislomake näytetään alussa kirjautumattomalle käyttäjälle
  it('Only login is showed by default', function() {
    cy.get('#username')
    cy.get('#password')
    cy.contains('Log in')
    cy.get('.blogList').should('not.exist')
    cy.get('.newBlogForm').should('not.exist')
  })
})