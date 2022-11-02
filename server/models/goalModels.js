const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://user:pw123@cluster0.1ysd3uh.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'GoalDatabase',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const goalSchema = new Schema({
  goalText: String,
  taskID: {
    type: Schema.Types.ObjectID,
    ref: 'task',
  },
});
// Create a schema for the 'Goals' collection
const Goal = mongoose.model('goal', goalSchema);

// the goalIndex will correspond to the main goal that this task
const taskSchema = new Schema({
  taskText: String,
  // acts as a foreign key
  goalID: {
    type: Schema.Types.ObjectID,
    ref: 'goal',
  },
  taskText: String,
});

// Have progress schema that refers to a specific task

const Task = mongoose.model('task', taskSchema);

module.exports = {
  Goal,
  Task,
};
