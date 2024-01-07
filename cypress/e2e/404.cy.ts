it('404 page', () => {
  // Start from the index page
  cy.visit('http://localhost:3000/unknown-url', { failOnStatusCode: false });

  cy.giql('not-found-page').should('be.visible');

  cy.giql('nav-brand').click();
  cy.giql('welcome-banner').should('be.visible');
});
