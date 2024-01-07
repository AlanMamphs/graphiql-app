it('500 page', () => {
  // Start from the index page
  cy.visit('http://localhost:3000/500', { failOnStatusCode: false });

  cy.giql('server-error-page').should('be.visible');

  cy.giql('nav-brand').click();
  cy.giql('welcome-banner').should('be.visible');
});
