describe('Welcome Page', () => {
  it('Welcome page is rendered properly', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

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

    cy.giql('login-signin-form').should('be.visible');

    cy.giql('login-email').type('jane.doe@example.com');
    cy.giql('login-password').type('topsecret');

    cy.giql('login-submit-btn').click();

    // Assert that Main page is displayed now
    cy.giql('main-page').should('be.visible');
    cy.giql('nav-signout-btn').should('be.visible');
    cy.giql('nav-signin-btn').should('not.exist');
    cy.giql('nav-signup-btn').should('not.exist');
    cy.giql('nav-main-btn').should('be.visible');

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

  it('Navigation is working', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Scroll for sticky header to appear
    cy.scrollTo(0, 400);

    cy.giql('nav-secondary-menu').should('be.visible');
    cy.giql('nav-secondary-menu-btn').should('be.visible');

    cy.giql('nav-secondary-menu-btn').click();

    cy.giql('nav-secondary-menu-container').should('be.visible');
    cy.giql('nav-secondary-menu-links').should('be.visible');
  });
});
