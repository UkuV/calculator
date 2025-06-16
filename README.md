# Test Calc

Test Calc is a web-based calculator and currency exchange rate tool built with React, Vite, and MirageJS. It features a standard calculator, a currency converter with live exchange rates (mocked via MirageJS), and a simple calculation history.

## Features

- Calculator with basic arithmetic operations and prime number calculation.
- Currency exchange rate conversion between USD, EUR, AUD, CAD, and JPY.
- Calculation history (persisted in-memory via MirageJS).
- Responsive UI using Material UI components.
- End-to-end tests with Cypress.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Install dependencies

```sh
npm install
```

### Run in Development Mode

Start the development server (Vite):

```sh
npm run dev
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

### Run End-to-End Tests

Stop the dev server:

After that run Cypress tests:

```sh
npm run test:e2e
```

This will automatically start the server (if not already running) and execute the Cypress tests defined in [`cypress/e2e/calculator.cy.js`](cypress/e2e/calculator.cy.js).

## Project Structure

- [`src/`](src/) - Main source code (React components, styles, MirageJS server)
- [`cypress/`](cypress/) - Cypress end-to-end tests and configuration
- [`public/`](public/) - Static assets
