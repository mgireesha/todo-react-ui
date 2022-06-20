import {combineReducers} from 'redux';
import listReducer from './list/listReducer';
import {taskReducer} from './task/taskReducer';
// import storage from 'redux-persist/lib/storage';
// const persistConfig = {
//     key:'root',
//     storage
// }

export const todoReducer = combineReducers({
    list:listReducer,
    task:taskReducer
});