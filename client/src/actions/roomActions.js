import axios from "axios";
import { GET_ROOMS, GET_ERRORS, GET_MESSAGES, SEND_MESSAGE} from "../actions/types";

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
            payload: {}
        })
    })
};
export const sendMessage = (id,roomData) => dispatch => {
    axios.post(`/api/rooms/${id}`,roomData).then((res) => {
        dispatch({
            type: SEND_MESSAGE,
            payload: res.data
        })
    }).catch((e) => {
        dispatch({
            type: SEND_MESSAGE,
            payload: {}
        })
        console.log("something went wrong")
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