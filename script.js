class OutOfRangeError extends Error {
  constructor() {
    super("Expression should only consist of integers and +-/* characters");
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(str) {
  // Check for invalid combinations of operators
  if (/(\+{2,}|\-{2,}|\*{2,}|\/{2,})/.test(str)) {
    throw new InvalidExprError();
  }
  
  // Check for invalid start operator
  if (/^[\/*+]/.test(str)) {
    throw new SyntaxError("Expression should not start with invalid operator");
  }
  
  // Check for invalid end operator
  if (/[\/*+-]$/.test(str)) {
    throw new SyntaxError("Expression should not end with invalid operator");
  }
  
  // Check for invalid characters
  if (!/^[\d\s\/*+-]+$/.test(str)) {
    throw new OutOfRangeError();
  }
  
  // Evaluate the expression
  return eval(str);
}

// Test the evalString function
try {
  console.log(evalString("1 + 2 * 3 - 4")); // Expected output: 3
  console.log(evalString("2 / 0")); // Expected output: Infinity
  console.log(evalString("1 ++ 2")); // Expected output: InvalidExprError
  console.log(evalString("1 / 0 2")); // Expected output: OutOfRangeError
  console.log(evalString("+1 + 2")); // Expected output: SyntaxError
  console.log(evalString("1 + 2 - * 3")); // Expected output: InvalidExprError
} catch (err) {
  console.log(err.message);
  console.log(err.name);
}
