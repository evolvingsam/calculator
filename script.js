const ops = "+-×÷";
isOutputPreviousAnswer = false;
let operation = document.querySelector("#operation");
let history = document.querySelector("#history");
let buttons = document.querySelector("#input");

buttons.addEventListener("click", (e) => {
    switch(e.target.id) {
        case "clear":
            operation.textContent = "0";
            history.textContent = " ";
            break;
        
        case "del":
            // If only one character left, reset to "0"
            if (operation.textContent.length === 1) {
            operation.textContent = "0";
            } 
            // If last part is an operator (with space), remove last two chars
            else if (isLastCharOperator() || operation.textContent.trim().split(" ").at(-1).length === 1 && ops.includes(operation.textContent.trim().split(" ").at(-1).replace(/[×÷]/g, m => m === "×" ? "*" : "/"))) {
            operation.textContent = operation.textContent.slice(0, -2).trim();
            if (operation.textContent === "") operation.textContent = "0";
            } 
            // Otherwise, remove last character
            else {
            operation.textContent = operation.textContent.slice(0, -1);
            if (operation.textContent === "") operation.textContent = "0";
            }
            break;
        case "percent":
            if (isNegativeSign()) break;

            // Remove trailing operator before adding percent
            if (isLastCharOperator()) {
            operation.textContent = operation.textContent.slice(0, -2);
            }

            // Prevent multiple consecutive percent signs
            if (toAdd("%")) {
                
                operation.textContent += " %";
            }
        
            break;

        case "add":
            if (isNegativeSign()) {
                break;
            }
            
            if (isLastCharOperator()) {
                operation.textContent = operation.textContent.slice(0, -2);
            } 

            operation.textContent += " +";
            break;
        case "subtract":
            if (isNegativeSign()) {
                break;
            }
            
            if (operation.textContent.slice(-1) === "+" || operation.textContent.slice(-1) === "-") {
                operation.textContent = operation.textContent.slice(0, -2);
            } 
            
            operation.textContent += " -";

            break;
        case "multiply":
            if (isNegativeSign()) {
                break;
            }
            
            if (isLastCharOperator()) {
                operation.textContent = operation.textContent.slice(0, -2);
                console.log("good");
            }
            console.log(operation.textContent);
            operation.textContent += " ×";
            break;

        case "divide":
            if (isNegativeSign()) {
                break;
            }
            
            if (isLastCharOperator()) {
                operation.textContent = operation.textContent.slice(0, -2);
            } 

            operation.textContent += " ÷";
            break;
        case "dot":
            if (isOutputEmpty() || !isLastCharOperator()) {
                if (!isDecimalInUse()) {
                    operation.textContent += ".";
                }
            } else {
                operation.textContent += " 0.";
            }

            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "00":
            if (isOutputPreviousAnswer) {
                operation.textContent = "0";
            }
            if (isOutputEmpty()) {
                operation.textContent = e.target.id;
            } else if (isLastCharOperator() && !isNegativeSign()) {
                operation.textContent += " " + e.target.id;
            } else {
                operation.textContent += " " + e.target.id;
            }

            break;
        case "equal":
            console.log(operation.textContent);
            if (isLastCharOperator()) {
                break;
            }

            history.textContent = operation.textContent + " =";
            operation.textContent = evalPostfix(toPosfix(tokenize(operation.textContent)));
            isOutputPreviousAnswer = true;
            return;
    }

    isOutputPreviousAnswer = false;    


    
})

function isLastCharOperator() {
    let stroperation = operation.textContent;
    if (ops.includes(stroperation.charAt(stroperation.length - 1))) {
        return true;
    } else {
        return false;
    }
}

function isOutputEmpty() {
    if (operation.textContent.length === 1 && operation.textContent === "0") {
        return true;
    } else {
        return false;
    }
}

function isNegativeSign() {

    if (operation.textContent.length === 1 && operation.textContent === "-") {
        return true;
    }

    // Check if the last character is a negative sign after an operator
    const parts = operation.textContent.trim().split(" ");
    if (
        parts.length > 1 &&
        parts[parts.length - 1] === "-" &&
        ops.includes(parts[parts.length - 2].replace(/[×÷]/g, m => m === "×" ? "*" : "/"))
    ) {
        return true;
    }

    return false;
}

function isDecimalInUse() {
    let arroperation = operation.textContent.split(" ");

    if (arroperation[arroperation.length - 1].includes(".")) {
        return true;
    }

    return false;
}


function toAdd(op) {
    if (operation.textContent.slice(-1) !== op) {
            return true;
    }
}
function tokenize(expr) {
  return expr.match(/\d+(\.\d+)?|[+\-×÷%()]/g);
}


function precedence(op) {
    if (op == "+" || op == "-") return 1;
    if (op == "%" || op == "×" || op == "÷") return 2;
    return 0;
}

function toPosfix(tokens) {
    let output = [];
    let stack = [];

    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else {
            while (
                stack.length > 0 &&
                precedence(stack[stack.length] -1) >= precedence(token)
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }

    while (stack.length > 0) {
        output.push(stack.pop())

    }
    return output;

}

function evalPostfix(postfix) {
  let stack = [];

  for (let token of postfix) {
    if (typeof token === "number") {
      stack.push(token);
    } else {
      let b = stack.pop();
      let a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "×":
          stack.push(a * b);
          break;
        case "÷":
          if (b === 0) {
            throw new Error("Division by zero is not allowed");
          }
          stack.push(a / b);
          break;
        case "%":
          if (b === 0) {
            throw new Error("Modulo by zero is not allowed");
          }
          stack.push(a % b);
          break;
      }
    }
  }

  return stack.pop();
}
