// Example test for the Calculator app

describe("Calculator App", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Calculator").click({ force: true });
  });

  it("should render calculator UI", () => {
    cy.contains("Calculator").should("exist");
    cy.get(".calculator-inputs-value").should("exist");
    cy.get("button").should("exist");
  });

  it("should perform a simple addition", () => {
    cy.contains("button", "1").click();
    cy.contains("button", "+").click();
    cy.contains("button", "2").click();
    cy.contains("button", "=").click();
    cy.get(".calculator-inputs-value").should("have.text", "3");
  });

  it("should clear the input when C is pressed", () => {
    cy.get("[data-cy=keypad-btn-1]").click();
    cy.get("[data-cy=keypad-btn-clear]").click({ force: true });
    cy.get(".calculator-inputs-value").should("have.text", "");
  });

  it("should perform a simple subtraction", () => {
    cy.contains("button", "5").click();
    cy.contains("button", "-").click();
    cy.contains("button", "2").click();
    cy.contains("button", "=").click();
    cy.get(".calculator-inputs-value").should("have.text", "3");
  });

  it("should perform a multiplication", () => {
    cy.get('[data-cy="keypad-btn-3"]').click();
    cy.get('[data-cy="keypad-btn-×"]').click();
    cy.get('[data-cy="keypad-btn-4"]').click();
    cy.get('[data-cy="keypad-btn-="]').click();
    cy.get(".calculator-inputs-value").should("have.text", "12");
  });

  it("should perform a division", () => {
    cy.get('[data-cy="keypad-btn-8"]').click();
    cy.get('[data-cy="keypad-btn-÷"]').click();
    cy.get('[data-cy="keypad-btn-2"]').click();
    cy.get('[data-cy="keypad-btn-="]').click();
    cy.get(".calculator-inputs-value").should("have.text", "4");
  });

  it("should handle decimal calculations", () => {
    cy.contains("button", "1").click();
    cy.contains("button", ".").click();
    cy.contains("button", "5").click();
    cy.contains("button", "+").click();
    cy.contains("button", "2").click();
    cy.contains("button", ".").click();
    cy.contains("button", "5").click();
    cy.contains("button", "=").click();
    cy.get(".calculator-inputs-value").should("have.text", "4");
  });

  it("should use backspace to remove last digit", () => {
    cy.get("[data-cy=keypad-btn-9]").click();
    cy.get("[data-cy=keypad-btn-backspace]").click({ force: true });
    cy.get(".calculator-inputs-value").should("have.text", "");
  });

  it("should switch to Exchange Rate page and render UI", () => {
    cy.contains("button", "Exchange Rate").click({ force: true });
    cy.get(".currency-container").should("exist");
    cy.get(".currency-select").should("have.length", 2);
  });

  it("should switch to Exchange Rate and perform a conversion", () => {
    cy.contains("button", "Exchange Rate").click({ force: true });
    cy.get(".currency-select").first().select(1);
    cy.get(".currency-select").last().select(1);
    cy.get('[data-cy="keypad-btn-1"]').click();
    cy.get('[data-cy="keypad-btn-0"]').click();
    cy.get('[data-cy="keypad-btn-0"]').click();
    cy.get(".currency-header").last().find("p").should("not.have.text", "");
  });

  it("should clear the Exchange Rate input using C", () => {
    cy.contains("button", "Exchange Rate").click({ force: true });
    cy.get(".currency-select").first().select(1);
    cy.get(".currency-select").last().select(1);
    cy.get('[data-cy="keypad-btn-1"]').click();
    cy.get('[data-cy="keypad-btn-0"]').click();
    cy.get('[data-cy="keypad-btn-0"]').click();
    cy.get('[data-cy="keypad-btn-clear"]').click({ force: true });
    cy.get(".currency-header").first().find("p").should("have.text", "");
    cy.get(".currency-header").last().find("p").should("have.text", "");
  });

  it("should use backspace on Exchange Rate input", () => {
    cy.contains("button", "Exchange Rate").click({ force: true });
    cy.get(".currency-select").first().select(1);
    cy.get(".currency-select").last().select(1);
    cy.get('[data-cy="keypad-btn-1"]').click();
    cy.get('[data-cy="keypad-btn-2"]').click();
    cy.get('[data-cy="keypad-btn-3"]').click();
    cy.get('[data-cy="keypad-btn-backspace"]').click({ force: true });
    cy.get(".currency-header").first().find("p").should("have.text", "12");
  });

  it("should refresh exchange rates", () => {
    cy.contains("button", "Exchange Rate").click({ force: true });
    cy.get(".refresh-button").click({ force: true });
    cy.get(".refresh-button").should("contain.text", "Last Updated");
  });
});
