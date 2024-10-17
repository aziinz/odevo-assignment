# Sauce Demo Test Suite Documentation

## Introduction

This document explains the automated tests created for the Sauce Demo website in my assignment from Odevo. The tests check that users can log in correctly and purchase a product.

## Test Files

The test suite includes two main files:

1. **Login Tests** (`login.spec.js`)
   - These tests check the login process.
   - **Tests Included**:
     - **Login without Username and Password**: Makes sure an error appears when both fields are empty.
     - **Login without Password**: Checks for an error when only the username is entered.
     - **Successful Login**: Tests logging in with the right username and password.

2. **Shopping Tests** (`shopping.spec.js`)
   - This test checks the process of buying a product.
   - **Test Included**:
     - **Add Backpack to Cart and Checkout**: Verifies that a user can add the "Sauce Labs Backpack" to their cart and complete the purchase.

## How to Set Up

### Prerequisites

- Make sure you have Node.js and npm installed.
- Install Cypress in your project.

### Running the Tests

1. Clone the repository with the test code.
2. Go to the project folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Open Cypress:
   ```bash
   npx cypress open
   ```
5. Select the test files (`login.spec.js` and `shopping.spec.js`) to run in the Cypress Test Runner.

## Fixture Data

### User Credentials

- The login tests use a file named `users.json` with the following data:
  ```json
  {
    "username": "standard_user",
    "password": "secret_sauce"
  }
  ```

### Product Information

- The shopping test saves product details in a file called `product.json` to use for checking the order summary.

## Summary of Test Cases

### Login Tests (`login.spec.js`)

1. **Error without Username and Password**
   - **What It Does**: Clicks login without entering anything.
   - **Expected Result**: Shows the message "Epic sadface: Username is required".

2. **Error without Password**
   - **What It Does**: Enters a username and clicks login.
   - **Expected Result**: Shows the message "Epic sadface: Password is required".

3. **Successful Login**
   - **What It Does**: Enters the correct username and password, then logs in.
   - **Expected Result**: Goes to the inventory page.

### Shopping Tests (`shopping.spec.js`)

1. **Add Backpack to Cart and Checkout**
   - **What It Does**: Logs in, adds the "Sauce Labs Backpack" to the cart, and completes the purchase.
   - **Expected Result**: Shows the order summary and the message "Thank you for your order!".



## Side Note : Strange problem that I've encountered
While working on the assignment, I encountered a strange issue with saucedemo.com. After testing with different ISPs and computers, I discovered that a service worker on the site sends a request to the URL https://event.backtrace.io/, which consistently returns a 401 Unauthorized` response. This behavior caused Cypress to fail since the browser couldn't trigger the 'load' event, leading to a timeout exception and preventing the tests from executing properly.

I tried multiple workarounds and intercepts without success. After some research, I found that this is a known issue among other users. To resolve it, I blocked the problematic URL and adjusted the Cypress configuration based on a solution outlined in this GitHub issue : https://github.com/cypress-io/cypress/issues/27501