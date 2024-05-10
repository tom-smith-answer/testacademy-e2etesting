export {}

declare global {
    namespace Cypress {
        interface Chainable {
            openFirstArticle():
            Chainable<any>
            addComment(comment:string):
            Chainable<any>
            loadArticleAndBackendComment(fixture: string):
            Chainable<any>
        }
    }
}

Cypress.Commands.add('openFirstArticle', () => {
    cy.get(`[data-test="article-title"]`).eq(0).click()
    cy.url().should('include', 'article')
})

Cypress.Commands.add('addComment', (comment: string) => {
    cy.get('[data-test="comment-input"]').type(comment)
    cy.get('[data-test="post-comment-btn"]').click()
})

Cypress.Commands.add("loadArticleAndBackendComment", (fixture) => {
    cy.intercept("GET", "https://api.realworld.io/api/articles/**/comments", {
      // * is a wildcard here
      fixture: fixture,
    }).as("comments");

    cy.get(`[data-test="article-title"]`).eq(0).click()

    cy.wait("@comments")




  });