describe("Create Set form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("li", "Card Sets").click();
    cy.get("[data-cy=toggle_form]").click();
  });

  it("adds a new set when a title is submitted", () => {
    cy.get("#titleInput").type("Cypress Set");
    cy.get("[data-cy=set_form]").submit();
    cy.contains(".cardSets", "Cypress Set").should("contain", "Terms: 0");
    cy.get(".error").should("not.exist");
  });

  it("shows an error when the title is empty", () => {
    cy.get("[data-cy=set_form]").submit();
    cy.get(".error").should("have.text", "TITLE CANNOT BE EMPTY");
  });
});

describe("Add Card form", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("li", "Card Sets").click();
    // Create an empty set so the card count is predictable
    cy.get("[data-cy=toggle_form]").click();
    cy.get("#titleInput").type("Empty Set");
    cy.get("[data-cy=set_form]").submit();
    cy.contains(".cardSets", "Empty Set").click();
    cy.get("[data-cy=toggle_form]").click();
  });

  it("adds a card when term and description are provided", () => {
    cy.get("#termInput").type("Cypress");
    cy.get("#descriptionInput").type("An end-to-end testing tool");
    cy.get("[data-cy=card_form]").submit();
    cy.get(".term").should("contain", "Cypress");
    cy.get(".description").should("contain", "An end-to-end testing tool");
  });

  it("keeps a card added after shuffling when the set is reopened", () => {
    cy.contains("button", "Shuffle Cards").click();
    cy.get("[data-cy=toggle_form]").click();
    cy.get("#termInput").type("Shuffle regression");
    cy.get("#descriptionInput").type("This card should stay in the set");
    cy.get("[data-cy=card_form]").submit();
    cy.contains("li", "Card Sets").click();
    cy.contains(".cardSets", "Empty Set").should("contain", "Terms: 1");
  });

  it("shows an error when both inputs are empty", () => {
    cy.get("[data-cy=card_form]").submit();
    cy.get(".error").should(
      "have.text",
      "TERM AND DESCRIPTION CANNOT BE EMPTY",
    );
  });

  it("shows an error when the term is empty", () => {
    cy.get("#descriptionInput").type("Only a description");
    cy.get("[data-cy=card_form]").submit();
    cy.get(".error").should("have.text", "TERM CANNOT BE EMPTY");
  });

  it("shows an error when the description is empty", () => {
    cy.get("#termInput").type("Only a term");
    cy.get("[data-cy=card_form]").submit();
    cy.get(".error").should("have.text", "DESCRIPTION CANNOT BE EMPTY");
  });
});
