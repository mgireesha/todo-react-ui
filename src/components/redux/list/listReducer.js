import { INIT, LOADING, SUCCESS } from "../todoActionTypes"
import { addListToUserLists, getUpdatedUserLists, removeList, setListCounter, updateListCounter } from "./listActions"
import { CREATE_LIST_START, CREATE_LIST_SUCCESS, DELETE_LIST_START, DELETE_LIST_SUCCESS, FETCH_LISTS_START, FETCH_LISTS_SUCCESS, MOVE_TASK_START, SET_LIST_COUNTER, SET_MOBILE_DEVICE, SET_SHOW_LISTS, SET_SHOW_LIST_ADD, UPDATE_LIST_START, UPDATE_LIST_SUCCESS, UPDATE_LIST_WIDTH } from "./listActionTypes"

export const initialState = {
    userLists:[],
    userListsKeys:[],
    showListAdd:false,
    showLists:true,
    listDivWidth:'',
    isMobileDevice:false,
    phase:INIT
}

const listReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_LISTS_START:
            return{
                ...state,
                phase: LOADING
            }
        case FETCH_LISTS_SUCCESS:
            return{
                ...state,
                userLists: action.userLists,
                userListsKeys: action.userListsKeys,
                phase: FETCH_LISTS_SUCCESS
            }
        case CREATE_LIST_START:
            return{
                ...state,
                phase:LOADING
            }
        case CREATE_LIST_SUCCESS:
            return{
                ...state,
                userLists:addListToUserLists([...state.userLists],[...state.userListsKeys],action.list),
                phase:CREATE_LIST_SUCCESS
            }
        case UPDATE_LIST_WIDTH:
            return{
                ...state,
                listDivWidth:action.listDivWidth
            }
        case UPDATE_LIST_START:
            return{
                ...state,
                phase:LOADING
            }
        case UPDATE_LIST_SUCCESS:
            return{
                ...state,
                userLists:getUpdatedUserLists([...state.userLists],[...state.userListsKeys],action.list),
                phase:UPDATE_LIST_SUCCESS
            }
        case DELETE_LIST_START:
            return{
                ...state,
                phase:LOADING
            }
        case DELETE_LIST_SUCCESS:
            return{
                ...state,
                userLists:removeList([...state.userLists],[...state.userListsKeys],action.list),
                phase:DELETE_LIST_SUCCESS
            }
        case SET_SHOW_LIST_ADD:
            return{
                ...state,
                showListAdd:action.showListAdd
            }
        case SET_LIST_COUNTER:
            return{
                ...state,
                userLists: updateListCounter([...state.userLists],[...state.userListsKeys],action)
            }
        case SET_MOBILE_DEVICE:
            return{
                ...state,
                isMobileDevice:action.isMobileDevice
            }
        case SET_SHOW_LISTS:
            return{
                ...state,
                showLists:action.showLists
            }
        default:
            return {
                ...state,
                phase:INIT
            }
    }
}

export default listReducer;