import React from 'react';

export const AddTask = ({ showTaskAdd, onTogglAddTaskField, onAddNewTask }) => {
	return (
		<div className="task-add-main">

			{!showTaskAdd &&
				<div className="row" id="task-item-add-div" style={{ margin: 10 }} onClick={() => onTogglAddTaskField(true)}>
					<div className="task-item-add-div" style={{ width: 97.5 + '%' }}>
						<label className="col-sm-11">Add New Task </label>
						<label className="col-sm-1">+</label>
					</div>
				</div>
			}
			{showTaskAdd &&
				<div className="task-item-add-div task-item-add-field" style={{ margin: 10,width:95+'%' }} id="task-item-add-field" >
					<div className="row" style={{padding:5}}>
						<div className="col-sm-8" style={{paddingLeft:0}}>
							<input type="text" placeholder="Enter task name" id="task-item-add-txt" className="form-control" required />
						</div>
						<div className="task-add-due-date-div col-sm-2">
							<input type="datetime-local" className="task-add-due-date" id="tDueDate" title="Add due date" />
						</div>
						<div className="task-add-button-div col-sm-2">
							<button className="task-add-button" id="task-add-button" onClick={onAddNewTask}>Add</button>
						</div>
						<input type="hidden" name="listName" id="listName" value="To do" />
						<input type="hidden" name="listId" id="listId" value="271" />
					</div>
				</div>
			}
		</div>
	);
}