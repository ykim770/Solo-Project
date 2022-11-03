import axios from 'axios';
import React, { useState } from 'react';
import Task from './Task.jsx';
// add a delete and add subgoal buttons
// -> use axios to make them talk with the DB
const MainGoal = ({ text, index, handler }) => {
  const [goalText, setText] = useState(text);
  const [taskArr, setTaskArr] = useState([]);
  const [editText, setEditText] = useState('');
  const [taskText, setTaskText] = useState('');
  const [editClick, setEditClick] = useState(false);
  const [taskClick, setTaskClick] = useState(false);
  // do a get request and populate taskArr whenever the button is clicked
  const handleTask = async (index) => {
    setTaskClick(!taskClick);
    try {
      await axios
        .get(`http://localhost:3000/api/task/${index}`)
        .then((response) => response.data)
        .then((data) => {
          return data.map((obj) => {
            return (
              <Task
                key={obj._id.toString()}
                taskText={obj.taskText}
                index={obj._id.toString()}
              />
            );
          });
        })
        .then((arr) => {
          setTaskArr(arr);
        });
    } catch (err) {
      console.log('Broke in fetching tasks');
    }
  };
  const handleTaskSubmit = (index) => {
    event.preventDefault();
    if (!taskText) {
      setTaskClick(!taskClick);
      return;
    }
    (async function createTask() {
      try {
        await axios
          .post(`http://localhost:3000/api/task/${index}`, {
            taskText: taskText,
          })
          .then((response) => {
            setTaskArr(
              taskArr.concat(
                <Task
                  key={response.data._id.toString()}
                  taskText={response.data.taskText}
                  index={response.data._id.toString()}
                />
              )
            );
          });
        setTaskText('');
        // setTaskClick(!taskClick);
        console.log(taskArr);
      } catch (err) {
        console.log('Check createTask function in MainGoal.jsx');
      }
    })();
  };
  const handleTaskInput = (e) => {
    e.persist();
    setTaskText(e.target.value);
  };
  const handleEdit = () => {
    // pull out all the inputs
    setEditClick(!editClick);
  };
  const handleInputChange = (e) => {
    e.persist();
    setEditText(e.target.value);
  };
  // For Edits!!
  const handleSubmit = (index) => {
    event.preventDefault();
    if (!editText) {
      setEditClick(!editClick);
      return;
    }
    (async function editGoal() {
      await axios
        .put(`http://localhost:3000/api/goal/${index}`, {
          goalText: editText,
        })
        .then((data) => console.log(data));
    })();
    setText(editText);
    setEditClick(!editClick);
  };
  return (
    <div className='main-goal' id={index}>
      <div className='main-goal-wrapper'>
        {editClick ? (
          <form
            className='edit-form'
            onSubmit={() => {
              handleSubmit(index);
            }}
          >
            <input
              className='edit-goal'
              placeholder={goalText}
              onChange={handleInputChange}
            ></input>
            <button className='save-button' type='submit'>
              &#10004;
            </button>
          </form>
        ) : (
          <p className='goal-text'>{goalText}</p>
        )}
        {editClick ? (
          <button
            className='delete-button'
            id={index}
            onClick={() => {
              handler(index);
            }}
          >
            X
          </button>
        ) : null}
        <div className='close-buttons'>
          <button
            className='task-button'
            id={index}
            onClick={() => handleTask(index)}
          >
            Tasks
          </button>
          <button className='edit-button' id={index} onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
      {taskClick ? (
        <div className='task-container'>
          <form onSubmit={() => handleTaskSubmit(index)}>
            <input
              placeholder='Enter a Task'
              className='task-submit'
              onChange={handleTaskInput}
            ></input>
            <button className='save-button' type='submit'>
              +
            </button>
          </form>
          {taskArr}
        </div>
      ) : null}
    </div>
  );
};

export default MainGoal;
