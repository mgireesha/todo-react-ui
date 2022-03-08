import {React} from 'react';

import calBlue from '../../images/calender-blue.png';
import dotBlue from '../../images/dot-blue.png';
import bellBlue from '../../images/bell-blue.png';
import noteBlueS1 from '../../images/note-blue-s1.png';
import deleteGrey2026 from '../../images/delete-grey-20x26.png';

import Nbsp from '../Nbsp.js';

export const TaskItem = ({ onDelete, onCompleteTask, taskObj, taskDetail, todoList, 
							onConvertDateT, dueDateColor, onToggleShowtaskDetls, onSetShowConfirmPopup, showConfirmPopup }) => {
	let comptdSteps;
	if(taskObj!==null && taskObj.taskSteps!==null){
		comptdSteps = taskObj.taskSteps.filter(function(step){
			return step.completed;
		});
	}
	return (
		<div className="row" style={{ margin: 10 }} key={"task-item"+taskObj.taskId}>
			<div className={taskDetail !== null && taskDetail.taskId === taskObj.taskId ? "task-item selected-task" : "task-item"}
				key={"task-item-" + taskObj.taskId} onClick={(event) => onToggleShowtaskDetls(event, taskObj.taskId)}>
				<div className="col-sm-11" style={{ padding: 10, paddingLeft: 0, width: 92 + '%' }}>
					<input type="checkbox" id={"task-chkbx-" + taskObj.taskId} className={"task-item-chkbx task-chkbx-" + taskObj.taskId}
						onChange={(event) => onCompleteTask(event, taskObj.taskId)} checked={taskObj.completed} />
					<label className={taskObj.completed ? "task-item-label strike-line" : "task-item-label"} >{taskObj.taskName}</label>
					<div className="row">
						<div className="col-sm-11" style={{marginLeft:1.6+'em'}}>
							{taskObj!==null && taskObj.taskSteps!==null && taskObj.taskSteps.length>0 &&
								<div className='tc-row'>
									<Nbsp /><label style={{ fontSize: 10 }}>
										{comptdSteps.length+'/'+taskObj.taskSteps.length}
									</label>
									<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
								</div>
							}
							{todoList.listName === "Important" && <div className="tc-row tc-tn-row">
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.listName}<Nbsp /></label>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
							</div>}
							<div className="tc-row tc-dd-row" style={{ display: taskObj.dueDate !== null ? 'inline' : 'none' }}>
								<img key='due date' alt="due date" src={calBlue} style={{ height: 0.8 + 'em' }} />
								<label style={{ fontSize: 12, color:taskObj.completed?'':dueDateColor(taskObj.dueDate)}}><Nbsp />{taskObj.dueDate !== null && onConvertDateT(taskObj.dueDate)}</label>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
							</div>
							<div className="tc-row tc-rem-row" style={{ display: taskObj.remindTime !== null ? 'inline' : 'none' }}>
								<img key='remind time' alt="remind time" src={bellBlue} style={{ height: 0.8 + 'em' }} />
								<label style={{ fontSize: 12 }}><Nbsp />{taskObj.remindTime !== null && onConvertDateT(taskObj.remindTime)}</label>
								<img alt="." src={dotBlue} style={{ height: 0.2 + 'em', margin: 5 }} />
							</div>
							<div className="tc-row tc-note-row" style={{ display: taskObj.note !== null && taskObj.note !== "" ? 'inline' : 'none' }}>
								<img key='note' alt="note" src={noteBlueS1} style={{ height: 0.8 + 'em' }} title={taskObj.note} />
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-1 task-item-delete" id={"task-item-delete-" + taskObj.taskId} onClick={(event)=>onSetShowConfirmPopup(event,true,taskObj.taskId)} title="Delete Task">
					<img alt="delete task" id={"task-item-delete-img-" + taskObj.taskId} src={deleteGrey2026} style={{ height: 1.8 + 'em' }} />
				</div>
			</div>
		</div>
	);

}