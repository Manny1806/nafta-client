import {
    CON_POSTS_REQUEST,
    CON_POSTS_SUCCESS,
    ADD_EMPTY_CON_ENTRY,
    GET_ACTIVE_CON_POST_REQUEST,
    GET_ACTIVE_CON_POST_SUCCESS,
    EDIT_CON_POST_REQUEST,
    EDIT_CON_POST_SUCCESS,
    ADD_CON_POST_REQUEST,
    ADD_CON_POST_SUCCESS,
    DELETE_CON_POST_REQUEST,
    DELETE_CON_POST_SUCCESS,
    CON_SET_EDIT,
    CON_SET_EXPANDED,
    UPLOAD_CON_IMAGE_REQUEST,
    UPLOAD_CON_IMAGE_SUCCESS,
    CON_SET_IMG_URL
}   from '../../actions/home/con-actions'

const initialState = {
    conPosts: [],
    editing: false,
    expanded: "none",
    loading: false,
    editLoading: false,
    imgUrl: '',
    activeConPost: {},
    activeConPostLoading: false
}

export default function reducer(state = initialState, action) {
    if (action.type === CON_POSTS_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === CON_POSTS_SUCCESS) {
        return {...state, conPosts: action.conPosts, loading: false}
    }
    else if (action.type === GET_ACTIVE_CON_POST_REQUEST){
        return {...state, activeConPostLoading: true}
    }
    else if (action.type === GET_ACTIVE_CON_POST_SUCCESS){
        return {...state, activeConPost: action.activeConPost, activeConPostLoading: false}
    }
    else if (action.type === EDIT_CON_POST_REQUEST) {
        return {...state, editLoading: true}
    }
    else if (action.type === EDIT_CON_POST_SUCCESS) {
        return {...state, editLoading: false, conPosts: state.conPosts.map((x, index)=>{
            // console.log(action.index)
            if(index === action.index){
                return action.conPost
            }
            return x
        })} 
    }
    else if (action.type === ADD_CON_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === ADD_CON_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === ADD_EMPTY_CON_ENTRY) {
        return {...state, activeConPost: action.activeConPost}
    }
    else if (action.type === CON_SET_EDIT) {
        return {...state, editing: action.editing}
    }
    else if (action.type === CON_SET_EXPANDED) {
        return {...state, expanded: action.expanded}
    }
    else if (action.type === UPLOAD_CON_IMAGE_REQUEST) {
        return {...state}
    }
    else if (action.type === UPLOAD_CON_IMAGE_SUCCESS) {
        // console.log(action.imgUrl)
        return {...state, imgUrl: action.imgUrl.url}
    }
    else if (action.type === CON_SET_IMG_URL) {
        return {...state, imgUrl: action.imgUrl}
    }

    return state
}