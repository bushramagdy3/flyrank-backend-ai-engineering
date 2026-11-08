const {db} = require("../db/database.js");

const getAllTasks = () => {
    const query = db.prepare(`SELECT * FROM tasks`);
    return query.all();
};

const getTaskById = (id) => {
    const query = db.prepare(`SELECT * FROM tasks WHERE id = ?`);
    return query.get(id);
};

const insertTask = (title) => {
    const query = db.prepare(`INSERT INTO tasks (title) VALUES (?);`);
    return query.run(title);
};

const updateTaskTitle = (title, id) => {
    return db.prepare(`UPDATE tasks SET title = ? WHERE id = ?;`).run(title, id);
};

const updateTaskDone = (done, id) => {
    return db.prepare(`UPDATE tasks SET done = ? WHERE id = ?;`).run(done, id);
};

const removeTask = (id) => {
    return db.prepare(`DELETE FROM tasks WHERE id = ?`).run(id);
};

module.exports = {getAllTasks, getTaskById, insertTask, updateTaskTitle, updateTaskDone, removeTask};
