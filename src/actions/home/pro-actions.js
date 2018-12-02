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
    proPost: {title: "1",
              quote: "1",
              new: true}
})

export const fetchProPosts = () => dispatch =>{
    dispatch(fetchProPostsRequest())
    fetch(`${API_BASE_URL}pro`)
    .then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => {
        console.log(res._embedded.pro)
        dispatch(fetchProPostsSuccess(res._embedded.pro))})
}