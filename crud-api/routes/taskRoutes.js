const express = require("express");
const {getTasks, getTask, createTask, updateTask, deleteTask} = require("../services/taskService.js");

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
