import {React} from 'react';

export const Helpers = () => {
	const getAuth = () => {
		let cookies = document.cookie;
		let cookiesArr=cookies.split(';');
		let cookieArr=[];
		let jToken = '';
		cookiesArr.map(cookie => {
			cookieArr = cookie.split('=');
			if(cookieArr[0].trim()==="jToken"){
				jToken = cookieArr[1];
			}
		});
		return jToken;
	}
}