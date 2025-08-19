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
