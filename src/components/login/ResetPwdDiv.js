import { React } from 'react';

export const ResetPwdDiv = ({ loginError, onSetShowLForm, onSendOtp }) => {
	return (
		<div className="signup-form">
			<h1 className="signup-header">Reset Password</h1>
			<div className="reset-pwd-div" id="reset-pwd-div">
				<div className="row row-label">
					<label for="username" className="signup-label">User Name</label>
					<input className="form-control signup-input" type="text" name="username" id="username-resetP" placeholder="Your email" required />
				</div>
				<div className="row row-btn">
					<button type="button" className="btn-signup" onClick={onSendOtp}>Send OTP</button>
					<label style={{color: '#c9300d'}} className="signup-label" id="init-rpd-error">{loginError}</label>
				</div>
			</div>
			<div className="row row-label" id="go-back-to-login">
				<label for="confirmPwd" className="signup-label col-sm-4">Go back to <a style={{color: '#0d6efd',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onSetShowLForm("signin")}>Login</a>
				</label>
				<label htmlFor="confirmPwd" className="signup-label col-sm-6">
					New user ? <a onClick={()=>onSetShowLForm("signup")} style={{color: '#0d6efd',textDecoration:'underline',cursor:'pointer'}}>sign up</a> here
				</label>
			</div>
		</div>
	);
}