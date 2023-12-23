it('Expect Login Page to redirect authenticated user to main page and logout to welcome page', () => {
  cy.visit('/');
  // Navigate to Login Page and authenticate
  cy.giql('nav-signin-btn').click();
  cy.location('pathname').should('eq', '/login');
  cy.url().should('contain', '?signup=0');

  cy.login();

  cy.location('pathname').should('eq', '/playground');

  // Try to visit login page again:
  cy.visit('/login');
  // Expect Redirect to Welcome page
  cy.location('pathname').should('eq', '/');
});

it('Expect to show error provided via error query', () => {
  cy.visit('/login?error=auth/invalid-credential');
  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should(
    'contain.text',
    'Auth Error! Invalid email or password'
  );

  cy.visit('/login?error=auth/email-already-in-use');
  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should(
    'contain.text',
    'Auth Error! Email already in use'
  );

  cy.visit('/login?error=auth/unknow error');
  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should('contain.text', 'Auth Error! Unknown error');
});
