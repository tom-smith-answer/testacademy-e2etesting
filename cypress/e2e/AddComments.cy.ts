{
  const enVar = Cypress.env();

  beforeEach(() => {
    cy.visit("/");
  });
  describe("Comment field can accept alphanumeric values", () => {
    beforeEach(() => {
      cy.backendSignIn(enVar.login_email, enVar.login_password);
    });
    it("Alphanumeric values are held in the input field", () => {
      //arrange - sign in

      cy.url().should("eq", `${Cypress.config("baseUrl")}#/`);

      //act - type alphanumeric characters
      cy.openArticle(0);
      cy.get('[data-test="comment-input"]')
        .type("1 new comment")
        .should("have.value", "1 new comment"); //assert - feild contains input characters and post button is clickable
      cy.get('[data-test="post-comment-btn"]').should("not.be.disabled");
    });

    it("html security should prevent links from being added to comments", () => {
      //arrange - sign in and open first article
      cy.openArticle(0);

      //act - post a new comment containing a html link and attempt to click it
      cy.addComment('<a href="https://www.google.co.uk">This is a link</a>');
      cy.get('[data-test="comment"]').children().eq(0).click();

      //assert - url has not changed after attempting to click the link
      cy.url().should("contain", `${Cypress.config("baseUrl")}`);
    });

    it("Users should not be able to add images in the comment field", () => {
      //arrange - sign in and open first article#
      cy.openArticle(0);

      //act - attempt to attach img file in input field
      cy.get('[data-test="comment-input"]').attachFile({
        filePath: "../resources/test-img.jpg",
        encoding: "utf-8",
      });

      //assert - comment cannot be posted
      cy.get('[data-test="post-comment-btn"]').should("be.disabled");
    });
  });

  describe("User should be able to add a comment", () => {
    it("A signed in user can add a comment", () => {
      //arrange - sign in
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.url().should("eq", `${Cypress.config("baseUrl")}#/`);

      //act - add comment
      cy.openArticle(0);
      cy.addComment("New comment");

      //assert - comment exists
      cy.get('[data-test="New comment"]').should("exist");
    });

    it("User cannot add a comment when not signed in", () => {
      //arrange - vist
      //act - open article
      cy.openArticle(0);

      //assert - comment input feild cannot be accessed
      cy.get(`[data-test="New comment"]`).should("not.exist");
    });

    it("Add comment button works once, user cannot spam comments", () => {
      //arrange - sign in
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.url().should("eq", `${Cypress.config("baseUrl")}#/`);

      //act
      cy.openArticle(0);
      cy.addComment("New comment");

      //assert
      cy.get('[data-test="post-comment-btn"]').should("be.disabled");
    });

    it("User cannot add an empty string comment", () => {
      //arrange - sign in
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.url().should("eq", `${Cypress.config("baseUrl")}#/`);

      //act - type empty comment
      cy.openArticle(0);
      cy.get('[data-test="comment-input"]').click();

      //assert - post comment button is disabled
      cy.get('[data-test="post-comment-btn"]').should("be.disabled");
    });

    it.skip("User cannot add a string of spaces as a comment", () => {
      //arrange - sign in
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.url().should("eq", `${Cypress.config("baseUrl")}#/`);

      //act - type and post space character comment
      cy.openArticle(0);
      cy.addComment(" ");
      cy.get('[data-test="post-comment-btn"]').should("be.disabled");

      //assert - text feild should be cleared and comment not posted
      cy.get(`[data-test=" "] > .card-block`).should("not.exist");
    });
  });

  describe("User should be able to delete a comment", () => {
    it("signed in user can delete one of their own comments", () => {
      //arrange - sign in and load article with existing comment
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.loadArticleAndBackendComment("single-comment.json");

      cy.addComment("This is a new comment"); //add a new comment

      const commentNo = 0;

      cy.getByTestId("comment-author")
        .eq(commentNo)
        .should("have.text", "testing-account"); //act - attempt to delete comment with the correct username
      cy.getByTestId("delete-comment-btn")
        .eq(commentNo)
        .should("be.visible")
        .children()
        .eq(0)
        .click();

      cy.get('[data-test="This is a new comment"]').should("not.exist"); //assert - comment has been deleted
    });

    it("user cannot delete another user's comment", () => {
      //arrange - sign in and load article and comment
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.loadArticleAndBackendComment("single-comment.json");

      //act - attempt to locate delete button and
      //assert - button is not clickable when username doesn't match the signed in user
      cy.getByTestId("comment-author").should(
        "not.have.text",
        "testing-account",
      );
      cy.getByTestId("delete-comment-btn").should("not.be.visible");
    });

    it("user cannot delete comments when not signed in", () => {
      //arrange - sign in and load article with existing comment
      cy.loadArticleAndBackendComment("single-comment.json");

      //act - attempt to locate delete button and
      //assert - button is not clickable when no user is signed in
      cy.getByTestId("delete-comment-btn").should("not.be.visible");
    });
  });

  describe("User can add multiple comments to an article", () => {
    beforeEach(() => {
      cy.backendSignIn(enVar.login_email, enVar.login_password);
    });
    it("Comment field clears after posting a comment", () => {
      //arrange - sign in and open first article
      cy.openArticle(0);

      //act - add a new comment
      cy.addComment("This is a new comment");

      //assert - input box clears to accept new comment after posting
      cy.get('[data-test="comment-input"]').should("have.value", "");
    });

    it("A signed in user can add multiple comments", () => {
      //arrange - sign in and open first article
      cy.openArticle(0);

      //act - add new comments and
      //assert - each comment exists after posting

      cy.addComment("This is a new comment");
      cy.get('[data-test="This is a new comment"]').should("exist");

      cy.addComment("This is another new comment");
      cy.get('[data-test="This is another new comment"]').should("exist");

      cy.addComment("This is yet another new comment");
      cy.get('[data-test="This is yet another new comment"]').should("exist");
    });

    it("User cannot continue to add comments after signing out", () => {
      //arrange - sign in and open first article
      cy.openArticle(0);

      //act - add comment, sign out, and reopen article
      cy.addComment("This is a new comment");
      cy.signOut();
      cy.openArticle(0);

      //assert - add comment feild is no longer accessible
      cy.get('[data-test="comment-input"]').should("not.exist");
    });
  });

  describe("Comments are added with the correct attached info", () => {
    it("comments are added with the correct user info and datestamp", () => {
      //arrange - sign in and open first article
      cy.backendSignIn(enVar.login_email, enVar.login_password);
      cy.openArticle(0);

      //act - add a new comment
      cy.addComment("This is a new comment");

      //assert - new comment has correct details
      let dateTime = new Date().toLocaleDateString("en-US");
      cy.get('[data-test="comment-date"]').should("have.text", dateTime);
      cy.get('[data-test="comment-author"]').should(
        "have.text",
        "testing-account",
      );
      cy.get(
        '[data-test="https://api.realworld.io/images/smiley-cyrus.jpeg"]',
      ).should("exist");
    });
  });
}
