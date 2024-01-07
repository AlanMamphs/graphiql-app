import '@testing-library/cypress/add-commands';

type GIQLElements =
  | 'nav-brand'
  | 'nav-signin-btn'
  | 'nav-signup-btn'
  | 'nav-signout-btn'
  | 'nav-main-btn'
  | 'nav-light-dark-theme'
  | 'nav-menu-hamburger'
  | 'nav-menu-close'
  | 'nav-secondary-menu-links'
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
  | 'playground-editor-and-schema'
  | 'playground-query-editor'
  | 'playground-query-endpoint'
  | 'playground-schema-viewer'
  | 'playground-headers-editor'
  | 'playground-variables-editor'
  | 'playground-query-results'
  | 'playground-run-query'
  | 'playground-context-menu'
  | 'playground-error-toast'
  | 'not-found-page'
  | 'server-error-page'
  | 'theme-dropdown'
  | 'theme-dropdown-links'
  | 'theme-dropdown-links-light'
  | 'theme-dropdown-links-dark'
  | 'theme-dropdown-links-system'
  | 'localization-dropdown'
  | 'localization-dropdown-links'
  | 'localization-dropdown-en'
  | 'localization-dropdown-ru'
  | 'nav-background';

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
  cy.visit('/signin');

  cy.giql('login-signin-form').should('be.visible');

  cy.giql('login-email').type(email);

  cy.giql('login-password').type(password);

  cy.giql('login-submit-btn').click();
  if (!expectFailure) {
    cy.location('pathname').should('eq', '/playground');
  }
};

export const assertMissingHorizontalScroll = () => {
  cy.wait(1000);
  cy.window().then((win) => {
    const htmlWidth = Cypress.$('html')[0].scrollWidth;
    const scrollBarWidth = win.innerWidth - htmlWidth;
    // scrollbar is absent
    expect(scrollBarWidth).to.be.eq(0);
  });
};
const commands = {
  giql,
  login,
  assertMissingHorizontalScroll,
};

Cypress.Commands.addAll(commands);

export type CommandsTypes = typeof commands;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable extends CommandsTypes {}
  }
}
