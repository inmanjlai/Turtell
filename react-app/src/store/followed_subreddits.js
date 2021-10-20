// constants
const LOAD = 'followed/LOAD';

const load = (data) => ({
  type: LOAD,
  payload: data
});

export const getAllSubredditsIFollow = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/subreddits/followed/${user_id}`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const followOneSubreddit = (subreddit_id, user_id) => async (dispatch) => {
  const response = await fetch(`/api/subreddits/${subreddit_id}/follow/${user_id}`, {
    method: "POST",
    headers: {"content-type": "application/json"},
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const unfollowOneSubreddit = (subreddit_id, user_id) => async (dispatch) => {
  const response = await fetch(`/api/subreddits/${subreddit_id}/unfollow/${user_id}`, {
    method: "DELETE",
    headers: {"content-type": "application/json"},
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}



const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return action.payload.subreddits
    default:
      return state;
  }
}
