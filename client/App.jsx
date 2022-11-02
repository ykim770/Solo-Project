import React, { Component } from 'react';
import BackEndCheck from './components/BackEndCheck.jsx';
import MainGoal from './containers/MainGoal.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  // user input hook
  const [input, setInput] = useState('');
  // Somehow change this to rely upon DB -> have a useeffect hook that queries a database and populates the goalsArr
  const [goalsArr, setGoalsArr] = useState([]);
  // invalid submission hook
  const [valid, setValid] = useState(true);
  // have a useEffect on load that queries the entire database and populates the goalsArr -> runs only once because the empty array as a second argument
  useEffect(() => {
    // nest an asyc function in useEffect
    const goalLoad = async () => {
      try {
        await axios
          .get('http://localhost:3000/api/goal')
          .then((response) => response.data)
          .then((data) => {
            return data.map((obj) => {
              return (
                <MainGoal
                  text={obj.goalText}
                  index={obj._id.toString()}
                  handler={handleDelete}
                />
              );
            });
          })
          .then((arr) => {
            setGoalsArr(arr);
            console.log(goalsArr);
          });
      } catch (err) {
        console.log('Broke in initial load get request');
      }
    };
    // invoke our async function immediately
    goalLoad();
  }, []);
  // handle delete method to pass down as a prop
  const handleDelete = (index) => {
    // remove it from the DB
    console.log(index);
    (async function deleteGoal() {
      try {
        await axios.delete(`http://localhost:3000/api/goal/${index}`);
      } catch (err) {
        console.log('Broke at MainGoal delete');
      }
    })();
    const newGoals = goalsArr.filter((obj) => obj.id !== index);
    console.log(newGoals, goalsArr);
  };
  // this event handler will change state for each user input
  const handleInputChange = (event) => {
    event.persist();
    setInput(event.target.value);
  };
  // this event handler will trigger for each add goal button click
  const handleSubmit = (event) => {
    // don't refresh the page on submit
    event.preventDefault();
    // do a check on the input type
    !input ? setValid(false) : setValid(true);
    // once the submit button is pressed, a new entry is added to the database and its return value is stored in goalsArr
    (async function createGoal() {
      try {
        await axios
          .post('http://localhost:3000/api/goal', {
            goalText: input,
          })
          .then((response) => {
            setGoalsArr(
              goalsArr.concat(
                <MainGoal
                  text={response.data.goalText}
                  index={response.data._id.toString()}
                  handler={handleDelete}
                />
              )
            );
            // reset input state after button click
            setInput('');
          });
      } catch (err) {
        console.log('Check the createGoal function in App.jsx');
      }
    })();
  };
  return (
    <div>
      {/* This entire form should add more MainGoals */}
      <form onSubmit={handleSubmit}>
        <input
          id='new-goal'
          type='text'
          placeholder='Goal'
          name='goal'
          value={input}
          onChange={handleInputChange}
        ></input>
        <button className='add-goal' type='submit'>
          Add a Goal
        </button>
        <br></br>
        {!valid && <span id='goal=error'>Please enter a goal</span>}
      </form>
      {goalsArr}
      <BackEndCheck />
    </div>
  );
};
export default App;
