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
    res.write("Respuesta desde app1 - SetTime1");
    setTimeout(() => {
      res.write("1 Segundos despues");
      res.end();
    }, 1000);
  });

  app.listen(3001, () => {
    console.log(`APP1 - Server on port 3001 - Worker ${process.pid} started - ${cluster.worker.id}`);
  });
}
