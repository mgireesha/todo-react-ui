import { React } from 'react';

import alarmBlue from '../../images/Alarm-blue-bb-20x21.png';

export const TaskRemindDate = ({task,onSetShowDateSel,onConvertDateT, onUpdateTask}) => {
	return (
		<div className="row task-item-detail-remindMe task-item-detail-elem" id="task-item-detail-remindMe" onClick={(event)=>onSetShowDateSel(event,'remindMeDate')}>
			<div className="task-detail-remind-div" style={{width:10+'%'}}>
				<img alt="remind" className="task-detail-remind-img" id="task-detail-remind-img" src={alarmBlue} />
			</div>
			<div className="task-detail-font-size" style={{width:80+'%'}}>
				<label className="task-detail-remind-lbl" id="task-detail-remind-lbl">{task.remindTime!=undefined ? "Remind Me at 9:0 AM" : "Set Remind Date"}</label><br/>
				<label className="" id="task-detail-remind-lbl">{task.remindTime!=undefined ? onConvertDateT(task.remindTime) : ""}</label><br />
			</div>
			<div className="task-detail-remind-div task-detail-remind-del" style={{ display: task.remindTime!=undefined ? "inline" : "none" , width:10+'%'}}>
				<label id="task-detail-remind-del-lbl" onClick={(event)=>onUpdateTask(event,'removeRemDate',task.taskId)}>X</label>
			</div>
		</div>
	);
}