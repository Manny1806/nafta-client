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

export const PRO_POSTS_SEARCH_REQUEST = 'PRO_POSTS_SEARCH_REQUEST'
export const fetchProPostsSearchRequest = () =>({
    type: PRO_POSTS_SEARCH_REQUEST
})

export const PRO_POSTS_SEARCH_SUCCESS = 'PRO_POSTS_SEARCH_SUCCESS'
export const fetchProPostsSearchSuccess = (proPosts) =>({
    type: PRO_POSTS_SEARCH_SUCCESS,
    proPosts
})

export const ADD_EMPTY_PRO_ENTRY = 'ADD_EMPTY_PRO_ENTRY'
export const addEmptyProEntry = () =>({
    type: ADD_EMPTY_PRO_ENTRY,
    activeProPost: {}
})

export const GET_ACTIVE_PRO_POST_REQUEST = 'GET_ACTIVE_PRO_POST_REQUEST'
export const getActiveProPostRequest = () => ({
    type: GET_ACTIVE_PRO_POST_REQUEST
})

export const GET_ACTIVE_PRO_POST_SUCCESS = 'GET_ACTIVE_PRO_POST_SUCCESS'
export const getActiveProPostSuccess = (activeProPost) => ({
    type: GET_ACTIVE_PRO_POST_SUCCESS,
    activeProPost
})

export const getActiveProPost = (id) => dispatch =>{
    dispatch(getActiveProPostRequest())
    fetch(`${API_BASE_URL}/api/pro/${id}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(getActiveProPostSuccess(res)))
}

export const EDIT_PRO_POST_REQUEST = 'EDIT_PRO_POST_REQUEST'
export const editProPostRequest = () =>({
    type: EDIT_PRO_POST_REQUEST
})

export const EDIT_PRO_POST_SUCCESS = 'EDIT_PRO_POST_SUCCESS'
export const editProPostSuccess = (proPost) => ({
    type: EDIT_PRO_POST_SUCCESS,
    proPost
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

export const UPLOAD_PRO_IMAGE_REQUEST = 'UPLOAD_PRO_IMAGE_REQUEST'
export const uploadProImageRequest = () => ({
    type: UPLOAD_PRO_IMAGE_REQUEST
})

export const UPLOAD_PRO_IMAGE_SUCCESS = 'UPLOAD_PRO_IMAGE_SUCCESS'
export const uploadProImageSuccess = (imgUrl) => ({
    type: UPLOAD_PRO_IMAGE_SUCCESS,
    imgUrl
})

export const uploadProImage = (file) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    // console.log(file)
    dispatch(uploadProImageRequest())
    return fetch(`${API_BASE_URL}/api/pro/img/`, {
        method: 'POST',
        body: file,
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(uploadProImageSuccess(res)))
}

export const fetchProPosts = () => dispatch =>{
    dispatch(fetchProPostsRequest())
    fetch(`${API_BASE_URL}/api/pro/`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchProPostsSuccess(res)))
}

export const fecthProPostsSearch = (term) => dispatch => {
    dispatch(fetchProPostsSearchRequest())
    fetch(`${API_BASE_URL}/api/pro/search/${term}`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(fetchProPostsSearchSuccess(res)))
}

export const editProPost = (id, values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(editProPostRequest())
    fetch(`${API_BASE_URL}/api/pro/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {dispatch(editProPostSuccess(res))})
    .then(res => dispatch(fetchProPosts()))
}

export const addProPost = (values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(addProPostRequest())
    fetch(`${API_BASE_URL}/api/pro/`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(addProPostSuccess()))
    .then(res => dispatch(fetchProPosts()))
}

export const deleteProPost = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken
    dispatch(deleteProPostRequest())
    fetch(`${API_BASE_URL}/api/pro/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : undefined)
    .then(res => dispatch(deleteProPostSuccess()))
    .then(res => dispatch(fetchProPosts()))
}

export const PRO_SET_EDIT = 'PRO_SET_EDIT'
export const proSetEdit = (bool) => ({
    type: PRO_SET_EDIT,
    editing: bool
})

export const PRO_SET_EXPANDED = 'PRO_SET_EXPANDED'
export const proSetExpanded = (id) => ({
    type: PRO_SET_EXPANDED,
    expanded: id
})

export const PRO_SET_IMG_URL = 'PRO_SET_IMG_URL'
export const proSetImgUrl = (url) => ({
    type: PRO_SET_IMG_URL,
    imgUrl: url
})