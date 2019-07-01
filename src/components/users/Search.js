import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    username: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.username.length > 0) {
      this.props.searchUsers(this.state.username);
      this.setState({ username: '' });
    } else {
      this.props.setAlert('Please enter something.', 'light');
    }
  };

  onChange = e => this.setState({ username: e.target.value });

  render() {
    const { clearUsers, showClear } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.username}
            onChange={this.onChange}
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
  }
}

export default Search;
