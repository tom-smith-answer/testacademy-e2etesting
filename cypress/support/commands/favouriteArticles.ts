import getCountFromText from "../utils"

export {}

declare global {
    namespace Cypress {
        interface Chainable {
            clickFavourite(location: string):
            Chainable<any>

            clickFirstHeart():
            Chainable<any>

            getTextFromElement(dataTestTag: string):
            Chainable<any>

            getFavCount(buttonNo: number):
            Chainable<number>
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
    cy.getByTestId('favourite-btn').eq(0).click()
})

Cypress.Commands.add('getTextFromElement', (dataTestTag: string) => {
    cy.getByTestId(dataTestTag).eq(0).invoke('text').as('text')
    cy.get<string>('@text')
})

Cypress.Commands.add('getFavCount', (buttonNo: number) => {
    cy.getByTestId('favourite-btn').eq(buttonNo).invoke('text').as('text')
    cy.get<string>('@text').then((text) => {
        let favCount = getCountFromText(text)
        return favCount
    })
})