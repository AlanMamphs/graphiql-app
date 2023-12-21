describe('Theme toggler should work for each select', () => {
  it('Light theme toggler shoud work', () => {
    cy.visit('http://localhost:3000/');

    cy.giql('theme-dropdown').should('be.visible');
    cy.giql('theme-dropdown').click();

    cy.giql('theme-dropdown-links').should('be.visible');

    cy.giql('theme-dropdown-links-light').click();
    cy.get('html').should('have.class', 'light');
  });

  it('Dark theme toggler shoud work', () => {
    cy.visit('http://localhost:3000/');

    cy.giql('theme-dropdown').should('be.visible');
    cy.giql('theme-dropdown').click();

    cy.giql('theme-dropdown-links').should('be.visible');

    cy.giql('theme-dropdown-links-dark').click();
    cy.get('html').should('have.class', 'dark');
  });

  it('System theme toggler shoud work', () => {
    cy.visit('http://localhost:3000/');

    cy.giql('theme-dropdown').should('be.visible');
    cy.giql('theme-dropdown').click();

    cy.giql('theme-dropdown-links').should('be.visible');

    cy.giql('theme-dropdown-links-system').click();
    cy.get('html').should('satisfy', (tag) => {
      const classList = Array.from(tag[0].classList);

      return classList.includes('dark') || classList.includes('light');
    });
  });
});
