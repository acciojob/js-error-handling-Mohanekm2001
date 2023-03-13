// Define OutOfRangeError class
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

// Define InvalidExprError class
class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

// Define evalString function
function evalString() {
  const expression = document.getElementById("expression").value;
  try {
    // Check for invalid expression combinations
    if (/[+\-*/]{2,}/.test(expression)) {
      throw new InvalidExprError();
    }

    // Check for invalid starting operator
    if (/^[+\-*/]/.test(expression)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Check for invalid ending operator
    if (/[+\-*/]$/.test(expression)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // Evaluate expression
    const result = eval(expression);

    // Check for OutOfRangeError
    if (!Number.isInteger(result)) {
      throw new OutOfRangeError(result);
    }

    alert(`Result: ${result}`);
  } catch (error) {
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
      alert(`Error: ${error.message}`);
    } else {
      alert(`Syntax Error: ${error.message}`);
    }
  }
}
