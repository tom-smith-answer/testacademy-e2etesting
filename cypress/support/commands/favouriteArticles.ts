export {}

declare global {
    namespace Cypress {
        interface Chainable {
            clickTopFavourite():
            Chainable<any>
            clickBottomFavourite():
            Chainable<any>
            clickFavourite(location: string):
            Chainable<any>
            clickFirstHeart():
            Chainable<any>
        }
    }
}



Cypress.Commands.add('clickFavourite', (location: string) => {
    if (location === "top") {
        cy.getByTestId("favourite-btn").eq(0).click()
    }
    else {
        cy.getByTestId("favourite-btn").eq(1).click()
    }
})

Cypress.Commands.add('clickFirstHeart', () => {
    cy.getByTestId('heart-btn').eq(0).click()
})