import axios from "axios";
import { GET_ROOMS, GET_ERRORS, GET_MESSAGES} from "../actions/types";

export const createRooms = (roomData, history) => dispatch => {
    axios.post("/api/rooms", roomData).then((res) => {
        history.push("/dashboard")
    }).catch((err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }))
};

export const showRoom = () => dispatch => {
    axios.get("/api/rooms").then((res) => {
        dispatch({
            type: GET_ROOMS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    })
};
export const getMessages = (id) => dispatch => {
    axios.get(`/api/rooms/${id}`).then((res) => {
        dispatch({
            type: GET_MESSAGES,
            payload: res.data
        })
    }).catch((err) => {
        dispatch({
            type: GET_MESSAGES,
            payload: null
        })
    })
};

export const joinRooms = (roomData, history) => dispatch =>  {
    const url = `/api/rooms/join`;
    axios.put(url,roomData).then((res) => {
        history.push("/dashboard")
    }).catch((err) => {
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
    })
}