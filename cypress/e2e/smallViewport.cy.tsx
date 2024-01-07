it('Renders correctly on small viewport', () => {
  cy.viewport('iphone-6');

  cy.visit('/');

  cy.giql('nav-menu-close').should('not.be.visible');
  cy.giql('nav-menu-hamburger').should('be.visible').click();
  cy.giql('nav-menu-close').should('be.visible');
  cy.giql('nav-menu-hamburger').should('not.be.visible');

  cy.giql('nav-secondary-menu-links').within(() => {
    cy.contains('Login');
    cy.contains('Sign Up');
    cy.giql('theme-dropdown').should('be.visible');
    cy.giql('localization-dropdown').should('be.visible');
  });

  cy.contains('Login').click();

  cy.url().should('include', '/signin');

  cy.giql('login-signin-form').should('be.visible');

  cy.assertMissingHorizontalScroll();
  cy.login();

  cy.giql('playground-editor-and-schema').should('be.visible');

  cy.giql('playground-query-results').should('be.visible');

  cy.assertMissingHorizontalScroll();
});
