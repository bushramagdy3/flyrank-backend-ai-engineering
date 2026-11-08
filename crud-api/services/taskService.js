const {getAllTasks, 
       getTaskById, 
       insertTask, 
       updateTaskTitle, 
       updateTaskDone, 
       removeTask} = require("../repositories/taskRepository.js");

const getTasks = (req, res) => {
    tasks = getAllTasks();
    res.json(tasks);
};

const getTask = (req, res) => {
    id = Number(req.params.id);
    task = getTaskById(id);

    if(!task)
        return res.status(404).json({error: `Task ${id} not found`});

    return res.json(task);
};

const createTask = (req, res) => {
    if(!req.body || typeof req.body.title !== "string" || req.body.title === ""){
        return res.status(400).json({error: "Missing title"});
    }

    runRes = insertTask(req.body.title);

    newTask = getTaskById(runRes.lastInsertRowid);

    res.status(201).send(newTask);
};

const updateTask = (req, res) => {
    if(!req.body || typeof req.body !== "object" || Array.isArray(req.body))
        return res.status(400).send({error: "Invalid task body"});

    const id = Number(req.params.id);
    const hasTitle = Object.hasOwn(req.body, "title");
    const hasDone = Object.hasOwn(req.body, "done");

    if(!hasTitle && !hasDone)
        return res.status(400).send({error: "Missing title or done"});

    if(hasTitle && (typeof req.body.title !== "string" || req.body.title === ""))
        return res.status(400).send({error: "Invalid title"});

    if(hasDone && typeof req.body.done !== "boolean")
        return res.status(400).send({error: "Invalid done"});

    let target = getTaskById(id);

    if(target == null)
        return res.status(404).send({error: `Task ${id} not found`});

    if(hasTitle)
        updateTaskTitle(req.body.title, id);

    if(hasDone)
        updateTaskDone(req.body.done ? 1 : 0, id);

    return res.json(getTaskById(id));
};

const deleteTask = (req, res) => {
    const id = Number(req.params.id);
    const target = getTaskById(id);

    if(target == null)
        return res.status(404).send({error: `Task ${id} not found`});
    
    removeTask(id);

    return res.sendStatus(204);
};

module.exports = {getTasks, getTask, createTask, updateTask, deleteTask};
