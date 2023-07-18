import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
    },
    reducers: {
        fetchcategories: (state, action) => {
            return {
                ...state,
                categories: action.payload
            }
        }
    }
});

export const { fetchcategories } = categorySlice.actions;
export default categorySlice.reducer;
