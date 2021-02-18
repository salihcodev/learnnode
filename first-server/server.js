const http = require('http');

// host name:
const hostName = 9000;

// created server:
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>First server</title></head>');
  res.write('<body>');
  res.write('<h1>Hello buddy, Now you are hosted by my server!!</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

// listening...
server.listen(hostName);
