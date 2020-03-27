describe("Testing links,routes,and proper validation on pizza form", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/");
    });
    it("Add test to inputs and submit form", function() {
      cy
      .get('button[name="pizza"]')
      .click()
      cy
      .get('input[name="name"]')
      .type("bab")
      .should("have.value", "bab")
      cy
      .get('textarea[name="specInstr"]')
      .type("some text")
      .should("have.value", "some text")
      cy
      .get('select[name="pizzaSize"]')
      .select('Lg')
      .should("have.value", "12in")
      cy
      .get('[type=checkbox]')
      .check()
      .should("be.checked")
      cy
      .get('button[name="submit"]')
        .click()
    });
    
    it("no input name only", function() {
        cy
        .get('button[name="homebutton"]')
        .click()
        cy
        .get('button[name="pizza"]')
        .click()
        cy
        .get('input[name="name"]')
        .type("Timmy")
        .should("have.value", "Timmy")
        cy
        .get('select[name="pizzaSize"]')
        .select('Sm')
        .should("have.value", "10in")
        cy
        .get('button[name="submit"]')
        .click()
        
      });
  });