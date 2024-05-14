describe('Comment feild can accept alphanumeric values', () => {

    it('Alphanumeric values are held in the input feild', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act - type alphanumeric characters 
        cy.openFirstArticle()
        cy.get('[data-test="comment-input"]').type('1 new comment')
        .should('have.value', '1 new comment') //assert - feild contains input characters and post button is clickable
        cy.get('[data-test="post-comment-btn"]').should('not.be.disabled')
    })
})

describe('User should be able to add a comment', () => {

    it('A signed in user can add a comment', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act - add comment
        cy.openFirstArticle()
        cy.addComment('New comment')

        //assert - comment exists
        cy.get('[data-test="New comment"]').should('exist')
    })
    it('User cannot add a comment when not signed in', () => {
        //arrange - vist
        cy.visit('/')

        //act - open article 
        cy.openFirstArticle()

        //assert - comment input feild cannot be accessed
        cy.get(`[data-test="New comment"]`).should('not.exist')
    })
    it('Add comment button works once, user cannot spam comments', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act
        cy.openFirstArticle()
        cy.addComment('New comment')

        //assert
        cy.get('[data-test="post-comment-btn"]').should('be.disabled')
    })
    it('User cannot add an empty string comment', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act - type empty comment
        cy.openFirstArticle()
        cy.get('[data-test="comment-input"]').click()

        //assert - post comment button is disabled
        cy.get('[data-test="post-comment-btn"]').should('be.disabled')
    })
    it.skip('User cannot add a string of spaces as a comment', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act - type and post space character comment
        cy.openFirstArticle()
        cy.addComment(' ')
        cy.get('[data-test="post-comment-btn"]').should('be.disabled')
        
        //assert - text feild should be cleared and comment not posted
        cy.get(`[data-test=" "] > .card-block`).should('not.exist')
    })
})

describe.only('User should be able to delete a comment', () => {

    it('signed in user can delete one of their own comments', () => {

        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.loadArticleAndBackendComment("two-comments.json")

        const commentNo = 1

        cy.getByTestId('comment-author').eq(commentNo).should('have.text', 'testing-account')
        cy.getByTestId('delete-comment-btn').eq(commentNo).should('be.visible').children().eq(0).click()


        // cy.get(':nth-child(3) > [data-test="comment-footer"]').children().eq(1).should('have.text', 'testing-account')
        // cy.get(':nth-child(3) > [data-test="comment-footer"]').children().eq(3).should('be.visible')

    })
})


