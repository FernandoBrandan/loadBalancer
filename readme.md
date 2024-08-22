# Load Balancer with Node.js

Este proyecto implementa un balanceador de carga simple utilizando Node.js. El balanceador distribuye las solicitudes entrantes entre dos servidores de aplicación para equilibrar la carga y mejorar la disponibilidad.

## Estructura del Proyecto

- `app1/`: Contiene la implementación del primer servidor de aplicación.
- `app2/`: Contiene la implementación del segundo servidor de aplicación.
- `loadBalancer/`: Contiene el balanceador de carga que distribuye las solicitudes entre `app1` y `app2`.
- `test/`: Contiene el script para probar el balanceador de carga.

## Requisitos

- Node.js (versión recomendada: 18.x o superior)
- npm (Node Package Manager)

## Instalación

1. **Clona el Repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
