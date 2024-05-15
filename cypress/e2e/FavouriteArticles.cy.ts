describe('Clicking the favourite button causes it to become highlighted', () => {

    it('Signed in user can click the favourite button and see it highlighted', () => {
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.openFirstArticle()
    })
})