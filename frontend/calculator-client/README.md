# Glady Frontend Challenge Solution

This repository contains my solution to the Glady Frontend Challenge. The challenge is focused on creating an Angular component that helps users find a combination of cards to reach a desired value in a store.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contribution](#contribution)
- [License](#license)

## Features

- **Level 1**: Find the exact combination of cards to reach a desired amount, suggest alternatives, and auto-corrects the amount if it is not feasible.
  
- **Level 2**: Integrated "minus" and "plus" buttons to provide the user with the next possible amounts without having to guess them.
  
- **Level 3**: Refactored the component for integration with reactive forms, returning an object with the chosen amount and the list of cards.

## Installation

1. Clone this repository:
    ```
    git clone https://github.com/AntoineMorelDev/Glady.git
    ```

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

## Usage

1. Start the Angular app:
    ```
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200`.

3. Use the provided interface to input your desired amount and see the card combinations.

## API

### Setting up the API

Before using the API, make sure to set it up correctly:

1. Navigate to the calculator-server directory:
    ```
    cd calculator-server
    ```

2. Install the necessary packages:
    ```
    npm install
    ```

3. Start the API server:
    ```
    npm start
    ```

### Documentation

For a detailed explanation of the API and its endpoints, refer to the `calculator-server/doc.md` file.

## Contribution

Your feedback is welcome. If you have any issues or want to contribute, feel free to open a pull request or an issue.

## License

This project is licensed under the MIT License. Refer to the `LICENSE` file for detailed information.
