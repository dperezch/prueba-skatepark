import express from "express";
import { create } from "express-handlebars";
import fileUpload from "express-fileupload";

/* Rutas */
import { router as home } from "./routes/index.js";
import { router as registro } from "./routes/registro.js";
import { router as login } from "./routes/login.js";
import { router as datos } from "./routes/datos.js";

const app = express();
const hbs = create();

/* Handlebars */
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

/* Middlewares */
app.use(express.json());
app.use(fileUpload());
app.use("/photos", express.static("./photos"));

/* Rutas */
app.use("/", home);
app.use("/registro", registro);
app.use("/login", login);
app.use("/datos", datos);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
