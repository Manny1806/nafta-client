import { API_BASE_URL } from '../../config';

export const CON_POSTS_REQUEST = 'CON_POSTS_REQUEST'
export const fetchConPostsRequest = () =>({
    type: CON_POSTS_REQUEST
})

export const CON_POSTS_SUCCESS = 'CON_POSTS_SUCCESS'
export const fetchConPostsSuccess = (conPosts) =>({
    type: CON_POSTS_SUCCESS,
    conPosts
})

export const CON_POSTS_SEARCH_REQUEST = 'CON_POSTS_SEARCH_REQUEST'
export const fetchConPostsSearchRequest = () =>({
    type: CON_POSTS_SEARCH_REQUEST
})

export const CON_POSTS_SEARCH_SUCCESS = 'CON_POSTS_SEARCH_SUCCESS'
export const fetchConPostsSearchSuccess = (conPosts) =>({
    type: CON_POSTS_SEARCH_SUCCESS,
    conPosts
})

export const ADD_EMPTY_CON_ENTRY = 'ADD_EMPTY_CON_ENTRY'
export const addEmptyConEntry = () =>({
    type: ADD_EMPTY_CON_ENTRY,
    activeConPost: {}
})

export const GET_ACTIVE_CON_POST_REQUEST = 'GET_ACTIVE_CON_POST_REQUEST'
export const getActiveConPostRequest = () => ({
    type: GET_ACTIVE_CON_POST_REQUEST
})

export const GET_ACTIVE_CON_POST_SUCCESS = 'GET_ACTIVE_CON_POST_SUCCESS'
export const getActiveConPostSuccess = (activeConPost) => ({
    type: GET_ACTIVE_CON_POST_SUCCESS,
    activeConPost
})

export const getActiveConPost = (id) => dispatch =>{
    dispatch(getActiveConPostRequest())
    fetch(`${API_BASE_URL}/api/con/${id}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(getActiveConPostSuccess(res)))
}

export const EDIT_CON_POST_REQUEST = 'EDIT_CON_POST_REQUEST'
export const editConPostRequest = () =>({
    type: EDIT_CON_POST_REQUEST
})

export const EDIT_CON_POST_SUCCESS = 'EDIT_CON_POST_SUCCESS'
export const editConPostSuccess = (conPost) => ({
    type: EDIT_CON_POST_SUCCESS,
    conPost
})

export const ADD_CON_POST_REQUEST = 'ADD_CON_POST_REQUEST'
export const addConPostRequest = () =>({
    type: ADD_CON_POST_REQUEST
})

export const ADD_CON_POST_SUCCESS = 'ADD_CON_POST_SUCCESS'
export const addConPostSuccess = () => ({
    type: ADD_CON_POST_SUCCESS
})

export const DELETE_CON_POST_REQUEST = 'DELETE_CON_POST_REQUEST'
export const deleteConPostRequest = () =>({
    type: DELETE_CON_POST_REQUEST
})

export const DELETE_CON_POST_SUCCESS = 'DELETE_CON_POST_SUCCESS'
export const deleteConPostSuccess = () => ({
    type: DELETE_CON_POST_SUCCESS
})

export const UPLOAD_CON_IMAGE_REQUEST = 'UPLOAD_CON_IMAGE_REQUEST'
export const uploadConImageRequest = () => ({
    type: UPLOAD_CON_IMAGE_REQUEST
})

export const UPLOAD_CON_IMAGE_SUCCESS = 'UPLOAD_CON_IMAGE_SUCCESS'
export const uploadConImageSuccess = (imgUrl) => ({
    type: UPLOAD_CON_IMAGE_SUCCESS,
    imgUrl
})

export const uploadConImage = (file) => dispatch => {
    console.log(file)
    dispatch(uploadConImageRequest())
    return fetch(`${API_BASE_URL}/api/con/img/`, {
        method: 'POST',
        body: file
    })
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(uploadConImageSuccess(res)))
}

export const fetchConPosts = () => dispatch =>{
    dispatch(fetchConPostsRequest())
    fetch(`${API_BASE_URL}/api/con/`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchConPostsSuccess(res)))
}

export const fetchConPostsSearch = (term) => dispatch => {
    dispatch(fetchConPostsSearchRequest())
    fetch(`${API_BASE_URL}/api/con/search/${term}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchConPostsSearchSuccess(res)))
}

export const editConPost = (id, values) => dispatch => {
    dispatch(editConPostRequest())
    fetch(`${API_BASE_URL}/api/con/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {dispatch(editConPostSuccess(res))})
    .then(res => dispatch(fetchConPosts()))
}

export const addConPost = (values) => dispatch => {
    dispatch(addConPostRequest())
    fetch(`${API_BASE_URL}/api/con/`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(addConPostSuccess()))
    .then(res => dispatch(fetchConPosts()))
}

export const deleteConPost = (id) => dispatch => {
    dispatch(deleteConPostRequest())
    fetch(`${API_BASE_URL}/api/con/${id}`, {
        method: 'DELETE'
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deleteConPostSuccess()))
    .then(res => dispatch(fetchConPosts()))
}

export const CON_SET_EDIT = 'CON_SET_EDIT'
export const conSetEdit = (bool) => ({
    type: CON_SET_EDIT,
    editing: bool
})

export const CON_SET_EXPANDED = 'CON_SET_EXPANDED'
export const conSetExpanded = (id) => ({
    type: CON_SET_EXPANDED,
    expanded: id
})

export const CON_SET_IMG_URL = 'CON_SET_IMG_URL'
export const conSetImgUrl = (url) => ({
    type: CON_SET_IMG_URL,
    imgUrl: url
})