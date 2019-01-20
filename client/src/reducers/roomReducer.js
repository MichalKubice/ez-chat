import { GET_ROOMS } from "../actions/types";

const initialState = {
    rooms: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ROOMS:
        return {
            ...state,
            rooms: action.payload
        }
        default:
        return state
}
}
