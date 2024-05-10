export {}

declare global {
    namespace Cypress {
        interface Chainable {
            openArticle(title: string):
            Chainable<any>
        }
    }
}

Cypress.Commands.add('openArticle', (title: string) => {
    cy.get(`[data-test="${title}"] > h1`).should('exist').click()
    cy.url().should('include', 'article')
})