"use strict";

let slider_interval_id;

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
	let content = document.querySelector(".content");
	content.innerHTML = "";
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

	if(validation_login(login) && validation_password(password)){
		for(const user of users){
			if(user.login == login){
				alert("Такой логин уже занят!");
				return;
			}
		}

		users.push({
			"login" : login,
			"password" : password,
			"priv": "user",
		});
	}
}

function checkLogPass(login, password) {
	let content = document.querySelector(".content");
	for (const user of users) {
		if (user.login == login && user.password == password) {
			content.innerHTML = `
			<div class="slider" style="display: flex; border: 1px solid red; width: 300px; height: 50px; overflow: hidden;">
				<div id="slider-item" style="position: relative; display: flex; cursor: pointer;">

				</div>
			</div><span id="info"></span><br><br>
			Hello, ${login}!<br>`;

			if(user.priv == 'admin'){
				content.innerHTML += "<br><img src=\"img/img.jpg\">";
			} else {
				content.innerHTML += "<br> > user";
			}

			content.innerHTML += "<br><br><button onclick=\"log_out()\">Log out</button>"

			auth_form.style.display = "none";
			btnlog.style.display = "none";
			btnreg.style.display = "none";

			slider_interval_id = run_slider('slider-item', ['img/1.png', 'img/2.png'], ["Текст рекламы #1", "Описание рекламного блока #2"]);

			return;
		}
	}
	// content.innerHTML = `Error login or password!`;
	alert("Неверный логин или пароль!");
}

function log_out(){
	btnlog.style.display = "inline-block";
	btnreg.style.display = "inline-block";

	let content = document.querySelector(".content");

	content.innerHTML = "";
	reg_form.style.display = "none";
	auth_form.style.display = "none";

	clearInterval(slider_interval_id);
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
	if(str.length == 0){ alert("Введите логин!"); return false; }
	for(let i = 0; i < str.length; i++){
		if(!(
		 str.charAt(i) >= 'a' && str.charAt(i) <= 'z' ||
		 str.charAt(i) >= 'A' && str.charAt(i) <= 'Z' ||
		 str.charAt(i) >= '0' && str.charAt(i) <= '9'
		 )){ alert("Используйте только латиницу и цифры!"); return false; }
	}

	return true
}

function validation_password(str){
	if(str.length == 0){ alert("Введите пароль!"); return false; }
	for(let i = 0; i < str.length; i++){
		if(str.charAt(i) == ' '){ alert("Нельзя использовать пробелы!"); return false; }
	}

	return true
}

function run_slider(slider_id, images, description){
	let el = document.getElementById(slider_id);

	images.push(images[0]);
	for(let i = 0; i < images.length; i++){
		el.innerHTML += `<img src="${images[i]}">`;
	}

	let size_x = 300;
	let max = -size_x * (images.length - 1);
	let pos_x = 0;
	let time = 0;
	let open_description = false;

	function slider_info(){
		if(pos_x % size_x != 0){
			return;
		}

		if(open_description){
			document.getElementById('info').innerHTML = "";
			open_description = false;
			return;
		}
		let i = -Math.ceil(pos_x / size_x);
		//pos_x = size_x * -i;
		//el.style.left = `${pos_x}px`;
		document.getElementById('info').innerHTML = description[i];
		open_description = true;
	}

	function slider(){
		if(time > 300 && open_description == false){
			pos_x -= 1;
			if(pos_x <= max){
				pos_x = 0;
			}

			el.style.left = `${pos_x}px`;
			
			if(pos_x % size_x == 0){
				time = 0;
			}

		}else{
			time += 1;
		}
	}

	el.addEventListener("click", slider_info);

	return setInterval(slider, 10);
}