describe('Login tests', () => {

    it('signs in with a valid email and password', () => {
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.get('[data-test="testing-account"]')
        .click()
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/profile/testing-account`)
    })

    it('fails to sign in and displays an appropriate error message when given incorrect login details', () => {
        cy.visit('/')
        cy.signIn('john.smith@answerdigital.com', 'wrongpass')

        cy.url().should('eq', `${Cypress.config('baseUrl')}#/login`)
        cy.get('.error-messages > li').should('have.text', 'email or password is invalid')
        
    })

    it('a signed in user should be able to access their profile settings and update their password', () => {
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.changePassword('newpassword')
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/profile/testing-account`)
        cy.signOut()
        cy.signIn('test@answer.com', 'newpassword')
        cy.get('[data-test="testing-account"]').click()
        cy.url().should('eq', `${Cypress.config('baseUrl')}#/profile/testing-account`)
    })

    after(() => {
        cy.changePassword('password')
    })



})
