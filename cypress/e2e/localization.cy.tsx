it('Localization toggler should work', () => {
  cy.visit('/');
  cy.contains('Welcome to the GraphiQL');
  cy.giql('localization-dropdown').should('be.visible').click();

  cy.giql('localization-dropdown-links').should('be.visible');
  cy.giql('localization-dropdown-ru').click();
  cy.should('not.contain', /Welcome to the GraphiQL/);
  cy.contains('Добро пожаловать в GraphiQL');
  cy.contains('Войти');
  cy.contains('Регистрация');

  cy.login();
  cy.contains('Песочница');
  cy.contains('Выход');
  cy.contains('Запрос');
  cy.contains('Схема');
  cy.contains('Заголовки');
  cy.contains('Переменные');
  cy.contains("Поторопитесь! Добавьте запрос и жмите 'Запрос'");
  cy.giql('playground-headers-editor').rightclick();
  cy.contains('Форматировать').click();

  cy.giql('localization-dropdown').click();
  cy.giql('localization-dropdown-links').should('be.visible');
  cy.giql('localization-dropdown-en').click();

  cy.contains('Playground');
  cy.contains('Sign out');
  cy.contains('Query');
  cy.contains('Schema');
  cy.contains('Headers');
  cy.contains('Variables');
  cy.contains('Hurry up! Add query to editor and hit Query');
});
