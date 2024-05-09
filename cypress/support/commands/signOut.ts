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
    cy.get('[data-test="Settings"]').click()
    
    cy.getByTestId('log-out-btn').click()
    // cy.url().should("eq", `${Cypress.config('baseUrl')}#/`);

})