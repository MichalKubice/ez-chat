 import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history) =>  dispatch => {
    axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
    }
    export const loginUser = userData => dispatch => {
        axios.post("/api/users/login",userData).then(res => {
            const token = res.headers["x-auth"];
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            axios.get("/api/users/me").then((res) => {
                dispatch(setCurrentUser(res.data));
    
            }).catch((e) => {
                console.log(e)
            })
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        });
    };

    export const setCurrentUser = (decoded) => {
        return {
            type: SET_CURRENT_USER,
            payload: decoded
        }
    };

    export const logoutUser = () => dispatch => {
        axios.delete("/api/users/me/token").then((res) => {
            localStorage.removeItem("jwtToken");
            setAuthToken(false);
            dispatch(setCurrentUser({}));
        }).catch((err)=> {
            console.log(err);
        })
    }