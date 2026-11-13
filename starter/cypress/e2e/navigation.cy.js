describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the Home page by default", () => {
    cy.get("[data-cy=home_header]").should("contain", "Study Night");
    cy.get("[data-cy=home-image]").should(($image) => {
      expect($image[0].naturalWidth).to.be.greaterThan(0);
    });
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth,
      );
    });
  });

  it("navigates to the Card Sets page from the side menu", () => {
    cy.get("[data-cy=nav-card-sets]").click();
    cy.get("[data-cy=study-set-header]").should("contain", "Study Set Library");
  });

  it("navigates to the About page from the side menu", () => {
    cy.get("[data-cy=nav-about]").click();
    cy.get("[data-cy=about_page]").should("contain", "About Study Night");
    cy.get("[data-cy=about-image]").should(($image) => {
      expect($image[0].naturalWidth).to.be.greaterThan(0);
    });
  });

  it("navigates back to the Home page from the side menu", () => {
    cy.get("[data-cy=nav-about]").click();
    cy.get("[data-cy=nav-home]").click();
    cy.get("[data-cy=home_header]").should("contain", "Study Night");
  });

  it("supports keyboard navigation", () => {
    cy.get("[data-cy=nav-about]").focus().type("{enter}");
    cy.get("[data-cy=about_page]").should("contain", "About Study Night");
  });

  it("fits a mobile viewport without horizontal scrolling", () => {
    cy.viewport(375, 812);
    cy.get("[data-cy=nav-card-sets]").should("be.visible");
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(
        document.documentElement.clientWidth,
      );
    });
  });
});
