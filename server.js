const express = require('express');
const { exec } = require('child_process');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Socket.IO event handler
io.on('connection', (socket) => {
  console.log('A client connected.');

  // Event listener for 'runCommand' event
  socket.on('runCommand', (command) => {
    console.log('Received command:', command);

    // Run the command in the background
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        socket.emit('commandOutput', `Error executing command: ${error.message}`);
      } else {
        console.log('Command output:', stdout);
        socket.emit('commandOutput', stdout);
      }
    });
  });

  // Event listener for 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
