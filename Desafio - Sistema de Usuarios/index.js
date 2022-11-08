const http = require("http");
const url = require("url");
const { usuario, login, usuarios } = require("./consultas");
const fs = require("fs");

http.createServer(async (req, res) => {
if (req.url == "/" && req.method === "GET") {
res.setHeader("content-type", "text/html");
const html = fs.readFileSync("index.html", "utf8");
res.end(html);
}

if (req.url.startsWith("/usuario") && req.method == "POST") {
let body = "";
req.on("data", (chunk) => {
body += chunk;
});
req.on("end", async () => {
const datos = Object.values(JSON.parse(body));
const respuesta = await usuario(datos);
res.end(JSON.stringify(respuesta));
});
}

if (req.url.startsWith("/usuarios") && req.method === "GET") {
    const data = await usuarios();
    res.end(JSON.stringify(data));
    }

if (req.url.startsWith("/login") && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
    body += chunk;
    });
    req.on("end", async () => {
    const datos = Object.values(JSON.parse(body));
    const respuesta = await login(datos);
    res.end(JSON.stringify(respuesta));
    });
    }
})
    .listen(3000, () => console.info('Servidor disponible en http://localhost:3000'));