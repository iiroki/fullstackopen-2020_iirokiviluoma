describe('Bloglist App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'cypresstest',
      password: 'cypress',
      name: 'Cypress Test'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  // Vain kirjautumislomake näytetään alussa kirjautumattomalle käyttäjälle
  it('Only login is showed by default when opening the app', function() {
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.contains('Log in')
    cy.get('.blogList').should('not.exist')
    cy.get('.newBlogForm').should('not.exist')
  })

  describe('Login tests', function() {
    // Kirjautumisyritys sopivilla tiedoilla
    it('Login succeeds with correct credentials', function() {
      cy.get('#username').type('cypresstest')
      cy.get('#password').type('cypress')
      cy.get('#loginButton').click()
      // Ilmoitus onnistuneesta kirjautuneesta
      cy.get('.notificationGood')
        .should('exist')
        .and('contain', 'Login successful')
        // Väri: darkgreen
        .and('have.css', 'color', 'rgb(0, 100, 0)')
      // Kerrotaan kuka kirjautui sisään
      cy.contains('Logged in as Cypress Test')
      // Uloskirjautumisnappi löytyy
      cy.get('.logoutButton').should('exist')
    })

    // Kirjautumisyritys väärillä tiedoilla
    it('Login fails with wrong password or username', function() {
      cy.get('#username').type('cypresstest')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginButton').click()
      // Ilmoitus epäonnistuneesta kirjautumisesta
      cy.get('.notificationError')
        .should('exist')
        .and('contain', 'Invalid username or password')
        // Väri: red
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      // Ei näytetä kirjautunutta käyttäjää  (koska ei ole)
      cy.get('html').should('not.contain', 'Logged in as Cypresstest')
      // Kirjautumislomake näytetään edelleen
      cy.get('#username').should('exist')
      cy.get('#password').should('exist')
      cy.contains('Log in')
    })
  })
})