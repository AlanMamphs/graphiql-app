it('Expect Sign Up Form to fail with human readable error', () => {
  cy.visit('/');
  // Navigate to Sign In Page and authenticate
  cy.giql('nav-signup-btn').click();
  cy.location('pathname').should('eq', '/login');
  cy.url().should('contain', '?signup=1');

  cy.giql('login-firstname').type('Jane');
  cy.giql('login-lastname').type('Doe');

  cy.giql('login-email').type(Cypress.env('TEST_USER_EMAIL'));
  cy.giql('login-password').type(Cypress.env('TEST_USER_PASSWORD'));

  cy.giql('login-confirm-pswd').type(Cypress.env('TEST_USER_PASSWORD'));

  cy.giql('login-submit-btn').click();

  cy.giql('login-error').should('be.visible');
  cy.giql('login-error').should(
    'contain.text',
    'Auth Error! Email already in use'
  );
});

it('Expect to show field error', () => {
  cy.visit('/login?signup=1');
  cy.giql('login-error').should('not.exist');

  cy.giql('login-signup-form').should('be.visible');

  cy.giql('login-firstname').type('lowercase');
  cy.giql('login-lastname').type('lowercase');

  cy.giql('login-email').type('wrongemail');
  cy.giql('login-password').type('easy');
  cy.giql('login-confirm-pswd').type('123');
  cy.giql('login-confirm-pswd').blur();
  cy.giql('login-submit-btn').should('be.disabled');

  // Assert field errors
  cy.contains(
    'Firstname should start with an uppercase letter and should be valid'
  );
  cy.contains(
    'Lastname should start with an uppercase letter and should be valid'
  );
  cy.contains('Invalid email address');
  cy.contains('password must contain at least 1 number');
  cy.contains('Passwords must match');
  cy.giql('password-strength-text').should('contain.text', 'Weak');

  cy.giql('login-email').clear().type('jane.doe@example.com').blur();
  cy.should('not.contain', 'Invalid email address');

  cy.giql('login-password').clear().type('easy1').blur();
  cy.contains('password must contain at least 1 symbol');
  cy.giql('password-strength-text').should('contain.text', 'Weak');

  cy.giql('login-password').clear().type('easy1$').blur();
  cy.contains('password must contain at least 1 uppercase letter');
  cy.contains('Stronger');

  cy.giql('login-password').clear().type('easy1$U').blur();
  cy.contains('password must be at least 8 characters');
  cy.contains('Stronger');

  cy.giql('login-password').clear().type('easy1$U8').blur();
  cy.should('not.contain', 'password must be at least 8 characters');
  cy.contains('Strong');

  cy.giql('login-confirm-pswd').clear().type('easy1$U8').blur();
  cy.should('not.contain', 'Passwords must match');

  cy.giql('login-lastname').clear().type('Doe').blur();
  cy.should(
    'not.contain',
    'Lastname should start with an uppercase letter and should be valid'
  );

  cy.giql('login-firstname').clear().type('Jane').blur();
  cy.should(
    'not.contain',
    'Firstname should start with an uppercase letter and should be valid'
  );
  cy.giql('login-submit-btn').should('be.enabled').click();
});
