describe("Create Set form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=nav-card-sets]").click();
    cy.get("[data-cy=toggle_form]").click();
  });

  it("adds a new set when a title is submitted", () => {
    cy.get("[data-cy=set-title]").type("Cypress Set");
    cy.get("[data-cy=set_form]").submit();
    cy.contains("[data-cy=study-set]", "Cypress Set").should(
      "contain",
      "Terms: 0",
    );
    cy.get("[data-cy=form-error]").should("not.exist");
  });

  it("shows an error when the title is empty", () => {
    cy.get("[data-cy=set_form]").submit();
    cy.get("[data-cy=form-error]").should("have.text", "TITLE CANNOT BE EMPTY");
  });
});

describe("Add Card form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-cy=nav-card-sets]").click();
    // Create an empty set so the card count is predictable
    cy.get("[data-cy=toggle_form]").click();
    cy.get("[data-cy=set-title]").type("Empty Set");
    cy.get("[data-cy=set_form]").submit();
    cy.contains("[data-cy=study-set]", "Empty Set").click();
    cy.get("[data-cy=toggle_form]").click();
  });

  it("adds a card when term and description are provided", () => {
    cy.get("[data-cy=card-term]").type("Cypress");
    cy.get("[data-cy=card-description]").type("An end-to-end testing tool");
    cy.get("[data-cy=card_form]").submit();
    cy.get("[data-cy=flashcard-term]").should("contain", "Cypress");
    cy.get("[data-cy=flashcard-description]").should(
      "contain",
      "An end-to-end testing tool",
    );
  });

  it("keeps a card added after shuffling when the set is reopened", () => {
    cy.get("[data-cy=shuffle-cards]").click();
    cy.get("[data-cy=toggle_form]").click();
    cy.get("[data-cy=card-term]").type("Shuffle regression");
    cy.get("[data-cy=card-description]").type(
      "This card should stay in the set",
    );
    cy.get("[data-cy=card_form]").submit();
    cy.get("[data-cy=nav-card-sets]").click();
    cy.contains("[data-cy=study-set]", "Empty Set").should(
      "contain",
      "Terms: 1",
    );
  });

  it("shows an error when both inputs are empty", () => {
    cy.get("[data-cy=card_form]").submit();
    cy.get("[data-cy=form-error]").should(
      "have.text",
      "TERM AND DESCRIPTION CANNOT BE EMPTY",
    );
  });

  it("shows an error when the term is empty", () => {
    cy.get("[data-cy=card-description]").type("Only a description");
    cy.get("[data-cy=card_form]").submit();
    cy.get("[data-cy=form-error]").should("have.text", "TERM CANNOT BE EMPTY");
  });

  it("shows an error when the description is empty", () => {
    cy.get("[data-cy=card-term]").type("Only a term");
    cy.get("[data-cy=card_form]").submit();
    cy.get("[data-cy=form-error]").should(
      "have.text",
      "DESCRIPTION CANNOT BE EMPTY",
    );
  });
});
