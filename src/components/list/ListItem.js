import {React} from 'react';

import {ListActionSel} from './ListActionSel.js';
import gearBlack200 from '../../images/gear-grey-200.png';

export const ListItem =({list, onshowTask, onDeleteList,onAddListToArchive}) => {
	
	const onShowListActionSel = (event,listId) => {
		if(event.target==event.currentTarget){
			event.stopPropagation();
		}
		let currentACTSel = document.getElementById('currentACTSel').value;
		if(currentACTSel!=="" && (document.getElementById('list-item-act-sel-'+currentACTSel).style.height=='3em' || currentACTSel==listId)){
			document.getElementById('list-item-act-sel-'+currentACTSel).style.height=0;
			document.getElementById('currentACTSel').value="";
		}
		if(currentACTSel!=listId){
			document.getElementById('currentACTSel').value=listId;
			document.getElementById('list-item-act-sel-'+listId).style.height='3em';
			document.getElementById('list-item-act-sel-'+listId).style.right= 0;
					//	= window.innerWidth - document.getElementById('list-item-'+listId).getBoundingClientRect().right-2+'px';
		}
	}
	
	return(
		<div style={{position:'relative'}}>
			<div className="list-item" id={"list-item-"+list.listId} onClick={(event) =>onshowTask(event,list.listId)}>
				<label style={{padding:5,width:list.groupName!=="default" ? 87+'%' : 100+'%'}} >{list.listName}</label>
				<label className={list.taskCount>0 ? "list-task-count list-task-countBG" : "list-task-count"}>{list.taskCount>0 ? list.taskCount : ''}</label>
				{list.groupName!="default" && <label id={"list-act-"+list.listId} style={{marginRight:5,marginLeft:5, padding:2}}>
								<img onClick={(event)=>onShowListActionSel(event,list.listId)} alt="action" src={gearBlack200} style={{height: 0.9+'em'}} id={"list-act-img-"+list.listId} />
				</label>}
				{/*{list.groupName!=="default" && <label className="list-item-delete" onClick={(event)=>onDeleteList(event,list.listId)}>x</label>}*/}
				{list.listName==="Important" && <input type="hidden" id="hdn-inp-Important" value={list.listId} />}
			
			</div>
			<input type="hidden" id="currentACTSel" />
			{list.groupName!="default" && <ListActionSel list={list} onAddListToArchive={onAddListToArchive} onDeleteList={onDeleteList} />}
			
	</div>
	);
}