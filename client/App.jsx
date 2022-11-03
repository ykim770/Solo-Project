import React, { Component } from 'react';
import BackEndCheck from './components/BackEndCheck.jsx';
import MainGoal from './containers/MainGoal.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [press, setPress] = useState(false);
  // user input hook
  const [input, setInput] = useState('');
  // Somehow change this to rely upon DB -> have a useeffect hook that queries a database and populates the goalsArr
  const [goalsArr, setGoalsArr] = useState([]);
  // invalid submission hook
  const [valid, setValid] = useState(true);

  const [ranOnce, setRanOnce] = useState(false);
  // have a useEffect on load that queries the entire database and populates the goalsArr -> runs only once because the empty array as a second argument
  const goalLoad = async () => {
    try {
      await axios
        .get('http://localhost:3000/api/goal')
        .then((response) => response.data)
        .then((data) => {
          return data.map((obj) => {
            return (
              <MainGoal
                key={obj._id.toString()}
                text={obj.goalText}
                index={obj._id.toString()}
                handler={handleDelete}
              />
            );
          });
        })
        .then((arr) => {
          setGoalsArr(arr);
        });
    } catch (err) {
      console.log('Broke in initial load get request');
    }
  };
  useEffect(() => {
    // only run our goalLoad once,ONLY for page reload and deletes
    // fires when ran once is false
    if (!ranOnce) {
      goalLoad();
      setRanOnce(true);
    }
  }, [goalsArr]);
  const handleDelete = async (index) => {
    // we want to set ran once here to false so that our useEffect will fire
    setRanOnce(false);
    try {
      await axios
        .delete(`http://localhost:3000/api/goal/${index}`)
        .then((data) => {
          const filteredGoals = goalsArr.filter((obj) => obj.id !== index);
          setGoalsArr(filteredGoals);
          // setGoalsArr((goals) => {
          //   console.log('this is pre', goals);
          //   const filteredGoals = goals.filter((obj) => obj.id !== index);
          //   console.log('this is post', filteredGoals);
          //   return filteredGoals;
          // });
        });
      // setGoalsArr some filter
    } catch (err) {
      console.log('Broke at MainGoal delete');
    }
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
    if (!input) return setValid(false);
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
                  key={response.data._id.toString()}
                  text={response.data.goalText}
                  index={response.data._id.toString()}
                  handler={handleDelete}
                />
              )
            );
            // reset input state after button click
            setInput('');
            setValid(true);
          });
      } catch (err) {
        console.log('Check the createGoal function in App.jsx');
      }
    })();
  };
  return (
    <div className='app-container'>
      {/* This entire form should add more MainGoals */}{' '}
      <form className='form' onSubmit={handleSubmit}>
        <input
          id='new-goal'
          type='text'
          placeholder='Enter a Goal'
          name='goal'
          value={input}
          onChange={handleInputChange}
        ></input>
        <button className='add-goal' type='submit'>
          +
        </button>
        <br></br>
        {!valid && <span id='goal-error'>Please enter a goal</span>}
      </form>
      <div className='all-goal-container'>{goalsArr}</div>
      {/* <p>{press.toString()}</p>
      <BackEndCheck /> */}
    </div>
  );
};
export default App;
