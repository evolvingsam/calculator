# Copilot Instructions for AI Coding Agents

## Project Overview
This is a simple web-based calculator. The main logic resides in `script.js`, which handles user input, UI updates, and arithmetic operations. The UI is expected to be defined in HTML with elements having IDs like `#operation`, `#history`, and `#input`.

## Architecture & Data Flow
- **Single-File Logic:** All calculator logic is in `script.js`. There are no modules or external JS dependencies.
- **Event-Driven:** Button clicks are handled via a single event listener on the `#input` container. Actions are determined by `e.target.id`.
- **State Management:** The calculator state is managed using DOM elements (`operation`, `history`) and a few global variables (e.g., `isOutputPreviousAnswer`).
- **Operation Parsing:** Arithmetic operations are constructed as strings and parsed for evaluation. Custom logic is used for operator precedence and formatting.

## Key Patterns & Conventions
- **Operator Handling:** Operators are appended with spaces (e.g., `operation.textContent += " +"`). Special handling for negative signs and percent is implemented via helper functions.
- **Custom Functions:** Helper functions like `isLastCharOperator`, `isNegativeSign`, and `isDecimalInUse` encapsulate UI state checks. Arithmetic functions (`add`, `subtract`, etc.) are defined at the bottom of `script.js`.
- **UI State:** The calculator resets or updates the display based on user actions. Edge cases (e.g., consecutive operators, percent after number) are handled explicitly.
- **No Frameworks:** The project uses vanilla JavaScript and direct DOM manipulation. No build tools or package managers are present.

## Developer Workflows
- **Debugging:** Use browser DevTools for debugging. All logic is in `script.js`.
- **Testing:** No automated tests are present. Manual testing via the browser is required.
- **Build:** No build step; open the HTML file in a browser to run.

## Integration Points
- **HTML Structure:** Ensure the HTML file contains elements with IDs matching those used in `script.js` (`operation`, `history`, `input`).
- **No External Dependencies:** The project does not rely on npm, yarn, or other package managers.

## Examples
- **Button Handling:**
  ```js
  buttons.addEventListener("click", (e) => {
    switch(e.target.id) {
      case "plus":
        // ...existing code...
        operation.textContent += " +";
        break;
      // ...other cases...
    }
  });
  ```
- **Operator Check:**
  ```js
  function isLastCharOperator() {
    let stroperation = operation.textContent;
    if (ops.includes(stroperation.charAt(stroperation.length - 1))) {
      return true;
    } else {
      false;
    }
  }
  ```

## File References
- Main logic: `script.js`
- UI elements: referenced by ID in HTML

---
If any section is unclear or missing, please provide feedback so this guide can be improved for future AI agents.
