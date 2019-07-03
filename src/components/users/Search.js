import React, { useState, useContext } from 'react';

import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  // Context provides states and actions
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  //    [stateName, funcToModifyStateName]
  const [username, setUsername] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (username.length > 0) {
      githubContext.searchUsers(username);
      setUsername('');
    } else {
      alertContext.setAlert('Please enter something.', 'light');
    }
  };

  const onChange = e => setUsername(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={username}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
