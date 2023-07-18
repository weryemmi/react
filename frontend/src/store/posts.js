import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
    },
    reducers: {
        fetchPosts: (state, action) => {
            return {
                ...state,
                posts: action.payload
            }
        }
    }
});

export const { fetchPosts } = postSlice.actions;
export default postSlice.reducer;
