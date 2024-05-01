export {}

declare global {
    namespace Cypress {
        interface Chainable {
            signOut(): 
            Chainable<any>
        }
    }
 }

Cypress.Commands.add('signOut', ()=> {
    cy.get(':nth-child(3) > .nav-link')
    .click()
    cy.get('.btn-outline-danger').click()

})