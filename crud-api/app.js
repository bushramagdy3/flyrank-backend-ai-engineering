const express = require("express");
const app = express();
const port = 3000;

let tasks = [ {id: 0,
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

app.put('/tasks/:id', (req, res) => {
    let target = null;
    const id = Number(req.params.id);
    tasks.forEach((task) => {
        if(task.id == id)
            target = task;
    });

    if(target == null)
        return res.status(404).send({error: `Task ${id} not found`});

    if(Object.keys(req.body).includes("title")){
        if(req.body.title == "")
            return res.status(400).send({error: "Empty title"});
        else
            target.title = req.body.title;
    }

    if(Object.keys(req.body).includes("done")){
        if(req.body.done != true && req.body.done != false)
            return res.status(400).send({error: "Invalid done"});
        else
            target.done = req.body.done;
    }

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