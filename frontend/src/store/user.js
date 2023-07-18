import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    },
    reducers: {
        loginSucces: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        },
        resetUser: (state) => {
            return {
                ...state,
                user: {}
            }
        }
    }
});

export const { loginSucces, resetUser } = userSlice.actions;
export default userSlice.reducer;
