import { React } from 'react';

import whiteLeftArrow from '../../images/white-left-arrow.png';

export const ResetPwdOtpDiv = ({ loginError, onSetLoginError, onSetShowLForm, onVerifyOtpAndResetPwd, prevShowLForm }) => {
	return (
		<div className="signup-form">
			<img alt='back' src={whiteLeftArrow} onClick={()=>onSetShowLForm(prevShowLForm)} className='whiteLeftArrow' />
			<h1 className="signup-header">Reset Password</h1>
			<div className="row row-label">
				<label className="signup-label">OTP</label>
				<input className="form-control signup-input" type="text" name="otp-resetP" id="otp-resetP" placeholder="One time password" required />
				<label style={{color: '#c9300d'}} className="signup-label" id="verify-otp-error">{loginError}</label>
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
				<button type="button" className="btn-signup" onClick={onVerifyOtpAndResetPwd}>Verify</button>
			</div>
			<div className="row row-label" id="go-back-to-login">
				<label for="confirmPwd" className="signup-label">Go back to <a style={{color: '#0d6efd',textDecoration:'underline',cursor:'pointer'}} onClick={()=>onSetShowLForm("signin")}>Login</a>
				</label>
			</div>
		</div>
	);
}