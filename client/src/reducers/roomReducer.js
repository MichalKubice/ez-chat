import { GET_ROOMS, GET_MESSAGES, SEND_MESSAGE, LEAVE_ROOM, GET_USERLIST } from "../actions/types";

const initialState = {
    rooms: {},
    userList: {},
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
        case GET_USERLIST:
        return {
            ...state,
            userList: action.payload
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
