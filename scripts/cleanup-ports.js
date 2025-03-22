#!/usr/bin/env node

const { execSync } = require("child_process");
const os = require("os");

const FRONTEND_PORT = 3000;
const BACKEND_PORT = 5001;

console.log("🔍 Checking for processes using ports 3000 and 5001...");

function killProcessOnPort(port) {
  try {
    let command;
    if (os.platform() === "win32") {
      // For Windows
      // Find the process ID using the port
      const pidCommand = `netstat -ano | findstr :${port}`;
      const pidOutput = execSync(pidCommand, { encoding: "utf8" });

      if (pidOutput) {
        const pidMatch = pidOutput.match(/(\d+)$/m);
        if (pidMatch && pidMatch[1]) {
          const pid = pidMatch[1].trim();
          // Kill the process with the found PID
          execSync(`taskkill /F /PID ${pid}`);
          console.log(`✅ Killed process using port ${port} (PID: ${pid})`);
        }
      }
    } else {
      // For macOS/Linux
      command = `lsof -i :${port} -t | xargs kill -9`;
      execSync(command, { stdio: "ignore" });
      console.log(`✅ Killed process using port ${port}`);
    }
  } catch (error) {
    // If no process was found, the command will error out, which is fine
    console.log(`ℹ️ No process found using port ${port}`);
  }
}

// Kill processes on frontend and backend ports
killProcessOnPort(FRONTEND_PORT);
killProcessOnPort(BACKEND_PORT);

console.log("🚀 Ports are now available for use!");
