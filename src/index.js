import app from "./app.js";
import { ConnectDB } from "./db.js";

ConnectDB();
app.listen(3000);
console.log("Escucha en el puerto 3000");
