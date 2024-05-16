import getCountFromText from "../support/utils";

describe("Clicking the favourite button causes it to become highlighted", () => {
  it("Signed in user can click either favourite buttons and see them both highlighted", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openFirstArticle();

    //act - click the favourite button at the top of the page
    cy.clickFavourite("top");
    //assert - both favourite buttons have the css class indicating they are highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-primary");

    //act - click the favourite button at the bottom of the page
    cy.clickFavourite("bottom");
    //assert - both favourite buttons have the css class indicating they are highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
  });

  it("User cannot click to highlight either favourite button when not signed in", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.openFirstArticle();

    //act - click the favourite button at the top of the page
    cy.clickFavourite("top");
    //assert - both favourite buttons have the css class indicating they are not highlighted
    cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary");

    //act - click the favourite button at the top of the page
    cy.clickFavourite("bottom");
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

  it.only("Favourite button colour should match the favourite/unfavourite state", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openFirstArticle();

    //act - get both favourite buttons without clicking
    cy.getByTestId("favourite-btn").should("have.css", "background-color").and("include", "rgba(0, 0, 0, 0)"); //assert - they have no background colour initally
    cy.getByTestId("favourite-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("favourite-btn").should("have.css", "color").and("include", "rgb(92, 184, 92)");

    //act - click one of the favourite buttons
    cy.clickFavourite("top");
    cy.getByTestId("favourite-btn").should("have.css", "background-color").and("include", "rgb(92, 184, 92)"); //assert - both have the correct background colour
    cy.getByTestId("favourite-btn").should("have.css", "border-color").and("include", "rgb(92, 184, 92)");
    cy.getByTestId("favourite-btn").should("have.css", "color").and("include", "rgb(255, 255, 255)");
  });

  it.only("Heart button colour should match the favourite/unfavourite state", () => {
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
    cy.openFirstArticle();

    cy.getByTestId("favourite-btn").eq(0).contains("Favorite Article");
    cy.getByTestId("favourite-btn").eq(1).contains("Favorite Article");

    cy.clickFavourite("top");

    cy.getByTestId("favourite-btn").eq(0).contains("Unfavorite Article");
    cy.getByTestId("favourite-btn").eq(1).contains("Unfavorite Article");
  });
});

describe("User should unhighlight favourite button on clicking unfavourite", () => {
  it("Signed in user can click either unfavourite button to unhighlight a favourited article", () => {
    //arrange - sign in, open and favourite first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openFirstArticle();
    cy.clickFavourite("top");

    //act - click unfavourite button at the top of the page
    cy.clickFavourite("top");
    cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary"); //assert - both buttons have the css class indicating it is not highlighted

    //arrange - favourite the article
    cy.clickFavourite("top");

    //act - click unfavourite button at the bottom of the page
    cy.clickFavourite("bottom");
    cy.getByTestId("favourite-btn").should("have.class", "btn-outline-primary"); //assert - both buttons have the css class indicating it is not highlighted

    cy.clickFavourite("top");
  });

  it("User cannot unfavourite an article they have not favourited", () => {
    //arrange - sign in, open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openFirstArticle();

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
    cy.getByTestId("heart-btn")
      .eq(0)
      .should("have.class", "btn-outline-primary"); //assert - button has the unfavourited class by default
  });
});

describe("Favouriting an article causes the count to increase by 1", () => {
  it("Signed in user can follow an article and see the count increase by 1", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openFirstArticle();

    //act - save the initial favourite count and then click one of the favourite buttons
    cy.getTextFromElement("favourite-btn")
      .then((text) => {
        let favCount = getCountFromText(text);
        return favCount;
      })
      .then((favCount) => {
        cy.clickFavourite("top");
        cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
        cy.getFavCount(0).should("eq", favCount + 1); //assert - new count is 1 greater than the inital favourite count
      });
  });

  it("user cannot increase favourite count when not signed in", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.openFirstArticle();

    //act - save the initial favourite count and then click one of the favourite buttons
    cy.getTextFromElement("favourite-btn")
      .then((text) => {
        let favCount = getCountFromText(text);
        return favCount;
      })
      .then((favCount) => {
        cy.clickFavourite("top");
        cy.getFavCount(0).should("eq", favCount); //assert - new count is not greater than the initial favourite count
      });
  });

  it("User cannot spam favourite button to increase count", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openFirstArticle();

    //act - save the initial favourite count and then click one of the favourite buttons 4 times
    cy.getTextFromElement("favourite-btn")
      .then((text) => {
        let favCount = getCountFromText(text);
        return favCount;
      })
      .then((favCount) => {
        cy.clickFavourite("top")
          .clickFavourite("top")
          .clickFavourite("top")
          .clickFavourite("top");
        cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
        cy.getFavCount(0).should("eq", favCount); //assert - new count is not 4 greater than the inital favourite count
      });
  });

  it("Signed in user can heart an article and see the count increase by 1", () => {
    //arrange - sign in
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - save the initial favourite count and click the first heart button
    cy.getTextFromElement("favourite-btn")
      .then((text) => {
        let favCount = getCountFromText(text);
        return favCount;
      })
      .then((favCount) => {
        cy.clickFirstHeart();
        cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
        cy.getFavCount(0).should("eq", favCount + 1); // assert - new count is 1 greater than the inital favourite count
      });

    cy.clickFirstHeart();
  });

  it("user cannot increase favourite count by clicking heart when not signed in", () => {
    // visit the page without signing in
    cy.visit("/");

    //act - save initial favourite count and click the first heart button
    cy.getTextFromElement("favourite-btn")
      .then((text) => {
        let favCount = getCountFromText(text);
        return favCount;
      })
      .then((favCount) => {
        cy.clickFirstHeart();
        cy.getFavCount(0).should("eq", favCount); //assert - new count is not greater than the initial favourite count
      });
  });

  it("User cannot spam heart button to increase the count", () => {
    //arrange - sign in and open first article
    cy.visit("/");
    cy.signIn("test@answer.com", "password");

    //act - save the initial favourite count and then click one of the heart buttons 4 times
    cy.getTextFromElement("favourite-btn")
      .then((text) => {
        let favCount = getCountFromText(text);
        return favCount;
      })
      .then((favCount) => {
        cy.clickFirstHeart()
          .clickFirstHeart()
          .clickFirstHeart()
          .clickFirstHeart();
        cy.getByTestId("favourite-btn").should("have.class", "btn-primary");
        cy.getFavCount(0).should("not.eq", favCount + 4); //assert - new count is not 4 greater than the inital favourite count
      });
  });
});

describe("Unfollowing an article causes follow count to decrease by 1", () => {
  it("Signed in user can unfollow an article and see the count decrease by 1", () => {
    //arrange - sign in, open the first article and click one of the favourite buttons
    cy.visit("/");
    cy.signIn("test@answer.com", "password");
    cy.openFirstArticle();
    cy.clickFavourite('top').should('have.class', 'btn-primary')

    //act - save the current favourite count and click the favourite button to unfavourite
    cy.getTextFromElement('favourite-btn')
    .then((text) => {
        let favCount = getCountFromText(text)
        return favCount
    })
    .then((favCount) => {
        cy.clickFavourite('top').should('have.class', 'btn-outline-primary')
        cy.getFavCount(0).should('eq', favCount - 1) //assert - favourite count is reduced by 1.
    })
  });
});
