import {
    PRO_POSTS_REQUEST,
    PRO_POSTS_SUCCESS,
    ADD_EMPTY_PRO_ENTRY,
    EDIT_PRO_POST_REQUEST,
    EDIT_PRO_POST_SUCCESS,
    ADD_PRO_POST_REQUEST,
    ADD_PRO_POST_SUCCESS,
    DELETE_PRO_POST_REQUEST,
    DELETE_PRO_POST_SUCCESS,
    PRO_SET_EDIT,
    PRO_SET_EXPANDED
}   from '../../actions/home/pro-actions'

const initialState = {
    proPosts: [],
    editing: "none",
    expanded: "none",
    loading: false,
    editLoading: false
}

export default function reducer(state = initialState, action) {
    if (action.type === PRO_POSTS_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === PRO_POSTS_SUCCESS) {
        return {...state, proPosts: action.proPosts, loading: false}
    }
    else if (action.type === EDIT_PRO_POST_REQUEST) {
        return {...state, editLoading: true}
    }
    else if (action.type === EDIT_PRO_POST_SUCCESS) {
        return {...state, editLoading: false}
    }
    else if (action.type === ADD_PRO_POST_REQUEST) {
        return {...state}
    }
    else if (action.type === ADD_PRO_POST_SUCCESS) {
        return {...state}
    }
    else if (action.type === ADD_EMPTY_PRO_ENTRY) {
        return {...state, proPosts: [action.proPost].concat(state.proPosts)}
    }
    else if (action.type === PRO_SET_EDIT) {
        return {...state, editing: action.editing}
    }
    else if (action.type === PRO_SET_EXPANDED) {
        return {...state, expanded: action.expanded}
    }

    return state
}