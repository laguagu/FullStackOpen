describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000/");
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  });

  it("front page can be opened", function () {
    cy.contains("Blogg");
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  });

  it("user can log in", function () {
    cy.contains("Login").click();
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('mluukkai logged in')
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains("Login").click();
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('Add New post').click()
    })
  })

});
