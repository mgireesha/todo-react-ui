import {React,useEffect, useState} from 'react';
import {AddList} from './AddList.js';
import {ListGroup} from './ListGroup.js';
import {ListItem} from './ListItem.js';
import {ConfirmPopup} from '../ConfirmPopup.js';
export const TodoList = ({onshowTask,userLists,onSetUserLists,onSetUserListsKeys,onGetAuth,setShowListAddB,showListAddB,
							setShowTaskAdd,lisDivWidth,onSetTodoListToArchived,archivedListsIndex,commonListsIndex,disableDiv, enableDiv, getServiceURI}) => {

	const TOKEN_EXPIRED="TOKEN_EXPIRED";
	const[showArchived,setShowArchived] = useState(false);
	
	const [showConfirmPopup,setShowConfirmPopup] = useState(false);
	const [selctdList,setSelctdList] = useState(null);

	useEffect(()=>{
		if(setShowListAddB && document.getElementById('list-add-txt')!=undefined){
			document.getElementById('list-add-txt').focus();
		}
	},[showListAddB]);
	
	const onSetShowArchived = () =>{
		showArchivedLists();
		if(showArchived){
			setShowArchived(false);
		}else{
			setShowArchived(true);
		}
	}
	
	const togglAddListField = (isShowListAddField) => {
		setShowListAddB(isShowListAddField);
		setShowTaskAdd(false);
	}
	
	const addListToArchive = async (listId) => {
		disableDiv();
		const settings = {
			method:'PUT',
			headers:{
				'Authorization':onGetAuth(),
				'Content-Type':'application/json; charset=UTF-8'
			}
		}
		const response = await fetch(`${getServiceURI()}/todo/list/archiveList/${listId}`,settings);
		const data = await response.json();
		if(data.status=="success"){
			await onSetTodoListToArchived(data.todoList);
			showArchivedLists(data.todoList.groupName);
		}else if(data.status==TOKEN_EXPIRED){
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
			if(archivedListsIndex!=-1){
				temparchlist = [...userLists[archivedListsIndex]];
				tempListLength = temparchlist.length;
			}else{
				tempListLength = 1;
			}
			let archHeight;
			if(action=="archived"){
				tempListLength=tempListLength+1;
			}else if(action!=undefined){
				tempListLength=tempListLength-1;
			}
			if(temparchlist!=undefined){
				archHeight = 2.3+(2.5*tempListLength);
			}
			document.getElementById('list-item-archive').style.height=archHeight+"em";
		}
		
	}
	const onAddList = async () => {
		const listAddTxt = document.getElementById('list-add-txt');
		if(!listAddTxt.checkValidity()){
			listAddTxt.reportValidity();
			return false;
		}
		disableDiv();
		const  addListPayload = {
		"listName" : listAddTxt.value
		}
		const settings = {
			method: 'POST',
			headers: {
				'Authorization': onGetAuth(),
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(addListPayload)
		};
		const response = await fetch(`${getServiceURI()}/todo/list/`,settings);
		const data = await response.json();
		let newState = [...userLists];
		//let commonListsIndex;
		if(commonListsIndex==undefined || commonListsIndex==-1){
			commonListsIndex = newState.length;
			newState[commonListsIndex]=[data.todoList];
			onSetUserListsKeys(commonListsIndex,data.todoList.groupName);
		}else{
			newState[commonListsIndex]=[...newState[commonListsIndex], data.todoList];
		}
		onSetUserLists(newState);
		if(data.status==="success"){
			setShowListAddB(false);
		}
		enableDiv();
	}
	
	const onSetShowConfirmPopup = (event,showCnfrmPp,listId) => {
		if(event.target==event.currentTarget && showCnfrmPp){
			event.stopPropagation();
		}
		setSelctdList(listId);
		setShowConfirmPopup(showCnfrmPp);
	}
	
	const deleteList = async (listId) => {
		disableDiv();
		const settings = {
			method:'DELETE',
			headers:{
				'Authorization': onGetAuth(),
				'Content-Type': 'application/json; charset=UTF-8'
			}
		}
		const response = await fetch(`${getServiceURI()}/todo/list/${listId}`,settings);
		const data = await response.json();
		if(data.status==="success"){
			let tempLists = [...userLists];
			let tempListG;
			let tempIndex;
			if(data.todoList.groupName=="archived"){
				tempIndex = archivedListsIndex;
			}else{
				tempIndex = commonListsIndex;
			}
			tempListG = [...tempLists[tempIndex]];
			tempListG = tempListG.filter(function(list){return listId!==list.listId});
			tempLists[tempIndex] = [...tempListG];
			let cListId=document.getElementById('listId').value;
			if(cListId==listId){
				onshowTask(null,tempLists[0][0].listId);
			}
			onSetUserLists(tempLists);
			document.getElementById('currentACTSel').value='';
			setShowConfirmPopup(false);
		}
		enableDiv();
	}
	
	
	return (
		<div className="col-sm-3 list-div" id="list-div" style={{width:lisDivWidth}}>
			<div className="list-item-main-comb" id="list-item-main-comb">
				<div className="list-item-main" id="list-item-main">
				{
					userLists!=undefined && userLists!="" && userLists.map((uList,index) =>
						uList!=undefined && uList.length>0 && uList[0].groupName!="archived" &&
							<ListGroup key={index} 
								lists={uList} 
								groupName={uList[0].groupName} 
								onshowTask={onshowTask} 
								onDeleteList={deleteList}
								onAddListToArchive={addListToArchive}
								onSetShowConfirmPopup={onSetShowConfirmPopup}
								/>
					)}
				</div>
				<div className="list-item-archive" id="list-item-archive">
					<label>Archived</label>
					<span onClick={onSetShowArchived} style={{float: 'right',marginRight: 5, cursor:'pointer'}}>{showArchived ? '-' : '+'}</span>
					{showArchived && userLists!=undefined && archivedListsIndex!=-1 &&  userLists[archivedListsIndex].length>0 && userLists[archivedListsIndex].map(uIList=>
						<ListItem key={uIList.listId} list={uIList} onshowTask={onshowTask} onDeleteList={deleteList}
										onAddListToArchive={addListToArchive} onSetShowConfirmPopup={onSetShowConfirmPopup}
										 />
					)}
				</div>
			</div>
				<AddList showListAdd={showListAddB} onTogglAddListField={togglAddListField} onAddList={onAddList} />
				<ConfirmPopup showConfirmPopup={showConfirmPopup} onSetShowConfirmPopup={onSetShowConfirmPopup}
							onDelete={deleteList}
							selctdItem={selctdList}
							headerTxt="Delete List"
							bodyTxt="Are you sure to delete this list ?"
							/>
			</div>
	);
}