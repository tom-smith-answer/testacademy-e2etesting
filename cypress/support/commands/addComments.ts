export {}

declare global {
    namespace Cypress {
        interface Chainable {
            openArticle(title: string):
            Chainable<any>
            addComment(comment:string):
            Chainable<any>
        }
    }
}

Cypress.Commands.add('openArticle', (title: string) => {
    cy.get(`[data-test="${title}"] > h1`).should('exist').click()
    cy.url().should('include', 'article')
})

Cypress.Commands.add('addComment', (comment: string) => {
    cy.get('[data-test="comment-input"]').type(comment)
    cy.get('[data-test="post-comment-btn"]').click()
    cy.get(`[data-test="${comment}"] > .card-block`).should('exist')
})