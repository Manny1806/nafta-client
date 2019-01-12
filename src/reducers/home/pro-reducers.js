import {
    PRO_POSTS_REQUEST,
    PRO_POSTS_SUCCESS,
    ADD_EMPTY_PRO_ENTRY,
    GET_ACTIVE_PRO_POST_REQUEST,
    GET_ACTIVE_PRO_POST_SUCCESS,
    EDIT_PRO_POST_REQUEST,
    EDIT_PRO_POST_SUCCESS,
    ADD_PRO_POST_REQUEST,
    ADD_PRO_POST_SUCCESS,
    DELETE_PRO_POST_REQUEST,
    DELETE_PRO_POST_SUCCESS,
    PRO_SET_EDIT,
    PRO_SET_EXPANDED,
    UPLOAD_PRO_IMAGE_REQUEST,
    UPLOAD_PRO_IMAGE_SUCCESS,
    PRO_SET_IMG_URL
}   from '../../actions/home/pro-actions'

const initialState = {
    proPosts: [],
    editing: false,
    expanded: "none",
    loading: false,
    editLoading: false,
    imgUrl: '',
    activeProPost: {},
    activeProPostLoading: false
}

export default function reducer(state = initialState, action) {
    if (action.type === PRO_POSTS_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === PRO_POSTS_SUCCESS) {
        return {...state, proPosts: action.proPosts, loading: false}
    }
    else if (action.type === GET_ACTIVE_PRO_POST_REQUEST){
        return {...state, activeProPostLoading: true}
    }
    else if (action.type === GET_ACTIVE_PRO_POST_SUCCESS){
        return {...state, activeProPost: action.activeProPost, activeProPostLoading: false}
    }
    else if (action.type === EDIT_PRO_POST_REQUEST) {
        return {...state, editLoading: true}
    }
    else if (action.type === EDIT_PRO_POST_SUCCESS) {
        return {...state, editLoading: false, proPosts: state.proPosts.map((x, index)=>{
            // console.log(action.index)
            if(index === action.index){
                return action.proPost
            }
            return x
        })} 
    }
    else if (action.type === ADD_PRO_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === ADD_PRO_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === ADD_EMPTY_PRO_ENTRY) {
        return {...state, activeProPost: action.activeProPost}
    }
    else if (action.type === PRO_SET_EDIT) {
        return {...state, editing: action.editing}
    }
    else if (action.type === PRO_SET_EXPANDED) {
        return {...state, expanded: action.expanded}
    }
    else if (action.type === UPLOAD_PRO_IMAGE_REQUEST) {
        return {...state}
    }
    else if (action.type === UPLOAD_PRO_IMAGE_SUCCESS) {
        // console.log(action.imgUrl)
        return {...state, imgUrl: action.imgUrl.url}
    }
    else if (action.type === PRO_SET_IMG_URL) {
        return {...state, imgUrl: action.imgUrl}
    }

    return state
}