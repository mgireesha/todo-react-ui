import { React } from 'react';

import whiteLeftArrow from '../../images/white-left-arrow.png';

export const ResetPwdOtpDiv = ({ loginError, onSetShowLForm, onVerifyOtpAndResetPwd, prevShowLForm, checkPwdStrength }) => {
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
				<label className="signup-label">Create new password</label>
				<input className="form-control signup-input" type="password" name="createPwd" id="createPwd" onKeyUp={(event)=>checkPwdStrength(event)} placeholder="Create password" required />
				<span id="pwdStrength" style={{display: 'inline-block',padding: 0.1+'em',color: 'darkgreen'}} className="col-sm-7">Password Strength</span>
			</div>
			<div className="row row-label">
				<label className="signup-label">Confirm password</label>
				<input className="form-control signup-input" type="password" name="confirmPwd" id="confirmPwd" placeholder="Confirm password" required />
			</div>
			<div className="row row-btn">
				<button type="button" className="btn-signup" onClick={onVerifyOtpAndResetPwd}>Verify</button>
			</div>
			<div className="row row-label" id="go-back-to-login">
				<label className="signup-label">Go back to <span className='link-look' onClick={()=>onSetShowLForm("signin")}>Login</span>
				</label>
			</div>
		</div>
	);
}