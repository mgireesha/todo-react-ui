import { React } from 'react';

export const SignInDiv = ({onAuthenticate, loginError, onSetShowLForm, onSetLoginError}) => {
	return (
		<div className="signup-form">
			<h1 className="signup-header">Sign In</h1>
			<div className="row row-label">
				<label htmlFor="username" className="signup-label">User Name</label>
				<input className="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required />
			</div>
			<div className="row row-label">
				<label htmlFor="password" className="signup-label">Password</label>
				<input className="form-control signup-input" type="password" name="password" id="password" placeholder="Create password" required />
				{loginError != "" && <label style={{ color: '#e34e4e', padding: 0 }}>{loginError}</label>}
				<label htmlFor="password" className="signup-label">
					<a style={{ color: '#0d6efd', cursor: 'pointer', fontSize: 12 }} onClick={()=>onSetShowLForm("reset")}>Forgot password ?</a>
				</label>
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={onAuthenticate}>Sign In</button>
			</div>
			<div className="row row-label">
				<label htmlFor="confirmPwd" className="signup-label">
					New user ? <a onClick={()=>onSetShowLForm("signup")} style={{color: '#0d6efd',textDecoration:'underline',cursor:'pointer'}}>sign up</a> here
				</label>
			</div>
		</div>
	);
}