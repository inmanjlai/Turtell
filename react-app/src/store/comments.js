// constants
const LOAD = 'comments/LOAD';

const load = (data) => ({
  type: LOAD,
  payload: data
});

export const getAllPostsComments = (post_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/post/${post_id}`);

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const getOneComment = (comment_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment_id}`);

  if (response.ok) {
    const data = await response.json();  
    return dispatch(load(data));
  }
}

export const createComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(comment)
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const editComment = (comment, comment_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment_id}`, {
    method: "PUT",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(comment)
  });

  if (response.ok) {
    const data = await response.json();  
    dispatch(load(data));
  }
}

export const deleteComment = (post_id, comment_id) => async(dispatch) => {
  const response = await fetch(`/api/comments/${post_id}/${comment_id}`, {
    method: "DELETE",
  })

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
