describe('Conduit test framework', () => {

    it('signs in with a valid email and password', () => {
        cy.visit('/')
        cy.get(':nth-child(2) > .nav-link')
        .click()
        cy.getByPlaceholder('Email')
        .type('tom.smith@answer')
    })
})
