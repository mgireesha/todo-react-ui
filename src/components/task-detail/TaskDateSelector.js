import { React } from 'react';

export const TaskDateSelector = ({onUpdateTDDate,tdElem,task,days,getLTH,onSetShowDateSel}) => {
	let merd = "AM";
	let lth = getLTH();
	if (lth > 12) {
		lth = lth - 12;
		merd = "PM";
	}
	if (lth === 0) {
		lth = 12;
	}
	let nwd = new Date();
	nwd.setDate(nwd.getDate() + 7);
	let nwDay = days[nwd.getDay()];
	let divId = "selRem";
	let dateTId = "pick-td-rem-date";
	if (tdElem === "dueDate") {
		divId = "selDue";
		dateTId = "pick-td-dd-date";
	}

	return (
		<div className="row task-item-detail-elem task-detail-remind-sel" id={divId} style={{ zIndex: 1000 }}>
			<div className="row sel-remind-row" onClick={(event)=>onUpdateTDDate(event,task.taskId,'lth',tdElem)}>
				<label>Later Today at {lth} {merd}</label>
			</div>
			<div className="row sel-remind-row" onClick={(event)=>onUpdateTDDate(event,task.taskId,'tmr',tdElem)}>
				<label>Tomorrow,&nbsp;&nbsp;9 AM</label>
			</div>
			<div className="row sel-remind-row" onClick={(event)=>onUpdateTDDate(event,task.taskId,'nwd',tdElem)}>
				<label>Next Week {nwDay},&nbsp;&nbsp;9 AM</label>
			</div>
			<div className="row sel-remind-row">
				<label className="col-sm-5">Pick A Date</label>
				<input className="col-sm-7 pick-td-rem-date" type="datetime-local" id={dateTId}
					 onBlur={(event)=>onUpdateTDDate(event,task.taskId,'pick',tdElem)}
					 />
			</div>
			{/* <div className="task-detail-rd-sel-close" onClick={(event)=>onSetShowDateSel(event,tdElem)}>
				<label>Close</label>
			</div> */}
		</div>
	);
}