import { React, useState, useEffect } from 'react';

import deleteRed2027 from '../../images/delete-red-20x27.png';

import {TaskDueDate} from './TaskDueDate.js';
import {TaskRemindDate} from './TaskRemindDate.js';
import {TaskDateSelector } from './TaskDateSelector.js';
import {TaskNote} from './TaskNote.js';
import {TaskMove} from './TaskMove';
import {TaskMoveListSelector} from './TaskMoveListSelector.js';
import {TaskUriRef} from './TaskUriRef.js';
import {ConfirmPopup} from '../ConfirmPopup.js';
import {TaskSteps} from './TaskSteps.js';

import whiteLeftArrow from '../../images/white-left-arrow.png';

export const TaskDetails = ({ task, onConvertDateT, isDatePassed, onSetTask, taskList, onSetShowtaskDetls, onMoveTask, onCompleteTask, onDeleteTask, onUpdateTask, isMobileDevice,
												days, monthsI, getAuth, disableDiv, enableDiv,getServiceURI,impListId}) => {

	//const currListName = document.getElementById('tListName').value;
	const currListName = document.getElementById('listName').value;
	
	const [showTaskNameField, setShowTaskNameField] = useState(false);
	const [showDueDateSel, setShowDueDateSel] = useState(false);
	const [showRemDateSel, setShowRemDateSel] = useState(false);
	const [moveLists,setMoveLists] = useState([]);
	const [showMoveListSel, setShowMoveListSel] = useState(false);
	const [showTaskUriRefTxt, setShowTaskUriRefTxt] = useState(false);
	
	const [showConfirmPopup,setShowConfirmPopup] = useState(false);

	function getLTH() {
		var today = new Date();
		var lth = today.getHours() + 4;
		if (lth >= 24) {
			lth = lth - 24;
		}
		return lth;
	}
	
	useEffect(()=>{
		if(showTaskNameField && document.getElementById('task-detail-label-text')!==null){
			document.getElementById('task-detail-label-text').focus();
			document.getElementById('task-detail-label-text').value = task.taskName;
		}
	},[showTaskNameField,task.taskName]);
	
	useEffect(()=>{
		setShowMoveListSel(false);
		setShowDueDateSel(false);
		setShowRemDateSel(false);
		setShowTaskUriRefTxt(false);
	},[task]);
	
	useEffect(() => {
		if(document.getElementById('task-detail-note-txt')!==null){
			document.getElementById('task-detail-note-txt').innerHTML=task.note;
		}
	},[task]);
	
	const onSetShowConfirmPopup = (event,showCnfrmPp) => {
		if(event.target===event.currentTarget && showCnfrmPp){
			event.stopPropagation();
		}
		setShowConfirmPopup(showCnfrmPp);
	}
	
	const deleteTask=async(taskId)=>{
		if(await onDeleteTask(taskId)){
			setShowConfirmPopup(false);
		}
	}
	
	const updateTaskName = async (event,taskId) => {
		const updatedTaskName = event.target.value;
		if(updatedTaskName===task.taskName){
			setShowTaskNameField(false);
			return false;
		}
		disableDiv();
		const updateTaskNamePayLoad = {
			taskId:taskId,
			taskName:updatedTaskName
		}
		const settings = {
			method:'PUT',
			headers:{
				'Authorization':getAuth(),
				'Content-Type':'application/json; charset=UTF-8'
			},
			body:JSON.stringify(updateTaskNamePayLoad)
		};
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/taskName`,settings);
		const data = await response.json();
		if(data.status==="success"){
			let tempTaskList = [...taskList];
			let taskListIndex;
			if(task.completed){
				taskListIndex=2;
			}else{
				taskListIndex=1;
			}
			let tempTaskG = tempTaskList[taskListIndex];
			tempTaskG.map((tempTask,index)=>{
				if(tempTask.taskId===taskId){
					tempTaskG[index]=data.todoTask;
				}
				return true;
			});
			tempTaskList[taskListIndex] = tempTaskG;
			onSetTask(data.todoTask);
			setShowTaskNameField(false);
		}
		enableDiv();
	}
	
	const onSetShowMoveListSel = (taskId) => {
		if (document.getElementById('task-item-detail-move-sel') !== null) {
			setShowMoveListSel(false);
		}else{
			fetchlistList(taskId);
		}
		
	}
	
	const fetchlistList = async (taskId) => {
		disableDiv();
		const settings = {
			method:'GET',
			headers:{
				'Authorization':getAuth()
			}
		}
		const response = await fetch(`${getServiceURI()}/todo/task/getListsOfUsers/${taskId}`,settings);
		const data = await response.json();
		if(data!==undefined){
			enableDiv();
			setShowMoveListSel(true);
				setShowDueDateSel(false);
				setShowRemDateSel(false);
			setMoveLists(data);
		}
	}
	
	useEffect(() => {
		if (document.getElementById('task-item-detail-move-sel') !== null) {
			document.getElementById('task-item-detail-move-sel').style.height = "10em";
			document.getElementById('task-item-detail-move-sel').style.width
				= document.getElementById('task-item-detail-dueDate').offsetWidth + 'px';
		}
	}, [moveLists]);
	
	const onSetShowDateSel = (event,tdElem) => {
		
		let divId='selRem';
		if(tdElem==='dueDate'){
			divId='selDue';
		}
		if (document.getElementById(divId) !== null) {
			document.getElementById(divId).style.height = "0px";
			setShowRemDateSel(false);
			setShowDueDateSel(false);
		} else {
			if(tdElem==='dueDate'){
				setShowRemDateSel(false);
				setShowMoveListSel(false);
				setShowDueDateSel(true);
			}else{
				setShowRemDateSel(true);
				setShowMoveListSel(false);
				setShowDueDateSel(false);
			}
		}
	}
	
	useEffect(() => {
		if (document.getElementById('selDue') !== null) {
			document.getElementById('selDue').style.height = "13em";
			document.getElementById('selDue').style.width
				= document.getElementById('task-item-detail-dueDate').offsetWidth + 'px';
		}
	}, [showDueDateSel]);
	
	useEffect(() => {
		if (document.getElementById('selRem') !== null) {
			document.getElementById('selRem').style.height = "12em";
			document.getElementById('selRem').style.width
				= document.getElementById('task-item-detail-dueDate').offsetWidth + 'px';
		}
	}, [showRemDateSel]);

	const updateTDDate = async (event, taskId, when, tdElem) => {
		disableDiv();
		let reqPayload = {
			"taskId": parseInt(taskId)
		}
		let remindTime;
		if(when==="pick"){
			if(tdElem==="remindMeDate"){
				remindTime = document.getElementById('pick-td-rem-date').value;
			}else{
				remindTime = document.getElementById('pick-td-dd-date').value;
			}
		}else{
			remindTime = getDateTime(when);
		}
		if(tdElem==="remindMeDate"){
			reqPayload.remindTime = remindTime;
			reqPayload.remindMe = true;
		}else{
			reqPayload.dueDate = remindTime;
		}
		const settings = {
			method: 'PUT',
			headers: {
				'Authorization': getAuth(),
				'Content-Type': "application/json; charset=utf-8"
			},
			body: JSON.stringify(reqPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/task/${taskId}/${tdElem}`, settings);
		const data = await response.json();
		onSetTask(data.todoTask);
		if(tdElem==="remindMeDate"){
			onSetShowDateSel('remindMeDate');
		}else{
			onSetShowDateSel('dueDate');
		}
		enableDiv();
	}
	function getDateTime(when) {
		var tDate = new Date();
		var lth = "09";
		if (when === "lth") {
			lth = getLTH();
			if (lth < 4) {
				tDate.setDate(tDate.getDate() + 1);
			}
			if (lth < 10) {
				lth = "0" + lth;
			}
		} else if (when === "tmr") {
			tDate.setDate(tDate.getDate() + 1);
		} else if (when === "nwd") {
			tDate.setDate(tDate.getDate() + 7);
		}
		let day = tDate.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		return  tDate.getFullYear() + "-" + monthsI[tDate.getMonth()] + "-" + day + "T" + lth + ":00";
	}

	return (
		<div className="col-sm-3 task-detail-div" id="task-detail-div">
		{isMobileDevice &&<img alt="back" src={whiteLeftArrow} style={{width:1.5+'em'}} onClick={()=>onSetShowtaskDetls(false)} />}
			<div className="task-detail-main" id="task-detail-main">
				<div className="row task-item-detail-name" id="task-item-detail-name">
					<input type="checkbox"  onChange={(event) => onCompleteTask(event,task.taskId)}
						className="task-item-chkbx-detail task-item-chkbx " checked={task.completed} />
					{!showTaskNameField && <label id="task-detail-label" className={task.completed ? "task-item-label strike-line" : "task-item-label"}
						onClick={()=>setShowTaskNameField(true)}>{task.taskName}
					</label>}
					{showTaskNameField && <input type="text" id="task-detail-label-text" className="task-detail-label-text form-control" 
							style={{ backgroundColor: '#403a3a'}} onBlur={(event)=>updateTaskName(event,task.taskId)} />}
					<input className="task-detail-star" type="checkbox" title="Important" 
									onChange={(event)=>onUpdateTask(event,"important", task.taskId)}  checked={task.important} />
				<TaskSteps task={task} getAuth={getAuth} disableDiv={disableDiv} enableDiv={enableDiv} getServiceURI={getServiceURI} onSetTask={onSetTask} />
				</div>
				
				<div style={{position:'relative'}}>
					<TaskDueDate task={task} onConvertDateT={onConvertDateT} isDatePassed={isDatePassed} onSetShowDateSel={onSetShowDateSel} showDueDateSel={showDueDateSel} onUpdateTask={onUpdateTask} />
					{showDueDateSel && <TaskDateSelector task={task} onUpdateTDDate={updateTDDate} onSetShowDateSel={onSetShowDateSel}
														days={days} getLTH={getLTH} tdElem="dueDate" />}
				</div>
				<div style={{position:'relative'}}>
					<TaskRemindDate task={task} onConvertDateT={onConvertDateT} onSetShowDateSel={onSetShowDateSel} onUpdateTask={onUpdateTask} showRemDateSel={showRemDateSel} />
					{showRemDateSel && <TaskDateSelector task={task} onUpdateTDDate={updateTDDate} onSetShowDateSel={onSetShowDateSel}
													days={days} getLTH={getLTH} tdElem="remindMeDate"
													/>}
				</div>
				<TaskNote task={task} onUpdateTask={onUpdateTask} />
				<div style={{position:'relative'}}>
					{currListName!=="Important"	&&	<TaskMove task={task} showMoveListSel={showMoveListSel} onSetShowMoveListSel={onSetShowMoveListSel} />}
					{showMoveListSel && <TaskMoveListSelector 	moveLists={moveLists!==null && moveLists}
															onMoveTask={onMoveTask}
															task={task}
														/>}
				</div>
				<TaskUriRef task={task} showTaskUriRefTxt={showTaskUriRefTxt} setShowTaskUriRefTxt={setShowTaskUriRefTxt} onUpdateTask={onUpdateTask} />
			</div>
			<div className="row task-detail-delete" id="task-detail-delete">
				<div style={{ textAlign: 'center', marginTop: 0.7 + 'em', width:80+'%' }}>
					<label className="task-detail-crtd-lbl">Created on {onConvertDateT(task.dateCreated)}</label>
				</div>
				<div style={{ marginTop: 0.7 + 'em' , width:20+'%'}}>
					<img alt="delete" className="task-detail-delete-label" id="task-delete-label" src={deleteRed2027}
														onClick={(event)=>onSetShowConfirmPopup(event,true)} />
				</div>
			</div>
			<ConfirmPopup showConfirmPopup={showConfirmPopup} onSetShowConfirmPopup={onSetShowConfirmPopup}
							onDelete={deleteTask}
							selctdItem={task.taskId}
							headerTxt="Delete Task"
							bodyTxt="Are you sure to delete this task ?"
							/>
		</div>
	);
}