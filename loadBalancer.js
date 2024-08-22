import express from "express";
import http from "http";

const app = express();
const servers = [
  { host: "127.0.0.1", port: 3001 },
  { host: "127.0.0.1", port: 3002 },
];

let current = 0;

app.use((req, res) => {
  const target = servers[current];
  current = (current + 1) % servers.length;

  const proxyRequest = http.request(
    {
      host: target.host,
      port: target.port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  );

  req.pipe(proxyRequest, { end: true });

  proxyRequest.on("error", (err) => {
    res.status(500).send("Error occurred while proxying request");
  });
});

app.listen(3000, () => {
  console.log("Load balancer running on port 3000");
});
