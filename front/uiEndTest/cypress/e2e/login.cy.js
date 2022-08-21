describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/signup');

    cy.get('[aria-label="signup form"]').submit().click();
    cy.contains('Error on screen');

  })
})