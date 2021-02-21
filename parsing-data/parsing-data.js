const http = require('http');
const fs = require('fs');

// host name:
const hostName = 9000;

// created server:
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Routing | Home</title></head>');
    res.write('<body>');
    res.write(
      '<form action="/messages" method="POST"><input type="text" name="message"placeholder="Type you message here."/> <input type="submit" value="send Message"/> </form>'
    );
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/messages' && method === 'POST') {
    const pureBody = [];
    req.on('data', (pieces) => {
      pureBody.push(pieces);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(pureBody).toString();
      // extract given message.
      const message = parsedBody.split('=')[1].split('+').join(' ');

      // write a file system file, with user message.
      fs.writeFileSync('user-message.txt', message, (err) => {
        console.log(err);
      });
      // redirect to home.
      res.writeHead(302, { Location: '/' });
      return res.end();
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Routing | Home</title></head>');
  res.write('<body>');
  res.write('<h1>Sorry, An error has accrued. Sadness...</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

// listening...
server.listen(hostName);
