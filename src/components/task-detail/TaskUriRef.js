import { React,useState, useEffect } from 'react';

export const TaskUriRef = ({ task, onUpdateTask, showTaskUriRefTxt, setShowTaskUriRefTxt}) => {
	return (
		<div className="row task-item-detail-elem">
			{!showTaskUriRefTxt && 
				<a target="_blank" href={task.uriRef} onClick={task.uriRef!==null ? null : ()=>setShowTaskUriRefTxt(true)} style={{cursor:'pointer',width:90+'%'}}>
					{task.uriRef != undefined ? task.uriRef : "+Add URL reference"}
				</a>
			}
			{showTaskUriRefTxt && <textarea rows="3" cols="2" placeholder="Add reference uri" className="task-detail-note-txt" id="task-detail-uri-txt" key={"td-uri" + task.taskId}
				onBlur={(event) => onUpdateTask(event, "uri-ref", task.taskId)}></textarea>}
				
			{task.uriRef!==null && <div className="task-detail-remind-div task-detail-remind-del" style={{ cursor:'pointer',color:'#b71313',width:10+'%'}}>
				<label id="task-detail-remind-del-lbl" onClick={(event)=>onUpdateTask(event,'removeUriRef',task.taskId)}>X</label>
			</div>}
		</div>
	);
}