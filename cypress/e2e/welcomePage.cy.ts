it('Welcome page is rendered properly', () => {
  // Start from the index page
  cy.visit('/');

  // Assert that welcome page is displayed correctly
  cy.giql('main-page').should('not.exist');
  cy.giql('welcome-banner').should('be.visible');

  cy.giql('nav-brand').should('be.visible');
  cy.giql('nav-main-btn').should('not.exist');
  cy.giql('nav-signin-btn').should('be.visible');
  cy.giql('nav-signup-btn').should('be.visible');
  cy.giql('nav-signout-btn').should('not.exist');

  cy.giql('welcome-signin-btn').should('be.visible');
  cy.giql('welcome-signin-btn').should('be.visible');
  cy.giql('footer-rs-school').should('be.visible');
  cy.giql('footer-github-names').should('be.visible');

  // Navigate to Sign In Page and authenticate
  cy.giql('nav-signin-btn').click();

  cy.login({});

  // Assert that Main page is displayed now
  cy.giql('nav-signout-btn').should('be.visible');
  cy.giql('nav-main-btn').should('be.visible');

  cy.giql('nav-signin-btn').should('not.exist');
  cy.giql('nav-signup-btn').should('not.exist');
  cy.url().should('contain', '/playground');
  cy.giql('main-page').should('be.visible');

  // Assert that Welcome Page is after logout
  cy.giql('nav-signout-btn').click();
  cy.giql('nav-signout-btn').should('not.exist');
  cy.giql('main-page').should('not.exist');
  cy.giql('welcome-banner').should('be.visible');

  // We are back to Welcome page
  // Click Welcome page sign-in button
  // and assert the same login page is shown
  cy.giql('welcome-signin-btn').click();
  cy.giql('login-signin-form').should('be.visible');
});

it('Navigation is sticky', () => {
  // Start from the index page
  cy.visit('/');

  // Scroll for sticky header to appear
  cy.scrollTo(0, 400);
  cy.giql('nav-background').should('be.visible');
});
