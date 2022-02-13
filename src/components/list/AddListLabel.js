import {React} from 'react';

export const AddListLabel =({onTogglAddListField}) => {
	
	return(
		<div className="list-item-add-div" id="list-item-add-div" onClick={() => onTogglAddListField(true)}>
			<label className="list-add-new-lbl">+ Add New List</label>
		</div>
	);
}