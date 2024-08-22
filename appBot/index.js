import express from "express";
import axios from "axios";

const app = express();

let countApp1 = 0;
let countApp2 = 0;

const servers = [
  "http://localhost:3001",
  "http://localhost:3002",
];

async function testLoadBalancer() {
  for (let i = 0; i < 10; i++) {
    // Seleccionar un servidor al azar
    const server = servers[Math.floor(Math.random() * servers.length)];

    try {
      const response = await axios.get(server + "/");
      if (response.data.includes("Respuesta desde app1")) countApp1++;
      if (response.data.includes("Respuesta desde app2")) countApp2++;
    } catch (error) {
      console.error(`Error en solicitud a ${server}: ${error.message}`);
    }
  }
  console.log(`App1 recibió ${countApp1} solicitudes`);
  console.log(`App2 recibió ${countApp2} solicitudes`);
}

testLoadBalancer();

app.listen(3003, () => {
  console.log("AppBot running on port 3003");
});
