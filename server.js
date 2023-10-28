const express = require('express');
const { exec } = require('child_process');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Route handler for the 'runCommand' endpoint
app.get('/runCommand', (req, res) => {
  const command = req.query.command; // Assuming the command is sent in the request body

  console.log('Received command:', command);

  // Run the command in the background
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      res.status(500).json({ error: `Error executing command: ${error.message}` });
    } else {
      console.log('Command output:', stdout);
      res.json({ output: stdout });
    }
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
