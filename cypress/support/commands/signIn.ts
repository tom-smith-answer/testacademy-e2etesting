export {}

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * automates sign in process
             * @param email string email value
             * @param password string password value
             */
            signIn(email: string, password: string): 
            Chainable<any>
            /**
             * automates sign out process
             */
            signOut(): 
            Chainable<any>
            /**
             * automates password change process from signed in homepage
             * @param newPassword string new password value
             */
            changePassword( newPassword: string): 
            Chainable<any>
        }
    }
 }

Cypress.Commands.add('signIn', (email: string, password: string) => {
    cy.get('[data-test="Sign in"]')
    .click()
    cy.url().should("eq", `${Cypress.config('baseUrl')}#/login`)
    cy.getByTestId('email-input')
    .type(email)
    cy.getByTestId('password-input')
    .type(password)
    cy.get('[data-test="sign-in-btn"]')
    .click()
})

Cypress.Commands.add('signOut', ()=> {
    cy.get('[data-test="Settings"]').click()
    cy.getByTestId('log-out-btn').click()

})

Cypress.Commands.add('changePassword', (newPassword:string) => {
    cy.get('[data-test="Settings"]')
    .click()
    cy.getByTestId('new-password-input')
    .type(newPassword)
    cy.get('[data-test="update-settings-btn"]')
    .click()
    cy.url().should('eq', `${Cypress.config('baseUrl')}#/profile/testing-account` )
    cy.getByTestId('profile-favorites').should('exist')
})