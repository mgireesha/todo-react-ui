import {React, useState, useEffect} from 'react';

import {SignInDiv} from './SignInDiv.js';
import {SignUpDiv} from './SignUpDiv.js';
import {LSuccessDiv} from './LSuccessDiv.js';
import {ResetPwdDiv} from './ResetPwdDiv.js';
import {ChangePwdDiv} from './ChangePwdDiv.js';
import {ResetPwdOtpDiv} from './ResetPwdOtpDiv.js';


export const Login = ({disableDiv, enableDiv, lError,getAuth, getServiceURI}) => {
	
	const [loginError,setLoginError] = useState("");
	const [showLForm,setShowLForm] = useState("signin");
	const [message,setMessage] = useState("");
	const [emailS,setEmailS] = useState("");
	
	useEffect(()=>{
		setLoginError(lError);
	},[lError]);
	
	useEffect(()=>{
		if(document.getElementById('body-signin')!=undefined){
			document.getElementById('body-signin').style.height=window.innerHeight+'px';
		}
	},[]);
	
	const validateReqFld = (elem) => {
		if(!elem.checkValidity()){
			elem.reportValidity();
			return false;
		}else{
			return true;
		}
	}
	
	const onSetShowLForm = (value) => {
		setLoginError("");
		setShowLForm(value);
	}
	document.cookie="jToken=;";
	const authenticate = async() => {
		setLoginError("");
		const username= document.getElementById('username');
		const password = document.getElementById('password');
		if(!validateReqFld(username) || !validateReqFld(password)){
			return;
		}
		disableDiv();
		const  authPayLoad = {
			username:username.value,
			password:password.value
		}
		const settings = {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(authPayLoad)
		}
		const response = await fetch(`${getServiceURI()}/todo/authenticate`,settings);
		const data = await response.json();
		if(data.jwt){
			document.cookie="jToken=Bearer "+data.jwt+"; path=/";
			window.location.replace("/todo");
		}else{
			setLoginError(data.error);
		}
		enableDiv();
	}
	
	const handleKeypress = e => {
      	//it triggers by pressing the enter key
    	if (e.keyCode === 13) {
      	authenticate();
    	}
  	};
	
	const register = async() => {
		const name = document.getElementById('name');
		const email = document.getElementById('email');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		if(!validateReqFld(name) || !validateReqFld(email) || 
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}
		if(createPwd.value!=confirmPwd.value){
			alert("Passwords doesn't match");
			createPwd.focus();
			return;
		}
		disableDiv();
		const signUpPayoad = {
			name:name.value,
			userName:email.value,
			passWord:confirmPwd.value
		}
		const settings = {
			method : 'POST',
			headers : {
				'Authorization' : getAuth(),
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body:JSON.stringify(signUpPayoad)
		}
		const response = await fetch(`${getServiceURI()}/todo/signup`,settings);
		const data = await response.json();
		if(data.status){
			if(data.status==="success"){
				setMessage("You have registered successfully. Please sign in to continue.");
			}else{
				setMessage(data.error);
			}
			setLoginError(data.status);
			setShowLForm("lsuccess");
		}
		enableDiv();
	}
	
	const sendOtp = async() => {
		setLoginError("");
		const userName = document.getElementById('username-resetP');
		if(!validateReqFld(userName)){
			return;
		}
		disableDiv();
		const sendOtpPayload = {
			userName : userName.value
		}
		setEmailS(userName.value);
		const settings = {
			method : 'POST',
			headers : {
				'Authorization' : getAuth(),
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body : JSON.stringify(sendOtpPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/init-reset-pwd`,settings);
		const data = await response.json();
		enableDiv();
		if(data.status==="MESSAGE_SENT"){
			setShowLForm("verify-otp");
		}else{
			setLoginError(data.error);
		}
	}
	
	const verifyOtpAndResetPwd = async() => {
		setLoginError("");
		const otpResetP = document.getElementById('otp-resetP');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		if(!validateReqFld(otpResetP) || 
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}
		if(createPwd.value!=confirmPwd.value){
			alert("Passwords doesn't match");
			createPwd.focus();
			return;
		}
		disableDiv();
		const resetPPayload = {
			otp : otpResetP.value,
			passWord : confirmPwd.value,
			userName : emailS
		}
		const settings = {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body : JSON.stringify(resetPPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/reset-pwd`,settings);
		const data = await response.json();
		enableDiv();
		if(data.status){
			if(data.status==="success"){
				setLoginError(data.status);
				setMessage("Password reset successful. Please sign in to continue.");
				setShowLForm("lsuccess");
			}else{
				setLoginError(data.error);
			}
		}
	}
	
	const changePwd = async() => {
		setLoginError("");
		const currentPwd = document.getElementById('current-pwd');
		const createPwd = document.getElementById('createPwd');
		const confirmPwd = document.getElementById('confirmPwd');
		const username = document.getElementById('username');
		if(!validateReqFld(currentPwd) || !validateReqFld(username) ||
			!validateReqFld(createPwd) || !validateReqFld(confirmPwd)){
			return;
		}
		if(createPwd.value!=confirmPwd.value){
			alert("Passwords doesn't match");
			createPwd.focus();
			return;
		}
		disableDiv();
		const changePPayload = {
			currentPassword : currentPwd.value,
			passWord : confirmPwd.value,
			userName : username.value
		}
		const settings = {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json; charset=UTF-8'
			},
			body : JSON.stringify(changePPayload)
		}
		const response = await fetch(`${getServiceURI()}/todo/change-pwd`,settings);
		const data = await response.json();
		enableDiv();
		if(data.status){
			if(data.status==="success"){
				setLoginError(data.status);
				setMessage("Password changed. Please sign in to continue.");
				setShowLForm("lsuccess");
			}else{
				setLoginError(data.error);
			}
		}
	}
	
	return (
		<div className="body-signin" id="body-signin">
			<div className="container ">
				<div className="row row-main">
					<div className="col-sm-3"></div>
					<div className="col-sm-5 middle-span">
						{showLForm==="signin" && <SignInDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onSetLoginError={setLoginError} onAuthenticate={authenticate} />}
						{showLForm==="signup" && <SignUpDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onSetLoginError={setLoginError} onRegister={register}  />}
						{showLForm==="lsuccess" && <LSuccessDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onSetLoginError={setLoginError} message={message} />}
						{showLForm==="reset" && <ResetPwdDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onSendOtp={sendOtp} />}
						{showLForm==="verify-otp" && <ResetPwdOtpDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onVerifyOtpAndResetPwd={verifyOtpAndResetPwd} />}
						{showLForm==="change-pwd" && <ChangePwdDiv loginError={loginError} onSetShowLForm={onSetShowLForm} onChangePwd={changePwd} />}
					</div>
					<div className="col-sm-3"></div>
				</div>
			</div>
		</div>
	);
}