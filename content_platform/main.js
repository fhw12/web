"use strict";

let users = [
	{
		"login" : "admin",
		"password" : "1234",
		"priv": "admin",
	},
	{
		"login" : "user",
		"password" : "1234",
		"priv": "user",
	}
];

let btnlog = document.querySelector(".btnlog");
btnlog.addEventListener("click", open_login_form);

function open_login_form() {
	let auth_form = document.querySelector(".auth_form");
	auth_form.style.display = "block";

	let frmbut = document.querySelector(".frmbut");
	frmbut.addEventListener("click", auth);
}

function auth(){
	let frmlog = document.querySelector("#frmlog").value;
	let frmpass = document.querySelector("#frmpass").value;

	checkLogPass(frmlog, frmpass);
}

function checkLogPass(login, password) {
	let content = document.querySelector(".content");
	for (const user of users) {
		if (user.login == login && user.password == password) {
			content.innerHTML = `Hello, ${login}`;

			let auth_form = document.querySelector(".auth_form");
			auth_form.style.display = "none";
			
			return;
		}
	}
	content.innerHTML = `Error!`;
}
