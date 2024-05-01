describe('Conduit test framework', () => {

    it('signs in with a valid email and password', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .nav-link')
        .click()
        cy.signIn('tom.smith@answerdigital.com', 'password')

        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)
    })

    it('fails to sign in and displays an appropriate error message when given incorrect login details', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .nav-link')
        .click() 
        cy.signIn('john.smith@answerdigital.com', 'wrongpass')

        cy.url().should('eq', `${Cypress.config('baseUrl')}#/login`)
        cy.get('.error-messages > li').should('have.text', 'email or password is invalid')
        
    })



})
