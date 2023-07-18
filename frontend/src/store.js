import { configureStore } from "@reduxjs/toolkit";

import userReducer from './store/user';
import postReducer from './store/posts';
import categoryReducer from './store/category';


export default configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        category: categoryReducer,
    }
})