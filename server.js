const app = require("./app");
const corsAnywhere = require('cors-anywhere');
const port = process.env.PORT || 3000;
const corsPort = 8080

const server = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
});

server.listen(corsPort, () => {
    console.log(`CORS Anywhere server running on port ${corsPort}`);
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
