import {React, useState} from 'react';
import {AddListFiled} from './AddListField.js';
import {AddListLabel} from './AddListLabel.js';

export const AddList = ({showListAdd,onAddList,onTogglAddListField}) => {
	
	
	return (
		<div className="list-item-add">
			{!showListAdd ? <AddListLabel onTogglAddListField={onTogglAddListField} /> : null}
			{ showListAdd ? <AddListFiled onAddList={onAddList} /> : null }
		</div>
	);
}