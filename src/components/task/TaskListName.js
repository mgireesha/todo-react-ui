import {React,useState,useEffect} from 'react';

export const TaskListName = ({todoList,onGetAuth,onSetTodoListToTaskLIst,disableDiv, enableDiv,getServiceURI}) => {
	
	const [showListNameField, setShowListNameField] = useState(false);
	
	useEffect(()=>{
		if(showListNameField && document.getElementById('task-list-name-text')!==null){
			document.getElementById('task-list-name-text').focus();
			document.getElementById('task-list-name-text').value = todoList.listName;
		}
	},[showListNameField,todoList.listName]);
	
	const updateListName = async(event,listId) => {
		const updatedListName = event.target.value;
		if(updatedListName===todoList.listName){
			setShowListNameField(false);
			return false;
		}
		disableDiv();
		const updateListNamePayLoad = {
			listId:listId,
			listName:updatedListName
		}
		const settings = {
			method:'PUT',
			headers:{
				'Authorization':onGetAuth(),
				'Content-Type':'application/json; charset=UTF-8'
			},
			body:JSON.stringify(updateListNamePayLoad)
		};
		const response = await fetch(`${getServiceURI()}/todo/list/${listId}/`,settings);
		const data = await response.json();
		if(data.status==="success"){
			let respList = data.todoList;
			respList.taskCount=todoList.taskCount;
			onSetTodoListToTaskLIst(respList);
			setShowListNameField(false);
		}
		enableDiv();
	}
	
	return (
		<div className="row task-list-name" style={{minHeight: 3.125+'em'}}>
			{!showListNameField && 
				<h2 className="task-list-name-header" onClick={todoList.groupName!=="default" ? ()=>setShowListNameField(true) : null} 
							id="task-list-name-header-271">{todoList.listName}</h2>
			}
			{showListNameField && <input type="text" id="task-list-name-text" className="task-list-name-text form-control" style={{backgroundColor: '#403A3A'}} onBlur={(event)=>updateListName(event,todoList.listId)} />}
		</div>
	);
}