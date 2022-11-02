const express = require('express');

const goalController = require('../controllers/goalController');
const taskController = require('../controllers/taskController');

const router = express.Router();

// handle post request to /api/goal endpoint
// add a new main goal to the database
router.post('/goal', goalController.createGoal);

// handle get request to /api/goal endpoint
// runs once to fetch all data stored in the database for inital load
router.get('/goal', goalController.getGoal);

// handle delete request to /api/goal endpoint
// runs once to delete the specified id
router.delete('/goal/:id', goalController.deleteGoal);

router.put('/goal/:id', goalController.editGoal);
module.exports = router;
