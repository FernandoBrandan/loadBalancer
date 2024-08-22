import express from "express";
import cluster from "cluster";
import os from "os";

const app = express();

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  app.get("/", (req, res) => {
    res.write("Respuesta desde app2 - SetTime2");
    setTimeout(() => {
      res.write(".5 Segundos despues");
      res.end();
    }, 500);
  });

  app.listen(3002, () => {
    console.log(`APP2 - Server on port 3002 - Worker ${process.pid} started - ${cluster.worker.id}`);
  });
}
