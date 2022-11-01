import React, { Component } from 'react';
import BackEndCheck from './components/BackEndCheck.jsx';
import MainGoal from './containers/MainGoal.jsx';
import { useEffect, useState } from 'react';

const App = () => {
  const [goal, setGoal] = useState('');
  // this event handler will change state for each user input
  const handleInputChange = (event) => {
    event.persist();
    setGoal(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // once the submit button is pressed, a new MainGoal should appear
    // Additionally, a new entry should be added to the database
    console.log(goal);
  };
  return (
    <div>
      <MainGoal />
      <form onSubmit={handleSubmit}>
        <input
          id='new-goal'
          type='text'
          placeholder='Goal'
          name='goal'
          value={goal}
          onChange={handleInputChange}
        ></input>
        <button className='addGoal' type='submit'>
          Add a Goal
        </button>
      </form>
      <BackEndCheck />
    </div>
  );
};
export default App;
