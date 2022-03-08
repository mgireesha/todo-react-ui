import { React } from 'react';

import calBlue from '../../images/calender-blue.png';
//dfsd
export const TaskDueDate = ({task,onConvertDateT,isDatePassed,onSetShowDateSel, onUpdateTask, showDueDateSel}) => {
	return (
		<div onClick={(event)=>onSetShowDateSel(event,'dueDate')} className="row task-item-detail-dueDate task-item-detail-elem"
			id="task-item-detail-dueDate" >
			<div className="task-detail-dueDate-div" style={{width:10+'%'}}>
				<img alt="due date" className="task-detail-dueDate-img" id="task-detail-remind-img" src={calBlue} />
			</div>
			<div className="task-detail-font-size" style={{ padding: 10,width:75+'%',color:(isDatePassed(task.dueDate) && !task.completed)?'#b50c0c':'' }}>
				<label><span id="task-detail-dueDate-span">{task.dueDate!==null ? 'Due '+onConvertDateT(task.dueDate) : "Select a due date"}</span></label>
			</div>
			{task.dueDate!==null && !showDueDateSel && <div className="task-detail-remind-div task-detail-dueDate-del" id="task-detail-dueDate-del" style={{width:15+'%'}}>
				<label id="task-detail-dueDate-del-lbl-617" onClick={(event)=>onUpdateTask(event,'removeDueDate',task.taskId)}>X</label>
			</div>}
			{showDueDateSel && <div className="task-detail-font-size task-detail-sel-close" style={{ width:15+'%',paddingLeft:7}}>
				<label>close</label>
			</div>}
		</div>
	);
}