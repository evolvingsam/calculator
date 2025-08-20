const ops = "+-/*";
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
            if (operation.textContent.length === 1) {
                operation.textContent = "0";
            } else if (isLastCharOperator() || operation.textContent.split(" ").at(-1).length === 1) {
                operation.textContent = operation.textContent.slice(0, -2);
            } else {
                operation.textContent = operation.textContent.slice(0, -1);
            }
            
            break;
        case "percent":
            if (isNegativeSign()) {
                break;
            }

            if (isLastCharOperator()) {
                operation.textContent = operation.textContent.slice(0, -2);
            }

            operation.textContent += "%";
            break;
        case "plus":
            if (isNegativeSign()) {
                break;
            }
            
            if (isLastCharOperator()) {
                operation.textContent = operation.textContent.slice(0, -2);
            } 

            operation.textContent += " +";
            break;
        case "minus":
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
            } 

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
        case "decimal":
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
            if (isOutputPreviousAnswer) {
                operation.textContent = "0";
            }
            if (isOutputEmpty()) {
                operation.textContent = e.target.id;
            } else if (isLastCharOperator() && !isNegativeSign()) {
                operation.textContent += " " + e.target.id;
            } else if (operation.textContent.slice(-1) === "%") { 
                operation.textContent += " × " + e.target.id;
            } else {
                operation.textContent += e.target.id;
            }

            break;
        case "equal":
            if (isLastCharOperator()) {
                break;
            }

            history.textContent = operation.textContent + " =";
            operation.textContent = parseoperation(operation.textContent);
            isOutputPreviousAnswer = true;
            return;
    }

    isOutputPreviousAnswer = false;    


    
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    let value = a / b;
    const rounded = Math.ceil(value * 100) / 100;
    return Number.isInteger(rounded) ? rounded : rounded.toFixed(2);
}

function multiply(a, b) {
    return a * b;
}

function percent(a) {
    return a / 100;
}

function operate(op, a, b) {
    switch(op) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '%':
            return percent(a, b);
        default:
            throw new Error('Unsupported operator: ' + op);
    }
}


function isLastCharOperator() {
    let stroperation = operation.textContent;
    if (ops.includes(stroperation.charAt(stroperation.length - 1))) {
        return true;
    } else {
        false;
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

    if (operation.textContent.slice(-1) === "-" && ops.includes(operation.textContent.slice(-3).split(" ")[0])) {
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