import { GET_ROOMS, GET_MESSAGES, SEND_MESSAGE, LEAVE_ROOM } from "../actions/types";

const initialState = {
    rooms: {},
    messages: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ROOMS:
        return {
            ...state,
            rooms: action.payload
        }
        case SEND_MESSAGE:
        return {
            ...state
        }
        case GET_MESSAGES:
        return {
            ...state,
            messages: action.payload
        }
        case LEAVE_ROOM:
        return {
            ...state
        }
        default:
        return state
}
}
