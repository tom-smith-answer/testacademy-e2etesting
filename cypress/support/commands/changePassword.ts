export {}

declare global {
    namespace Cypress {
        interface Chainable {
            changePassword( newPassword: string): 
            Chainable<any>
        }
    }
 }

Cypress.Commands.add('changePassword', (newPassword:string) => {
    cy.get('[data-test="Settings"]')
    .click()
    cy.getByTestId('new-password-input')
    .type(newPassword)
    cy.get('[data-test="update-settings-btn"]')
    .click()
})