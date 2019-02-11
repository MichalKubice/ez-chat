import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, UPLOAD } from "./types";

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get("/api/users/me").then((res) => {
dispatch({
    type: GET_PROFILE,
    payload: res
})
    }).catch((e) => {
        dispatch({
            type: GET_PROFILE,
            payload: null
        })
    });
}

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
export const uploadImg = (fd) => dispatch => {
    axios.put("/api/users/img", fd).then((res) => {
        dispatch({
            type: UPLOAD,
            payload: res.data
        })
    }).catch((e) => {
        console.log(e)
    })
}
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}