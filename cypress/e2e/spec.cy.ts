describe('Conduit test framework', () => {

    it('signs in with a valid email and password', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .nav-link')
        .click()

        cy.getByPlaceholder('Email')
        .type('tom.smith@answerdigital.com')
        cy.getByPlaceholder('Password')
        .type('password')
        cy.get('.btn').click()

        cy.url().should('eq', `${Cypress.config('baseUrl')}#/`)
    })

    it('fails to sign in and displays an appropriate error message when given incorrect login details', () => {
        cy.visit('/')

        cy.get(':nth-child(2) > .nav-link')
        .click()

        cy.getByPlaceholder('Email')
        .type('john.smith@answerdigital.com')
        cy.getByPlaceholder('Password')
        .type('passcode')
        cy.get('.btn').click()

        cy.url().should('eq', `${Cypress.config('baseUrl')}#/login`)
        cy.get('.error-messages > li').should('have.text', 'email or password is invalid')
        
    })



})
