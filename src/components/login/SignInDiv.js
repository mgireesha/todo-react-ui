import { React } from 'react';

export const SignInDiv = ({onAuthenticate, loginError, onSetShowLForm, onSetLoginError}) => {
	return (
		<div className="signup-form">
			<h1 className="signup-header">Sign In</h1>
			<div className="row row-label">
				<label className="signup-label">User Name</label>
				<input className="form-control signup-input" type="text" name="username" id="username" placeholder="Your email" required />
			</div>
			<div className="row row-label">
				<label  className="signup-label">Password</label>
				<input className="form-control signup-input" type="password" name="password" id="password" placeholder="Create password" required />
				{loginError !== "" && <label style={{ color: '#e34e4e', padding: 0 }}>{loginError}</label>}
				<label className="signup-label" style={{width:50+'%'}}>
					<span className='link-look' onClick={()=>onSetShowLForm("reset")} style={{fontSize: 12,textDecoration:'none'}}>Forgot password ?</span>
				</label>
				<label className="signup-label" style={{width:50+'%'}}>
					<span className='link-look' style={{fontSize: 12,textDecoration:'none'}} onClick={()=>onSetShowLForm("change-pwd")}>Change password</span>
				</label>
			</div>
			<div className="row row-btn">
				<button className="btn-signup" onClick={onAuthenticate}>Sign In</button>
			</div>
			<div className="row row-label">
				<label className="signup-label">
					New user ? <span onClick={()=>onSetShowLForm("signup")} className='link-look'>sign up</span> here
				</label>
			</div>
		</div>
	);
}