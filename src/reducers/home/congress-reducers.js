import {
    CONGRESS_POSTS_REQUEST,
    CONGRESS_POSTS_SUCCESS,
    ADD_EMPTY_CONGRESS_ENTRY,
    GET_ACTIVE_CONGRESS_POST_REQUEST,
    GET_ACTIVE_CONGRESS_POST_SUCCESS,
    EDIT_CONGRESS_POST_REQUEST,
    EDIT_CONGRESS_POST_SUCCESS,
    ADD_CONGRESS_POST_REQUEST,
    ADD_CONGRESS_POST_SUCCESS,
    DELETE_CONGRESS_POST_REQUEST,
    DELETE_CONGRESS_POST_SUCCESS,
    CONGRESS_SET_EDIT,
    CONGRESS_SET_EXPANDED,
    UPLOAD_CONGRESS_IMAGE_REQUEST,
    UPLOAD_CONGRESS_IMAGE_SUCCESS,
    CONGRESS_SET_IMG_URL
}   from '../../actions/home/congress-actions'

const initialState = {
    congressPosts: [],
    editing: false,
    expanded: "none",
    loading: false,
    editLoading: false,
    imgUrl: '',
    activeCongressPost: {},
    activeCongressPostLoading: false
}

export default function reducer(state = initialState, action) {
    if (action.type === CONGRESS_POSTS_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === CONGRESS_POSTS_SUCCESS) {
        return {...state, congressPosts: action.congressPosts, loading: false}
    }
    else if (action.type === GET_ACTIVE_CONGRESS_POST_REQUEST){
        return {...state, activeCongressPostLoading: true}
    }
    else if (action.type === GET_ACTIVE_CONGRESS_POST_SUCCESS){
        return {...state, activeCongressPost: action.activeCongressPost, activeCongressPostLoading: false}
    }
    else if (action.type === EDIT_CONGRESS_POST_REQUEST) {
        return {...state, editLoading: true}
    }
    else if (action.type === EDIT_CONGRESS_POST_SUCCESS) {
        return {...state, editLoading: false, congressPosts: state.congressPosts.map((x, index)=>{
            // console.log(action.index)
            if(index === action.index){
                return action.congressPost
            }
            return x
        })} 
    }
    else if (action.type === ADD_CONGRESS_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === ADD_CONGRESS_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === ADD_EMPTY_CONGRESS_ENTRY) {
        return {...state, activeCongressPost: action.activeCongressPost}
    }
    else if (action.type === CONGRESS_SET_EDIT) {
        return {...state, editing: action.editing}
    }
    else if (action.type === CONGRESS_SET_EXPANDED) {
        return {...state, expanded: action.expanded}
    }
    else if (action.type === UPLOAD_CONGRESS_IMAGE_REQUEST) {
        return {...state}
    }
    else if (action.type === UPLOAD_CONGRESS_IMAGE_SUCCESS) {
        // console.log(action.imgUrl)
        return {...state, imgUrl: action.imgUrl.url}
    }
    else if (action.type === CONGRESS_SET_IMG_URL) {
        return {...state, imgUrl: action.imgUrl}
    }

    return state
}