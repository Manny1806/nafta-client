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
export const editProPostSuccess = (proPost, index) => ({
    type: EDIT_PRO_POST_SUCCESS,
    proPost,
    index: index
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

export const uploadProImage = (file) => dispatch => {
    console.log(file)
    dispatch(uploadProImageRequest())
    fetch(`${API_BASE_URL}/api/pro/img/`, {
        method: 'POST',
        body: file
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

export const editProPost = (id, index, values) => dispatch => {
    dispatch(editProPostRequest())
    fetch(`${API_BASE_URL}/api/pro/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    // .then( res => fetch(`${API_BASE_URL}/api/pro/${id}`))
    .then(res => {
        // console.log(res)
        dispatch(editProPostSuccess(res, index))})
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