import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentMarkers: null,
    userMarkers: null
};

export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        //app markers actions
        setContentMarkers: (state, action) => {
            state.contentMarkers = action.payload;
        },
        //user markers actions
        setUserMarkers: (state, action) => {
                        state.userMarkers = Array.isArray(action.payload) ? action.payload : [];
        },
        createdUserMarkers: (state, action) => {
                    const current = Array.isArray(state.userMarkers) ? state.userMarkers : [];
                    state.userMarkers = [...current, action.payload];
        },
        updateUserMarkers: (state, action) => {
                        const current = Array.isArray(state.userMarkers) ? state.userMarkers : [];
                        state.userMarkers = current.map((item) => item.id === action.payload.id ? action.payload : item);
        },
        delUserMarkers: (state, action) => {
                        const current = Array.isArray(state.userMarkers) ? state.userMarkers : [];
                        state.userMarkers = current.filter((item) => item.id !== action.payload);
        },
        clearUserMarkers: (state) => {
            state.userMarkers = null;
        },
    },
});

export const { setContentMarkers, setUserMarkers, clearUserMarkers, updateUserMarkers, createdUserMarkers, delUserMarkers } = mapSlice.actions;

export default mapSlice.reducer;
