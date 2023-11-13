 // Retrieve the name from localStorage. If not found, set a default value.
 let name = localStorage.getItem('username') || "user";
 terminal.loadAddon(fitAddon);
         terminal.open(document.getElementsByClassName('terminal'));
         fitAddon.fit();
 
         terminal.prompt = () => {
             terminal.write('\r\n');
             terminal.write(`\x1b[32m${name}\x1b[0m$ `);
         };
 
 function changeName(newName) {
     // Update the name variable
     name = newName;
     // Store the updated name in localStorage
     localStorage.setItem('username', newName);
 }
 
 function handleInput(event) {
     if (event.key === "Enter") {
         const commandInput = document.getElementById("commandInput");
         const command = commandInput.value;
         const outputDiv = document.querySelector('.output');
 
         // Simulate command execution
         const output = executeCommand(command);
 
         // Display command and output in the terminal
         outputDiv.innerHTML += `<div class="prompt">$ ${command}</div>`;
         outputDiv.innerHTML += `<div class="output">${output}</div>`;
 
         // Clear the input field
         commandInput.value = "";
     }
 }
 
 function executeCommand(command) {
     // Simulate command execution (add more commands through GitHub Pull Requests.)
     if (command.toLowerCase() === "hello") {
         return `Hello, ${name}!`;
     } else if (command.toLowerCase().startsWith("changename ")) {
         const newName = command.substring("changename ".length);
         changeName(newName);
         return `Name changed to ${name}`;
     } else if (command.toLowerCase() === "clearcache") {
         localStorage.clear();
         window.location.reload(true);
     }
      else {
         return `Command not found: ${command}`;
     }
 }
 