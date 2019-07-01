import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ clearUsers, showClear, searchUsers, setAlert }) => {
  //    [stateName, funcToModifyStateName]
  const [username, setUsername] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (username.length > 0) {
      searchUsers(username);
      setUsername('');
    } else {
      setAlert('Please enter something.', 'light');
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
      {showClear && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
