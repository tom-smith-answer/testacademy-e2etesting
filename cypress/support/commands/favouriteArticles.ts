export {}

declare global {
    namespace Cypress {
        interface Chainable {
            clickFavouriteOrUnfavourite(buttonNo: number):
            Chainable<any>

            clickFirstHeart():
            Chainable<any>

            getArticleFavCount(buttonNo: number):
            Chainable<number>

            getHeartFavCount(buttonNo: number):
            Chainable<number>

            getArticleTitle(articleNo: number):
            Chainable<string>

            openFavourites():
            Chainable<any>
        }
    }
}


Cypress.Commands.add('clickFavouriteOrUnfavourite', (buttonNo: number) => {
    if (buttonNo === 0) {
        cy.getByTestId("favourite-btn").eq(0).click()
    }
    if (buttonNo === 1) {
        cy.getByTestId("favourite-btn").eq(1).click()
    }
})

Cypress.Commands.add('clickFirstHeart', () => {
    cy.getByTestId('favourite-btn').eq(0).click()
})

Cypress.Commands.add('getArticleFavCount', (buttonNo: number) => {
    cy.getByTestId('fav-count').eq(buttonNo).invoke('text').then((text) => {
        return Number(text.slice(1, text.length -1))
    })
})

Cypress.Commands.add('getHeartFavCount', (buttonNo: number) => {
    cy.getByTestId('favourite-btn').eq(buttonNo).invoke('text').then((text) => {
        return Number(text.slice(1, text.length))
    })
})

Cypress.Commands.add('getArticleTitle', (articleNo: number) => {
    return cy.getByTestId('article-title').eq(articleNo).invoke('text')
})

Cypress.Commands.add('openFavourites', () => {
    cy.getByTestId('testing-account').click()
    cy.getByTestId('profile-favorites').click()
})