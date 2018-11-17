import {
    PRO_POSTS_REQUEST,
    PRO_POSTS_SUCCESS
}   from '../../actions/home/pro-actions'

const initialState = {
    proPosts: []
}

export default function reducer(state = initialState, action) {
    if (action.type === PRO_POSTS_REQUEST) {
        return {...state}
    }
    else if (action.type === PRO_POSTS_SUCCESS) {
        console.log("triggered")
        return {...state, proPosts: action.proPosts}
    }

    return state
}