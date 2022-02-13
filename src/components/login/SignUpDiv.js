import { React } from 'react';

export const SignUpDiv = ({ onRegister, loginError , onSetShowLForm}) => {
	return (
		<div className="signup-form">
			<h1 className="signup-header">Sign Up</h1>
			<div className="row row-label">
				<label for="name" className="signup-label">Name</label>
				<input className="form-control signup-input" name="name" id="name" placeholder="Your name" required />
			</div>
			<div className="row row-label">
				<label for="email" className="signup-label">Email</label>
				<input className="form-control signup-input" name="email" id="email" placeholder="Your email" required />
			</div>
			<div className="row row-label">
				<label for="createPwd" className="signup-label">Create new password</label>
				<input className="form-control signup-input" type="password" name="createPwd" id="createPwd" placeholder="Create password" required />
			</div>
			<div className="row row-label">
				<label for="confirmPwd" className="signup-label">Confirm password</label>
				<input className="form-control signup-input" type="password" name="confirmPwd" id="confirmPwd" placeholder="Confirm password" required />
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={onRegister}>Sign Up</button>
			</div>
			<div className="row row-label">
				<label for="confirmPwd" className="signup-label">
					Already a user ? <a onClick={()=>onSetShowLForm("signin")} style={{color: '#0d6efd',textDecoration:'underline',cursor:'pointer'}}>sign in</a>
				</label>
			</div>
		</div>
	);
}