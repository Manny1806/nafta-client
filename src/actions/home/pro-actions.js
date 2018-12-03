import { API_BASE_URL } from '../../config';

export const PRO_POSTS_REQUEST = 'PRO_POSTS_REQUEST'
export const fetchProPostsRequest = () =>({
    type: PRO_POSTS_REQUEST
})

export const PRO_POSTS_SUCCESS = 'PRO_POSTS_SUCCESS'
export const fetchProPostsSuccess = (proPosts) =>({
    type: PRO_POSTS_SUCCESS,
    proPosts
})

export const ADD_EMPTY_PRO_ENTRY = 'ADD_EMPTY_PRO_ENTRY'
export const addEmptyProEntry = () =>({
    type: ADD_EMPTY_PRO_ENTRY,
    proPost: {title: "",
              quote: "",
              new: true}
})

export const EDIT_PRO_POST_REQUEST = 'EDIT_PRO_POST_REQUEST'
export const editProPostRequest = () =>({
    type: EDIT_PRO_POST_REQUEST
})

export const EDIT_PRO_POST_SUCCESS = 'EDIT_PRO_POST_SUCCESS'
export const editProPostSuccess = () => ({
    type: EDIT_PRO_POST_SUCCESS
})

export const ADD_PRO_POST_REQUEST = 'ADD_PRO_POST_REQUEST'
export const addProPostRequest = () =>({
    type: ADD_PRO_POST_REQUEST
})

export const ADD_PRO_POST_SUCCESS = 'ADD_PRO_POST_SUCCESS'
export const addProPostSuccess = () => ({
    type: ADD_PRO_POST_SUCCESS
})

export const DELETE_PRO_POST_REQUEST = 'DELETE_PRO_POST_REQUEST'
export const deleteProPostRequest = () =>({
    type: DELETE_PRO_POST_REQUEST
})

export const DELETE_PRO_POST_SUCCESS = 'DELETE_PRO_POST_SUCCESS'
export const deleteProPostSuccess = () => ({
    type: DELETE_PRO_POST_SUCCESS
})

export const fetchProPosts = () => dispatch =>{
    dispatch(fetchProPostsRequest())
    fetch(`${API_BASE_URL}pro`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {
        console.log(res._embedded.pro)
        dispatch(fetchProPostsSuccess(res._embedded.pro))})
}

export const editProPost = (id, values) => dispatch => {
    dispatch(editProPostRequest())
    fetch(`${API_BASE_URL}pro/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(editProPostSuccess()))
    .then(res => dispatch(fetchProPosts()))
}

export const addProPost = (values) => dispatch => {
    dispatch(addProPostRequest())
    fetch(`${API_BASE_URL}pro/`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(addProPostSuccess()))
    .then(res => dispatch(fetchProPosts()))
}

export const deleteProPost = (id) => dispatch => {
    dispatch(deleteProPostRequest())
    fetch(`${API_BASE_URL}pro/${id}`, {
        method: 'DELETE'
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deleteProPostSuccess()))
    .then(res => dispatch(fetchProPosts()))
}