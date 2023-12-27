it('Expect Sign In to fail with human readable error', () => {
  cy.visit('/');
  // Navigate to Sign In Page and authenticate
  cy.giql('nav-signin-btn').click();
  cy.location('pathname').should('eq', '/signin');

  cy.login({ password: 'wrong password', expectFailure: true });

  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should(
    'contain.text',
    'Auth Error! Invalid email or password'
  );
});

it('Expect to show field error if non-email input is provided', () => {
  cy.visit('/signin');
  cy.giql('login-error').should('not.exist');
  cy.giql('login-signin-form').should('be.visible');

  cy.giql('login-email').type('wrong email');

  cy.giql('login-password').type(Cypress.env('TEST_USER_PASSWORD'));

  cy.giql('login-submit-btn').should('be.disabled');
  cy.contains('Invalid email address');
});

it('Expect to show error provided via error query', () => {
  cy.visit('/signin?error=auth/invalid-credential');
  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should(
    'contain.text',
    'Auth Error! Invalid email or password'
  );

  cy.visit('/signin?error=auth/unknow error');
  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should(
    'contain.text',
    'Auth Error! auth/unknow error'
  );
});

it('Expect Sign In Page to redirect authenticated user to main page and logout to welcome page', () => {
  cy.visit('/');
  // Navigate to Login Page and authenticate
  cy.giql('nav-signin-btn').click();
  cy.location('pathname').should('eq', '/signin');

  cy.login();

  cy.location('pathname').should('eq', '/playground');

  // Try to visit login page again:
  cy.visit('/signin');
  // Expect Redirect to Welcome page
  cy.location('pathname').should('eq', '/');
});
