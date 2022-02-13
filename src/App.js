import { React, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import { Body } from './components/Body.js';
import { Login } from './components/login/Login.js';
import 'bootstrap/dist/css/bootstrap.css';
import './components/main.css';
import './components/login/SignIn.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	function getServiceURI(){
		return "http://localhost:8087"
	} 
	function getAuth() {
		let cookies = document.cookie;
		let cookiesArr = cookies.split(';');
		let cookieArr = [];
		let jToken = '';
		cookiesArr.map(cookie => {
			cookieArr = cookie.split('=');
			if (cookieArr[0].trim() === "jToken") {
				jToken = cookieArr[1];
			}
		});
		return jToken;
	}

	function disableDiv() {
		document.getElementById('disable-div').style.width
			= document.getElementById('app-main-div').offsetWidth + 'px';
		document.getElementById('disable-div').style.height
			//= document.getElementById('app-main-div').offsetHeight+'px';
			= window.innerHeight + 30 + 'px';
		document.getElementById('disable-div').style.top = '-30px';
		document.getElementById('disable-div').style.display = 'block';
	}
	function enableDiv() {
		document.getElementById('disable-div').style.display = 'none';
	}

	return (
		<div className="container-fluid margin-zero" id="app-main-div">
			<Header />
			<Router>
				<Routes>
					{['/login', '/logout'].map((path, index) => <Route path={path}
						element={<Login disableDiv={disableDiv} enableDiv={enableDiv} getAuth={getAuth} getServiceURI={getServiceURI} />} key={index} />)}
					{['/', '/todo'].map((path, index) => <Route path={path} 
						element={getAuth() != '' ? 
							<Body getAuth={getAuth} disableDiv={disableDiv} enableDiv={enableDiv} getServiceURI={getServiceURI} /> 
							: 
							<Login disableDiv={disableDiv} enableDiv={enableDiv} getAuth={getAuth} getServiceURI={getServiceURI} lError="Session exired. Please login" />} 
						key={index} />)}
				</Routes>
			</Router>
			<div id="disable-div" className="disable-div" style={{ display: 'none' }}> </div>
		</div>
	);
}

export default App;
