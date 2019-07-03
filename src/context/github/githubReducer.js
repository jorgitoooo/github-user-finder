import {
  SET_USERS,
  GET_USER,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };

    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };

    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };

    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
