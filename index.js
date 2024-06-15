import express from 'express';
import { create } from 'express-handlebars';

/* Rutas */
import { router as home } from './routes/index.js'

const app = express();
const hbs = create()

/* Handlebars */
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

/* Middlewares */
app.use(express.json())

/* Rutas */
app.use('/', home)

app.listen(3000, () => {
    console.log("App listening on port 3000");
});