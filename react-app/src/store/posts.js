// constants
const LOAD = 'posts/LOAD';

const load = (data) => ({
  type: LOAD,
  payload: data
});

export const getAllPosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts/`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const getAllSubredditsPosts = (subreddit_id) => async (dispatch) => {
  console.log(subreddit_id, "INSIDE THUNK")
  const response = await fetch(`/api/posts/subreddit/${subreddit_id}`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const getAllUsersPosts = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/user/${user_id}`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return action.payload
    default:
      return state;
  }
}
