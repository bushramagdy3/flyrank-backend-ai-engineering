const express = require("express");
const app = express();
const port = 3000;
const openAPIDoc = require('./openapi.json');
const swaggerUI = require("swagger-ui-express");
const Database = require("better-sqlite3");

const db = new Database("./tasks.db");

const initialize = db.prepare(`
        CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0,1))
        );
    `);

initialize.run();

const isEmptyCheck = db.prepare(`
        SELECT * FROM tasks;
    `);
const results = isEmptyCheck.all();

if(results.length == 0){
    const insertItems = db.prepare(`
            INSERT INTO tasks (title, done) VALUES ('1st Task', 0), ('2nd Task' , 1), ('3rd Task', 0);
        `);
    insertItems.run();
}

app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(openAPIDoc));

app.get('/', (req, res) => {
    res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get('/health', (req, res) => {
    res.json({status: "ok"});
});

app.get('/tasks', (req, res) => {
    const query = db.prepare(`SELECT * FROM tasks`);
    tasks = query.all();
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    id = Number(req.params.id);
    query = db.prepare(`SELECT * FROM tasks WHERE id = ?`)
    task = query.get(id);

    if(!task)
        return res.status(404).json({error: `Task ${id} not found`});

    return res.json(task);
});

app.post('/tasks', (req, res) => {
    if(!req.body || typeof req.body.title !== "string" || req.body.title === ""){
        return res.status(400).json({error: "Missing title"});
    }

    const query = db.prepare(`INSERT INTO tasks (title) VALUES (?);`);
    runRes = query.run(req.body.title);

    newTask = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(runRes.lastInsertRowid);

    res.status(201).send(newTask);
});

app.put('/tasks/:id', (req, res) => {
    if(!req.body || typeof req.body !== "object" || Array.isArray(req.body))
        return res.status(400).send({error: "Invalid task body"});

    const hasTitle = Object.hasOwn(req.body, "title");
    const hasDone = Object.hasOwn(req.body, "done");

    if(!hasTitle && !hasDone)
        return res.status(400).send({error: "Missing title or done"});

    if(hasTitle && (typeof req.body.title !== "string" || req.body.title === ""))
        return res.status(400).send({error: "Invalid title"});

    if(hasDone && typeof req.body.done !== "boolean")
        return res.status(400).send({error: "Invalid done"});

    let target = null;
    const id = Number(req.params.id);
    tasks.forEach((task) => {
        if(task.id == id)
            target = task;
    });

    if(target == null)
        return res.status(404).send({error: `Task ${id} not found`});

    if(hasTitle)
        target.title = req.body.title;

    if(hasDone)
        target.done = req.body.done;

    return res.json(target);
});

app.delete('/tasks/:id', (req, res) => {
    let target = null;
    const newTasks = [];
    const id = Number(req.params.id);
    tasks.forEach((task) => {
        if(task.id == id)
            target = task;
    });

    if(target == null)
        return res.status(404).send({error: `Task ${id} not found`});
    else
        tasks.forEach((task) => {
            if(task.id != id)
                newTasks.push(task);
        });
    
    tasks = newTasks;

    return res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
