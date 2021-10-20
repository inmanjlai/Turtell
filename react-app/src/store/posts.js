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

export const getOnePosts = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const getAllSubredditsPosts = (subreddit_id) => async (dispatch) => {
  console.log(subreddit_id, "INSIDE THUNK")
  if(subreddit_id){
    const response = await fetch(`/api/posts/subreddit/${subreddit_id}`);
  
    if (response.ok) {
      const data = await response.json();  
      dispatch(load(data));
    }

  }
}

export const getAllUsersPosts = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/user/${user_id}`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const createPost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(post)
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const editPost = (post, post_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(post)
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const deletePost = (subreddit_id, post_id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${subreddit_id}/${post_id}`, {
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
      return action.payload
    default:
      return state;
  }
}
