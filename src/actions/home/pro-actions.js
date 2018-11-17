export const PRO_POST_REQUEST = 'PRO_POST_REQUEST'
export const fetchProPostsRequest = () =>({
    type: PRO_POST_REQUEST
})

export const PRO_POST_SUCCESS = 'PRO_POST_SUCCESS'
export const fetchProPostsSuccess = (posts) =>({
    type: PRO_POST_SUCCESS,
    proPosts
})

export const fetchProPosts = () => dispatch =>{
    dispatch(fetchProPostsSuccess())
}