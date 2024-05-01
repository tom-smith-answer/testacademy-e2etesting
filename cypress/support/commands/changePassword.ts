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
    cy.get(':nth-child(4) > .nav-link')
    .click()
    cy.get('.btn')
    .click()
    cy.getByPlaceholder('New password')
    .type(newPassword)
    cy.get('form > :nth-child(1) > .btn').click()
})