import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
    name: 'update',
    initialState: {
        update: null,
    },
    reducers:{
        setUpdate(state, action){
            return {
                ...state,
                register: action.payload
            }
        }
    }
})

export const { setUpdate } = updateSlice.actions;
export default  updateSlice.reducer;
