describe("Hello", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it("should have columns", () => {
    cy.contains('TO DO');
    cy.contains('DOING');
    cy.contains('DONE');
  });

  it("should delete task", () => {
    cy.get(':nth-child(1) > :nth-child(3) > [style="text-align: right;"] > .delete > .fa').click();
    // cy.get('#task-2').should('not.exist'); // todo: correct assertion
  })

  it("should add new task", () => {
    let task = 'hello world!';
    cy.get(':nth-child(1) > [style="margin-bottom: 5px;"] > .add > .fa').click();
    cy.get('input').type(task);
    cy.get('.confirm > .fa').click();
    cy.contains(task);
  });

});
