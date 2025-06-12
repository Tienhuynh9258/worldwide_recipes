describe('Worldwide Recipes App', () => {
  it('should display the homepage and list recipes', () => {
    cy.visit('/');
    cy.contains('Recipes').should('exist');
    cy.get('a').contains(/recipe/i).first().click();
    cy.url().should('include', '/recipes/');
    cy.get('h1').should('exist');
  });
}); 