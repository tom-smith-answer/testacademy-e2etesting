export {}

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Selects an input field DOM element based on its placeholder value
             * @param placeholder string value displayed in input field 
             */
            getByPlaceholder(placeholder: string): 
            Chainable<any>
            /**
             * Selects a DOM element based on its data-test tag
             * @param input string value used as data-test tag
             */
            getByTestId(input: string): 
            Chainable<any>
        }
    }
 }
 
 Cypress.Commands.add('getByPlaceholder', (placeholder: string) => {
    Cypress.log({
        displayName: 'getByPlaceholder',
        message: placeholder,
        consoleProps() {
            return {
                selector: placeholder
            }
        }
    })
    cy.get(`[placeholder="${placeholder}"]`)
 }) 

 Cypress.Commands.add("getByTestId", (selector, ...args) => {
    return cy.get(`[data-test="${selector}"]`, ...args);
  });