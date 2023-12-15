it('Expect Sign In to fail with human readable error', () => {
  cy.visit('/');
  // Navigate to Sign In Page and authenticate
  cy.giql('nav-signin-btn').click();
  cy.location('pathname').should('eq', '/login');
  cy.url().should('contain', '?signup=0');

  cy.login({ password: 'wrong password', expectFailure: true });

  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should(
    'contain.text',
    'Auth Error! Invalid email or password'
  );
});

it('Expect to show field error if non-email input is provided', () => {
  cy.visit('/login?signup=0');
  cy.giql('login-error').should('not.exist');
  cy.giql('login-signin-form').should('be.visible');

  cy.giql('login-email').type('wrong email');

  cy.giql('login-password').type(Cypress.env('TEST_USER_PASSWORD'));

  cy.giql('login-submit-btn').should('be.disabled');
  cy.contains('Invalid email address');
});
