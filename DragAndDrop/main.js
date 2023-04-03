let item = document.getElementById("pickaxe");
let block = document.getElementById("block");
let block_text = document.getElementById("block_text");
let destroy = document.getElementById("destroy");

block.style = `position: absolute; top: ${window.innerHeight/2 - 64}px; left: ${window.innerWidth/2 - 64}px;`;
block_text.style = `position: absolute; top: ${window.innerHeight/2 + 64}px; left: ${window.innerWidth/2 - 64}px; width: 128px`;
destroy.style = `position: absolute; top: ${window.innerHeight/2 - 74}px; left: ${window.innerWidth/2 - 64}px;`;

let coins = 0;
let add_coins = false;

let pickaxe = {
	bronze: {speed: 1, price: 0, amount: 1},
	iron: {speed: 2, price: 100, amount: 0},
	silver: {speed: 5, price: 300, amount: 0},
	diamond: {speed: 10, price: 700, amount: 0},
};

let blocks_mined = {
	stone: 0,
	gravel: 0,
	coal: 0,
	gold: 0,
	ruby: 0,
	diamond: 0,
}

let blocks = {
	stone:   {strength: 3, reward: 1},
	gravel:  {strength: 3, reward: 2},
	coal:    {strength: 5, reward: 3},
	gold:    {strength: 5, reward: 5},
	ruby:    {strength: 10, reward: 10},
	diamond: {strength: 15, reward: 20},
};


let current_pickaxe = "bronze";
let current_block = "stone";
let strength_block = blocks[current_block].strength;
block.src = `./sprites/blocks/${current_block}.png`;


function getBuyButtonClass(pickaxe_name){
	if(pickaxe[pickaxe_name].amount > 0){
		return "buy_button_disable";
	} else{
		return "buy_button";
	}
}

function getBuyButtonText(pickaxe_name){
	if(pickaxe[pickaxe_name].amount > 0){
		return "Куплено";
	} else{
		return "Купить";
	}
}

function selectPackaxe(){
	for(let pickaxe_item of ["bronze", "iron", "silver", "diamond"]){
		if(pickaxe[pickaxe_item].amount > 0){
			current_pickaxe = pickaxe_item;
		}
	}

	item.src = `./sprites/tools/pick_${current_pickaxe}.png`;
}

selectPackaxe()

function buyPackaxe(pickaxe_name){
	if(coins >= pickaxe[pickaxe_name].price && pickaxe[pickaxe_name].amount == 0){
		coins -= pickaxe[pickaxe_name].price;
		pickaxe[pickaxe_name].amount += 1;
	}

	selectPackaxe();
	updateShop();
}

function updateShop(){
	let shop = document.getElementById("shop");
	shop.innerHTML = '<center><span style="line-height: 1.5em;">Магазин</span></center>';
	for(let pickaxe_item of ["bronze", "iron", "silver", "diamond"]){
		shop.innerHTML += `<div>
			<img width="32" height="32" src="./sprites/tools/pick_${pickaxe_item}.png">
			<span style="width: 60px; display: inline-block;">
				<span style="font-size: 14px;">${pickaxe[pickaxe_item].price}</span>
				<img src="./sprites/coin.png">
			</span>
			<span class="${getBuyButtonClass(pickaxe_item)}" onclick="buyPackaxe('${pickaxe_item}')">
				<center style="color: white; line-height: 30px;">${getBuyButtonText(pickaxe_item)}</center>
			</span>
		</div>`
	}
}
updateShop();

function updateStats(){
	let stats = document.getElementById("stats");
	stats.innerHTML = '<center><span style="line-height: 1.5em;">Добыто руды</span></center><br>';
	for(let ore of ["coal", "gold", "ruby", "diamond"]){
		stats.innerHTML += `
			<span>
				<img width="32" height="32" src="./sprites/items/ore_${ore}.png">
				<span>${blocks_mined[ore]}</span>
			</span>
		`;
	}
}
updateStats();

item.onmousedown = function(event) {
	let shiftX = event.clientX - item.getBoundingClientRect().left;
	let shiftY = event.clientY - item.getBoundingClientRect().top;

	item.style.position = 'absolute';
	item.style.zIndex = 1000;

	moveAt(event.pageX, event.pageY);
	
	function moveAt(pageX, pageY) {
		let left = pageX - shiftX;
		let top = pageY - shiftY;

		if(left < 0){ left = 0; }
		if(top < 0){ top = 0; }
		if(left > window.innerWidth - 50){ left = window.innerWidth - 50; }
		if(top > window.innerHeight - 50){ top = window.innerHeight - 50; }

		item.style.left = left + 'px';
		item.style.top = top + 'px';

		item.hidden = true;
		add_coins = document.elementFromPoint(left, top) == document.getElementById("block");
		item.hidden = false;
  	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}


	document.addEventListener('mousemove', onMouseMove);
	item.onmouseup = function() {
		document.removeEventListener('mousemove', onMouseMove);
		item.onmouseup = null;
		item.style = null;
		add_coins = false;
	};
};

item.ondragstart = function() {
	return false;
};


function update(){
	if(add_coins){
		strength_block -= pickaxe[current_pickaxe].speed / 50;
	}

	if(strength_block < 0){
		coins += blocks[current_block].reward;
		blocks_mined[current_block] += 1;
		updateStats();

		let rnd = Math.random();
		if(rnd < 0.6){ current_block = "stone"; }			// 60 %
		else if(rnd < 0.8){ current_block = "gravel"; }		// 20 %
		else if(rnd < 0.9){ current_block = "coal"; }		// 10 %		
		else if(rnd < 0.95){ current_block = "gold"; }		// 5 %
		else if(rnd < 0.98){ current_block = "ruby"; }		// 3 %
		else { current_block = "diamond"; }					// 2 %
		block_text.innerHTML = `<center style="color: #000000;">${current_block}</center>`;

		strength_block = blocks[current_block].strength;		
		block.src = `./sprites/blocks/${current_block}.png`;
	}

	document.getElementById("destroy_line").style = `width: ${128 - strength_block / blocks[current_block].strength * 128}px`;

	document.getElementById('coins').innerHTML = coins;
}

setInterval(update, 20);