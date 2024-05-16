describe('Clicking the favourite button causes it to become highlighted', () => {

    it('Signed in user can click either favourite buttons and see them both highlighted', () => {
        //arrange - sign in and open first article
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.openFirstArticle()

        //act - click the favourite button at the top of the page
        cy.clickFavourite('top')
        //assert - both favourite buttons have the css class indicating they are highlighted 
        cy.getByTestId('favourite-btn').should('have.class', 'btn-primary')

        //act - click the favourite button at the bottom of the page
        cy.clickFavourite('bottom')
        //assert - both favourite buttons have the css class indicating they are highlighted 
        cy.getByTestId('favourite-btn').should('have.class', 'btn-primary')
    })

    it('User cannot click to highlight either favourite button when not signed in', () => {
        //arrange - sign in and open first article
        cy.visit('/')
        cy.openFirstArticle()

        //act - click the favourite button at the top of the page
        cy.clickFavourite('top')
        //assert - both favourite buttons have the css class indicating they are not highlighted  
        cy.getByTestId('favourite-btn').should('have.class', 'btn-outline-primary')

        //act - click the favourite button at the top of the page
        cy.clickFavourite('bottom')
        //assert - both favourite buttons have the css class indicating they are not highlighted 
        cy.getByTestId('favourite-btn').should('have.class', 'btn-outline-primary')
    })

    it("Signed in user can click an article card's heart button and see it highlighted", () => {
        //arrange - sign in 
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')

        //act - click the first heart button  
        cy.clickFirstHeart().should('have.class', 'btn-primary') //assert - button has the css class indicating it is highlighted
    })

    it("User cannot click to highlight a heart button when not signed in", () => {
        //arrange - visit page
        cy.visit('/')

        //act - click the first heart button
        cy.clickFirstHeart().should('have.class', 'btn-outline-primary') //assert - button has the css class indicating it is not highlighted
    })

    it("Favourite button colour should match the favourite/unfavourite state", () => {
        //arrange - sign in and open first article
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.openFirstArticle()

        //act - get both favourite buttons without clicking
        cy.getByTestId('favourite-btn').should('have.css', 'background-color').and('include', 'rgba(0, 0, 0, 0)') //assert - they have no background colour initally

        //act - click one of the favourite buttons
        cy.clickFavourite('top')
        cy.getByTestId('favourite-btn').should('have.css', 'background-color').and('include', 'rgb(92, 184, 92)') //assert - both have the correct background colour
    })

    it('Heart button colour should match the favourite/unfavourite state', () => {
        //arrange - sign in and open first article
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')

        //act - get heart buttons without clicking
        cy.getByTestId('heart-btn').should('have.css', 'background-color').and('include', 'rgba(0, 0, 0, 0)') //assert - they have no background colour initally

        //act - click the first heart button
        cy.clickFirstHeart().should('have.css', 'background-color').and('include', 'rgb(92, 184, 92)') //assert - it has the correct background colour
    })

    it("Button text should match the favourite/unfavourite state", () => {
        //arrange - sign in and open first article
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.openFirstArticle()

        cy.getByTestId('favourite-btn').eq(0).contains('Favorite Article')
        cy.getByTestId('favourite-btn').eq(1).contains('Favorite Article')

        cy.clickFavourite('top')

        cy.getByTestId('favourite-btn').eq(0).contains('Unfavorite Article')
        cy.getByTestId('favourite-btn').eq(1).contains('Unfavorite Article')
    })
})

describe('User should unhighlight favourite button on clicking unfavourite', () => {
    it('Signed in user can click either unfavourite button to unhighlight a favourited article', () => {
        //arrange - sign in, open and favourite first article
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.openFirstArticle()
        cy.clickFavourite('top')

        //act - click unfavourite button at the top of the page
        cy.clickFavourite('top')
        cy.getByTestId('favourite-btn').should('have.class', 'btn-outline-primary') //assert - both buttons have the css class indicating it is not highlighted

        //arrange - favourite the article
        cy.clickFavourite('top')

        //act - click unfavourite button at the bottom of the page
        cy.clickFavourite('bottom')
        cy.getByTestId('favourite-btn').should('have.class', 'btn-outline-primary') //assert - both buttons have the css class indicating it is not highlighted
    })

    it("User cannot unfavourite an article they have not favourited", () => {
        //arrange - sign in, open first article
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')
        cy.openFirstArticle()

        //act - get favourite buttons without clicking 
        cy.getByTestId('favourite-btn').eq(0).contains('Favorite Article').should('have.class', 'btn-outline-primary') //assert neither - displays the text 'unfavourite' 
        cy.getByTestId('favourite-btn').eq(1).contains('Favorite Article').should('have.class', 'btn-outline-primary') //and neither has the favourited class
    })

    it("User can unhighlight the heart button on a second click", () => {
        //arrange - sign in, open and favourite first article
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')

        //act - click the first heart button a second time
        cy.clickFirstHeart()

        //assert - button has class indicating it is unhighlighted
        cy.clickFirstHeart().should('have.class', 'btn-outline-primary')
    })

    it('User cannot unheart an article they have not favourited', () => {
        //arrange - sign in
        cy.visit('/')
        cy.signIn('test@answer.com', 'password')

        //act - get first heart without clicking to favourite
        cy.getByTestId('heart-btn').eq(0).should('have.class', 'btn-outline-primary') //assert - button has the unfavourited class by default 
    })
})