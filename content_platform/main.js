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
let btnreg = document.querySelector(".btnreg");

let auth_form = document.querySelector(".auth_form");
let reg_form = document.querySelector(".reg_form");

btnlog.addEventListener("click", open_login_form);
btnreg.addEventListener("click", open_reg_form);

function open_login_form() {
	reg_form.style.display = "none";
	auth_form.style.display = "block";
	let frmbut = document.querySelector(".frmbut");
	frmbut.addEventListener("click", auth);
}

function open_reg_form() { 
	auth_form.style.display = "none";
	reg_form.style.display = "block";
	let reg_form_btn = document.querySelector(".reg_form_btn");
	reg_form_btn.addEventListener("click", reg);
}

function auth(){
	let frmlog = document.querySelector("#frmlog").value;
	let frmpass = document.querySelector("#frmpass").value;

	if(validation_login(frmlog) && validation_password(frmpass)){
		checkLogPass(frmlog, frmpass);
	}
}

function reg(){
	let content = document.querySelector(".content");
	let login = document.querySelector("#reg_form_login").value;
	let password = document.querySelector("#reg_form_password").value;

	for(const user of users){
		if(user.login == login){
			content.innerHTML = "Error login!"
			return;
		}
	}

	users.push({
		"login" : login,
		"password" : password,
		"priv": "user",
	});
}

function checkLogPass(login, password) {
	let content = document.querySelector(".content");
	for (const user of users) {
		if (user.login == login && user.password == password) {
			content.innerHTML = `Hello, ${login}!`;

			if(user.priv == 'admin'){
				content.innerHTML += "<br> > admin";
			} else {
				content.innerHTML += "<br> > user";
			}

			content.innerHTML += "<br><br><button onclick=\"log_out()\">Log out</button>"

			auth_form.style.display = "none";
			btnlog.style.display = "none";
			btnreg.style.display = "none";

			return;
		}
	}
	content.innerHTML = `Error login or password!`;
}

function log_out(){
	btnlog.style.display = "block";
	btnreg.style.display = "block";

	let content = document.querySelector(".content");

	content.innerHTML = "";
	reg_form.style.display = "none";
	auth_form.style.display = "none";
}

function reset_password(){
	let content = document.querySelector(".content");
	let login = document.querySelector("#frmlog").value;
	

	for(const user of users){
		if(user.login == login){
			content.innerHTML = user.password;
			return;
		}
	}
}

function validation_login(str){
	if(str.length == 0){ alert("Input login!"); }
	for(let i = 0; i < str.length; i++){
		if(!(
		 str.charAt(i) >= 'a' && str.charAt(i) <= 'z' ||
		 str.charAt(i) >= 'A' && str.charAt(i) <= 'Z' ||
		 str.charAt(i) >= '0' && str.charAt(i) <= '9'
		 )){ alert("Use only english chars and numbers!"); }
	}

	return true
}

function validation_password(str){
	if(str.length == 0){ alert("Input password!"); }
	for(let i = 0; i < str.length; i++){
		if(str.charAt(i) == ' '){ alert("No use spaces in password!"); }
	}

	return true
}