const express = require("express");
const app = express();
const port = 3000;

const tasks = [ {id: 0,
                title: "Finish Task 1",
                done: false},
                {id: 1,
                title: "Finish Task 2",
                done: false},
                {id: 2,
                title: "Finish Task 3",
                done: false} ];

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get('/health', (req, res) => {
    res.json({status: "ok"});
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    id = Number(req.params.id);
    let found = false;
    tasks.forEach((task) => {
        if(task.id == id){
            res.json(task);
            found = true;
        }
    });
    if(!found)
        res.status(404).json({error: `Task ${id} not found`});
});

app.post('/tasks', (req, res) => {
    if(!Object.keys(req.body).includes("title") || req.body.title == "")
        res.status(400).json({error: "Missing title"});
    newTask = {id: tasks.length};
    newTask.title = req.body.title;
    newTask.done = false;
    tasks.push(newTask);
    res.status(201).send(newTask);
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});