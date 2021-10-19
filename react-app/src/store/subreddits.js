// constants
const LOAD = 'subreddits/LOAD';
const LOAD_ONE_SUBREDDIT = 'subreddits/LOAD_ONE_SUBREDDIT'

const load = (data) => ({
  type: LOAD,
  payload: data
});

const loadOneSubreddit = (data) => ({
  type: LOAD_ONE_SUBREDDIT,
  payload: data
});


export const getAllSubreddits = () => async (dispatch) => {
  const response = await fetch('/api/subreddits/');

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const getOneSubreddit = (id) => async (dispatch) => {
  const response = await fetch(`/api/subreddits/${id}`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(loadOneSubreddit(data));
  }
}

export const createSubreddit = (subreddit) => async (dispatch) => {
  const response = await fetch('/api/subreddits/', {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(subreddit)
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const editOneSubreddit = (id, subreddit) => async (dispatch) => {
  const response = await fetch(`/api/subreddits/${id}/edit`, {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(subreddit)
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const deleteOneSubreddit = (id) => async (dispatch) => {
  const response = await fetch(`/api/subreddits/${id}/delete`, {
    method: "DELETE",
    headers: {"content-type": "application/json"},
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

const initialState = {subreddits: [], currentSubreddit: {}};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD:
      newState = {...state}
      newState.subreddits = action.payload.subreddits
      newState.currentSubreddit = {}
      return newState
    case LOAD_ONE_SUBREDDIT:
      newState = {...state}
      newState.currentSubreddit = action.payload
      return newState
    default:
      return state;
  }
}
