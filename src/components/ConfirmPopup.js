import { React } from 'react';
import Modal from "react-bootstrap/Modal";

export const ConfirmPopup = ({showConfirmPopup, onSetShowConfirmPopup, onDelete , selctdItem,
								headerTxt, bodyTxt}) => {
	return (
		<div id="confirm-popup">
			<Modal show={showConfirmPopup} size="sm" >
				<Modal.Header>
					<h6>{headerTxt}</h6>
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={()=>onSetShowConfirmPopup(false)}>×</button>
				</Modal.Header>
				<Modal.Body>
					<span>{bodyTxt}</span>
					<div className="" style={{margin:10}}>
						<button type="button" className="dialog-cancel-btn" onClick={()=>onSetShowConfirmPopup(false)}>Cancel</button>
						<button type="button" className="dialog-red-btn" onClick={()=>onDelete(selctdItem)}>delete</button>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}