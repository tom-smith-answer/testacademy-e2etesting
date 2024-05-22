import 'cypress-file-upload'

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Opens the first article on the page
             */
            openArticle(articleNo: number):
            Chainable<any>
            /**
             * Types and posts a comment on the current article
             * @param comment string value to be posted as a comment
             */
            addComment(comment:string):
            Chainable<any>
            /**
             * Loads the first article on the page with a preloaded comment
             * @param fixture string title of json file containing comment details
             */
            loadArticleAndBackendComment(fixture: string):
            Chainable<any>
        }
    }
}

Cypress.Commands.add('openArticle', (articleNo: number) => {
    cy.get(`[data-test="article-title"]`).eq(articleNo).click()
    cy.getByTestId('favourite-btn').should('exist')
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