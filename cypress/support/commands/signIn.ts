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

            backendSignIn(email: string, password: string):
            Chainable<any>
        }
    }
 }

Cypress.Commands.add('signIn', (email: string, password: string) => {
    cy.session('SignIn', () => {
        cy.visit('/')
        cy.get('[data-test="Sign in"]').click()
        cy.url().should("eq", `${Cypress.config('baseUrl')}#/login`)
        cy.getByTestId('email-input').type(email)
        cy.getByTestId('password-input').type(password)
        cy.get('[data-test="sign-in-btn"]').click()
        cy.getByTestId('Home').should('exist')
    }, {
        cacheAcrossSpecs: true
    })
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

Cypress.Commands.add('backendSignIn', (email: string, password: string) => {
    cy.request('POST', 'https://api.realworld.io/api/users/login', {
        user: { email: email, password: password }
    }).then((response) => {
        const user= JSON.stringify({
            email: response.body.user.email,
            username: response.body.user.username,
            bio: response.body.user.bio,
            image: response.body.user.image,
            token: response.body.user.token,
        });

        window.localStorage.setItem('user', user);
        cy.visit(`${Cypress.config('baseUrl')}`);
    })
})