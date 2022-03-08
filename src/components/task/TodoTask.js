import {React,useState,useEffect} from 'react';

import {TaskListName} from './TaskListName.js';
import {TaskItem} from './TaskItem.js';
import {TaskCompletedCounter} from './TaskCompletedCounter.js';
import {ConfirmPopup} from '../ConfirmPopup.js';
import {AddTask} from './AddTask.js';

import whiteLeftArrow from '../../images/white-left-arrow.png';

export const TodoTask = ({taskList, setTaskList, taskListKeys, taskDetail, onUpdateCount, onGetAuth, onConvertDateT, dueDateColor,
							setShowListAddB,showTaskAdd,setShowTaskAdd,showTaskDetls,onToggleShowtaskDetls,setShowtaskDetls, 
							onCompleteTask, onDeleteTask, onSetShowTasks, isMobileDevice, onSetTodoListToTaskLIst, disableDiv, enableDiv,getServiceURI
					}) => {
	
	let todoIndex = taskListKeys.findIndex(obj => obj==="todoList");
	let taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
	let taskIndexC = taskListKeys.findIndex(obj => obj==="taskListC");
	
	// const [isAddRemindMe, setAddRemindMe] = useState(false);
	const [isShowCmptdTsks, setShowCmptdTsks] = useState(true);
	
	const [showConfirmPopup,setShowConfirmPopup] = useState(false);
	const [selctdTask,setSelctdTask] = useState(null);
	const onSetShowConfirmPopup = (event,showCnfrmPp,taskId) => {
		if(event.target===event.currentTarget && showCnfrmPp){
			event.stopPropagation();
		}
		setSelctdTask(taskId);
		setShowConfirmPopup(showCnfrmPp);
	}
	
	const deleteTask=async(taskId)=>{
		if(await onDeleteTask(taskId)){
			setShowConfirmPopup(false);
		}
	}
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
		if(showTaskAdd && document.getElementById('task-item-add-txt')!==null){
			document.getElementById('task-item-add-txt').focus();
		}
	},[showTaskAdd]);
	
	const togglAddTaskField = (isShowTaskAddField) =>{
		setShowTaskAdd(isShowTaskAddField);
		setShowListAddB(false);
	} 
	
	// const togglAddRemindMe = (isAddRemindMe) => setAddRemindMe(isAddRemindMe);
	
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
		const tDueDate = document.getElementById('tDueDate').value;
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
			dueDate: tDueDate,
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
			document.getElementById('tDueDate').vaue="";
			// setAddRemindMe(false);
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
		{isMobileDevice &&<img alt="back" src={whiteLeftArrow} style={{width:1.5+'em'}} onClick={()=>onSetShowTasks(false)} />}
				{taskList[todoIndex]!==undefined &&<TaskListName  todoList={taskList[todoIndex][0]} 
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
										dueDateColor={dueDateColor}
										onToggleShowtaskDetls={onToggleShowtaskDetls}
										onSetShowConfirmPopup={onSetShowConfirmPopup}
										 />
						)}
					
					</div>
					<TaskCompletedCounter count={taskList[taskIndexC]!==undefined && taskList[taskIndexC]!==null && taskList[taskIndexC].length} 
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
										dueDateColor={dueDateColor}
										onToggleShowtaskDetls={onToggleShowtaskDetls}
										onSetShowConfirmPopup={onSetShowConfirmPopup}
										 />
						)}
					</div>}
				</div>
				<ConfirmPopup showConfirmPopup={showConfirmPopup} onSetShowConfirmPopup={onSetShowConfirmPopup}
							onDelete={deleteTask}
							selctdItem={selctdTask}
							headerTxt="Delete Task"
							bodyTxt="Are you sure to delete this task ?"
							/>
				<AddTask showTaskAdd={showTaskAdd} onTogglAddTaskField={togglAddTaskField} onAddNewTask={addNewTask} />
				<input type="hidden" name="tListName" id="tListName" value={taskList[todoIndex]!==undefined && taskList[todoIndex][0].listName}  />
				<input type="hidden" name="tListId" id="tListId" value={taskList[todoIndex]!==undefined && taskList[todoIndex][0].listId} />
			</div>
	);
}