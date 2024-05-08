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
    cy.get('[data-test="Sign in"]')
    .click()
    cy.url().should("eq", `${Cypress.config('baseUrl')}#/login`)
    cy.getByTestId('email-input')
    .type(email)
    cy.getByTestId('password-input')
    .type(password)
    cy.get('[data-test="sign-in-btn"]')
    .click()
})