import app from "./app.js";
import "dotenv/config";
import { ConnectDB } from "./db.js";

const PORT = process.env.PORT;

const conected = () => {
  try {
    app.listen(PORT);
    ConnectDB();
    console.log(`Escucha en el puerto ${PORT}`);
  } catch (error) {
    console.log("Fallo al conectarse al servidor");
    console.log(error);
  }
};
conected();
