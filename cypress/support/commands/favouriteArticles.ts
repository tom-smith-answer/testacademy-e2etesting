export {}

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * clicks the favourite button in either 'favourite' or 'unfavourite' state
             * @param buttonNo Number value indictaing the selected button index
             */
            clickFavouriteOrUnfavourite(buttonNo: number):
            Chainable<any>
            
            /**
             * Clicks a heart button on the page once
             * @param heartNo Number value indicating the selected heart button index
             */
            clickHeart(heartNo: number): 
            Chainable<any>

            /**
             * Returns, as a number, the favourite count displayed on either of the articles favourite buttons
             * @param buttonNo Number value indicating the selected button index
             */
            getArticleFavCount(buttonNo: number):
            Chainable<number>

            /**
             * Returns, as a number, the favourite count displayed on a chosen heart button
             * @param buttonNo Number value indicating the selected heart button index
             */
            getHeartFavCount(buttonNo: number):
            Chainable<number>

            /**
             * Returns the string value of an article's title
             * @param articleNo Number value indicating the selected article index
             */
            getArticleTitle(articleNo: number):
            Chainable<string>

            /**
             * Opens the profile favourites tab from any point on the site
             */
            openFavourites():
            Chainable<any>

            /**
             * Resets an article's favourite count
             * @param state String value indicating the current article state 'favourite' | 'unfavourite'
             * @param countsToReset Number value indicating number of articles with counts to be reset
             */
            resetFavCount(state: string, countsToReset: number):
            Chainable<any>
        }
    }
}


Cypress.Commands.add('clickFavouriteOrUnfavourite', (buttonNo: number) => {
    cy.getByTestId('favourite-btn').should('exist')
    if (buttonNo === 0) {
        cy.getByTestId("favourite-btn").eq(0).click()
    }
    if (buttonNo === 1) {
        cy.getByTestId("favourite-btn").eq(1).click()
    }
})

Cypress.Commands.add('clickHeart', (heartNo: number) => {
    cy.getByTestId('favourite-btn').eq(heartNo).click()
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

Cypress.Commands.add('resetFavCount', (state: string, countsToReset: number) => {
    if (state === 'favourite') {
        for (let i = 1; i <= countsToReset; i++) {
            cy.getByTestId('favourite-btn').eq(i - 1).click().click()
        }
    }
    else  {
        for (let i = 1; i <= countsToReset; i++) {
            cy.getByTestId('favourite-btn').eq(i - 1).click()
        }
    }
})