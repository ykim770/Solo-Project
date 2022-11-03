const { Goal } = require('../models/goalModels');
const taskController = {};

//create task middleware
taskController.createTask = async (req, res, next) => {
  const { taskText } = req.body;
  // handle invalid errors immediately
  if (!taskText) return next({ log: 'Invalid request', status: 400 });
  console.log('This is my taskText:', taskText);
  try {
    const correctGoal = await Goal.findById({ _id: req.params.id });
    correctGoal.tasks.push({ taskText: taskText });
    const returnedTasks = Array.from(correctGoal.tasks);
    correctGoal.save();
    // return the latest task from the tasks array
    return res.status(200).json(returnedTasks[returnedTasks.length - 1]);
  } catch (err) {
    return next({
      log: 'Error in taskController.createTask',
      status: 400,
      message: { err: err },
    });
  }
};

taskController.getTask = async (req, res, next) => {
  try {
    const returnedGoal = await Goal.findById({ _id: req.params.id });
    const taskArray = Array.from(returnedGoal.tasks);
    return res.status(200).json(taskArray);
  } catch (err) {
    return next({
      log: 'Error in taskController.getTask',
      status: 400,
      message: { err: err },
    });
  }
};
module.exports = taskController;
