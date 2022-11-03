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
  tasks: [{ taskText: String }],
});
// Create a schema for the 'Goals' collection
const Goal = mongoose.model('goal', goalSchema);

module.exports = {
  Goal,
};
