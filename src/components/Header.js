import React from 'react';
export const Header = () => {
	return (
		<div className="row" id="todo-header">
			<h4 className="col-sm-10" style={{marginLeft: 0.4+'em',color:'beige'}}><i>ToDo</i></h4>
			<a className="col-sm-1" href="/logout">Logout</a>
		</div>
	);
}