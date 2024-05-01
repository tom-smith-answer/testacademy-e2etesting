describe('Conduit test framework', () => {

    it('signs in with a valid email and password', () => {
        cy.visit('/')
        cy.signIn('test@answerdigital.com', 'password')
        cy.get(':nth-child(4) > .nav-link')
        .click()

        cy.url().should('eq', `${Cypress.config('baseUrl')}#/profile/test-answer`)
    })

    it('fails to sign in and displays an appropriate error message when given incorrect login details', () => {
        cy.visit('/')
        cy.signIn('john.smith@answerdigital.com', 'wrongpass')

        cy.url().should('eq', `${Cypress.config('baseUrl')}#/login`)
        cy.get('.error-messages > li').should('have.text', 'email or password is invalid')
        
    })

    // it('a signed in user should be able to access their profile settings and update their password', () => {
    //     cy.visit('/')
    //     cy.signIn('test@answerdigital.com', 'password')
    //     cy.changePassword('newpassword')
    //     cy.signOut()
    //     cy.signIn('test@answerdigital.com', 'newpassword')

    //     cy.url().should('eq', `${Cypress.config('baseUrl')}#/profile/test-answer`)
    //     cy.changePassword('password')

    // })



})
