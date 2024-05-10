describe('Comment feild can accept alphanumeric values', () => {
    
    it('Alphanumeric values are held in the input feild', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act - type alphanumeric characters 
        cy.openArticle("Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!")
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
    it('Add comment button works once, user cannot spam comments', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)

        //act
        cy.openArticle("Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!")
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
        cy.openArticle("Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!")
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
        cy.openArticle("Ill quantify the redundant TCP bus, that should hard drive the ADP bandwidth!")
        cy.addComment(' ')
        cy.get('[data-test="post-comment-btn"]').should('be.disabled')
        
        //assert - text feild should be cleared and comment not posted
        cy.get(`[data-test=" "] > .card-block`).should('not.exist')
    })
})


