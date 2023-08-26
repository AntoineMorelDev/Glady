# Glady Frontend Challenge Solution

This repository contains my solution to the Glady Frontend Challenge. The challenge is focused on creating an Angular component that helps users find a combination of cards to reach a desired value in a store.

![Video Presentation](https://github.com/AntoineMorelDev/Glady/blob/master/frontend/calculator-client/src/assets/img/presentation-calculator.gif?raw=true)


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Usage](#usage)
- [API](#api)
- [Contribution](#contribution)

## Features

- **Level 1**: Find the exact combination of cards to reach a desired amount, suggest alternatives, and auto-corrects the amount if it is not feasible.
  
- **Level 2**: Integrated "minus" and "plus" buttons to provide the user with the next possible amounts without having to guess them.
  
- **Level 3**: Refactored the component for integration with reactive forms, returning an object with the chosen amount and the list of cards.

## Installation

### Clone the repository

1. Clone this repository:
    ```
    git clone https://github.com/AntoineMorelDev/Glady.git
    ```

### Server side

2. Navigate to the calculator-server directory:
    ```
    cd calculator-server
    ```

3. Install the necessary packages:
    ```
    npm install
    ```

4. Start the server:
    ```
    npm start
    ```

### Client side

5. Navigate to the calculator-client directory:
    ```
    cd calculator-client
    ```

6. Install the necessary packages:
    ```
    npm install
    ```

7. Start the client:
    ```
    npm start
    ```

## Running the Tests

This application comes with a suite of tests that you can run to ensure everything is working as expected.

1. To run the tests, navigate to the `calculator-client` directory:
    ```
    cd calculator-client
    ```

2. Run the tests using the Angular CLI:
    ```
    ng test
    ```

This will start the Karma test runner and run all the tests in the application. You will see the results of the tests in your terminal.


## Usage

1. Open your browser and navigate to `http://localhost:4200`.

2. Use the provided interface to input your desired amount and see the card combinations.

## API Documentation

For a detailed explanation of the API and its endpoints, refer to the [`calculator-server/doc.md`](calculator-server/doc.md) file.


## Contribution

Your feedback is welcome. If you have any issues or want to contribute, feel free to open a pull request or an issue.
