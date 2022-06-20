import { React } from 'react';

export const ListActionSel = ({ list,onAddListToArchive,onDeleteList ,onSetShowConfirmPopup}) => {
	return (
		<div className="row list-item-act-sel" id={"list-item-act-sel-"+list.listId}>
			<label className="list-add-arch-lab" onClick={()=>onAddListToArchive(list.listId)}>
				{list.groupName==="archived" ? "Unarchive" : "Archive"}
			</label>
			<label className="list-del-list-lab" onClick={(event)=>onSetShowConfirmPopup(event,true,list)}>
				Delete List
			</label>
		</div>
	);
}