describe('Sauce Demo Login Functionality', () => {

  const baseUrl = 'https://www.saucedemo.com/';

  beforeEach(() => {
      // Visit the Sauce Demo login page before each test
      cy.visit(baseUrl);
  });

  it('should show an error when trying to login without username and password', () => {
      cy.get('[data-test="login-button"]').click();
      verifyErrorMessage('Epic sadface: Username is required');
  });

  it('should show an error when trying to login without a password', () => {
      cy.get('[data-test="username"]').clear().type('standard_user');
      cy.get('[data-test="login-button"]').click();
      verifyErrorMessage('Epic sadface: Password is required');
  });

  it('should successfully login with standard user credentials', () => {
      cy.get('[data-test="username"]').clear().type('standard_user');
      cy.get('[data-test="password"]').clear().type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory');
      cy.get('.inventory_list').should('be.visible');
  });

  function verifyErrorMessage(expectedMessage) {
      cy.get('.error')
          .should('be.visible')
          .and('have.text', expectedMessage);
  }
});
