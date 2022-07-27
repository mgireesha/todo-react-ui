import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { setShowListAdd } from '../redux/list/listActions';
import { createTask, setShowTaskAdd } from '../redux/task/taskActions';
import { TodoDatePicker } from '../TodoDatePicker';
import { getDateFormat } from '../utils/GlobalFuns';

export const AddTask = ({todoList}) => {
	const dispatch = useDispatch();
	const showListAdd = useSelector(state => state.list.showListAdd);
	const showTaskAdd = useSelector(state => state.task.showTaskAdd);
	const [dueDate,setDueDate] = useState(null);
	console.log(dueDate)
	const TogglAddTaskField = (showTaskAdd) => {
		if(showListAdd && showTaskAdd){
			dispatch(setShowListAdd(false));
		}
		dispatch(setShowTaskAdd(showTaskAdd));
	}

	const addNewTask = async (tDueDate) => {
		const taskName = document.getElementById('task-item-add-txt');
		//const tDueDate = document.getElementById('tDueDate').value;
		tDueDate = getDateFormat(tDueDate);
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
		setDueDate(null);
	}

	useEffect(()=>{
		setDueDate(null)
	},[showTaskAdd])
	
	return (
		<div className="task-add-main">
			{!showTaskAdd &&
				<div className="row" id="task-item-add-div" style={{ margin: 10 }} onClick={()=>TogglAddTaskField(true)}>
					<div className="task-item-add-div" style={{ width: 97.5 + '%' }}>
						<label className="col-sm-11">Add New Task </label>
						<label className="col-sm-1">+</label>
					</div>
				</div>
			}
			{showTaskAdd &&
				<div className="task-item-add-div task-item-add-field" style={{ margin: 10,width:95+'%' }} id="task-item-add-field" >
					<div className="row" style={{padding:5}}>
						<div className="col-sm-8" style={{marginTop:5}}>
							<input type="text" placeholder="Enter task name" id="task-item-add-txt" className="form-control" required />
						</div>
						<div className="task-add-due-date-div col-sm-4">
							<TodoDatePicker setDate={setDueDate} date={dueDate} placeholderText="Select due date" withPortal={false} popperClassName='date-picker-popper' />
							{/*<input type="datetime-local" className="task-add-due-date" id="tDueDate" title="Add due date" />*/}
						</div>
						<div className="task-add-button-div">
							<button className="task-add-button" id="task-add-button" onClick={()=>addNewTask(dueDate)}>Add</button>
						</div>
						<input type="hidden" name="listName" id="listName" value="To do" />
						<input type="hidden" name="listId" id="listId" value="271" />
					</div>
				</div>
			}
		</div>
	);
}