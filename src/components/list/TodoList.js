import {React,useEffect, useState} from 'react';
import {AddList} from './AddList.js';
import {ListGroup} from './ListGroup.js';
import {ListItem} from './ListItem.js';
import {ConfirmPopup} from '../ConfirmPopup.js';

import {useDispatch, useSelector} from 'react-redux';
import { disableDiv, enableDiv, getAuth, getServiceURI } from '../utils/GlobalFuns.js';
import { createList, deleteList } from '../redux/list/listActions.js';
import { fetTaskList, setTaskDetailShow } from '../redux/task/taskActions.js';
import { DELETE_LIST_SUCCESS } from '../redux/list/listActionTypes.js';

export const TodoList = () => {
	const dispatch = useDispatch();
	const TOKEN_EXPIRED="TOKEN_EXPIRED";
	const[showArchived,setShowArchived] = useState(false);
	const userLists = useSelector(state => state.list.userLists);
	const userListsKeys = useSelector(state => state.list.userListsKeys);
	let archivedListsIndex = userListsKeys.findIndex(obj => obj==="archived");
	let defaultListIndex = userListsKeys.findIndex(obj =>obj==='default');
	const taskList = useSelector(state => state.task.taskList);
	const taskListKeys = useSelector(state => state.task.taskListKeys);
	let todoIndex = taskListKeys.findIndex(obj => obj==="todoList");
	const todoList = taskList[todoIndex]!==undefined?taskList[todoIndex][0]:undefined;
	const phase = useSelector(state => state.list.phase);
	const listDivWidth = useSelector(state => state.list.listDivWidth);
	const [showConfirmPopup,setShowConfirmPopup] = useState(false);
	const [selctdList,setSelctdList] = useState(null);

	
	const onSetShowArchived = () =>{
		showArchivedLists();
		if(showArchived){
			setShowArchived(false);
		}else{
			setShowArchived(true);
		}
	}
	
	const addListToArchive = async (listId) => {
		disableDiv();
		const settings = {
			method:'PUT',
			headers:{
				'Authorization':getAuth(),
				'Content-Type':'application/json; charset=UTF-8'
			}
		}
		const response = await fetch(`${getServiceURI()}/todo/list/archiveList/${listId}`,settings);
		const data = await response.json();
		if(data.status==="success"){
			//await onSetTodoListToArchived(data.todoList);
			showArchivedLists(data.todoList.groupName);
		}else if(data.status===TOKEN_EXPIRED){
			document.cookie="jToken=;";
			window.location.reload();
		}
		enableDiv();
	}
	
	const showArchivedLists = (action) => {
		if(showArchived && !action){
			document.getElementById('list-item-archive').style.height="2.3em";
		}else{
			let tempListLength;
			let temparchlist;
			if(archivedListsIndex!==-1){
				temparchlist = [...userLists[archivedListsIndex]];
				tempListLength = temparchlist.length;
			}else{
				tempListLength = 1;
			}
			let archHeight;
			if(action==="archived"){
				tempListLength=tempListLength+1;
			}else if(action!==undefined){
				tempListLength=tempListLength-1;
			}
			if(temparchlist!==undefined){
				archHeight = 2.3+(2.5*tempListLength);
			}
			document.getElementById('list-item-archive').style.height=archHeight+"em";
		}
		
	}
	const onAddList = () => {
		const listAddTxt = document.getElementById('list-add-txt');
		if(!listAddTxt.checkValidity()){
			listAddTxt.reportValidity();
			return false;
		}
		const  addListPayload = {
		"listName" : listAddTxt.value
		}
		dispatch(createList(addListPayload));
	}
	
	const onSetShowConfirmPopup = (event,showCnfrmPp,list) => {
		if(event.target===event.currentTarget && showCnfrmPp){
			event.stopPropagation();
		}
		setSelctdList(list);
		setShowConfirmPopup(showCnfrmPp);
	}
	
	useEffect(()=>{
		if(phase === DELETE_LIST_SUCCESS && selctdList.listId===todoList.listId){
			dispatch(setTaskDetailShow(false));
			dispatch(fetTaskList(userLists[defaultListIndex][0].listId));
		}
	},[phase])

	const initDeleteList = (list) => {
		dispatch(deleteList(list));
		setShowConfirmPopup(false);
	}
	
	
	return (
		<div className="col-sm-3 list-div" id="list-div" style={{width:listDivWidth}}>
			 <div className="list-item-main-comb" id="list-item-main-comb">
				<div className="list-item-main" id="list-item-main">
				{
					userLists!==null && userLists.map((uList,index) =>
						uList!==null && uList.length>0 && uList[0].groupName!=="archived" &&
							<ListGroup key={index} 
								lists={uList} 
								groupName={uList[0].groupName} 
								onDeleteList={deleteList}
								onAddListToArchive={addListToArchive}
								onSetShowConfirmPopup={onSetShowConfirmPopup}
								/>
					)}
				</div>
				<div className="list-item-archive" id="list-item-archive">
					<label>Archived</label>
					<span onClick={onSetShowArchived} style={{float: 'right',marginRight: 5, cursor:'pointer'}}>{showArchived ? '-' : '+'}</span>
					{showArchived && userLists!==null && archivedListsIndex!==-1 &&  userLists[archivedListsIndex].length>0 && userLists[archivedListsIndex].map(uIList=>
						<ListItem key={uIList.listId} list={uIList} onDeleteList={deleteList}
										onAddListToArchive={addListToArchive} onSetShowConfirmPopup={onSetShowConfirmPopup}
										 />
					)}
				</div>
			</div>
				<AddList onAddList={onAddList} />
				<ConfirmPopup showConfirmPopup={showConfirmPopup} onSetShowConfirmPopup={onSetShowConfirmPopup}
							onDelete={initDeleteList}
							selctdItem={selctdList}
							headerTxt="Delete List"
							bodyTxt="Are you sure to delete this list ?"
							/> 
			</div>
	);
}