import {React,useState,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {TaskListName} from './TaskListName.js';
import {TaskItem} from './TaskItem.js';
import {TaskCompletedCounter} from './TaskCompletedCounter.js';
import {ConfirmPopup} from '../ConfirmPopup.js';
import {AddTask} from './AddTask.js';

import whiteLeftArrow from '../../images/white-left-arrow.png';
import { createTask, deleteTask, setShowTasks } from '../redux/task/taskActions.js';
import { fethUserLists, setShowLists } from "../redux/list/listActions.js";
import { FETCH_TASK_SUCCESS } from '../redux/task/taskActionTypes.js';
import { getDateFormat } from '../utils/GlobalFuns.js';

export const TodoTask = () => {
	
	const dispatch = useDispatch();
	const taskList = useSelector(state => state.task.taskList);
	const taskListKeys = useSelector(state => state.task.taskListKeys);
	const todoIndex = taskListKeys.findIndex(obj => obj==="todoList");
	const taskIndexT = taskListKeys.findIndex(obj => obj==="taskListT");
	const taskIndexC = taskListKeys.findIndex(obj => obj==="taskListC");
	const showTaskDetls = useSelector(state => state.task.taskDetailShow);
	const showTaskAdd = useSelector(state => state.task.showTaskAdd);
	const isMobileDevice = useSelector(state => state.list.isMobileDevice);
	const todoList = taskList[todoIndex]!==undefined?taskList[todoIndex][0]:undefined;
	const [isShowCmptdTsks, setShowCmptdTsks] = useState(true);
	const [showConfirmPopup,setShowConfirmPopup] = useState(false);
	const [selctdTask,setSelctdTask] = useState(null);
	const phase = useSelector(state => state.task.phase);
	const [taskIdLst,setTasIdLst] = useState([]);
	useEffect(()=>{
		let tempIdLst = [];
		if(taskList!==undefined && taskList.length>0){
			tempIdLst =  taskList[taskIndexT].map(task=> task.taskId).reverse()
		}else{
			tempIdLst =  []
		}
		setTasIdLst(tempIdLst)
	},[taskList])
	console.log('taskIdLst',taskIdLst)
	const onMobileGoback = () => {
		dispatch(fethUserLists(isMobileDevice));
		dispatch(setShowTasks(false))
		dispatch(setShowLists(true));
	}

	useEffect(()=>{
		if(phase===FETCH_TASK_SUCCESS && isMobileDevice){
			dispatch(setShowTasks(false));
		}
	},[phase,dispatch,isMobileDevice]);

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
	
	
	const toggleShowCmptdTsks = () => {
		if(isShowCmptdTsks){
			setShowCmptdTsks(false);
		}else{
			setShowCmptdTsks(true);
		}
	}

	const revLst = () => {
		const tempLst = [...taskIdLst].reverse();
		setTasIdLst(tempLst)
	}
	
	return(
		<div className={showTaskDetls ? "col-sm-6 task-div" : "col-sm-8 task-div"} id="task-div">
		{isMobileDevice &&<img alt="back" src={whiteLeftArrow} style={{width:1.5+'em'}} onClick={onMobileGoback} />}
				{todoList!==undefined && todoList.listId!==undefined && <TaskListName  todoList={todoList}  />}
				<div id="task-item-main">
					<div className="tasks-n-cmptd-div">
						{/* {taskList[taskIndexT]!==undefined && taskList[taskIndexT].map(task=>
							<TaskItem key={task.tskId} 
										taskObj={task}
										todoList={taskList[todoIndex][0]}
										onSetShowConfirmPopup={onSetShowConfirmPopup}
										 />
						)} */}
						{taskList[taskIndexT]!==undefined && taskIdLst.map(taskId=>{
							const task = taskList[taskIndexT].find(tsk=> tsk.taskId===taskId);
							return(
								<TaskItem key={task.tskId} 
									taskObj={task}
									todoList={taskList[todoIndex][0]}
									onSetShowConfirmPopup={onSetShowConfirmPopup}
									revLst={revLst}
							 	/>
							)
						}
						)}
					
					</div>
					<TaskCompletedCounter count={taskList[taskIndexC]!==undefined && taskList[taskIndexC].length} 
											onToggleShowCmptdTsks={toggleShowCmptdTsks}
											isShowCmptdTsks={isShowCmptdTsks}
											 />
					{isShowCmptdTsks && <div className="tasks-cmptd-div" id="tasks-cmptd-div">
						{taskList[taskIndexC]!==undefined && taskList[taskIndexC].map(task=>
							<TaskItem key={task.tskId}
										taskObj={task}
										todoList={taskList[todoIndex][0]}
										onSetShowConfirmPopup={onSetShowConfirmPopup}
										revLst={revLst}
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
				<AddTask todoList={todoList} />
			</div>
	);
}