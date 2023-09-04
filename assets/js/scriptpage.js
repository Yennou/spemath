let fullscreen=false;
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
			btnmenu.classList.toggle('btn-game-menu-active');
			nav.classList.toggle('btn-game-box-fs-active');
			
		});
		window.addEventListener('keydown', function(event){
			if (event.keyCode==222 && fullscreen) {
				imgmenu()
				btnmenu.classList.toggle('btn-game-menu-active');
				nav.classList.toggle('btn-game-box-fs-active');
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
function zoomin() {
	if (zoom==zoommin) {
		document.getElementById("zoomout").classList.toggle("btn-game-disable");
		document.getElementById("zoomout").classList.toggle("btn-game-off");
		document.getElementById("zoomout").removeAttribute("disabled");
	}
	zoom+=0.25;
	var target=document.getElementById("canvas1")
	var width=target.width;
	var height=target.height;
	width*=zoom/2;
	height*=zoom/2;
	// console.log("hauteur:"+height+" / largeur:"+width)
	target.style.width=width+"px";
	target.style.height=height+"px";
	if (zoom==zoommax) {
		document.getElementById("zoomin").classList.toggle("btn-game-disable");
		document.getElementById("zoomin").classList.toggle("btn-game-off");
		document.getElementById("zoomin").setAttribute("disabled","");
	}
}

function zoomout() {
	if (zoom==zoommax) {
		document.getElementById("zoomin").classList.toggle("btn-game-disable");
		document.getElementById("zoomin").classList.toggle("btn-game-off");
		document.getElementById("zoomin").removeAttribute("disabled");
	}
	zoom-=0.25;
	var target=document.getElementById("canvas1")
	var width=target.width;
	var height=target.height;	
	width*=zoom/2;
	height*=zoom/2;
	// console.log("hauteur:"+height+" / largeur:"+width)
	target.style.width=width+"px";
	target.style.height=height+"px";
	if (zoom==zoommin) {
		document.getElementById("zoomout").classList.toggle("btn-game-disable");
		document.getElementById("zoomout").classList.toggle("btn-game-off");
		document.getElementById("zoomout").setAttribute("disabled","");
	}
}
function lock(btn) {
	btn.classList.toggle('btn-game-on')
	document.querySelector('.btn-game-box').classList.toggle('btn-game-box-fs');
	document.getElementById("game").classList.toggle("game-lock")
	let locked=document.querySelector("body");

	if (fullscreen) {
		fullscreen=false;
		locked.removeAttribute('class','overflowhide');
	}
	else {
		fullscreen=true;
		locked.setAttribute('class','overflowhide');
	}	
	window.addEventListener('keydown', function(event){
		if (event.key=="Escape" && fullscreen) {
			btn.classList.toggle('btn-game-on')
			document.querySelector('.btn-game-box').classList.toggle('btn-game-box-fs')
			document.getElementById("game").classList.toggle("game-lock")
			locked.removeAttribute('class','overflowhide');
			fullscreen=false;
		}
	});
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
