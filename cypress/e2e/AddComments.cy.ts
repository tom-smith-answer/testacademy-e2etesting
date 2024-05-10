describe('User should be able to add a comment', () => {

    it('A signed in user can add a comment', () => {
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)
        cy.openArticle("Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!")
        cy.addComment('New comment')
    })
})