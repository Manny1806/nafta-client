import {
    SEND_FEEDBACK_REQUEST,
    SEND_FEEDBACK_SUCCESS
} from '../actions/feedback'

const initialState = {
    loading: false,
    response: ""
}

export default function reducer(state = initialState, action) {
    if (action.type === SEND_FEEDBACK_REQUEST) {
        return {...state, loading: true}
    }
    else if (action.type === SEND_FEEDBACK_SUCCESS) {
        return {...state, response: action.response, loading: false}
    }

    return state
}
