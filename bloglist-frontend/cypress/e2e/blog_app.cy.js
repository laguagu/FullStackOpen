/* eslint-disable no-trailing-spaces */
describe("Blog app", function () {
  beforeEach(function () {
    cy.visit(""); // Saa baseUrl muuttuja cypress.configista
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  });

  it("front page can be opened", function () {
    cy.contains("Blogg");
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  });

  it("user can log in", function () {
    cy.contains("Login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();

    cy.contains("mluukkai logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("Login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("Add New post").click();
      cy.contains("cancel").click();
    });
  });

  it("login fails with wrong password", function () {
    cy.contains("Login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Wrong username or password");
    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });

  it.only("Creating blog post", function() {
    cy.login({ username: "mluukkai", password: "salainen" })
    cy.contains("Login").click()
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.contains('Add new post').click()
    cy.get("#title").type("Cypress blog post");
    cy.get("#author").type("Cypress ");
    cy.get("#url").type("www.Cypress.com");
    cy.get("#createButton").click();
    cy.contains("Added by");

    // You can create ne blog post like this
    //cy.createBlog({ title:"Testi" , author:"Moi", url:"www." })

  })

});
