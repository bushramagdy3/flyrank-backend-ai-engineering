const Database = require("better-sqlite3");

const db = new Database("./tasks.db");

function startDatabase(){
    db.prepare(`
        CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0,1))
        );
    `).run();

    const isEmptyCheck = db.prepare(`
        SELECT * FROM tasks;
    `).all();

    if(isEmptyCheck.length == 0){
        db.prepare(`
            INSERT INTO tasks (title, done) VALUES ('1st Task', 0), ('2nd Task' , 1), ('3rd Task', 0);
        `).run();
    }
}

module.exports = {db, startDatabase};
