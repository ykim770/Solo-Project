import axios from 'axios';
import React, { useState } from 'react';
import Task from './Task.jsx';
// add a delete and add subgoal buttons
// -> use axios to make them talk with the DB
const MainGoal = ({ text, index, handler }) => {
  const [goalText, setText] = useState(text);
  const [editText, setEditText] = useState('');
  const [editClick, setEditClick] = useState(false);
  const handleEdit = () => {
    setEditClick(!editClick);
  };
  const handleInputChange = (e) => {
    e.persist();
    setEditText(e.target.value);
  };
  const handleSubmit = (index) => {
    event.preventDefault();
    if (!editText) {
      setEditClick(!editClick);
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
            onSubmit={() => {
              handleSubmit(index);
            }}
          >
            <input placeholder={goalText} onChange={handleInputChange}></input>
            <button type='submit'>&#10004;</button>
          </form>
        ) : (
          <p className='goal-text'>{goalText}</p>
        )}
        <button
          className='delete-button'
          id={index}
          onClick={() => {
            handler(index);
          }}
        >
          X
        </button>
        <button className='edit-button' id={index} onClick={handleEdit}>
          Edit
        </button>
      </div>
      <Task />
    </div>
  );
};

export default MainGoal;
