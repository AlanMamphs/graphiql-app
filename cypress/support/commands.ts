import '@testing-library/cypress/add-commands';

type GIQLElements =
  | 'nav-brand'
  | 'nav-signin-btn'
  | 'nav-signup-btn'
  | 'nav-signout-btn'
  | 'nav-main-btn'
  | 'nav-light-dark-theme'
  | 'welcome-banner'
  | 'welcome-signin-btn'
  | 'welcome-signup-btn'
  | 'footer-rs-school'
  | 'footer-github-names'
  | 'login-signup-form'
  | 'login-signin-form'
  | 'login-firstname'
  | 'login-lastname'
  | 'login-email'
  | 'login-password'
  | 'login-confirm-pswd'
  | 'login-submit-btn'
  | 'login-error'
  | 'password-strength-text'
  | 'main-page'
  | 'not-found-page'
  | 'server-error-page'
  | 'theme-dropdown'
  | 'theme-dropdown-links'
  | 'theme-dropdown-links-light'
  | 'theme-dropdown-links-dark'
  | 'theme-dropdown-links-system';
export const giql = (name: GIQLElements) => {
  return cy.get(`[data-testid="${name}"]`);
};

export const login = (props?: {
  email?: string;
  password?: string;
  expectFailure?: boolean;
}) => {
  const {
    email = Cypress.env('TEST_USER_EMAIL'),
    password = Cypress.env('TEST_USER_PASSWORD'),
    expectFailure = false,
  } = props ?? {};
  cy.giql('nav-signin-btn').click();

  cy.giql('login-signin-form').should('be.visible');

  cy.giql('login-email').type(email);

  cy.giql('login-password').type(password);

  cy.giql('login-submit-btn').click();
  if (!expectFailure) {
    cy.location('pathname').should('eq', '/playground');
  }
};

const commands = {
  giql,
  login,
};

Cypress.Commands.addAll(commands);

export type CommandsTypes = typeof commands;

declare global {
  namespace Cypress {
    interface Chainable extends CommandsTypes {}
  }
}
