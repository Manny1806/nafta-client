import { API_BASE_URL } from '../../config';

export const CONGRESS_POSTS_REQUEST = 'CONGRESS_POSTS_REQUEST'
export const fetchCongressPostsRequest = () =>({
    type: CONGRESS_POSTS_REQUEST
})

export const CONGRESS_POSTS_SUCCESS = 'CONGRESS_POSTS_SUCCESS'
export const fetchCongressPostsSuccess = (congressPosts) =>({
    type: CONGRESS_POSTS_SUCCESS,
    congressPosts
})

export const ADD_EMPTY_CONGRESS_ENTRY = 'ADD_EMPTY_CONGRESS_ENTRY'
export const addEmptyCongressEntry = () =>({
    type: ADD_EMPTY_CONGRESS_ENTRY,
    activeCongressPost: {}
})

export const GET_ACTIVE_CONGRESS_POST_REQUEST = 'GET_ACTIVE_CONGRESS_POST_REQUEST'
export const getActiveCongressPostRequest = () => ({
    type: GET_ACTIVE_CONGRESS_POST_REQUEST
})

export const GET_ACTIVE_CONGRESS_POST_SUCCESS = 'GET_ACTIVE_CONGRESS_POST_SUCCESS'
export const getActiveCongressPostSuccess = (activeCongressPost) => ({
    type: GET_ACTIVE_CONGRESS_POST_SUCCESS,
    activeCongressPost
})

export const getActiveCongressPost = (id) => dispatch =>{
    dispatch(getActiveCongressPostRequest())
    fetch(`${API_BASE_URL}/api/congress/${id}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(getActiveCongressPostSuccess(res)))
}

export const EDIT_CONGRESS_POST_REQUEST = 'EDIT_CONGRESS_POST_REQUEST'
export const editCongressPostRequest = () =>({
    type: EDIT_CONGRESS_POST_REQUEST
})

export const EDIT_CONGRESS_POST_SUCCESS = 'EDIT_CONGRESS_POST_SUCCESS'
export const editCongressPostSuccess = (congressPost) => ({
    type: EDIT_CONGRESS_POST_SUCCESS,
    congressPost
})

export const ADD_CONGRESS_POST_REQUEST = 'ADD_CONGRESS_POST_REQUEST'
export const addCongressPostRequest = () =>({
    type: ADD_CONGRESS_POST_REQUEST
})

export const ADD_CONGRESS_POST_SUCCESS = 'ADD_CONGRESS_POST_SUCCESS'
export const addCongressPostSuccess = () => ({
    type: ADD_CONGRESS_POST_SUCCESS
})

export const DELETE_CONGRESS_POST_REQUEST = 'DELETE_CONGRESS_POST_REQUEST'
export const deleteCongressPostRequest = () =>({
    type: DELETE_CONGRESS_POST_REQUEST
})

export const DELETE_CONGRESS_POST_SUCCESS = 'DELETE_CONGRESS_POST_SUCCESS'
export const deleteCongressPostSuccess = () => ({
    type: DELETE_CONGRESS_POST_SUCCESS
})

export const UPLOAD_CONGRESS_IMAGE_REQUEST = 'UPLOAD_CONGRESS_IMAGE_REQUEST'
export const uploadCongressImageRequest = () => ({
    type: UPLOAD_CONGRESS_IMAGE_REQUEST
})

export const UPLOAD_CONGRESS_IMAGE_SUCCESS = 'UPLOAD_CONGRESS_IMAGE_SUCCESS'
export const uploadCongressImageSuccess = (imgUrl) => ({
    type: UPLOAD_CONGRESS_IMAGE_SUCCESS,
    imgUrl
})

export const uploadCongressImage = (file) => dispatch => {
    console.log(file)
    dispatch(uploadCongressImageRequest())
    return fetch(`${API_BASE_URL}/api/congress/img/`, {
        method: 'POST',
        body: file
    })
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(uploadCongressImageSuccess(res)))
}

export const fetchCongressPosts = () => dispatch =>{
    dispatch(fetchCongressPostsRequest())
    fetch(`${API_BASE_URL}/api/congress/`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchCongressPostsSuccess(res)))
}

export const editCongressPost = (id, values) => dispatch => {
    dispatch(editCongressPostRequest())
    fetch(`${API_BASE_URL}/api/congress/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {dispatch(editCongressPostSuccess(res))})
    .then(res => dispatch(fetchCongressPosts()))
}

export const addCongressPost = (values) => dispatch => {
    dispatch(addCongressPostRequest())
    fetch(`${API_BASE_URL}/api/congress/`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(addCongressPostSuccess()))
    .then(res => dispatch(fetchCongressPosts()))
}

export const deleteCongressPost = (id) => dispatch => {
    dispatch(deleteCongressPostRequest())
    fetch(`${API_BASE_URL}/api/congress/${id}`, {
        method: 'DELETE'
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deleteCongressPostSuccess()))
    .then(res => dispatch(fetchCongressPosts()))
}

export const CONGRESS_SET_EDIT = 'CONGRESS_SET_EDIT'
export const congressSetEdit = (bool) => ({
    type: CONGRESS_SET_EDIT,
    editing: bool
})

export const CONGRESS_SET_EXPANDED = 'CONGRESS_SET_EXPANDED'
export const congressSetExpanded = (id) => ({
    type: CONGRESS_SET_EXPANDED,
    expanded: id
})

export const CONGRESS_SET_IMG_URL = 'CONGRESS_SET_IMG_URL'
export const congressSetImgUrl = (url) => ({
    type: CONGRESS_SET_IMG_URL,
    imgUrl: url
})