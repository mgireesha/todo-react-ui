import { React } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import { TodoBody } from './components/TodoBody';
import { Login } from './components/login/Login.js';
import {ManageUsers} from './components/ManageUsers.js';
import 'bootstrap/dist/css/bootstrap.css';
import './components/main.scss';
import './components/login/SignIn.css';
import 'react-datepicker/dist/react-datepicker.css';

import { Provider } from 'react-redux';
import store from './components/redux/store';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth } from './components/utils/GlobalFuns';
function App() {
	return (
		<div className="container-fluid margin-zero" id="app-main-div">
		<div id="disable-div" className="disable-div" style={{display:'none'}}></div>
			<Provider store={store}>
			<Header/>
			<Router>
				<Routes>
					{['/login', '/logout'].map((path, index) => <Route path={path} element={<Login />} key={index} />)}
					<Route path='/todo/ManageUsers' element={<ManageUsers />} />
					{['/', '/todo'].map((path, index) => <Route path={path} 
						element={getAuth() !== '' ? <TodoBody /> : <Login lError="Session exired. Please login" />} key={index} />)
					}
				</Routes>
			</Router>
			</Provider>
			
		</div>
	);
}

export default App;
