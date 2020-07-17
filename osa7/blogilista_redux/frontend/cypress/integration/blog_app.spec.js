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

  describe('When user has logged in', function() {
    // Kirjaudutaan sisään ennen testejä
    beforeEach(function() {
      cy.loginUser({ username: 'cypresstest', password: 'cypress' })
    })

    // Voidaan luoda uusi blogi sopivilla tiedoilla
    it('A new blog can be created', function() {
      // Avataan luomislomake
      cy.contains('New blog').click()
      // Syötetään tiedot ja lähetetään lomake
      cy.get('.newBlogForm').as('form')
      cy.get('@form').find('#title').type('Cypress test blog')
      cy.get('@form').find('#author').type('Cypress')
      cy.get('@form').find('#url').type('www.cypresse2etest.com')
      cy.get('@form').find('.addButton').click()

      // Ilmoitus lisätystä blogista
      cy.get('.notificationGood')
        .should('exist')
        .and('contain', 'A new blog added: Cypress test blog - Cypress')
        // Väri: darkgreen
        .and('have.css', 'color', 'rgb(0, 100, 0)')

      // Lisätty blogi löytyy blogilistasta
      const blogList = cy.get('.blogList')
      blogList.contains('Cypress test blog - Cypress')
    })

    it('Adding a new blog fails with invalid data fields', function() {
      // Avataan luomislomake
      cy.contains('New blog').click()
      // Syötetään tiedot ja lähetetään lomake
      const form = cy.get('.newBlogForm')
      form.get('#title').type('Cypress test blog')
      form.get('#author').type('Cypress')
      // Ei urlia
      form.get('.addButton').click()

      // Ilmoitus epäonnistuneesta blogin luomisesta
      cy.get('.notificationError')
        .should('exist')
        .and('contain', 'Author and URL are minimum requirements to add a new blog')
        // Väri: red
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      // Luomislomake vielä auki
      cy.get('.newBlogForm').should('contain', 'New blog')
        .and('contain', 'Title:')
        .and('contain', 'Author:')
        .and('contain', 'URL:')
        .and('contain', 'Add')

      // Lisättävää blogia ei löydy blogilistasta
      cy.get('.blogList').should('not.contain', 'Cypress test blog - Cypress')
    })
  })

  describe('When user has logged in and there are multiple blogs', function() {
    // Kirjaudutaan sisään ennen testejä ja lisätään yksi blogi
    beforeEach(function() {
      cy.loginUser({ username: 'cypresstest', password: 'cypress' })

      cy.addBlog({
        title: 'Cypress test blog 1',
        author: 'Cypress',
        url: 'www.cypresse2etest1.com',
        likes: 3
      })

      cy.addBlog({
        title: 'Cypress test blog 2',
        author: 'Cypress',
        url: 'www.cypresse2etest2.com',
        likes: 6
      })

      cy.addBlog({
        title: 'Cypress test blog 3',
        author: 'Cypress',
        url: 'www.cypresse2etest3.com',
        likes: 12
      })

      cy.addBlog({
        title: 'Cypress test blog 4',
        author: 'Cypress',
        url: 'www.cypresse2etest4.com',
        likes: 9
      })
    })

    // Listassa olevasta blogista voidaan tykätä
    it('A blog can be liked', function() {
      // Avataan blogin täysinäkymä ja painetaan "Like"-nappia
      cy.get('.blogExpand').first().click()
      cy.get('#likesAmount').should('contain', '12')
      cy.get('.likeButton').click()
      // Tarkastetaan tykkäysten määrän nousseen yhdellä
      cy.get('#likesAmount').should('contain', '13')
    })

    // Blogin lisäänyt voi poistaa kyseisen blogin
    it('User who added the blog can delete it', function() {
      // Avataan blogin täysinäkymä ja painetaan "Remove"-nappia
      cy.get('.blogExpand').first().click()
      cy.get('#removeButton').click()

      // Ilmoitus onnistuneesta poistosta
      cy.get('.notificationGood')
        .should('exist')
        .and('contain', 'Blog Cypress test blog 3 deleted')
        // Väri: darkgreen
        .and('have.css', 'color', 'rgb(0, 100, 0)')

      // Lisättävää blogia ei löydy blogilistasta
      cy.get('.blogList').should('not.contain', 'Cypress test blog - Cypress')
    })

    // Muu kuin blogin lisääjä ei kykene poistamaan blogia
    it('A blog cannot be deleted by anynody else than the user who added it', function() {
      cy.addUser({
        username: 'cypresstest2',
        password: 'cypress2',
        name: 'Cypress Test 2nd'
      })

      // Kirjaudutaan ulos ja kirjaudutaan sisään eri käyttäjällä
      cy.get('.logoutButton').click()
      cy.loginUser({ username: 'cypresstest2', password: 'cypress2' })
      // Avataan blogin täysinäkymä
      cy.get('.blogExpand').first().click()
      // "Remove"-nappia ei kuuluisi näkyä
      cy.get('#removeButton').should('not.exist')
    })

    // Blogit näytetään tykkäysjärjestyksessä
    it('Blogs are ordered by likes in descending order', function() {
      let likes = []

      cy.get('.blogExpand').each(e => e.click())

      // Haetaan blogien tykkäykset
      cy.get('.blog').within(() => {
        cy.get('#likesAmount').then($likes => {
          $likes.each(function(index) {
            likes.push($likes[index].innerText)
          })
        })
      })

      // Tarkastetaan onko blogien järjestys oikea
      cy.wrap(likes).should('equal', likes.sort())
    })
  })
})