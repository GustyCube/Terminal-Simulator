// Get the current date and time on page load
document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.querySelector('.output');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    // Display the initial date and time in the terminal
    outputDiv.innerHTML += `<div class="output">$ Terminal @${formattedDate}</div>`;
});
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

function redirect(redirectLink) {
    // Check if the link starts with "http://" or "https://"
    if (!redirectLink.startsWith("http://") && !redirectLink.startsWith("https://")) {
        // If not, prepend "https://"
        redirectLink = "https://" + redirectLink;
    }
    // Set the window location
    window.location.href = redirectLink;
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
    else if (command.toLowerCase().startsWith("changename")) {
        const newName = command.substring("changename".length).trim();

        if (newName === "") {
            return "'Name' not defined.";
        }

        changeName(newName);
        return `Name changed to ${name}`;
    }
    else if (command.toLowerCase() === ("github")) {
        window.location.href = "https://www.github.com/GustyCube/terminal-simulator";
        return "Redirecting to official GitHub"
    }
    else if (command.toLowerCase().startsWith("redirect")) {
        const redirectLink = command.substring("redirect".length).trim();
        if (redirectLink === "") {
            return "'Link' is not defined.";
        }
    
        console.log("Redirecting to:", redirectLink);
        redirect(redirectLink);
    }
    
    
    else {
        return `Command not found: ${command}`;
    }
}
