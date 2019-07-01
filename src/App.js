import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import NavBar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';

import About from './components/pages/About';

import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // gets user
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUser(res.data);
    setLoading(false);
  };

  // gets user repositories
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  // searches for users w/ username
  const searchUsers = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${username}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setUsers(res.data.items);
    setLoading(false);
  };

  // clears searched users
  const clearUsers = () => {
    setUser([]);
    setLoading(false);
  };
  // sets alert if username input is empty
  const createAlert = (msg, style) => {
    setAlert({ msg, style });
    setTimeout(() => setAlert(null), 5000);
  };

  // const { loading, users, user, repos } = this.state;

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0}
                    setAlert={createAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <Fragment>
                  <User
                    {...props}
                    getUser={getUser}
                    user={user}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    loading={loading}
                  />
                </Fragment>
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
