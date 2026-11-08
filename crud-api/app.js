const express = require("express");
const app = express();
const port = 3000;
const openAPIDoc = require('./openapi.json');
const swaggerUI = require("swagger-ui-express");
const db = require("./db/database.js");
const taskRoutes = require('./routes/taskRoutes.js')

db.startDatabase();

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openAPIDoc));
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get('/health', (req, res) => {
    res.json({status: "ok"});
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

//Tries Querying in SQL
