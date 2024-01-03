describe('Main page editor should work as expected', () => {
  it('Login and return to editor, then write text', () => {
    cy.visit('http://localhost:3000/');

    cy.giql('nav-signin-btn').click();

    cy.login({});

    cy.giql('nav-main-btn').should('be.visible');
    cy.giql('editor-output').should('be.visible');
    cy.giql('editor-input').should('be.visible');

    cy.giql('editor-input').type('{\n    name,\n    surname\n}');

    cy.giql('editor-output').children().contains('name');
    cy.giql('editor-output').children().contains('surname');
  });
});
