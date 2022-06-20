import {React,useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {TaskListName} from './TaskListName.js';
import {TaskItem} from './TaskItem.js';
import {TaskCompletedCounter} from './TaskCompletedCounter.js';
import {ConfirmPopup} from '../ConfirmPopup.js';
import {AddTask} from './AddTask.js';

import whiteLeftArrow from '../../images/white-left-arrow.png';
import { createTask, deleteTask, setShowTasks } from '../redux/task/taskActions.js';

export const TodoTask = () => {
	
	const dispatch = useDispatch();
	const taskList = useSelector(state => state.task.taskList);
	const taskListKeys = useSelector(state => state.task.taskListKeys);
	const showTaskDetls = useSelector(state => state.task.taskDetailShow);
	const showTaskAdd = useSelector(state => state.task.showTaskAdd);
	const isMobileDevice = useSelector(state => state.list.isMobileDevice);
	let todoIndex = taskListKeys.findIndex(obj => obj==="todoList");
	let taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
	let taskIndexC = taskListKeys.findIndex(obj => obj==="taskListC");
	const todoList = taskList[todoIndex]!==undefined?taskList[todoIndex][0]:undefined;
	console.log(todoList);
	const [isShowCmptdTsks, setShowCmptdTsks] = useState(true);
	
	const [showConfirmPopup,setShowConfirmPopup] = useState(false);
	const [selctdTask,setSelctdTask] = useState(null);
	const onSetShowConfirmPopup = (event,showCnfrmPp,task) => {
		if(event.target===event.currentTarget && showCnfrmPp){
			event.stopPropagation();
		}
		setSelctdTask(task);
		setShowConfirmPopup(showCnfrmPp);
	}
	
	const initDeleteTask=async(task)=>{
		dispatch(deleteTask(task,todoList));
		setShowConfirmPopup(false);
	}
	
	useEffect(()=>{
		if(showTaskAdd && document.getElementById('task-item-add-txt')!==null){
			document.getElementById('task-item-add-txt').focus();
		}
	},[showTaskAdd]);
	
	const addNewTask = async () => {
		const taskName = document.getElementById('task-item-add-txt');
		const tDueDate = document.getElementById('tDueDate').value;
		const currentList = todoList;
		if(!taskName.checkValidity()){
			taskName.reportValidity();
			return false;
		}
		const addNewTaskPayLoad = {
			listId: currentList.listId,
			listName: currentList.listName,
			dueDate: tDueDate,
			taskName: taskName.value
		};
		dispatch(createTask(addNewTaskPayLoad,todoList));
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
		{isMobileDevice &&<img alt="back" src={whiteLeftArrow} style={{width:1.5+'em'}} onClick={()=>dispatch(setShowTasks(false))} />}
				{todoList!==undefined && todoList.listId!==undefined && <TaskListName  todoList={todoList}  />}
				<div id="task-item-main">
					<div className="tasks-n-cmptd-div">
						{taskList[taskIndexT]!==undefined && taskList[taskIndexT].map(task=>
							<TaskItem key={task.tskId} 
										taskObj={task}
										todoList={taskList[todoIndex][0]}
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
										taskObj={task}
										todoList={taskList[todoIndex][0]}
										onSetShowConfirmPopup={onSetShowConfirmPopup}
										 />
						)}
					</div>}
				</div>
				<ConfirmPopup showConfirmPopup={showConfirmPopup} onSetShowConfirmPopup={onSetShowConfirmPopup}
							onDelete={initDeleteTask}
							selctdItem={selctdTask}
							headerTxt="Delete Task"
							bodyTxt="Are you sure to delete this task ?"
							/>
				<AddTask onAddNewTask={addNewTask} />
			</div>
	);
}