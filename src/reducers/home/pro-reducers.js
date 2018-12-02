import {
    PRO_POSTS_REQUEST,
    PRO_POSTS_SUCCESS,
    ADD_EMPTY_PRO_ENTRY
}   from '../../actions/home/pro-actions'

const initialState = {
    proPosts: []
}

export default function reducer(state = initialState, action) {
    if (action.type === PRO_POSTS_REQUEST) {
        return {...state}
    }
    else if (action.type === PRO_POSTS_SUCCESS) {
        return {...state, proPosts: action.proPosts}
    }
    else if (action.type === ADD_EMPTY_PRO_ENTRY) {
        return {...state, proPosts: [action.proPost].concat(state.proPosts)}
    }

    return state
}