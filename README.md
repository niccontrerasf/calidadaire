# calidadaire

Web que obtiene datos de calidad de aire de una determinada ciudad, representando los datos en el mapa y en un cuadro resumen.

*Se adjunta JSDOC en carpeta ./out

## Ejecucion

Desarrollado en node version 4.2.6

Dependencias express y body-parser incluidas en package.json

Descargar y descomprimir proyecto he instalar dependencias
```sh
npm install
```
La app corre en el puerto 80
```sh
node app.js
```
[localhost:80](http://localhost:80/)

La api tiene el siguiente formato /api/:city para obtener un objeto JSON con la info aqi de la ciudad consultada.
Ejemplo: "Santiago"

[localhost:80/api/santiago](http://localhost:80/api/santiago)

```sh
curl -I http://localhost:80/api/santiago
```
## Test mocha

Instalar dev-dependencies en package.json. El test valida si los request a la api responde a la entrada de un parámetro. 

```
npm test
```

![alt text](https://raw.githubusercontent.com/niccontrerasf/calidadaire/master/Captura.PNG)
