import { GET_ROOMS, GET_MESSAGES } from "../actions/types";

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
        case GET_MESSAGES:
        return {
            ...state,
            messages: action.payload
        }
        default:
        return state
}
}
