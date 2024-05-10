export {}

declare global {
    namespace Cypress {
        interface Chainable {
            getByPlaceholder(input: string): 
            Chainable<any>
            getByTestId(input: string): 
            Chainable<any>
        }
    }
 }
 
 Cypress.Commands.add('getByPlaceholder', (input: string) => {
    Cypress.log({
        displayName: 'getByPlaceholder',
        message: input,
        consoleProps() {
            return {
                selector: input
            }
        }
    })
    cy.get(`[placeholder="${input}"]`)
 }) 

 Cypress.Commands.add("getByTestId", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
  });