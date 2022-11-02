import axios from 'axios';
import React from 'react';
import SubGoal from './Task.jsx';
// add a delete and add subgoal buttons
// -> use axios to make them talk with the DB
const MainGoal = ({ text, index, handler }) => {
  return (
    <div className='main-goal' id={index}>
      <div className='main-goal-wrapper'>
        <h2>{text}</h2>
        <button
          className='delete-button'
          id={index}
          onClick={() => {
            handler(index);
          }}
        >
          X
        </button>
      </div>
      <SubGoal />
    </div>
  );
};

export default MainGoal;
