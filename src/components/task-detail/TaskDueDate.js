import { React } from 'react';

import calBlue from '../../images/calender-blue.png';

export const TaskDueDate = ({task,onConvertDateT,onSetShowDateSel, onUpdateTask}) => {
	return (
		<div onClick={(event)=>onSetShowDateSel(event,'dueDate')} className="row task-item-detail-dueDate task-item-detail-elem"
			id="task-item-detail-dueDate" >
			<div className="task-detail-dueDate-div" style={{width:10+'%'}}>
				<img alt="due date" className="task-detail-dueDate-img" id="task-detail-remind-img" src={calBlue} />
			</div>
			<div className="task-detail-font-size" style={{ padding: 10,width:80+'%' }}>
				<label><span id="task-detail-dueDate-span">{task.dueDate!=undefined ? onConvertDateT(task.dueDate) : "Select a due date"}</span></label>
			</div>
			<div className="task-detail-remind-div task-detail-dueDate-del"
				id="task-detail-dueDate-del" style={{ display: task.dueDate!=undefined ? "inline" : "none" , width:10+'%'}}>
				<label id="task-detail-dueDate-del-lbl-617" onClick={(event)=>onUpdateTask(event,'removeDueDate',task.taskId)}>X</label>
			</div>
		</div>
	);
}