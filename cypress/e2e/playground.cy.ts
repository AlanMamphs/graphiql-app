const validQuery =
  '\n\n query Query { characters(page: 2, filter: { name: "Morty" }) \n\n\n\n\n {info { count } results { name }}} \n\n';

const prettifiedValidQuery =
  'query Query {\n   characters(\n    page: 2,\n    filter: {\n      name: "Morty"\n    }\n  )\n   {\n    info\n    {\n      count\n    }\n    results\n    {\n      name\n    }\n  }\n}';
const invalidQuery =
  'Query query { characters(page: 2, filter: { name: "Morty" }) {info { count } results { name }}}';

const validQueryWithVariable =
  'query QueryWithVar ($characterId: ID!) { character(id: $characterId) { name created } }';

it('Playground page', () => {
  cy.visit('/');
  cy.login();
  cy.location('pathname').should('eq', '/playground');
  cy.giql('playground-editor-and-schema').should('be.visible');
  // Query and Variables editors are not default tabs
  cy.giql('playground-query-editor').should('not.exist');
  cy.giql('playground-variables-editor').should('not.exist');
  // Schema viewer and Variables editor are default tabs
  cy.giql('playground-schema-viewer').should('be.visible');
  cy.giql('playground-headers-editor').should('be.visible');

  cy.giql('playground-query-endpoint').should('be.visible');
  cy.giql('playground-run-query').should('be.visible').should('be.disabled');

  cy.giql('playground-query-results').should('be.visible');

  // Click Query Editor Tab
  cy.contains('Query Editor').click();
  cy.giql('playground-query-editor').should('be.visible');
  cy.giql('playground-schema-viewer').should('not.exist');
  cy.giql('playground-query-endpoint').should('be.visible');
  cy.giql('playground-run-query').should('be.visible').should('be.disabled');

  // Click Variables Editor Tab
  cy.contains('Variables').click();
  cy.giql('playground-variables-editor').should('be.visible');
  cy.giql('playground-headers-editor').should('not.exist');
  cy.giql('playground-query-endpoint').should('be.visible');
  cy.giql('playground-run-query').should('be.visible').should('be.disabled');

  // Enter query

  cy.giql('playground-query-editor').within(() => {
    cy.get('textarea')
      .type(validQuery, { parseSpecialCharSequences: false })
      .blur();
  });

  cy.giql('playground-run-query').should('be.enabled').click();
  cy.giql('playground-query-results').contains(/Hammerhead Morty/);

  // Prettify query
  cy.giql('playground-context-menu').should('not.exist');

  cy.giql('playground-query-editor').rightclick();

  cy.giql('playground-context-menu').should('be.visible');

  cy.giql('playground-context-menu').contains('Prettify').click();

  cy.giql('playground-query-editor').within(() => {
    cy.get('textarea').should('have.value', prettifiedValidQuery);
  });

  cy.giql('playground-run-query').should('be.enabled').click();
  cy.giql('playground-query-results').contains(/Hammerhead Morty/);

  // type invalid query without blurring
  cy.giql('playground-query-editor').within(() => {
    cy.get('textarea')
      .clear()
      .type(invalidQuery, { parseSpecialCharSequences: false });
  });

  cy.giql('playground-run-query').should('be.enabled').click();
  cy.contains(
    'Syntax Error: Unexpected Name "Query". At position: line - 1, column - 1'
  ).should('be.visible');

  cy.contains('GraphiQL error');

  cy.giql('playground-run-query').should('be.disabled');

  // type query with variable
  cy.giql('playground-query-editor').within(() => {
    cy.get('textarea')
      .clear()
      .type(validQueryWithVariable, { parseSpecialCharSequences: false })
      .blur();
  });

  cy.giql('playground-run-query').should('be.enabled').click();
  cy.giql('playground-query-results').contains(
    'Variable "$characterId" of required type "ID!" was not provided.'
  );

  cy.giql('playground-variables-editor').within(() => {
    cy.get('textarea')
      .type('{ "characterId": "1" }', { parseSpecialCharSequences: false })
      .blur();
  });
  cy.giql('playground-run-query').should('be.enabled').click();
  cy.giql('playground-query-results').contains('Rick Sanchez');

  // Prettify Variables
  cy.giql('playground-context-menu').should('not.exist');

  cy.giql('playground-variables-editor').rightclick();

  cy.giql('playground-context-menu').should('be.visible');

  cy.giql('playground-context-menu').contains('Prettify').click();

  cy.giql('playground-variables-editor').within(() => {
    cy.get('textarea').should(
      'have.value',
      JSON.stringify({ characterId: '1' }, null, 2)
    );
  });

  cy.giql('playground-run-query').should('be.enabled').click();
  cy.giql('playground-query-results').contains('Rick Sanchez');

  // type invalid variables without blurring
  cy.giql('playground-variables-editor').within(() => {
    cy.get('textarea')
      .clear()
      .type('{"characterId": 1', { parseSpecialCharSequences: false });
  });

  cy.giql('playground-run-query').should('be.enabled').click();

  cy.contains("Expected ',' or '}'").should('be.visible');

  cy.giql('playground-run-query').should('be.disabled');

  // Validate headers editor
  // reset variables
  cy.giql('playground-variables-editor').within(() => {
    cy.get('textarea')
      .clear()
      .type('{"characterId": 1}', { parseSpecialCharSequences: false })
      .blur();
  });

  cy.contains('Headers').click();
  cy.giql('playground-variables-editor').should('not.exist');
  cy.giql('playground-headers-editor').should('be.visible');

  cy.giql('playground-headers-editor').within(() => {
    cy.get('textarea')
      .type('\n\n\n\n\n{"Authorization": \n\n\n\n\n\n\n"Bearer TOKEN"}', {
        parseSpecialCharSequences: false,
      })
      .blur();
  });
  cy.giql('playground-run-query').should('be.enabled');
  // Prettify Headers
  cy.giql('playground-context-menu').should('not.exist');

  cy.giql('playground-headers-editor').rightclick();

  cy.giql('playground-context-menu').should('be.visible');

  cy.giql('playground-context-menu').contains('Prettify').click();

  cy.giql('playground-headers-editor').within(() => {
    cy.get('textarea').should(
      'have.value',
      JSON.stringify({ Authorization: 'Bearer TOKEN' }, null, 2)
    );
  });

  cy.giql('playground-run-query').should('be.enabled').click();
  cy.giql('playground-query-results').contains('Rick Sanchez');

  // Invalid headers
  cy.giql('playground-headers-editor').within(() => {
    cy.get('textarea')
      .clear()
      .type('{"Authorization": "Bearer TOKEN', {
        parseSpecialCharSequences: false,
      })
      .blur();
  });

  cy.contains('Unterminated string').should('be.visible');

  cy.giql('playground-run-query').should('be.disabled');
});
