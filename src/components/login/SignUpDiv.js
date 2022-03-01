import { React } from 'react';

import whiteLeftArrow from '../../images/white-left-arrow.png';

export const SignUpDiv = ({ onRegister, onSetShowLForm, prevShowLForm}) => {
	return (
		<div className="signup-form">
			<img alt='back' src={whiteLeftArrow} onClick={()=>onSetShowLForm(prevShowLForm)} className='whiteLeftArrow' />
			<h1 className="signup-header">Sign Up</h1>
			<div className="row row-label">
				<label className="signup-label">Name</label>
				<input className="form-control signup-input" name="name" id="name" placeholder="Your name" required />
			</div>
			<div className="row row-label">
				<label className="signup-label">Email</label>
				<input className="form-control signup-input" name="email" id="email" placeholder="Your email" required />
			</div>
			<div className="row row-label">
				<label className="signup-label">Create new password</label>
				<input className="form-control signup-input" type="password" name="createPwd" id="createPwd" placeholder="Create password" required />
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<input className="form-control signup-input" type="password" name="confirmPwd" id="confirmPwd" placeholder="Confirm password" required />
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={onRegister}>Sign Up</button>
			</div>
			<div className="row row-label">
				<label className="signup-label">
					Already a user ? <span onClick={()=>onSetShowLForm("signin")} className='link-look'>sign in</span>
				</label>
			</div>
		</div>
	);
}