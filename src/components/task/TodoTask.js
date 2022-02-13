import {React,useState,useEffect} from 'react';

import {TaskListName} from './TaskListName.js';
import {TaskItem} from './TaskItem.js';
import {TaskCompletedCounter} from './TaskCompletedCounter.js';
import {AddTask} from './AddTask.js';



export const TodoTask = ({taskList, setTaskList, taskListKeys, taskDetail, onUpdateCount, onGetAuth, onConvertDateT, 
							setShowListAddB,showTaskAdd,setShowTaskAdd,showTaskDetls,onToggleShowtaskDetls,setShowtaskDetls, 
							onCompleteTask, onDeleteTask, onSetTodoListToTaskLIst, disableDiv, enableDiv,getServiceURI
					}) => {
	
	let todoIndex = taskListKeys.findIndex(obj => obj==="todoList");
	let taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
	let taskIndexC = taskListKeys.findIndex(obj => obj==="taskListC");
	
	const [isAddRemindMe, setAddRemindMe] = useState(false);
	const [isShowCmptdTsks, setShowCmptdTsks] = useState(true);
	
	/*useEffect(()=>{
		setTaskListT1(taskListT);
		setTaskListC1(taskListC);
	},[taskListT,taskListC]);*/
	
	/*useEffect(()=>{
		setTaskListT1(taskList[taskIndexT]);
		setTaskListC1(taskList[taskIndexC]);
	},[taskList]);*/
	
	/*const onSetTodoListToTaskLIst = (todoList) => {
		let tempTaskList = [...taskList];
		tempTaskList[todoIndex][0] = todoList;
		setTaskList(tempTaskList);
	}*/
	
	useEffect(()=>{
		if(showTaskAdd && document.getElementById('task-item-add-txt')!=undefined){
			document.getElementById('task-item-add-txt').focus();
		}
	},[showTaskAdd]);
	
	const togglAddTaskField = (isShowTaskAddField) =>{
		setShowTaskAdd(isShowTaskAddField);
		setShowListAddB(false);
	} 
	
	const togglAddRemindMe = (isAddRemindMe) => setAddRemindMe(isAddRemindMe);
	
	/*const completeTask = async (event,taskId) => {
		if(event.target==event.currentTarget){
			event.stopPropagation();
		}
		disableDiv();
		const compt = document.getElementById("task-chkbx-"+taskId).checked;
		const compTskpld = {
			completed: compt, 
			taskId: 360
		}
		const settings = {
			method: 'PUT',
			headers: {
				'Authorization': onGetAuth(),
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(compTskpld)
		};
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/complete`, settings);
		const data = await response.json();
		if(await data.status=="success"){
			let tempTaskList = [...taskList];
			if(compt){
				let tempC =[data.todoTask, ...tempTaskList[taskIndexC]];
				tempTaskList[taskIndexC] = tempC;
				//setTaskListC1([data.todoTask,...taskList[taskIndexC]]);
				let tempT = [...tempTaskList[taskIndexT]];
				tempT = tempT.filter(function(task) { return task.taskId !== taskId });
				tempTaskList[taskIndexT] = tempT;
				//setTaskListT1(tempT);
			}else{
				//setTaskListT1([data.todoTask,...taskList[taskIndexT]]);
				let tempT =[data.todoTask, ...tempTaskList[taskIndexT]];
				tempTaskList[taskIndexT] = tempT;
				let tempC = [...tempTaskList[taskIndexC]];
				tempC = tempC.filter(function(task) { return task.taskId !== taskId });
				tempTaskList[taskIndexC] = tempC;
				//setTaskListC1(tempC);
			}
			setTaskList(tempTaskList);
			onSetBodyTask(data.todoTask);
			enableDiv();
		}
	}*/
	
	/*const deleteTask = async (event, taskId) => {
		if(event.target==event.currentTarget){
			event.stopPropagation();
		}
		disableDiv();
		const compt = document.getElementById("task-chkbx-"+taskId).checked;
		const settings = {
			method: 'DELETE',
			headers: {
				'Authorization': onGetAuth(),
				'Content-Type': 'application/json; charset=UTF-8'
			}
		};
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/`,settings);
		const data = await response.json();
		if(data.status=="success"){
			let tempTaskList = [...taskList];
			if(!compt){
				let tempT = [...tempTaskList[taskIndexT]];
				tempT = tempT.filter(function(task) { return task.taskId !== taskId })
				tempTaskList[taskIndexT] = tempT;
			}else{
				let tempC = [...tempTaskList[taskIndexC]];
				tempC = tempC.filter(function(task) { return task.taskId !== taskId })
				tempTaskList[taskIndexC] = tempC;
			}
			setTaskList(tempTaskList);
			onUpdateCount("remove",data.todoTask.listId);
			setShowtaskDetls(false);
			enableDiv();
		}
		
	}*/
	
	const addNewTask = async () => {
		const taskName = document.getElementById('task-item-add-txt');
		const remindMeDate = document.getElementById('remindMeDate').value;
		const listName = document.getElementById('tListName').value;
		const listId = document.getElementById('tListId').value;
		if(!taskName.checkValidity()){
			taskName.reportValidity();
			return false;
		}
		disableDiv();
		const addNewTaskPayLoad = {
			listId: listId,
			listName: listName,
			remindMe: isAddRemindMe,
			remindTime: remindMeDate,
			taskName: taskName.value
		};
		const settings = {
			method: 'POST',
			headers: {
				'Authorization': onGetAuth(),
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(addNewTaskPayLoad)
		};
		
		const response = await fetch(`${getServiceURI()}/todo/task/`, settings);
		const data = await response.json();
		if(await data.status==="success"){
			let tempTaskList = [...taskList];
			tempTaskList[taskIndexT] = [data.todoTask,...tempTaskList[taskIndexT]];
			setTaskList(tempTaskList);
			onUpdateCount("add",data.todoTask.listId);
			document.getElementById('task-item-add-txt').value="";
			document.getElementById('remindMeDate').vaue="";
			setAddRemindMe(false);
			setShowTaskAdd(false);
			setShowtaskDetls(false);
		}
		setShowListAddB(false);
		enableDiv();
	}
	
	const toggleShowCmptdTsks = () => {
		if(isShowCmptdTsks){
			setShowCmptdTsks(false);
		}else{
			setShowCmptdTsks(true);
		}
	}
	
	return(
		<div className={showTaskDetls ? "col-sm-6 task-div" : "col-sm-8 task-div"} id="task-div">
				{taskList[todoIndex]!=undefined &&<TaskListName  todoList={taskList[todoIndex][0]} 
																onGetAuth={onGetAuth}
																onSetTodoListToTaskLIst={onSetTodoListToTaskLIst}
																disableDiv={disableDiv}
																enableDiv={enableDiv}
																getServiceURI={getServiceURI}
																/>}
				<div id="task-item-main">
					<div className="tasks-n-cmptd-div">
						{taskList[taskIndexT]!==undefined && taskList[taskIndexT].map(task=>
							<TaskItem key={task.tskId}
										onDelete={onDeleteTask} 
										onCompleteTask={onCompleteTask}  
										taskObj={task}
										taskDetail={taskDetail}
										todoList={taskList[todoIndex][0]}
										onConvertDateT={onConvertDateT}
										onToggleShowtaskDetls={onToggleShowtaskDetls}
										 />
						)}
					
					</div>
					<TaskCompletedCounter count={taskList[taskIndexC]!=undefined && taskList[taskIndexC].length} 
											onToggleShowCmptdTsks={toggleShowCmptdTsks}
											isShowCmptdTsks={isShowCmptdTsks}
											 />
					{isShowCmptdTsks && <div className="tasks-cmptd-div" id="tasks-cmptd-div">
						{taskList[taskIndexC]!==undefined && taskList[taskIndexC].map(task=>
							<TaskItem key={task.tskId}
										onDelete={onDeleteTask} 
										onCompleteTask={onCompleteTask}  
										taskObj={task}
										taskDetail={taskDetail}
										todoList={taskList[todoIndex][0]}
										onConvertDateT={onConvertDateT}
										onToggleShowtaskDetls={onToggleShowtaskDetls}
										 />
						)}
					</div>}
				</div>
				<AddTask showTaskAdd={showTaskAdd} onTogglAddTaskField={togglAddTaskField} onAddNewTask={addNewTask} onTogglAddRemindMe={togglAddRemindMe} />
				<input type="hidden" name="tListName" id="tListName" value={taskList[todoIndex]!==undefined && taskList[todoIndex][0].listName}  />
				<input type="hidden" name="tListId" id="tListId" value={taskList[todoIndex]!==undefined && taskList[todoIndex][0].listId} />
			</div>
	);
}