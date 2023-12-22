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
  | 'login-email'
  | 'login-password'
  | 'login-confirm-pswd'
  | 'login-submit-btn'
  | 'main-page'
  | 'not-found-page'
  | 'server-error-page'
  | 'theme-dropdown'
  | 'theme-dropdown-links'
  | 'theme-dropdown-links-light'
  | 'theme-dropdown-links-dark'
  | 'theme-dropdown-links-system'
  | 'nav-background';

export const giql = (name: GIQLElements) => {
  return cy.get(`[data-testid="${name}"]`);
};

const commands = {
  giql,
};

Cypress.Commands.addAll(commands);

export type CommandsTypes = typeof commands;

declare global {
  namespace Cypress {
    interface Chainable extends CommandsTypes {}
  }
}
