import { API_BASE_URL } from '../config';

export const SEND_FEEDBACK_REQUEST = 'SEND_FEEDBACK_REQUEST'
export const sendFeedbackRequest = () =>({
    type: SEND_FEEDBACK_REQUEST
})

export const SEND_FEEDBACK_SUCCESS = 'SEND_FEEDBACK_SUCCESS'
export const sendFeedbackSuccess = (data) =>({
    type: SEND_FEEDBACK_SUCCESS,
    response: data
})

export const sendFeedback = (data) => dispatch => {
    dispatch(sendFeedbackRequest())
    return fetch(`${API_BASE_URL}/api/feedback/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => !res.ok ? Promise.reject(res.statusText) : res.json())
    .then(res => dispatch(sendFeedbackSuccess(res)))
}