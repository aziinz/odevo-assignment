describe('Sauce Demo Shopping Experience', () => {
    const productFixturePath = 'cypress/fixtures/product.json';
    const backpackName = 'Sauce Labs Backpack';
  
    beforeEach(() => {
        // Load user data from the fixture before each test
        cy.fixture('users').then((userData) => {
            cy.visit('https://www.saucedemo.com/')
                .get('#user-name').type(userData.username)
                .get('#password').type(userData.password)
                .get('#login-button').click();
          
            cy.url().should('include', '/inventory');
            cy.get('.inventory_list').should('be.visible');
        });
    });

    it('should successfully add a backpack to the cart and complete the purchase', () => {
        // Capture product details and save them for later
        saveProductDetails(backpackName);

        // Add the backpack to the cart
        cy.get(`[data-test="add-to-cart-${backpackName.toLowerCase().replace(/ /g, '-')}"`).click();
      
        // Navigate to the shopping cart
        cy.get('[data-test="shopping-cart-link"]').click();
      
        // Proceed to checkout
        checkout();

        // Verify that the order summary is correct
        validateOrderSummary();

        // Finalize the order and check for a success message
        cy.get('[data-test="finish"]').click();
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    });

    function saveProductDetails(productName) {
        cy.contains(productName).then((titleElement) => {
            const title = titleElement.text();

            const description = titleElement
                .parent()
                .find('[data-test="inventory-item-desc"]')
                .text();
            
            const price = titleElement
                .parent()
                .parent()
                .find('[data-test="inventory-item-price"]')
                .text();

            const product = { title, description, price };
            cy.writeFile(productFixturePath, product);
        });
    }

    function checkout() {
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('Sara');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('123456');
        cy.get('[data-test="continue"]').click();
    }

    function validateOrderSummary() {
        cy.fixture('product.json').then((productFixture) => {
            cy.get('[data-test="inventory-item-name"]').should('have.text', productFixture.title);
            cy.get('[data-test="inventory-item-desc"]').should('have.text', productFixture.description);
            cy.get('[data-test="inventory-item-price"]').should('have.text', productFixture.price);
        });
    }
});
