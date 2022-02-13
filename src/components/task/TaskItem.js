import React from 'react';

import calBlue from '../../images/calender-blue.png';
import dotBlue from '../../images/dot-blue.png';
import bellBlue from '../../images/bell-blue.png';
import noteBlueS1 from '../../images/note-blue-s1.png';
import deleteGrey2026 from '../../images/delete-grey-20x26.png';

import Nbsp from '../Nbsp.js';

export const TaskItem = ({ onDelete, onCompleteTask, taskObj, taskDetail, todoList, onConvertDateT, onToggleShowtaskDetls }) => {

	return (
		<div className="row" style={{ margin: 10 }} key={"task-item"+taskObj.taskId}>
			<div className={taskDetail != undefined && taskDetail.taskId == taskObj.taskId ? "task-item selected-task" : "task-item"}
				key={"task-item-" + taskObj.taskId} onClick={(event) => onToggleShowtaskDetls(event, taskObj.taskId)}>
				<div className="col-sm-11" style={{ padding: 10, paddingLeft: 0, width: 92 + '%' }}>
					<input type="checkbox" id={"task-chkbx-" + taskObj.taskId} className={"task-item-chkbx task-chkbx-" + taskObj.taskId}
						onChange={(event) => onCompleteTask(event, taskObj.taskId)} checked={taskObj.completed} />
					<label className={taskObj.completed ? "task-item-label strike-line" : "task-item-label"} ><Nbsp /> {taskObj.taskName}</label>
					<div className="row">
						<label className="col-sm-1" style={{ width: 1.5 }}></label>
						<div className="col-sm-11">
							{todoList.listName === "Important" && <div className="tc-row tc-tn-row">
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.listName}<Nbsp /></label>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
							</div>}
							<div className="tc-row tc-dd-row" style={{ display: taskObj.dueDate != undefined ? 'inline' : 'none' }}>
								<img alt="due date" src={calBlue} style={{ height: 0.8 + 'em' }} />
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.dueDate != undefined && onConvertDateT(taskObj.dueDate)}</label>
							</div>
							<div className="tc-row tc-rem-row" style={{ display: taskObj.remindTime != undefined ? 'inline' : 'none' }}>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
								<img alt="due date" src={bellBlue} style={{ height: 0.8 + 'em' }} />
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.remindTime != undefined && onConvertDateT(taskObj.remindTime)}</label>
							</div>
							<div className="tc-row tc-note-row" style={{ display: taskObj.note != undefined && taskObj.note != "" ? 'inline' : 'none' }}>
								<img alt="black dot" src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
								<img alt="note" src={noteBlueS1} style={{ height: 0.8 + 'em' }} />
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-1 task-item-delete" id={"task-item-delete-" + taskObj.taskId} onClick={(event) => onDelete(event, taskObj.taskId)} title="Delete Task">
					<img alt="black dot" id={"task-item-delete-img-" + taskObj.taskId} src={deleteGrey2026} style={{ height: 1.8 + 'em' }} />
				</div>
			</div>
		</div>
	);

}