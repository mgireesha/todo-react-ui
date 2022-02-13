import {React} from 'react';

export const TaskCompletedCounter = ({count,onToggleShowCmptdTsks,isShowCmptdTsks}) => {
	return (
		<div className="row" style={{margin:0,color: 'beige',marginLeft: 10}}>
						<label style={{width: 'auto',borderRadius: 4,backgroundColor: '#2E2729',paddingBottom: 2,cursor:'pointer'}}  onClick={onToggleShowCmptdTsks} >
							{!isShowCmptdTsks &&<span className="com-tsk-right-arr">〉 </span>}
							{isShowCmptdTsks &&<span className="com-tsk-down-arr">∨ </span>}
							<span style={{fontStyle: 'italic'}}>Completed&nbsp;</span>
							<span className="tasks-cmptd-nbr">{count}</span>
						</label>
					</div>
	);
}