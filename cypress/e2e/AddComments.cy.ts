describe('User should be able to add a comment', () => {

    it('A signed in user can add a comment', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act - add comment
        cy.openArticle("Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!")
        cy.addComment('New comment')

        //assert - comment exists
        cy.get(`[data-test="New comment"] > .card-block`).should('exist')
    })
    it('User cannot add a comment when not signed in', () => {
        //arrange - vist
        cy.visit('/')

        //act - open article 
        cy.openArticle("Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!")

        //assert - comment input feild cannot be accessed
        cy.get(`[data-test="New comment"] > .card-block`).should('not.exist')
    })
})

