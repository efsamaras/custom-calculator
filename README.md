# Custom Calculator

Custom Calculator is a sample Angular-based application that allows users to input and evaluate mathematical expressions. It includes validation, history tracking, and a unique RAND operator.

## Table of Contents

-   [Features](#features)
-   [Assumptions](#assumptions)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Usage](#usage)

## Features

The application includes the following key features:

-   **Validation:** The expression is validated in real-time, with error messages displayed for invalid inputs.
-   **Evaluation:** Computed results are shown in the output area, supporting basic arithmetic operations (+, -, \*, /) and trigonometric functions (sin, cos, tan).
-   **History:** The last 5 expressions and their results are displayed in the history section.
-   **RAND operator** Introducing a RAND operand that generates random numbers from [random.org/integers](https://www.random.org/integers)

## Assumptions

-   **Whitespace Handling:** Whitespaces in the input expressions are ignored during validation and evaluation. The calculator assumes that users may include or omit spaces in expressions for readability, and it does not affect the correctness of the calculations.
-   **Equals Operator Omission:** The calculator omits the equals operator (`=`) because it is not unnecessary.
-   **Trigonometric Functions Usage:** When the user presses a trigonometric function button, the calculator assumes that the last given number is intended as the argument for the trigonometric function. If there is no preceding number, pressing a trigonometric function button has no effect.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js and npm installed on your system. This project requires Node.js version `^16.14.0 || ^18.10.0`
-   Angular CLI installed (`npm install -g @angular/cli`).

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/efsamaras/custom-calculator.git
    ```

2. Install project dependencies:

    ```bash
     npm install
    ```

## Usage

To start the development server, run:

```bash
npm run start
```

Access the application at http://localhost:4200 in your web browser.
