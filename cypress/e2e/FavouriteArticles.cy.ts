describe("Clicking the favourite button causes it to become highlighted", () => {
  it("Signed in user can click either favourite buttons and see them both highlighted", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);

    //act - click the favourite button at the top of the page
    cy.clickFavouriteOrUnfavourite(0);
    //assert - both favourite buttons have the css class indicating they are highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-primary");

    //act - click the favourite button at the bottom of the page
    cy.clickFavouriteOrUnfavourite(1);
    //assert - both favourite buttons have the css class indicating they are highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
  });

  it("User cannot click to highlight either favourite button when not signed in", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.openArticle(0);

    //act - click the favourite button at the top of the page
    cy.clickFavouriteOrUnfavourite(0);
    //assert - both favourite buttons have the css class indicating they are not highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary");

    //act - click the favourite button at the top of the page
    cy.clickFavouriteOrUnfavourite(1);
    //assert - both favourite buttons have the css class indicating they are not highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary");
  });

  it("Signed in user can click an article card's heart button and see it highlighted", () => {
    //arrange - sign in
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - click the first heart button
    cy.clickFirstHeart().should("have.class", "btn-primary"); //assert - button has the css class indicating it is highlighted
  });

  it("User cannot click to highlight a heart button when not signed in", () => {
    //arrange - visit page
    cy.visit("/");

    //act - click the first heart button
    cy.clickFirstHeart().should("have.class", "btn-outline-primary"); //assert - button has the css class indicating it is not highlighted
  });

  it("Favourite button colour should match the favourite/unfavourite state", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);

    //act - get both favourite buttons without clicking
    cy.getByTestId("favourite-btn").should("have.css", "background-color").and("include", "rgba(0, 0, 0, 0)"); //assert - they have no background colour initally
    cy.getByTestId("favourite-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("favourite-btn").should("have.css", "color").and("include", "rgb(92, 184, 92)");

    //act - click one of the favourite buttons
    cy.clickFavouriteOrUnfavourite(0);
    cy.getByTestId("favourite-btn").should("have.css", "background-color").and("include", "rgb(92, 184, 92)"); //assert - both have the correct background colour
    cy.getByTestId("favourite-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("favourite-btn").should("have.css", "color").and("include", "rgb(255, 255, 255)");
  });

  it("Heart button colour should match the favourite/unfavourite state", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - get heart buttons without clicking
    cy.getByTestId("favourite-btn").should("have.css", "background-color").and("include", "rgba(0, 0, 0, 0)"); //assert - they have no background colour initally
    cy.getByTestId("favourite-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("favourite-btn").should("have.css", "color").and("include", "rgb(92, 184, 92)");

    //act - click the first heart button
    cy.clickFirstHeart().should("have.css", "background-color").and("include", "rgb(92, 184, 92)"); //assert - it has the correct background colour
    cy.getByTestId("favourite-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("favourite-btn").should("have.css", "color").and("include", "rgb(255, 255, 255)");
  });

  it("Button text should match the favourite/unfavourite state", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);

    cy.getByTestId("favourite-btn").eq(0).contains("Favorite Article");
    cy.getByTestId("favourite-btn").eq(1).contains("Favorite Article");

    cy.clickFavouriteOrUnfavourite(0);

    cy.getByTestId("favourite-btn").eq(0).contains("Unfavorite Article");
    cy.getByTestId("favourite-btn").eq(1).contains("Unfavorite Article");
  });
});

describe("User should unhighlight favourite button on clicking unfavourite", () => {
  it("Signed in user can click either unfavourite button to unhighlight a favourited article", () => {
    //arrange - sign in, open and favourite first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0);

    //act - click unfavourite button at the top of the page
    cy.clickFavouriteOrUnfavourite(0);
    cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary"); //assert - both buttons have the css class indicating it is not highlighted

    //arrange - favourite the article
    cy.clickFavouriteOrUnfavourite(0);

    //act - click unfavourite button at the bottom of the page
    cy.clickFavouriteOrUnfavourite(1);
    cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary"); //assert - both buttons have the css class indicating it is not highlighted

    cy.clickFavouriteOrUnfavourite(0);
  });

  it("User cannot unfavourite an article they have not favourited", () => {
    //arrange - sign in, open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);

    //act - get favourite buttons without clicking
    cy.getByTestId("favourite-btn")
      .eq(0)
      .contains("Favorite Article")
      .should("have.class", "btn-outline-primary"); //assert neither - displays the text 'unfavourite'
    cy.getByTestId("favourite-btn")
      .eq(1)
      .contains("Favorite Article")
      .should("have.class", "btn-outline-primary"); //and neither has the favourited class
  });

  it("User can unhighlight the heart button on a second click", () => {
    //arrange - sign in, open and favourite first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - click the first heart button a second time
    cy.clickFirstHeart();

    //assert - button has class indicating it is unhighlighted
    cy.clickFirstHeart().should("have.class", "btn-outline-primary");
  });

  it("User cannot unheart an article they have not favourited", () => {
    //arrange - sign in
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - get first heart without clicking to favourite
    cy.getByTestId("favourite-btn")
      .eq(0)
      .should("have.class", "btn-outline-primary"); //assert - button has the unfavourited class by default
  });
});

describe("Favouriting an article causes the count to increase by 1", () => {
  it("Signed in user can follow an article and see the count increase by 1", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);

    //act - save the initial favourite count and then click one of the favourite buttons

    cy.getArticleFavCount(0).then((favCount) => {
      cy.clickFavouriteOrUnfavourite(0);
      cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
      cy.getArticleFavCount(0).should('eq', favCount + 1) //assert - new count is 1 greater than the inital favourite count
    })
    
    cy.clickFavouriteOrUnfavourite(0);
  });

  it("user cannot alter favourite count when not signed in", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.openArticle(0);

    //act - save the initial favourite count and then click one of the favourite buttons
    cy.getArticleFavCount(0)
      .then((favCount) => {
        cy.clickFavouriteOrUnfavourite(0);
        cy.getArticleFavCount(0).should("eq", favCount); //assert - new count is not greater than the initial favourite count
      });
  });

  it("User cannot spam favourite button to increase count", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);

    //act - save the initial favourite count and then click one of the favourite buttons 4 times
    cy.getArticleFavCount(0)
      .then((favCount) => {
        cy.clickFavouriteOrUnfavourite(0)
          .clickFavouriteOrUnfavourite(0)
          .clickFavouriteOrUnfavourite(0)
          .clickFavouriteOrUnfavourite(0);
        cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary");
        cy.getArticleFavCount(0).should("eq", favCount); //assert - new count is not 4 greater than the inital favourite count
      });
  });

  it("Signed in user can heart an article and see the count increase by 1", () => {
    //arrange - sign in
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - save the initial favourite count and click the first heart button

    cy.getHeartFavCount(0)
      .then((favCount) => {
        cy.clickFirstHeart();
        cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
        cy.getHeartFavCount(0).should("eq", favCount + 1); // assert - new count is 1 greater than the inital favourite count
      });

    cy.clickFirstHeart();
  });

  it("user cannot increase favourite count by clicking heart when not signed in", () => {
    // visit the page without signing in
    cy.visit("/");

    //act - save initial favourite count and click the first heart button
    cy.getHeartFavCount(0)
      .then((favCount) => {
        cy.clickFirstHeart();
        cy.getHeartFavCount(0).should("eq", favCount); //assert - new count is not greater than the initial favourite count
      });
  });

  it("User cannot spam heart button to increase the count", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - save the initial favourite count and then click one of the heart buttons 4 times
    cy.getHeartFavCount(0)
      .then((favCount) => {
        cy.clickFirstHeart()
          .clickFirstHeart()
          .clickFirstHeart()
          .clickFirstHeart();
        cy.getByTestId("favourite-btn").eq(0).should("have.class", "btn-outline-primary");
        cy.getHeartFavCount(0).should("eq", favCount); //assert - new count is not 4 greater than the inital favourite count
      });
  });
});

describe("Unfavouriting an article causes favourite count to decrease by 1", () => {
  it("Signed in user can unfollow an article and see the count decrease by 1", () => {
    //arrange - sign in, open the first article and click one of the favourite buttons
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0).should('have.class', 'btn-primary')

    //act - save the current favourite count and click the favourite button to unfavourite
    cy.getArticleFavCount(0)
    .then((favCount) => {
        cy.clickFavouriteOrUnfavourite(0).should('have.class', 'btn-outline-primary')
        cy.getArticleFavCount(0).should('eq', favCount - 1) //assert - favourite count is reduced by 1.
    })
  });

  it("User cannot spam unfavourite button to decrease count", () => {
    //arrange - sign in, open the first article and click one of the favourite buttons
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0).should('have.class', 'btn-primary')

    //act - save the current favourite count and click the favourite button to unfavourite
    cy.getArticleFavCount(0)
    .then((favCount) => {
        cy.clickFavouriteOrUnfavourite(0)
        cy.clickFavouriteOrUnfavourite(0)
        cy.clickFavouriteOrUnfavourite(0)
        cy.clickFavouriteOrUnfavourite(0).should("have.css", "background-color").and("include", "rgba(0, 0, 0, 0)");
        cy.getArticleFavCount(0).should('eq', favCount - 1) //assert - favourite count is reduced by 1.
    })
  })

  it("Signed in user can unheart an article and see the favourite count decrease by 1", () => {
      //arrange - sign in and click the first heart button
      cy.visit("/");
      cy.signIn("test@answer.com", "password");
      cy.clickFirstHeart().should('have.class', 'btn-primary');

      //act - save the current favourite count and click the heart button again to unfavourite
      cy.getHeartFavCount(0)
      .then((favCount) => {
        console.log(favCount)
        cy.clickFirstHeart()
        cy.getByTestId('favourite-btn').should("have.css", "background-color").and("include", "rgba(0, 0, 0, 0)");
        cy.getHeartFavCount(0).should('eq', favCount - 1) //assert - favourite count is reduced by 1
      })
  })

  it("User cannot spam unheart to decrease the favourite count", () => {
    //arrange - sign in and click the first heart button
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.clickFirstHeart();

    //act - save the current favourite count and click the heart button again 4 times
    cy.getHeartFavCount(0)
    .then((favCount) => {
      cy.clickFirstHeart()
      cy.clickFirstHeart()
      cy.clickFirstHeart()
      cy.clickFirstHeart().should('have.class', 'btn-outline-primary')
      cy.getHeartFavCount(0).should('eq', favCount) //assert - favourite count is unchanged
    })
    cy.clickFirstHeart()
  })
});

describe("User can favourite an article", () => {
  it.skip("A signed in user can favourite an article and see it added to the 'your feed' tab", () => {
    //arrange - sign in, open the first article, click one of the favourite buttons and return home
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0);
    cy.getByTestId('Home').click().url().should('not.include', 'article');

    //act - open the "your feed" tab
    cy.getArticleTitle(0).then((title) => {
      cy.getByTestId('my-feed').click().url().should('include', 'my-feed');
      cy.getByTestId(title).should('exist') //assert - the article exists in the "your feed" tab
    })
  })

  it("User cannot add to or access their feed when not signed in", () => {

    //arrange - visit site and ignore uncaught exception errors
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('/')

    //act - attempt to locate "your feed" tab
    cy.getByTestId('my-feed').should('not.exist') //assert - element does not exist for a logged out user

    //act - attempt to favourite an article and then sign in when prompted
    
    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0)
      cy.signIn('test@answer.com', 'password')
      cy.getByTestId('my-feed').click().url().should('include', 'my-feed');
      cy.getByTestId(title).should('not.exist') //assert - article is not visible in "your feed" once signed in
    })
  })

  it.skip(`Unfavouriting an article removes it from a user's "my feed" tab`, () => {
    //arrange - sign in, open the first article, click one of the favourite buttons and return home
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0);
    cy.getByTestId('Home').click().url()

    cy.getArticleTitle(0).then((title) => {
      cy.getByTestId('my-feed').click()
      cy.getByTestId(title).click()
      cy.clickFavouriteOrUnfavourite(0).click()

      cy.getByTestId('Home').click()
      cy.getByTestId('my-feed').click()
      cy.getByTestId(title).should('not.exist')
      
      //assert - the article exists in the "your feed" tab
    })
  })

  it('Signed in user can add an article to their favourites tab on their profile', () => {
    //arrange - sign in, open the first article, click one of the favourite buttons and return home
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0);
      cy.openFavourites()
      cy.getByTestId(title).should('exist')
    })

    //remove article from favourites
    cy.getByTestId('favourite-btn').click().click()
  })

  it('User cannot add to their favourites when not signed in', () => {
    //arrange - visit site and ignore uncaught exception errors
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.visit('/')

    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0)
      cy.signIn('test@answer.com', 'password')

      cy.openFavourites()
      cy.getByTestId(title).should('not.exist') //assert - article is not visible in "your feed" once signed in
    })
  })

  it('Unfavouriting an article removes the article from a users "favorite articles" tab', () => {
    //arrange - sign in, open the first article, click one of the favourite buttons and return home
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0);

      cy.openFavourites()
      cy.getByTestId(title).click()
      cy.clickFavouriteOrUnfavourite(0).click()

      cy.openFavourites()
      cy.getByTestId(title).should('not.exist')
    })
  })
})

describe.only("User can favourite multiple articles", () => {
  it('Signed in user can favourite multiple articles and see them appear in their "favourite articles" tab', () => {
        //arrange - sign in, open the first article, click one of the favourite buttons and return home
        cy.visit("/");
        cy.signIn("test@answer.com", "password");

        let titleOne: string
        let titleTwo: string
    
        cy.getArticleTitle(0).then((title) => {
          cy.openArticle(0);
          cy.clickFavouriteOrUnfavourite(0);
          titleOne = title
        })

        cy.getByTestId('Home').click()

        cy.getArticleTitle(1).then((title) => {
          cy.openArticle(1)
          cy.clickFavouriteOrUnfavourite(0)
          titleTwo = title
        })

        cy.openFavourites()
        cy.getByTestId(titleOne).should('exist')
        cy.getByTestId(titleTwo).should('exist')
  })
})
