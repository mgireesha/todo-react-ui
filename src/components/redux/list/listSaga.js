import { CREATE_LIST_START, DELETE_LIST_START, FETCH_LISTS_START, UPDATE_LIST_START } from "./listActionTypes";

import {takeLatest, call, put} from 'redux-saga/effects';
import { createListAPI, deleteListAPI, getUserListsAPI, updateListAPI } from "../apis";
import { createListSucc, deleteListSucc, fethUserListsSucc, updateListSucc } from "./listActions";
import { fetTaskList, fetTasksByList, updateTaskTodoList } from "../task/taskActions";
import { handleAPIError } from "../../utils/GlobalFuns";

export function* onFetchUserLists(){
    yield takeLatest(FETCH_LISTS_START, onFetchUserListsAsnc);
}

export function* onFetchUserListsAsnc(){
    try {
        const response = yield call(getUserListsAPI);
        if(response.status===200){
            const data = response.data;
            if(data.status==="TOKEN_EXPIRED"){
                document.cookie="jToken=;";
                window.location.reload();
            }
            const userLists = Object.values(data);
            const userListsKeys = Object.keys(data);
            yield put(fethUserListsSucc(userLists,userListsKeys));
            yield put(fetTaskList(userLists[userListsKeys.findIndex(obj => obj==="default")][0].listId));
        }
    } catch (error) {
        console.log(error);
        handleAPIError(error);
    }
}

export function* onCreateList(){
    yield takeLatest(CREATE_LIST_START,onCreateListAsync);
}

export function* onCreateListAsync(payload){
    try {
        const response = yield call(createListAPI,payload.list);
        if(response.status===200){
            const data = response.data;
            yield put(createListSucc(data.todoList));
        }
    } catch (error) {
        handleAPIError(error);
    }
}

export function* onUpdateList(){
    yield takeLatest(UPDATE_LIST_START, onUpdateListAsync);
}

export function* onUpdateListAsync(payload){
    try {
        const response = yield call(updateListAPI,payload);
        if(response.status===200){
            const data = response.data;
            yield put(updateListSucc(payload.list));
            yield put(updateTaskTodoList(payload.list));
        }
    } catch (error) {
        console.log(error)
        handleAPIError(error);
    }
}

export function* onDeleteList(){
    yield takeLatest(DELETE_LIST_START,onDeleteListAsync);
}

export function* onDeleteListAsync(payload){
    try {
        const response = yield call(deleteListAPI,payload);
        if(response.status===200){
            yield put(deleteListSucc(payload.list))
        }
    } catch (error) {
        console.log(error)
        handleAPIError(error);
    }
}