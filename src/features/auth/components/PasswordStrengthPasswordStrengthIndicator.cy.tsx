import React from 'react';
import { PasswordStrengthIndicator } from './PasswordStrength';

describe('<PasswordStrengthIndicator />', () => {
  it('renders Weak', () => {
    cy.mount(<PasswordStrengthIndicator password="123" />);
    cy.contains('Weak');
  });

  it('renders Stronger', () => {
    cy.mount(<PasswordStrengthIndicator password="Ul$9" />);
    cy.contains('Stronger');
  });

  it('renders Strong', () => {
    cy.mount(<PasswordStrengthIndicator password="Ul$9Ul$9" />);
    cy.contains('Strong');
  });
});
