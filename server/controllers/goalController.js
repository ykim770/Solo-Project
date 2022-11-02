const { Goal } = require('../models/goalModels');
const goalController = {};

// createGoal middleware
goalController.createGoal = async (req, res, next) => {
  const { goalText } = req.body;
  // handle invalid errors immediately
  if (!goalText) return next({ log: 'Invalid request', status: 400 });
  try {
    const newGoal = await Goal.create({
      goalText,
    });
    return res.status(200).json(newGoal);
  } catch (err) {
    return next({
      log: 'Error in goalController.createGoal',
      status: 400,
      message: { err: err },
    });
  }
};

// getGoal middleware
goalController.getGoal = async (req, res, next) => {
  try {
    // we are going to find all documents in Goal
    const allGoals = await Goal.find({});
    return res.status(200).json(allGoals);
  } catch (err) {
    return next({
      log: 'Error in goalController.getGoal',
      status: 400,
      message: { err: err },
    });
  }
};

// deleteGoal middleware
goalController.deleteGoal = async (req, res, next) => {
  try {
    const deletedGoal = await Goal.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json(deletedGoal);
  } catch (err) {
    return next({
      log: 'Error in goalController.deleteGoal',
      status: 400,
      message: { err: err },
    });
  }
};

// editGoal middleware
goalController.editGoal = async (req, res, next) => {
  const { goalText } = req.body;
  if (!goalText) return next({ log: 'Invalid Request', status: 400 });
  try {
    const editedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id },
      { goalText },
      { new: true }
    );
    return res.status(200).json(editedGoal);
  } catch (err) {
    return next({
      log: 'Error in goalController.editGoal',
      status: 400,
      message: { err: err },
    });
  }
};
module.exports = goalController;
