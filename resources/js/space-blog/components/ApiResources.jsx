import axios from "axios";
import { setUser } from "../slices/UserSlice";

export default async function loadStatus(dispatch) {
    try {
        let response = await axios.get('/api/status');
        let user = response.data.user;
        console.log(response.data);

        dispatch(setUser(user));

    } catch (error) {
        console.log(error)
    }
}


