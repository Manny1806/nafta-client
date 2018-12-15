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
              id: "new"}
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
    fetch(`${API_BASE_URL}/api/pro/`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {
        console.log(res)
        dispatch(fetchProPostsSuccess(res))})
}

export const editProPost = (id, values) => dispatch => {
    dispatch(editProPostRequest())
    fetch(`${API_BASE_URL}/api/pro/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(editProPostSuccess()))
    // .then(res => dispatch(fetchProPosts()))
}

export const addProPost = (values) => dispatch => {
    dispatch(addProPostRequest())
    fetch(`${API_BASE_URL}/api/pro/`, {
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
    fetch(`${API_BASE_URL}/api/pro/${id}`, {
        method: 'DELETE'
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deleteProPostSuccess()))
    .then(res => dispatch(fetchProPosts()))
}

export const PRO_SET_EDIT = 'PRO_SET_EDIT'
export const proSetEdit = (id) => ({
    type: PRO_SET_EDIT,
    editing: id
})

export const PRO_SET_EXPANDED = 'PRO_SET_EXPANDED'
export const proSetExpanded = (id) => ({
    type: PRO_SET_EXPANDED,
    expanded: id
})