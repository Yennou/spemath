const page=document.getElementById("paragraphe");
let autoscale=true;
function show(source) {
	const from=source.parentNode;
	const action=from.parentNode.querySelector(".sm-article-game-3");
	action.classList.toggle('active')
}

function hide(source) {
	const from=source.parentNode;
	const action=from.parentNode.parentNode.querySelector(".sm-article-game-3");
	action.classList.toggle('active')
}


const btngamemenu = () =>{
	const btnmenu = document.querySelector('.btn-game-menu');
	const nav = document.querySelector('.btn-game-box');
	
	if (btnmenu!=null) {
		btnmenu.addEventListener('click',()=>{
			imgmenu()
			unshowall()
			btnmenu.classList.toggle('btn-game-menu-active');
			nav.classList.toggle('btn-game-box-fs-active');
			page.removeAttribute('class','activ-layer-menu')
		});
		window.addEventListener('keydown', function(event){
			if (event.keyCode==222) {
				imgmenu()
				unshowall()
				btnmenu.classList.toggle('btn-game-menu-active');
				nav.classList.toggle('btn-game-box-fs-active');
				page.removeAttribute('class','activ-layer-menu')
			}
		});
	}
}
btngamemenu()

let zoom=2;
let menu=false;
function imgmenu(){
	if (!menu) {
		menu=true
		document.getElementById("game-menu-btn").src="assets/img/down.png";
	} else {
		menu=false;
		document.getElementById("game-menu-btn").src="assets/img/menu.png";
	}
}

function rescale(){
	if (autoscale) {
		var target=document.getElementById("canvas1")
		var w=window.innerWidth/target.width;
		var h=window.innerHeight/target.height;
		var width, height;
		if (w<=h) {
			width=target.width*w;
			height=target.height*w;
		}
		else {
			width=target.width*h;
			height=target.height*h;
		}
		
		target.style.width=width+"px";
		target.style.height=height+"px";
		setTimeout(rescale,5);
	}
}
function phone(btn) {
	btn.classList.toggle('btn-game-on')
	let controler=document.getElementById("controler");

	if (game.inputType=="phone") {
		game.inputType="keyboard";
		controler.style.display="none";
	}
	else {
		game.inputType="phone";
		controler.style.display="flex";
	}
}

function showHideDescription(btn){
	let Description=document.getElementById("Description");

	unshowall()
	Description.style.display="block";
	page.setAttribute('class','activ-layer-menu')
}
function showHideChangelog(btn){
	let Changelog=document.getElementById("Changelog");

	unshowall()
	Changelog.style.display="block";
	page.setAttribute('class','activ-layer-menu')
}
function showHideReseaux(){
	let Reseaux=document.getElementById("Reseaux");

	unshowall()
	Reseaux.style.display="block";
	page.setAttribute('class','activ-layer-menu')
}

function unshowall(){
	let Description=document.getElementById("Description");
	let Reseaux=document.getElementById("Reseaux");
	let Changelog=document.getElementById("Changelog");
	Description.style.display="none";
	Changelog.style.display="none";
	Reseaux.style.display="none";
}

function hideErrorMsg(){
	document.getElementById("game-error").style.display="none";
}
function showErrorMsg(){
	document.getElementById("game-error").style.display="block";
}
function setErrorMsg(txt){
	document.getElementById("game-error").innerHTML=txt;
	showErrorMsg()
}
rescale()