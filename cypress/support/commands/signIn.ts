export {}

declare global {
    namespace Cypress {
        interface Chainable {
            signIn(email: string, password: string): 
            Chainable<any>
        }
    }
 }

Cypress.Commands.add('signIn', (email: string, password: string) => {
    cy.get(':nth-child(2) > .nav-link')
    .click()
    cy.getByPlaceholder('Email')
    .type(email)
    cy.getByPlaceholder('Password')
    .type(password)
    cy.get('.btn').click()
})