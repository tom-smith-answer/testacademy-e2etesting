{
  const enVar = Cypress.env();

beforeEach(() => {
  cy.visit("/");
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
})

describe("Favorite Articles", () => {
describe("Highlight", () => {
  it.only("Signed in user can click top favourite button and see it highlighted", () => {
    //arrange - sign in and open first article
    cy.backendSignIn(enVar.login_email, enVar.login_password);
    cy.openArticle(0);

    //act - click the favourite button at the top of the page
    cy.clickFavouriteOrUnfavourite(0);

    //assert - both favourite buttons have the css class indicating they are highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn/primary");

    cy.resetFavCount('favourite', 1)
  });

  it("Signed in user can click bottom favourite button and see it highlighted", () => {
    //arrange - sign in and open first article
    cy.backendSignIn(enVar.login_email, enVar.login_password);
    cy.openArticle(0);

    //act - click the favourite button at the bottom of the page
    cy.clickFavouriteOrUnfavourite(1);

    //assert - both favourite buttons have the css class indicating they are highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-primary");

    cy.resetFavCount('favourite', 1)
  });

  it("User cannot click to highlight top favourite button when not signed in", () => {
    //arrange - open first article
    cy.getArticleTitle(0).then((articleTitle) => {
      cy.openArticle(0)
          //act - click the favourite button at the top of the page
          cy.clickFavouriteOrUnfavourite(0);
          cy.backendSignIn(enVar.login_email, enVar.login_password) //act - sign in after redirect and open the same article
          cy.getByTestId(articleTitle).click()
          cy.getByTestId('favourite-btn').should('have.class', 'btn-outline-primary'); //assert - both favourite buttons should have class indicating not highlighted
    })
  });

  it("User cannot click to highlight bottom favourite button when not signed in", () => {
    //arrange - open first article
    cy.getArticleTitle(0).then((articleTitle) => {
      cy.openArticle(0)
          //act - click the favourite button at the bottom of the page
          cy.clickFavouriteOrUnfavourite(1);
          cy.backendSignIn(enVar.login_email, enVar.login_password) //act - sign in after redirect and open the same article
          cy.getByTestId(articleTitle).click()
          cy.getByTestId('favourite-btn').should('have.class', 'btn-outline-primary'); //assert - both favourite buttons should have class indicating not highlighted
    })
  });

  it("Signed in user can click an article card's heart button and see it highlighted", () => {
    //arrange - sign in
    cy.backendSignIn(enVar.login_email, enVar.login_password);

    //act - click the first heart button
    cy.clickHeart(0).should("have.class", "btn-primary"); //assert - button has the css class indicating it is highlighted

    cy.resetHeartCount('favourite', 1)
  });

  it("User cannot click to highlight a heart button when not signed in", () => {
    //arrange - visit page
    //act - click the first heart button
    cy.clickHeart(0);

    cy.backendSignIn(enVar.login_email, enVar.login_password); //act - sign in after redirect

    cy.getByTestId('heart-btn').should('have.class', 'btn-outline-primary'); //assert - no heart buttons should have class indicating they are highlighted 
  });

  it("Favourite button colour should match the favourite/unfavourite state", () => {
    //arrange - sign in and open first article
    cy.backendSignIn(enVar.login_email, enVar.login_password);
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

    cy.resetFavCount('favourite', 1)
  });

  it("Heart button colour should match the favourite/unfavourite state", () => {
    //arrange - sign in and open first article
    cy.backendSignIn(enVar.login_email, enVar.login_password);

    //act - get heart buttons without clicking
    cy.getByTestId("heart-btn").should("have.css", "background-color").and("include", "rgba(0, 0, 0, 0)"); //assert - they have no background colour initally
    cy.getByTestId("heart-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("heart-btn").should("have.css", "color").and("include", "rgb(92, 184, 92)");

    //act - click the first heart button
    cy.clickHeart(0).should("have.css", "background-color").and("include", "rgb(92, 184, 92)"); //assert - it has the correct background colour
    cy.getByTestId("heart-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("heart-btn").should("have.css", "color").and("include", "rgb(255, 255, 255)");

    cy.resetHeartCount('favourite', 1)
  });

  it("Button text should match the favourite/unfavourite state", () => {
    //arrange - sign in and open first article
    cy.backendSignIn(enVar.login_email, enVar.login_password);
    cy.openArticle(0);

    //act - get favourite buttons without clicking
    cy.getByTestId("favourite-btn").eq(0).contains("Favorite Article"); //assert - they have the correct text
    cy.getByTestId("favourite-btn").eq(1).contains("Favorite Article");

    //act - click one of the buttons
    cy.clickFavouriteOrUnfavourite(0);
    cy.getByTestId("favourite-btn").eq(0).contains("Unfavorite Article"); //assert - both display the correct new text
    cy.getByTestId("favourite-btn").eq(1).contains("Unfavorite Article");

    cy.resetFavCount('favourite', 1)
  });
});

describe("Unhighlight", () => {
  beforeEach(() => {
    cy.backendSignIn(enVar.login_email, enVar.login_password);
  })
  it("Signed in user can click top unfavourite button to unhighlight a favourited article", () => {
    //arrange - sign in, open and favourite first article
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0);

    //act - click unfavourite button at the top of the page
    cy.clickFavouriteOrUnfavourite(0).then(() => {
      cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary"); //assert - both buttons have the css class indicating it is not highlighted
    });

    cy.resetFavCount('unfavourite', 1)
  });

  it("Signed in user can click bottom unfavourite button to unhighlight a favourited article", () => {
    //arrange - sign in, open and favourite first article
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0);

    //act - click unfavourite button at the bottom of the page
    cy.clickFavouriteOrUnfavourite(1).then(() => {
      cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary"); //assert - both buttons have the css class indicating it is not highlighted
    });
    cy.resetFavCount('unfavourite', 1)
  });

  it("User cannot unfavourite an article they have not favourited", () => {
    //arrange - sign in, open first article
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
    //arrange - sign in and favourite first article
    cy.clickHeart(0);

    //act - click the first heart button a second time
    cy.clickHeart(0).should("have.class", "btn-outline-primary"); //assert - button has class indicating it is unhighlighted
  });

  it("User cannot unheart an article they have not favourited", () => {
    //arrange - sign in
    //act - get first heart without clicking to favourite
    cy.getByTestId("heart-btn")
      .eq(0)
      .should("have.class", "btn-outline-primary"); //assert - button has the unfavourited class by default
  });
});

describe("Increase count", () => {
  it("Signed in user can favourite an article and see the count increase by 1", () => {
    //arrange - sign in and open first article
    cy.backendSignIn(enVar.login_email, enVar.login_password);
    cy.openArticle(0);

    //act - save the initial favourite count and then click one of the favourite buttons

    cy.getArticleFavCount(0).then((favCount) => {
      cy.clickFavouriteOrUnfavourite(0);
      cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
      cy.getArticleFavCount(0).should('eq', favCount + 1) //assert - new count is 1 greater than the inital favourite count
    })
    
    cy.resetFavCount('unfavourite', 1)
  });

  it("user cannot alter favourite count when not signed in", () => {
    //arrange - open first article
    cy.getArticleTitle(0).then((articleTitle) => {
      cy.openArticle(0).getArticleFavCount(0)
      //act - save the initial favourite count and then click one of the favourite buttons
        .then((favCount) => {
          cy.clickFavouriteOrUnfavourite(0);
          cy.backendSignIn(enVar.login_email, enVar.login_password) //act - sign in after redirect and open the same article
          cy.url().should('not.include', 'login')
          cy.getByTestId(articleTitle).click()
          cy.getArticleFavCount(0).should("eq", favCount); //assert - new count is not greater than the initial favourite count
        });
    })

  });

  it("User cannot spam favourite button to increase count", () => {
    //arrange - sign in and open first article
    cy.backendSignIn(enVar.login_email, enVar.login_password);
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
    cy.backendSignIn(enVar.login_email, enVar.login_password);
    //act - save the initial favourite count and click the first heart button

    cy.getHeartFavCount(0)
      .then((favCount) => {
        cy.clickHeart(0);
        cy.getByTestId("heart-btn").should("have.class", "btn-primary");
        cy.getHeartFavCount(0).should("eq", favCount + 1); // assert - new count is 1 greater than the inital favourite count
      });

      cy.resetHeartCount('unfavourite', 1)
  });

  it("user cannot increase favourite count by clicking heart when not signed in", () => {
    //arrange - visit the page without signing in
    //act - save initial favourite count and click the first heart button
    cy.getArticleTitle(0).then((articleTitle) => {
      cy.getHeartFavCount(0)
        .then((favCount) => {
          cy.clickHeart(0);
          cy.backendSignIn(enVar.login_email, enVar.login_password) //act - sign in after redirect and open the same article
          cy.url().should('not.include', 'login')
          cy.getByTestId(articleTitle).click()
          cy.getArticleFavCount(0).should("eq", favCount); //assert - new count is not greater than the initial favourite count
        });
    })
  });

  it("User cannot spam heart button to increase the count", () => {
    //arrange - sign in
    cy.backendSignIn(enVar.login_email, enVar.login_password);

    //act - save the initial first favourite count and then click the first heart buttons 4 times
    cy.getHeartFavCount(0)
      .then((favCount) => {
        console.log(favCount)
        cy.clickHeart(0)
        .clickHeart(0)
        .clickHeart(0)
        .clickHeart(0);
        cy.getByTestId("heart-btn").eq(0).should("have.css", "background-color").and('include', 'rgba(0, 0, 0, 0)');
        cy.getHeartFavCount(0).should("eq", favCount); //assert - new count is not 4 greater than the inital favourite count
      });
  });
});

describe("Decrease count", () => {
  beforeEach(() => {
    cy.backendSignIn(enVar.login_email, enVar.login_password);
  })
  it("Signed in user can unfollow an article and see the count decrease by 1", () => {
    //arrange - sign in, open the first article and click one of the favourite buttons
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
      cy.clickHeart(0).should('have.class', 'btn-primary');

      //act - save the current favourite count and click the heart button again to unfavourite
      cy.getHeartFavCount(0)
      .then((favCount) => {
        console.log(favCount)
        cy.clickHeart(0)
        cy.getByTestId('heart-btn').should("have.css", "background-color").and("include", "rgba(0, 0, 0, 0)");
        cy.getHeartFavCount(0).should('eq', favCount - 1) //assert - favourite count is reduced by 1
      })
  })

  it("User cannot spam unheart to decrease the favourite count", () => {
    //arrange - sign in and click the first heart button
    cy.clickHeart(0);

    //act - save the current favourite count and click the heart button again 4 times
    cy.getHeartFavCount(0)
    .then((favCount) => {
      cy.clickHeart(0)
      cy.clickHeart(0)
      cy.clickHeart(0)
      cy.clickHeart(0).should('have.class', 'btn-outline-primary')
      cy.getHeartFavCount(0).should('eq', favCount) //assert - favourite count is unchanged
    })
    cy.resetHeartCount('unfavourite', 1)
  })
});

describe("Favourite", () => {
  it.skip("A signed in user can favourite an article and see it added to the 'your feed' tab", () => {
    //arrange - sign in, open the first article, click one of the favourite buttons and return home
    cy.backendSignIn(enVar.login_email, enVar.login_password);
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
    //arrange - visit site
    //act - attempt to locate "your feed" tab
    cy.getByTestId('my-feed').should('not.exist') //assert - element does not exist for a logged out user

    //act - attempt to favourite an article and then sign in when prompted
    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0)
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.getByTestId('my-feed').click().url().should('include', 'my-feed');
      cy.getByTestId(title).should('not.exist') //assert - article is not visible in "your feed" once signed in
    })
  })

  it.skip(`Unfavouriting an article removes it from a user's "my feed" tab`, () => {
    //arrange - sign in, open the first article, click one of the favourite buttons and return home
    cy.backendSignIn(enVar.login_email, enVar.login_password);
    cy.openArticle(0);
    cy.clickFavouriteOrUnfavourite(0);
    cy.getByTestId('Home').click().url()

    //act - open 'my feed' and unfavourite the article
    cy.getArticleTitle(0).then((title) => {
      cy.getByTestId('my-feed').click()
      cy.getByTestId(title).click()
      cy.clickFavouriteOrUnfavourite(0).click()

      cy.getByTestId('Home').click()
      cy.getByTestId('my-feed').click()
      cy.getByTestId(title).should('not.exist') //assert - the article does not exist in the "your feed" tab
    })
  })

  it('Signed in user can add an article to their favourites tab on their profile', () => {
    //arrange - sign in 
    cy.backendSignIn(enVar.login_email, enVar.login_password);

    //act - open and favourite the first article
    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0);
      cy.openFavourites()
      cy.getByTestId(title).should('exist') //assert - article exits in the 'favourites' tab
    })

    cy.resetHeartCount('favourite', 1)
  })

  it('User cannot add to their favourites when not signed in', () => {
    //arrange - visit site
    //act - open and favourite the first article, sign in when prompted 
    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0)
      cy.backendSignIn(enVar.login_email, enVar.login_password);

      cy.openFavourites()
      cy.getByTestId(title).should('not.exist') //assert - article is not visible in "your feed" once signed in
    })
  })

  it('Unfavouriting an article removes the article from a users "favorite articles" tab', () => {
    //arrange - sign in, open the first article, click one of the favourite buttons
    cy.backendSignIn(enVar.login_email, enVar.login_password);

    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0);

      //act - locate the article in favourites tab and unfavourite
      cy.openFavourites()
      cy.getByTestId(title).click()
      cy.clickFavouriteOrUnfavourite(0).click()

      cy.openFavourites()
      cy.getByTestId(title).should('not.exist') // assert - article no longer exists in favourites
    })
  })
})

describe("Favourite multiple", () => {
  beforeEach(() => {
    cy.backendSignIn(enVar.login_email, enVar.login_password);
  })

  it.skip('Signed in user can favourite multiple articles and see them appear in their "favourite articles" tab', () => {

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

  it('Signed in user can favourite multiple articles and see them appear in their "favourite articles" tab', () => {
    //arrange - sign in
    //act - open and favourite first article
    cy.getArticleTitle(0).then((title) => {
      cy.openArticle(0);
      cy.clickFavouriteOrUnfavourite(0);
      cy.openFavourites();
      cy.getByTestId(title).should('exist'); //assert - article exists in favourites
    })

    //arange - return home
    cy.getByTestId('Home').click()
    //act - open and favourite second article
    cy.getArticleTitle(1).then((title) => {
      cy.openArticle(1);
      cy.clickFavouriteOrUnfavourite(0);
      cy.openFavourites();
      cy.getByTestId(title).should('exist'); //assert - article exists in favourites
    })      

    cy.resetHeartCount('favourite', 2)
  })

  it('Signed in user can heart multiple articles and see them appear in their "favourite articles" tab', () => {
    //arrange - sign in
    //act - heart first article
    cy.getArticleTitle(0).then((title) => {
      cy.clickHeart(0)
      cy.openFavourites();
      cy.getByTestId(title).should('exist'); //assert - article exists in favourites
    })

    //arrange - return home
    cy.getByTestId('Home').click()
    //act - heart second article
    cy.getArticleTitle(1).then((title) => {
      cy.clickHeart(1)
      cy.openFavourites();
      cy.getByTestId(title).should('exist'); //assert - article exits in favourites
    })

    cy.resetHeartCount('favourite', 2)
  })
})

describe('Persitance', () => {
  beforeEach(() => {
    cy.backendSignIn(enVar.login_email, enVar.login_password);
  })
  it.skip('Button states should persist between pages', () => {
    //arrange - sign in 
    //act - heart and open first article 
    cy.clickHeart(0).openArticle(0)
    cy.getByTestId('favourite-btn').eq(0).contains('Unfavourite Article') //assert - both favourite buttons have the correct text and styling
    cy.getByTestId('favourite-btn').eq(1).contains('Unfavourite Article')
    cy.getByTestId('favourite-btn').should('have.css', 'background-color').and("include", "rgb(92, 184, 92)")
    cy.getByTestId('favourite-btn').should('have.css', 'border-color').and("include", "rgb(92, 184, 92)")
    cy.getByTestId('favourite-btn').should('have.css', 'color').and("include", "rgb(255, 255, 255)")

    cy.resetFavCount('unfavourite', 1)
  })

  it('Favourite count should persist between pages', () => {
    //arrange - sign in 
    //act - heart and open first article 
    cy.clickHeart(0)
    cy.getByTestId('heart-btn').should('have.class', 'btn-primary')
    cy.getHeartFavCount(0).then((favCount) => {
      cy.openArticle(0)
      cy.getArticleFavCount(0).should('eq', favCount) //assert - both favourite buttons display the correct count
      cy.getArticleFavCount(1).should('eq', favCount)
    })

    cy.resetFavCount('favourite', 1)
  })
})
})};