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
    cy.getByPlaceholder('Email').type(email)
    cy.getByPlaceholder('Password').type(password)
    return cy.get('.btn').click()
})