import React, {useReducer} from 'react';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './ReduxList/userlogin';
import modelactionReducer from './ReduxList/modelaction';

export default configureStore({
  reducer: {
    user: userReducer,
    modelaction: modelactionReducer,
  },
});
