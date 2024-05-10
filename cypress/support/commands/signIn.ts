export {}

declare global {
    namespace Cypress {
        interface Chainable {
            signIn(email: string, password: string): 
            Chainable<any>
            signOut(): 
            Chainable<any>
            changePassword( newPassword: string): 
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

Cypress.Commands.add('signOut', ()=> {
    cy.get('[data-test="Settings"]').click()
    cy.getByTestId('log-out-btn').click()

})

Cypress.Commands.add('changePassword', (newPassword:string) => {
    cy.get('[data-test="Settings"]')
    .click()
    cy.getByTestId('new-password-input')
    .type(newPassword)
    cy.get('[data-test="update-settings-btn"]')
    .click()
})