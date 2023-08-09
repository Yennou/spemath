const directory="assets/game/assets/";


const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 450;
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
	x: canvas.width/2,
	y: canvas.height/2,
}
const key = {		//contrôles
	q:false,
	d:false,
	up:false,
	right:false,
	down:false,
	left:false,
	cooldown : 0,	//cooldown entre chaque input
	cooldownmax : 1 //cooldown max entre chaque input
};

window.addEventListener('keydown', function(event){
	keypressed = event.key;
	//console.log(keypressed)
	if (game.inputType=="keyboard") {
		if (key.cooldown==0) {
			switch (keypressed) {
				case "q":
				case "Q":
					key.q=true;
					key.cooldown=key.cooldownmax;
					break;
				case "d":
				case "D":
				case"Backspace":
					key.d=true;
					key.cooldown=key.cooldownmax;
					break;
				case "ArrowUp": 
					key.up=true;
					key.cooldown=key.cooldownmax;
					break;
				case "ArrowDown": 
					key.down=true;
					key.cooldown=key.cooldownmax;
					break;
				case "ArrowLeft": 
					key.left=true;
					key.cooldown=key.cooldownmax;
					break;
				case "ArrowRight": 
					key.right=true;
					key.cooldown=key.cooldownmax;
					break;
				case " ":
				case "Enter":
					key.space=true;
					key.cooldown=key.cooldownmax;
					break;
				default:
					break;
			}
			if (game.mainevent=="play") {
				switch (keypressed) {
				case"&":
				case"1":
					input=input*10+1;
					break;
				case"é":
				case"2":
					input=input*10+2;
					break;
				case"\"":
				case"3":
					input=input*10+3;
					break;
				case"'":
				case"4":
					input=input*10+4;
					break;
				case"(":
				case"5":
					input=input*10+5;
					break;
				case"-":
				case"6":
					if (event.keyCode==109) {
						game.battle.negat ? game.battle.negat=false:game.battle.negat=true;
					} else {
						input=input*10+6;
					}
					break;
				case"è":
				case"7":
					input=input*10+7;
					break;
				case"_":
				case"8":
					input=input*10+8;
					break;
				case"ç":
				case"9":
					input=input*10+9;
					break;
				case"à":
				case"0":
					input=input*10+0;
					break;
				case "d":
				case "D":
				case"Backspace":
					input=Math.floor(input/10);
					break;
				case "q":
				case "Q":
				case "Shift":
					game.battle.negat ? game.battle.negat=false:game.battle.negat=true;
					break;
				}
			}
		}
	}
});
window.addEventListener('keyup', function(event){
	keypressed = event.key;
	switch (keypressed) {
		case "q":
		case "Q":
			key.q=false;
			break;
		case "d":
		case "D":
		case"Backspace":
			key.d=false;
			break;
		case "ArrowUp": 
			key.up=false;
			break;
		case "ArrowDown": 
			key.down=false;
			break;
		case "ArrowLeft": 
			key.left=false;
			break;
		case "ArrowRight": 
			key.right=false;
			break;
		case " ":
		case "Enter":
			key.space=false;
			break;
		default:
			break;
	}
});
canvas.addEventListener('mousedown', function(event){
	if (game.inputType=="phone") {
		canvasPosition = canvas.getBoundingClientRect();
		mouse.x=Math.floor(Cw*((event.x-canvasPosition.left)/canvasPosition.width));
		mouse.y=Math.floor(Ch*((event.y-canvasPosition.top)/canvasPosition.height));
		switch(game.screen){
		case "title":
			switch(game.mainevent){
			case "mainmenu":
				setmenu(3,"lr",0,0,0,0);
				game.screen="hub";
			default:
				break;
			}
			break;
		case "hub":
			if (mouse.x >= Cw*0.26 && mouse.y >= Ch*0.47 && mouse.x <= Cw*0.26+Cw*0.08 && mouse.y <= Ch*0.47+Ch*0.11) {
				game.menu.target==1 ? game.menu.target=3:game.menu.target--;
			}
			if (mouse.x >= Cw*0.66 && mouse.y >= Ch*0.47 && mouse.x <= Cw*0.66+Cw*0.08 && mouse.y <= Ch*0.47+Ch*0.11) {
				game.menu.target==3 ? game.menu.target=1:game.menu.target++;
			}
			if (mouse.x >= Cw*0.37 && mouse.y >= Ch*0.47 && mouse.x <= Cw*0.37+Cw*0.26 && mouse.y <= Ch*0.47+Ch*0.11) {
				if(game.menu.target==1){
					setmenu(4,"lr",0.065,0.43,0.23,0);
					game.screen="mode1";
					game.event="first"
				}
				if(game.menu.target==2){
					setmenu(3,"lr",0.165,0.43,0.23,0);
					game.screen="mode2";
					game.event="first"					
				}
				if(game.menu.target==3){
					setmenu(4,"ud",0.045,0.46,0,0.1,4);
					game.screen="options";
					game.mainevent="menu";
					game.event="back"
				}
			}
			break;
		case "options":
			switch (game.mainevent){
			case "menu":
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.44 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.44+Ch*0.08) {
					setmenu(11,"lr",0,0,0,0,game.option.inputOpacity/10+1);
					game.mainevent="select";
					game.event="opa.input";
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.54 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.54+Ch*0.08) {
					switch(game.anim.lowtimer.mode){
					case "alt":
						setmenu(3,"lr",0,0,0,0,3);
						break;
					case "fix":
						setmenu(3,"lr",0,0,0,0,2);
						break;
					case "none":
						setmenu(3,"lr",0,0,0,0,1);
						break;
					}
					game.mainevent="select";
					game.event="lowtimer";
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.64 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.64+Ch*0.08) {
					switch(game.anim.decaybar.mode){
					case "alt":
						setmenu(2,"lr",0,0,0,0,2);
						break;
					case "fix":
						setmenu(2,"lr",0,0,0,0,1);
						break;
					}
					game.mainevent="select";
					game.event="decaytimer";
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.74 && mouse.x <= Cw*0.07+Cw*0.2 && mouse.y <= Ch*0.74+Ch*0.08) {
					setmenu(3,"lr",0,0,0,0,3);
					game.screen="hub";
					game.mainevent=""
				}
				break;
			case "select":
				if (mouse.x >= Cw*0.54 && mouse.y >= Ch*0.44 && mouse.x <= Cw*0.54+Cw*0.08 && mouse.y <= Ch*0.44+Ch*0.4) {
					game.menu.target--;
				}
				if (mouse.x >= Cw*0.86 && mouse.y >= Ch*0.44 && mouse.x <= Cw*0.86+Cw*0.08 && mouse.y <= Ch*0.44+Ch*0.4) {
					game.menu.target++;
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.44 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.44+Ch*0.4) {
					setmenu(4,"ud",0.045,0.46,0,0.1,4);
					game.mainevent="menu";
					game.event="back"
				}
				switch (game.event) {
				case "opa.input":
					if (game.menu.target>11) game.menu.target=1;
					if (game.menu.target<1) game.menu.target=11;
					break;
				case "lowtimer":
					if (game.menu.target>3) game.menu.target=1;
					if (game.menu.target<1) game.menu.target=3;
					break;
				case "decaytimer":
					if (game.menu.target>2) game.menu.target=1;
					if (game.menu.target<1) game.menu.target=2;
					break;
				}
				break; 
			}
			break;
		case "mode1":
			if (mouse.x >= Cw*0.01 && mouse.y >= Ch*0.02 && mouse.x <= Cw*0.02+Cw*0.285 && mouse.y <= Ch*0.02+Ch*0.1) {
				setmenu(3,"lr",0,0,0,0);
				game.screen="hub";
				game.event=""
			}
			switch(game.event){
			case "first":
				if (mouse.x >= Cw*0.1 && mouse.y >= Ch*0.2 && mouse.x <= Cw*0.1+100 && mouse.y <= Ch*0.2+125) {
					game.battle.add ? game.battle.add=false: game.battle.add=true;
					game.battle.add ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.33 && mouse.y >= Ch*0.2 && mouse.x <= Cw*0.33+100 && mouse.y <= Ch*0.2+125) {
					game.battle.sub ? game.battle.sub=false: game.battle.sub=true;
					game.battle.sub ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.56 && mouse.y >= Ch*0.2 && mouse.x <= Cw*0.56+100 && mouse.y <= Ch*0.2+125) {
					game.battle.mult ? game.battle.mult=false: game.battle.mult=true;
					game.battle.mult ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.79 && mouse.y >= Ch*0.4 && mouse.x <= Cw*0.79+100 && mouse.y <= Ch*0.4+50) {
					if (game.battle.symbnum>0) {
						setmenu(3,"lr",0.3,0.56,0,0);
						game.event="second"
					}
				}
				break;
			case "second":
				if (mouse.x >= Cw*0.33 && mouse.y >= Ch*0.535 && mouse.x <= Cw*0.34+Cw*0.08 && mouse.y <= Ch*0.535+Ch*0.1) {
					game.menu.target==1 ? game.menu.target=3:game.menu.target--;
				}
				if (mouse.x >= Cw*0.59 && mouse.y >= Ch*0.535 && mouse.x <= Cw*0.59+Cw*0.08 && mouse.y <= Ch*0.535+Ch*0.1) {
					game.menu.target==3 ? game.menu.target=1:game.menu.target++;
				}
				if (mouse.x >= Cw*0.1 && mouse.y >= Ch*0.535 && mouse.x <= Cw*0.1+Cw*0.2 && mouse.y <= Ch*0.535+Ch*0.1) {
					setmenu(4,"lr",0.065,0.43,0.23,0);
					game.event="first";
				}
				if (mouse.x >= Cw*0.7 && mouse.y >= Ch*0.535 && mouse.x <= Cw*0.7+Cw*0.2 && mouse.y <= Ch*0.535+Ch*0.1) {
					setmenu(4,"lr",0.3,0.71,0,0);
					game.event="third";
				}
				break;
			case "third":
				if (mouse.x >= Cw*0.31 && mouse.y >= Ch*0.69 && mouse.x <= Cw*0.31+Cw*0.08 && mouse.y <= Ch*0.69+Ch*0.1) {
					game.menu.target==1 ? game.menu.target=4:game.menu.target--;
				}
				if (mouse.x >= Cw*0.61 && mouse.y >= Ch*0.69 && mouse.x <= Cw*0.61+Cw*0.08 && mouse.y <= Ch*0.69+Ch*0.1) {
					game.menu.target==4 ? game.menu.target=1:game.menu.target++;
				}
				if (mouse.x >= Cw*0.1 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.1+Cw*0.2 && mouse.y <= Ch*0.68+Ch*0.1) {
					setmenu(3,"lr",0.3,0.56,0,0);
					game.event="second"
				}
				if (mouse.x >= Cw*0.7 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.7+Cw*0.2 && mouse.y <= Ch*0.68+Ch*0.1) {
					mult=game.setbtl.mode;
					multn=game.setbtl.chif;
					multd=game.setbtl.dif;
					game.screen="game-mode1";
					game.mainevent="starting";
					game.event="transition";
					game.stats.maxtimer=(Math.floor(20*mult*multn*multd))*100;
					game.timer=20;
				}
				break;
			default:
				break;
			}
			break;
		case "mode2":
			if (mouse.x >= Cw*0.01 && mouse.y >= Ch*0.02 && mouse.x <= Cw*0.02+Cw*0.285 && mouse.y <= Ch*0.02+Ch*0.1) {
				setmenu(3,"lr",0,0,0,0,2);
				game.screen="hub";
				game.event=""
			}
			switch(game.event){
			case "first":
				if (mouse.x >= Cw*0.2 && mouse.y >= Ch*0.2 && mouse.x <= Cw*0.2+Cw*0.175 && mouse.y <= Ch*0.2+Ch*0.32) {
					game.battle.add ? game.battle.add=false: game.battle.add=true;
					game.battle.add ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.43 && mouse.y >= Ch*0.2 && mouse.x <= Cw*0.43+Cw*0.175 && mouse.y <= Ch*0.2+Ch*0.32) {
					game.battle.sub ? game.battle.sub=false: game.battle.sub=true;
					game.battle.sub ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.66 && mouse.y >= Ch*0.4 && mouse.x <= Cw*0.66+110 && mouse.y <= Ch*0.4+45) {
					if (game.battle.symbnum>0) {
						setmenu(4,"lr",0.3,0.63,0,0);
						game.event="second";
					}
				}
				break;
			case "second":
				if (mouse.x >= Cw*0.31 && mouse.y >= Ch*0.61 && mouse.x <= Cw*0.31+Cw*0.08 && mouse.y <= Ch*0.61+Ch*0.1) {
					game.menu.target==1 ? game.menu.target=4:game.menu.target--;
				}
				if (mouse.x >= Cw*0.61 && mouse.y >= Ch*0.61 && mouse.x <= Cw*0.61+Cw*0.08 && mouse.y <= Ch*0.61+Ch*0.1) {
					game.menu.target==4 ? game.menu.target=1:game.menu.target++;
				}
				if (mouse.x >= Cw*0.1 && mouse.y >= Ch*0.61 && mouse.x <= Cw*0.1+Cw*0.2 && mouse.y <= Ch*0.61+Ch*0.1) {
					setmenu(3,"lr",0.165,0.43,0.23,0);
					game.event="first"	
				}
				if (mouse.x >= Cw*0.7 && mouse.y >= Ch*0.61 && mouse.x <= Cw*0.7+Cw*0.2 && mouse.y <= Ch*0.61+Ch*0.1) {
					game.screen="game-mode2";
					game.mainevent="starting";
					game.event="set";
				}
				break;
			default:
				break;
			}
			break;
		case "game-mode1":
			switch (game.mainevent){
			case "gameover":
				switch(game.event){
				case "finpop":
					if (mouse.x >= Cw*0.18 && mouse.y >= Ch*0.785 && mouse.x <= Cw*0.18+150 && mouse.y <= Ch*0.785+50) {
						game.mainevent="starting";
						game.event="transition";
						game.timer=20;
						resetStats()
					}
					if (mouse.x >= Cw*0.465 && mouse.y >= Ch*0.785 && mouse.x <= Cw*0.465+220 && mouse.y <= Ch*0.785+50) {
						setmenu(3,"lr",0,0,0,0);
						game.screen="hub";
						game.event="";
						resetStats()
					}
					break;
				default:
					break;
				}
				break;
			default:
				break;
			}
			break;
		case "game-mode2":
			switch (game.mainevent){
			case "gameover":
				switch(game.event){
				case "finpop":
					if (mouse.x >= Cw*0.18 && mouse.y >= Ch*0.785 && mouse.x <= Cw*0.18+150 && mouse.y <= Ch*0.785+50) {
						game.mainevent="starting";
						game.event="set";
						resetStats()
					}
					if (mouse.x >= Cw*0.465 && mouse.y >= Ch*0.785 && mouse.x <= Cw*0.465+220 && mouse.y <= Ch*0.785+50) {
						setmenu(3,"lr",0,0,0,0,2);
						game.screen="hub";
						game.event="";
						resetStats()
					}
					break;
				default:
					break;
				}
				break;
			default:
				break;
			}
			break;
		default:
			break;
		}
	}
});

const Cw= canvas.width, Ch= canvas.height;
const game = {
						//tag pour l'affichage et les événements
	screen : "loading",
	mainevent : "mainmenu",
	event : "",
	inputType:"keyboard", //keyboard, phone

	option : {			//Options en jeu
		music : 100,
		sound : 100,
		inputOpacity: 60,
	},
						//Variables pour menus
	menu : {
		options : 3,
		target : 1,
		direction : "ud",
			//En % de l'écran
		initx : 0.32,
		inity : 0.54,
		posx : 0.32,
		posy : 0.54,
		padx : 0.00,
		pady : 0.07,
		select : false
	},
					//Statistiques du joueurs
	stats : {
		score : 0,
		clear : 0,
		miss : 0,
		combo : 0,
		maxcombo : 0,
		maxtimer : 0,
		timer : 0,
		timerDecay : 0,
		timeRep : 0,
		timeTot : 0,
		avgrep : 0,
		inputT : [],
		pv:0,
		maxpv:0,
	},
	setbtl : {
		mode:1,
		dif:1,
		chif:1
	},
	battle : {
		mode : "very-easy",		// very-easy, easy, normal, hard
		add : true,
		sub : false,
		mult : false,
		numopp : 1,
		symbnum : 1,
		score : 0,
		negat : false,
		validate : false,
		num1:0,
		num2:0,
		symb:"", 		//plus, moins, mult, div
		timer:"10.",
		timerm:"00",
		dmg:0,
		rangemin:0,
		rangemax:0,
		rangeminstep:0.3,
		rangemaxstep:0.75,
		regen:2,
		regenstep:1,
		decaystep:20,
		timerhplose:25,
	},
	anim: {
		decaybar: {
			time:39,
			invert:false,
			mode:"alt"			//"alt" "fix"
		},
		lowtimer:{
			time:30,
			mode:"alt"			//"alt" "fix" "none"
		}
	},
	hightscore: {
		score : 0,
		miss : 0,
		combo : 0,
		tottimer : 0
	},
	timer:0
}
let input = 0;
let pass= false;
const btl_plus= new Image();
const btl_moins= new Image();
const btl_mult= new Image();
const inputframe= new Image();
const icon_plus= new Image();
const icon_moins= new Image();
const icon_mult= new Image();
const icon_plusON= new Image();
const icon_moinsON= new Image();
const icon_multON= new Image();
const menu_time= new Image();
const menu_life= new Image();
const menu_opt= new Image();

btl_plus.src = directory+"plus.png";
btl_moins.src = directory+"moins.png";
btl_mult.src = directory+"mult.png";
inputframe.src = directory+"input.png"
icon_plus.src = directory+"icon_plus.png";
icon_moins.src = directory+"icon_moins.png";
icon_mult.src = directory+"icon_mult.png";
icon_plusON.src = directory+"icon_plusON.png";
icon_moinsON.src = directory+"icon_moinsON.png";
icon_multON.src = directory+"icon_multON.png";
menu_time.src = directory+"menu_time.png";
menu_life.src = directory+"menu_life.png";
menu_opt.src = directory+"menu_options.png";

//fonction d'initialisation d'un menu
function setmenu(numoption,direction,initx,inity,padx,pady,defaultpos=1){
	game.menu.options = numoption;
	game.menu.direction = direction;
	game.menu.initx = initx;
	game.menu.inity = inity;
	game.menu.posx = initx;
	game.menu.posy = inity;
	game.menu.padx = padx;
	game.menu.pady = pady;
	game.menu.select = false;
	game.menu.target = defaultpos;
	if (defaultpos!=1) {
		game.menu.posx += game.menu.padx*(game.menu.target-1);
		game.menu.posy += game.menu.pady*(game.menu.target-1);
	}
	key.q=false;
	key.d=false;
	key.space=false
}
//fonction de déplacement dans les menus
function movemenu(){
	if (game.menu.direction=="ud"||game.menu.direction=="all") {
		if (key.up) {game.menu.posy -= game.menu.pady; game.menu.target--;key.up=false}
		if (key.down) {game.menu.posy += game.menu.pady; game.menu.target++;key.down=false}
	}
	if (game.menu.direction=="lr"||game.menu.direction=="all") {
		if (key.left) {game.menu.posx -= game.menu.padx; game.menu.target--;key.left=false}
		if (key.right) {game.menu.posx += game.menu.padx; game.menu.target++;key.right=false}
	}
	if (game.menu.target>game.menu.options) {
		game.menu.target=1;
		game.menu.posx = game.menu.initx;
		game.menu.posy = game.menu.inity;
	}
	if (game.menu.target<1) {
		game.menu.target=game.menu.options;
		game.menu.posx += game.menu.padx*game.menu.options;
		game.menu.posy += game.menu.pady*game.menu.options;
	}
}
//fonction d'affichage du sprite du curseur (par défaut: flèche vers la droite)
function showcursor(cursortype=0){
	c.fillStyle = "white";
	c.fillRect(Cw*game.menu.posx,Ch*game.menu.posy,20,20)
}

function inputPlayer(){
	c.globalAlpha=game.option.inputOpacity/100;
	c.fillStyle="white";
	if (game.inputType=="keyboard") {
		c.drawImage(inputframe,Cw*0.80,Ch*0.42,125,80)
		c.drawImage(inputframe,Cw*0.840,Ch*0.61,100,80)
		c.drawImage(inputframe,Cw*0.840,Ch*0.8,100,80)
		c.font = '30px monospace';
		c.fillText("Enter",Cw*0.9,Ch*0.53)
		c.font = '46px monospace';
		c.fillText("(-)",Cw*0.92,Ch*0.73)
		c.fillText("<-",Cw*0.92,Ch*0.92)
		c.textAlign="start";
		c.fillStyle="yellow";
		c.font = '22px monospace';
		c.fillText("Espace",Cw*0.81,Ch*0.47)
		c.fillText("Shift",Cw*0.85,Ch*0.66)
		c.fillText("Retour",Cw*0.85,Ch*0.85)
	}
}
function inputPlayerPhone(inputP){
	if ((inputP>=0&&inputP<=9)&&game.mainevent=="play") input=input*10+inputP;
	else {
		switch (inputP){
		case "Negat":
			if (game.mainevent=="play") {
				game.battle.negat ? game.battle.negat=false:game.battle.negat=true;
			}else {
				key.q=true;
				key.cooldown=key.cooldownmax;
				
			}
			break;
		case"Retour":
			if (game.mainevent=="play") {
				input=Math.floor(input/10);
			}else {
				key.d=true;
				key.cooldown=key.cooldownmax;
				resetInput(inputP)
			}
			break;
		case "Enter":
			key.space=true;
			key.cooldown=key.cooldownmax;
			resetInput(inputP)
			break;
		default:
			break;
		}
	}
}
function resetInput(inputName){
	if (key.cooldown==0) {
		switch (inputName){
		case "Negat":
			key.q=false;
			break;
		case"Retour":
			key.d=false;
			break;
		case "Enter":
			key.space=false;
			break;
		default:
			break;
		}
	}
	else {
		setTimeout(resetInput,2,inputName)
	}
	
}

function loopAnimation() {
	if (key.cooldown>0) {key.cooldown--}
	if (game.timer>0) {game.timer--}
	c.fillStyle="black";
	c.globalAlpha = 1;
	c.fillRect(0,0,canvas.width,canvas.height)
	switch (game.screen) {
		case "loading":
			if (chargement!=1) {
				c.fillStyle="black";
				c.fillRect(0,0,canvas.width,canvas.height)
				c.textAlign="center";
				c.font = '12px monospace';
				c.fillStyle = "white";
				c.fillText("chargement...", canvas.width/2, 8*canvas.height/10);
				c.fillStyle = "blue";
				c.fillRect(canvas.width*0.275,canvas.height*0.834,canvas.width*0.45*(chargement/4),canvas.height*0.018)
				c.strokeStyle = "grey";
				c.fillStyle = "black";
				c.beginPath()
				c.rect(canvas.width*0.275,canvas.height*0.833,canvas.width*0.45,canvas.height*0.02)
				c.closePath()
				c.stroke()
			} else {
				game.screen="title";
			}
			break;
		case "title" :
			switch (game.mainevent) {
				case "mainmenu" : 
					c.fillStyle="white";
					c.globalAlpha=1;
					c.textAlign="center";
					c.font = '50px monospace';
					c.fillText("Spé Maths",Cw*0.5,Ch*0.35)
					if (game.inputType=="keyboard") {
						c.font = '22px monospace';
						c.fillText("Contrôles :",Cw*0.2,Ch*0.66)
						c.fillText("Commencer",Cw*0.5,Ch*0.58)
						c.fillStyle="yellow";
						c.textAlign="start";
						c.fillText("Espace/ Entrée",Cw*0.1,Ch*0.72)
						c.fillText("Retour/ D",Cw*0.1,Ch*0.78)
						c.fillText("- / Shift/ Q",Cw*0.1,Ch*0.84)
						c.fillText("1,2,3,4,5,6,7,8,9,0",Cw*0.1,Ch*0.90)
						c.fillText("Touche directionnel",Cw*0.1,Ch*0.96)
						c.fillStyle="white";
						c.fillText("- Valider/ Suivant",Cw*0.5,Ch*0.72)
						c.fillText("- Retour/ Supprimer",Cw*0.5,Ch*0.78)
						c.fillText("- Symbole négatif (-)",Cw*0.5,Ch*0.84)
						c.fillText("- Saisir chiffre",Cw*0.5,Ch*0.90)
						c.fillText("- Se déplacer",Cw*0.5,Ch*0.96)
					
						showcursor()
					}else {
						c.font = '30px monospace';
						c.fillText("Cliquez pour jouer",Cw*0.5,Ch*0.60)
					}
					if (key.space) {
						if(game.menu.target==1){
							setmenu(3,"lr",0,0,0,0);
							game.screen="hub";
						}
					}
					break;
				default : 
					errormsg("mainevent error !")
					break;
			}
			break;
		case "hub":
			c.fillStyle="white";
			if (game.inputType=="phone") {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.26,Ch*0.47,Cw*0.08,Ch*0.11)
				c.fillRect(Cw*0.37,Ch*0.47,Cw*0.26,Ch*0.11)
				c.fillRect(Cw*0.66,Ch*0.47,Cw*0.08,Ch*0.11)
			}
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '50px monospace';
			c.fillText("<",Cw*0.3,Ch*0.55)
			c.fillText(">",Cw*0.7,Ch*0.55)
			c.font = '26px monospace';
			switch (game.menu.target){
			case 1:
				c.drawImage(menu_time,Cw*0.5-75,Ch*0.25-75,150,150)
				c.fillText("Temps",Cw*0.5,Ch*0.55)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Survivez le plus longtemps possible en",Cw*0.05,Ch*0.65)
				c.fillText("réalisant le plus d'opérations possible !",Cw*0.05,Ch*0.70)
				c.fillText("Cumulez du temps supplémentaire et des points",Cw*0.05,Ch*0.77)
				c.fillText("pour chaque bonne réponse.",Cw*0.05,Ch*0.82)
				c.fillText("Idéal pour faire une partie personnalisée.",Cw*0.05,Ch*0.89)
				break;
			case 2:
				c.drawImage(menu_life,Cw*0.5-75,Ch*0.25-75,150,150)
				c.fillText("Vies",Cw*0.5,Ch*0.55)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Gardez vos points de vies le plus élevé possible,",Cw*0.05,Ch*0.65)
				c.fillText("une erreur peut vous être fatale.",Cw*0.05,Ch*0.70)
				c.fillText("Cumulez des points pour chaque bonne réponse et",Cw*0.05,Ch*0.77)
				c.fillText("atteignez des sommets avec le cumul des résultats.",Cw*0.05,Ch*0.82)
				c.fillText("Un bon entrainement pour garder le fil.",Cw*0.05,Ch*0.89)
				break;
			case 3:
				c.drawImage(menu_opt,Cw*0.5-75,Ch*0.25-75,150,150)
				c.fillText("Options",Cw*0.5,Ch*0.55)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Règlez les options d'affichage en jeu afin",Cw*0.05,Ch*0.65)
				c.fillText("de personnaliser votre expérience de jeu.",Cw*0.05,Ch*0.70)
				break;
			default:
				break;
			}
			
			if (game.inputType=="keyboard") {
				movemenu()
			}
			if (key.space) {
				if(game.menu.target==1){
					setmenu(4,"lr",0.065,0.43,0.23,0);
					game.screen="mode1";
					game.event="first"
				}
				if(game.menu.target==2){
					setmenu(3,"lr",0.165,0.43,0.23,0);
					game.screen="mode2";
					game.event="first"					
				}
				if(game.menu.target==3){
					setmenu(4,"ud",0.045,0.46,0,0.1);
					game.screen="options";
					game.mainevent="menu"
				}
			}
			break;
		case "options":
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '30px monospace';
			c.fillText("> Options <",Cw*0.5,Ch*0.15)
			game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
			c.textAlign="start";
			c.fillText("Aperçu :",Cw*0.05,Ch*0.32)
			c.fillText("Opacité Aide",Cw*0.1,Ch*0.5)
			c.fillText("Indicateur temps bas",Cw*0.1,Ch*0.6)
			c.fillText("Indicateur temps réduit",Cw*0.1,Ch*0.7)
			c.fillText("Retour",Cw*0.1,Ch*0.8)
			c.textAlign="center";
			c.fillRect(Cw*0.628,Ch*0.465,Cw*0.244*(game.option.inputOpacity/100),Ch*0.04)
			c.strokeStyle="grey";
			c.strokeRect(Cw*0.625,Ch*0.46,Cw*0.25,Ch*0.05)

			if (game.inputType=="keyboard") {
				movemenu()
			}
			switch (game.anim.lowtimer.mode){
			case "alt":
				c.fillText("Alterné",Cw*0.75,Ch*0.6)
				break;
			case "fix":
				c.fillText("Fixe",Cw*0.75,Ch*0.6)
				break;
			case "none":
				c.fillText("Aucun",Cw*0.75,Ch*0.6)
				break;
			}
			switch (game.anim.decaybar.mode){
			case "alt":
				c.fillText("Alterné",Cw*0.75,Ch*0.7)
				break;
			case "fix":
				c.fillText("Fixe",Cw*0.75,Ch*0.7)
				break;
			}
			switch (game.event) {
			case "opa.input":
				c.globalAlpha=game.option.inputOpacity/100;
				c.drawImage(inputframe,Cw*0.25,Ch*0.2,125,80)
				c.drawImage(inputframe,Cw*0.45,Ch*0.2,100,80)
				c.drawImage(inputframe,Cw*0.61,Ch*0.2,100,80)
				game.inputType=="phone" ? c.font = '28px monospace': c.font = '30px monospace';
				c.fillText("Enter",Cw*0.35,Ch*0.308)
				game.inputType=="phone" ? c.font = '44px monospace': c.font = '46px monospace';
				c.fillText("(-)",Cw*0.525,Ch*0.315)
				c.fillText("<-",Cw*0.685,Ch*0.315)
				c.globalAlpha=1;
				c.font = '26px monospace';
				if (game.inputType=="phone") {c.fillStyle="red";c.fillText("Ne s'affiche pas en mode téléphone !",Cw*0.5,Ch*0.43);c.fillStyle="white";}
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Opacitée de l'aide montré en jeu pour ",Cw*0.1,Ch*0.9)
				c.fillText("rappeler les contrôles en jeu.",Cw*0.1,Ch*0.95)
				break;
			case "lowtimer":
				if (game.anim.lowtimer.mode=="alt") {
					game.anim.lowtimer.time>0 ? game.anim.lowtimer.time--:game.anim.lowtimer.time=30;
				}
				else {
					game.anim.lowtimer.time=30
				}
				c.fillRect(Cw*0.253,Ch*0.325,Cw*0.5*0.18,Ch*0.06)
				if (game.anim.lowtimer.mode!="none") {
					c.fillStyle="red"
					c.globalAlpha=0.2+game.anim.lowtimer.time/50;
					c.fillRect(Cw*0.253,Ch*0.325,Cw*0.5*0.18,Ch*0.06)
				}
				c.globalAlpha=1;
				c.strokeStyle="grey";
				c.strokeRect(Cw*0.25,Ch*0.32,Cw*0.5,Ch*0.07)
				c.fillStyle="white";
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Mode d'affichage pour le chrono",Cw*0.1,Ch*0.9)
				c.fillText("lorsque le temps restant est bas.",Cw*0.1,Ch*0.95)
				break;
			case "decaytimer":
				if (game.anim.decaybar.mode=="alt") {
					game.anim.decaybar.invert ? game.anim.decaybar.time++:game.anim.decaybar.time--;
				}else {
					game.anim.decaybar.time=39;
				}
				if (game.anim.decaybar.time==0||game.anim.decaybar.time==40) game.anim.decaybar.invert=!game.anim.decaybar.invert;
				c.fillStyle="red";
				c.globalAlpha=0.3+game.anim.decaybar.time/80;
				c.fillRect(Cw*0.677,Ch*0.325,Cw*0.07,Ch*0.06)
				c.globalAlpha=1;
				c.strokeStyle="grey";
				c.strokeRect(Cw*0.25,Ch*0.32,Cw*0.5,Ch*0.07)
				c.fillStyle="white";
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Mode d'affichage pour la barre ",Cw*0.1,Ch*0.9)
				c.fillText("d'affaiblissement du temps.",Cw*0.1,Ch*0.95)
				break;
			case "back":
				c.fillStyle="white";
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Retour au menu principal.",Cw*0.1,Ch*0.9)
				break;
			}
			switch (game.mainevent){
			case "menu":
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.07,Ch*0.44,Cw*0.48,Ch*0.08)
					c.fillRect(Cw*0.07,Ch*0.54,Cw*0.48,Ch*0.08)
					c.fillRect(Cw*0.07,Ch*0.64,Cw*0.48,Ch*0.08)
					c.fillRect(Cw*0.07,Ch*0.74,Cw*0.2,Ch*0.08)
				} else {
					showcursor()
				}
				switch (game.menu.target) {
				case 1:
					game.event="opa.input";
					break;
				case 2:
					game.event="lowtimer";
					break;
				case 3:
					game.event="decaytimer";
					break;
				case 4:
					game.event="back";
					break;
				}
				if (key.space) {
					switch (game.menu.target) {
					case 1:
						setmenu(11,"lr",0,0,0,0,game.option.inputOpacity/10+1);
						game.mainevent="select";
						break;
					case 2:
						switch(game.anim.lowtimer.mode){
						case "alt":
							setmenu(3,"lr",0,0,0,0,3);
							break;
						case "fix":
							setmenu(3,"lr",0,0,0,0,2);
							break;
						case "none":
							setmenu(3,"lr",0,0,0,0,1);
							break;
						}
						game.mainevent="select";
						break;
					case 3:
						switch(game.anim.decaybar.mode){
						case "alt":
							setmenu(2,"lr",0,0,0,0,2);
							break;
						case "fix":
							setmenu(2,"lr",0,0,0,0,1);
							break;
						}
						game.mainevent="select";
						break;
					case 4:
						setmenu(3,"lr",0,0,0,0,3);
						game.screen="hub";
						game.mainevent="";
						game.event="";
						break;
					}
				}
				if (key.d) {
					setmenu(3,"lr",0,0,0,0,3);
					game.screen="hub";
					game.mainevent="";
					game.event="";
				}
				break;
			case "select":
				c.fillStyle="white";
				
				c.globalAlpha=1;
				c.textAlign="center";
				game.inputType=="keyboard" ?c.font = '30px monospace': c.font = '42px monospace';
				switch (game.event) {
				case "opa.input":
					c.fillText("<",Cw*0.59,Ch*0.51)
					c.fillText(">",Cw*0.91,Ch*0.51)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.44,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.44,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.44,Cw*0.075,Ch*0.1)
					}
					game.option.inputOpacity=(game.menu.target-1)*10;
					if (key.d||key.space) {
						setmenu(4,"ud",0.045,0.46,0,0.1,1);
						game.mainevent="menu";
					}
					break;
				case "lowtimer":
					c.fillText("<",Cw*0.59,Ch*0.61)
					c.fillText(">",Cw*0.91,Ch*0.61)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.54,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.54,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.54,Cw*0.075,Ch*0.1)
					}
					switch (game.menu.target) {
					case 1:
						game.anim.lowtimer.mode="none";
						break;
					case 2:
						game.anim.lowtimer.mode="fix";
						break;
					case 3:
						game.anim.lowtimer.mode="alt";
						break;
					}
					if (key.d||key.space) {
						setmenu(4,"ud",0.045,0.46,0,0.1,2);
						game.mainevent="menu";
					}
					break;
				case "decaytimer":
					c.fillText("<",Cw*0.59,Ch*0.71)
					c.fillText(">",Cw*0.91,Ch*0.71)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.64,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.64,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.64,Cw*0.075,Ch*0.1)
					}
					switch (game.menu.target) {
					case 1:
						game.anim.decaybar.mode="fix";
						break;
					case 2:
						game.anim.decaybar.mode="alt";
						break;
					}
					if (key.d||key.space) {
						setmenu(4,"ud",0.045,0.46,0,0.1,3);
						game.mainevent="menu";
					}
					break;
				}
			}

			break;
		case "mode1":
			let mult = 1;
			let multn = 1;
			let multd = 1;
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '30px monospace';
			c.fillText("> Mode Temps <",Cw*0.5,Ch*0.15)
			c.textAlign="start";
			c.font = '22px monospace';
			game.battle.add ? c.globalAlpha=1: c.globalAlpha=0.4;
			c.drawImage(btl_plus,Cw*0.1,Ch*0.2,100,100)
			game.battle.sub ? c.globalAlpha=1: c.globalAlpha=0.4;
			c.drawImage(btl_moins,Cw*0.33,Ch*0.2,100,100)
			game.battle.mult ? c.globalAlpha=1: c.globalAlpha=0.4;
			c.drawImage(btl_mult,Cw*0.56,Ch*0.2,100,100)
			c.globalAlpha=1;
			game.battle.add ? c.fillText("Actif",Cw*0.12,Ch*0.47): c.fillText("désact.",Cw*0.12,Ch*0.47);
			game.battle.sub ? c.fillText("Actif",Cw*0.35,Ch*0.47): c.fillText("désact.",Cw*0.35,Ch*0.47);
			game.battle.mult ? c.fillText("Actif",Cw*0.58,Ch*0.47): c.fillText("désact.",Cw*0.58,Ch*0.47);
			c.fillText("Suiv.",Cw*0.8,Ch*0.47)
			if (game.inputType=="keyboard") {
				movemenu()
				showcursor()
			} else {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.01,Ch*0.02,Cw*0.285,Ch*0.1)
				c.globalAlpha=1;
				c.font = '20px monospace';
				c.fillText("Retour au menu",Cw*0.02,Ch*0.08)
			}
			switch (game.event){
			case "first":
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.09,Ch*0.18,Cw*0.175,Ch*0.32)
					c.fillRect(Cw*0.32,Ch*0.18,Cw*0.175,Ch*0.32)
					c.fillRect(Cw*0.55,Ch*0.18,Cw*0.175,Ch*0.32)
					c.fillRect(Cw*0.76,Ch*0.4,110,45)
				}
				if (key.space) {
					switch (game.menu.target){
					case 1:
						game.battle.add ? game.battle.add=false: game.battle.add=true;
						game.battle.add ? game.battle.symbnum++ : game.battle.symbnum--;
						key.space=false;
						break;
					case 2:
						game.battle.sub ? game.battle.sub=false: game.battle.sub=true;
						game.battle.sub ? game.battle.symbnum++ : game.battle.symbnum--;
						key.space=false;
						break;
					case 3:
						game.battle.mult ? game.battle.mult=false: game.battle.mult=true;
						game.battle.mult ? game.battle.symbnum++ : game.battle.symbnum--;
						key.space=false;
						break;
					case 4:
						if (game.battle.symbnum>0) {
							setmenu(3,"lr",0.3,0.56,0,0);
							game.event="second"
						}
						break;
					default:
						break;
					}
				}
				if (key.d) {
					setmenu(3,"lr",0,0,0,0);
					game.screen="hub";
					game.event=""
				}
				if (game.battle.symbnum==1) game.setbtl.mode=0.75;
				if (game.battle.symbnum==2) game.setbtl.mode=1;
				if (game.battle.symbnum==3) game.setbtl.mode=1.2;
				break;
			case "second":
				game.inputType=="phone"? c.font = '26px monospace':c.font = '28px monospace';
				c.fillText("Format :",Cw*0.2,Ch*0.53)
				game.inputType=="phone"? c.font = '20px monospace':c.font = '22px monospace';
				c.textAlign="center";
				if (game.inputType=="phone") {c.fillText("Retour",Cw*0.2,Ch*0.6);c.fillText("Suiv.",Cw*0.8,Ch*0.6)}
				switch (game.menu.target) {
				case 1:
					c.fillText("<   1 + 1   >",Cw*0.5,Ch*0.6)
					game.setbtl.chif=0.66;
					game.battle.numopp=1;
					break;
				case 2:
					c.fillText("<  12 + 12  >",Cw*0.5,Ch*0.6)
					game.setbtl.chif=1;
					game.battle.numopp=2;
					break;
				case 3:
					c.fillText("< 123 + 123 >",Cw*0.5,Ch*0.6)
					game.setbtl.chif=1.5;
					game.battle.numopp=3;
					break;
				}
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.1,Ch*0.535,Cw*0.2,Ch*0.1)
					c.fillRect(Cw*0.33,Ch*0.535,Cw*0.08,Ch*0.1)
					c.fillRect(Cw*0.59,Ch*0.535,Cw*0.08,Ch*0.1)
					c.fillRect(Cw*0.7,Ch*0.535,Cw*0.2,Ch*0.1)
				}
				if (key.d) {
					setmenu(4,"lr",0.065,0.43,0.23,0);
					game.event="first";
				}
				if (key.space) {
					setmenu(4,"lr",0.3,0.71,0,0);
					game.event="third";
				}
				break;
			case "third":
				game.inputType=="phone"? c.font = '26px monospace':c.font = '28px monospace';
				c.fillText("Difficultée :",Cw*0.2,Ch*0.67)
				c.fillText("Format :",Cw*0.2,Ch*0.53)
				game.inputType=="phone"? c.font = '20px monospace':c.font = '22px monospace';
				c.textAlign="center";
				if (game.inputType=="phone") {c.fillText("Retour",Cw*0.2,Ch*0.75);c.fillText("Suiv.",Cw*0.8,Ch*0.75)}
				switch (game.menu.target) {
				case 1:
					c.fillText("< Très facile >",Cw*0.5,Ch*0.75)
					game.setbtl.dif=2;
					game.battle.mode="very-easy";
					break;
				case 2:
					c.fillText("<   Facile    >",Cw*0.5,Ch*0.75)
					game.setbtl.dif=1.5;
					game.battle.mode="easy";
					break;
				case 3:
					c.fillText("<   Normal    >",Cw*0.5,Ch*0.75)
					game.setbtl.dif=1;
					game.battle.mode="normal";
					break;
				case 4:
					c.fillText("<  Difficile  >",Cw*0.5,Ch*0.75)
					game.setbtl.dif=0.7;
					game.battle.mode="hard";
					break;
				}
				switch (game.battle.numopp) {
				case 1:
					c.fillText("<   1 + 1   >",Cw*0.5,Ch*0.6)
					break;
				case 2:
					c.fillText("<  12 + 12  >",Cw*0.5,Ch*0.6)
					break;
				case 3:
					c.fillText("< 123 + 123 >",Cw*0.5,Ch*0.6)
					break;
				}
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.1,Ch*0.69,Cw*0.2,Ch*0.1)
					c.fillRect(Cw*0.33,Ch*0.69,Cw*0.08,Ch*0.1)
					c.fillRect(Cw*0.59,Ch*0.69,Cw*0.08,Ch*0.1)
					c.fillRect(Cw*0.7,Ch*0.69,Cw*0.2,Ch*0.1)
				}
				if (key.d) {
					setmenu(3,"lr",0.3,0.56,0,0);
					game.event="second";
				}
				if (key.space) {
					mult=game.setbtl.mode;
					multn=game.setbtl.chif;
					multd=game.setbtl.dif;
					game.screen="game-mode1";
					game.mainevent="starting";
					game.event="transition";
					game.stats.maxtimer=(Math.floor(20*mult*multn*multd))*100;
					game.timer=20;
				}
				break;
			}
			mult=game.setbtl.mode;
			multn=game.setbtl.chif;
			multd=game.setbtl.dif;
			c.globalAlpha=1;
			c.textAlign="start";
			c.font = '22px monospace';
			c.fillText("Temps maximum : "+(Math.floor(20*mult*multn*multd))+" secondes",Cw*0.25,Ch*0.83)
			c.globalAlpha=0.6;
			if (game.inputType=="keyboard") {
				c.fillText("- Valider",Cw*0.32,Ch*0.9)
				c.fillText("- Retour",Cw*0.8,Ch*0.9)
				c.fillText("- Déplacer",Cw*0.58,Ch*0.96)
				c.fillStyle="yellow";
				c.fillText("Espace/ Entrée",Cw*0.05,Ch*0.9)
				c.fillText("D/ Rtr.Arrière",Cw*0.52,Ch*0.9)
				c.fillText("Flèche directionnel",Cw*0.2,Ch*0.96)
			}
			else {
				c.fillText("Cliquez pour faire vos choix",Cw*0.24,Ch*0.9)
			}
			break;
		case "mode2":
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '30px monospace';
			c.fillText("> Mode vies <",Cw*0.5,Ch*0.15)
			c.font = '22px monospace';
			c.textAlign="start";
			game.battle.add ? c.globalAlpha=1: c.globalAlpha=0.4;
			c.drawImage(btl_plus,Cw*0.2,Ch*0.2,100,100)
			game.battle.sub ? c.globalAlpha=1: c.globalAlpha=0.4;
			c.drawImage(btl_moins,Cw*0.43,Ch*0.2,100,100)
			c.globalAlpha=1;
			game.battle.add ? c.fillText("Actif",Cw*0.22,Ch*0.47): c.fillText("désact.",Cw*0.22,Ch*0.47);
			game.battle.sub ? c.fillText("Actif",Cw*0.45,Ch*0.47): c.fillText("désact.",Cw*0.45,Ch*0.47);
			c.fillText("Suiv.",Cw*0.7,Ch*0.47)
			if (game.inputType=="keyboard") {
				movemenu()
				showcursor()
			} else {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.01,Ch*0.02,Cw*0.285,Ch*0.1)
				c.globalAlpha=1;
				c.font = '20px monospace';
				c.fillText("Retour au menu",Cw*0.02,Ch*0.08)
			}
			switch (game.event){
			case "first":
				if (key.space) {
					switch (game.menu.target){
					case 1:
						game.battle.add ? game.battle.add=false: game.battle.add=true;
						game.battle.add ? game.battle.symbnum++ : game.battle.symbnum--;
						key.space=false;
						break;
					case 2:
						game.battle.sub ? game.battle.sub=false: game.battle.sub=true;
						game.battle.sub ? game.battle.symbnum++ : game.battle.symbnum--;
						key.space=false;
						break;
					case 3:
						if (game.battle.symbnum>0) {
							setmenu(4,"lr",0.3,0.63,0,0);
							game.event="second";
						}
						break;
					default:
						break;
					}
				}
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.19,Ch*0.18,Cw*0.175,Ch*0.32)
					c.fillRect(Cw*0.42,Ch*0.18,Cw*0.175,Ch*0.32)
					c.fillRect(Cw*0.66,Ch*0.4,110,45)
				}
				if (key.d) {
					setmenu(3,"lr",0,0,0,0,2);
					game.screen="hub";
					game.event=""
				}
				break;
			case "second":
				game.inputType=="phone"? c.font = '26px monospace':c.font = '28px monospace';
				c.fillText("Difficultée :",Cw*0.2,Ch*0.6)
				game.inputType=="phone"? c.font = '20px monospace':c.font = '22px monospace';
				c.textAlign="center";
				if (game.inputType=="phone") {c.fillText("Retour",Cw*0.2,Ch*0.67);c.fillText("Suiv.",Cw*0.8,Ch*0.67)}
				switch (game.menu.target) {
				case 1:
					c.fillText("< Très facile >",Cw*0.5,Ch*0.67)
					game.setbtl.dif=2;
					game.battle.mode="very-easy";
					break;
				case 2:
					c.fillText("<   Facile    >",Cw*0.5,Ch*0.67)
					game.setbtl.dif=1.5;
					game.battle.mode="easy";
					break;
				case 3:
					c.fillText("<   Normal    >",Cw*0.5,Ch*0.67)
					game.setbtl.dif=1;
					game.battle.mode="normal";
					break;
				case 4:
					c.fillText("<  Difficile  >",Cw*0.5,Ch*0.67)
					game.setbtl.dif=0.7;
					game.battle.mode="hard";
					break;
				}
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.1,Ch*0.61,Cw*0.2,Ch*0.1)
					c.fillRect(Cw*0.31,Ch*0.61,Cw*0.08,Ch*0.1)
					c.fillRect(Cw*0.61,Ch*0.61,Cw*0.08,Ch*0.1)
					c.fillRect(Cw*0.7,Ch*0.61,Cw*0.2,Ch*0.1)
				}
				if (key.d) {
					setmenu(3,"lr",0.165,0.43,0.23,0);
					game.event="first";
				}
				if (key.space) {
					game.screen="game-mode2";
					game.mainevent="starting";
					game.event="set";
				}
				break;
			}
			c.globalAlpha=1;
			c.textAlign="start";
			c.font = '22px monospace';
			if (game.battle.mode=="very-easy"||game.battle.mode=="easy") {
				c.fillText("Temps maximum : 10 secondes",Cw*0.25,Ch*0.83)
			} else if (game.battle.mode=="normal") {
				c.fillText("Temps maximum : 11 secondes",Cw*0.25,Ch*0.83)
			} else {
				c.fillText("Temps maximum : 12 secondes",Cw*0.25,Ch*0.83)
			}
			c.globalAlpha=0.6;
			if (game.inputType=="keyboard") {
				c.fillText("- Valider",Cw*0.32,Ch*0.9)
				c.fillText("- Retour",Cw*0.8,Ch*0.9)
				c.fillText("- Déplacer",Cw*0.58,Ch*0.96)
				c.fillStyle="yellow";
				c.fillText("Espace/ Entrée",Cw*0.05,Ch*0.9)
				c.fillText("D/ Rtr.Arrière",Cw*0.52,Ch*0.9)
				c.fillText("Flèche directionnel",Cw*0.2,Ch*0.96)
			}
			else {
				c.fillText("Cliquez pour faire vos choix",Cw*0.24,Ch*0.9)
			}
			break;
		case "game-mode1":
			if (game.anim.decaybar.mode=="alt") {
				game.anim.decaybar.invert ? game.anim.decaybar.time++:game.anim.decaybar.time--;
			}else {
				game.anim.decaybar.time=40;
			}
			if (game.anim.decaybar.time==0||game.anim.decaybar.time==40) game.anim.decaybar.invert=!game.anim.decaybar.invert;
			if (game.stats.timer<=game.stats.maxtimer*0.2 && game.anim.lowtimer.mode=="alt") {
				game.anim.lowtimer.time>0 ? game.anim.lowtimer.time--:game.anim.lowtimer.time=30;
			}else {
				game.anim.lowtimer.time=30;
			}
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '22px monospace';
			c.fillText("Temps :",Cw*0.1,Ch*0.1)
			c.fillText("Score :",Cw*0.65,Ch*0.1)
			c.textAlign="start";
			c.font = '20px monospace';
			c.fillText("mode "+returnMode(),Cw*0.02,Ch*0.04)
			if(game.battle.add)  c.fillText("+",Cw*0.3,Ch*0.04);
			if(game.battle.sub)  c.fillText("-",Cw*0.34,Ch*0.04);
			if(game.battle.mult)  c.fillText("x",Cw*0.38,Ch*0.04);
			if(game.battle.numopp==1)  c.fillText(">1<",Cw*0.42,Ch*0.04);
			if(game.battle.numopp==2)  c.fillText(">12<",Cw*0.42,Ch*0.04);
			if(game.battle.numopp==3)  c.fillText(">123<",Cw*0.42,Ch*0.04);
			c.font = '28px monospace';
			c.textAlign="start";
			if (game.stats.combo>4) c.fillText("COMBO "+game.stats.combo,Cw*0.13,Ch*0.25);
			if (game.stats.combo>9) c.fillText("x "+checkCombo(game.stats.combo),Cw*0.135,Ch*0.3);
			c.fillText(game.stats.timer/100,Cw*0.07,Ch*0.17)
			c.fillText(game.stats.score,Cw*0.67,Ch*0.17)
			c.fillRect(Cw*0.203,Ch*0.125,Cw*0.347*(game.stats.timer/game.stats.maxtimer),Ch*0.04)
			c.fillStyle="red";
			c.globalAlpha=0.3+game.anim.decaybar.time/80;
			c.fillRect(Cw*0.55-Cw*0.35*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))),Ch*0.12,Cw*0.35*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))),Ch*0.05)
			if (game.stats.timer<=game.stats.maxtimer*0.2 && game.mainevent!="starting" && game.anim.lowtimer.mode!="none") {
				c.globalAlpha=0.2+game.anim.lowtimer.time/50;
				c.fillRect(Cw*0.203,Ch*0.125,Cw*0.347*(game.stats.timer/game.stats.maxtimer),Ch*0.04)
			}
			c.globalAlpha=1;
			c.strokeStyle="grey";
			c.strokeRect(Cw*0.2,Ch*0.12,Cw*0.35,Ch*0.05)
			c.fillStyle="white";
			switch (game.mainevent){
			case "starting":
				switch (game.event){
				case "transition":
					if (game.timer==0) {
						if (game.stats.timer<game.stats.maxtimer*2/3) {
							game.stats.timer+=Math.floor((game.stats.maxtimer*2/3)/40);
						}
						else {
							game.event="attention";
							game.timer=20
						}
					}
					break;
				case "attention":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("Prêt ?",Cw*(0.5*(1-game.timer/20)),Ch*0.5)
					if (game.timer==0) {
						game.timer=50;
						game.event="pret"
					}
					break;
				case "pret":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("Prêt ?",Cw*0.5,Ch*0.5)
					if (game.timer==0) {
						game.timer=20;
						game.event="partez"
					}
					break;
				case "partez":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("Prêt ?",Cw*(0.5+0.6*(1-game.timer/20)),Ch*0.5)
					c.fillText("PARTEZ !",Cw*(0.5*(1-game.timer/20)),Ch*0.5)
					if (game.timer==0) {
						game.timer=20;
						game.event="start"
					}
					break;
				case "start":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("PARTEZ !",Cw*0.5,Ch*0.5)
					if (game.timer==0) {
						game.event="";
						game.mainevent="play";
						IGTtimer()
						RTAtimer()
						generatePuzzleMode1()
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				break;
			case "play":
				c.textAlign="center";
				c.font = '32px monospace';
				c.fillStyle="white";
				c.font = '40px monospace';
				game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
				drawPuzzle()
				inputPlayer()
				if (game.stats.timer<=0) {
					game.stats.timer=0;
					game.mainevent="gameover";
					game.event="end";
					game.timer=100;
				}
				if (key.space) {
					game.mainevent="wait";
					game.event="calc";
				}
				break;
			case "wait":
				drawPuzzle()
				c.textAlign="center";
				c.font = '32px monospace';
				switch(game.event){
				case "calc":
					pass =validatePuzzle()
					pass ? c.fillStyle ="green": c.fillStyle="red";
					c.font = '40px monospace';
					game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
					game.event="wait";
					game.timer=20;
					break;
				case "wait":
					pass ? c.fillStyle ="green": c.fillStyle="red";
					c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					c.font = '26px monospace';
					c.fillText("+ "+game.battle.score,Cw*0.8,Ch*0.23)
					if (game.timer==0) {
						game.event="";
						game.mainevent="play";
						input=0;
						IGTtimer()
						generatePuzzleMode1()
					}
				}
				break;
			case "gameover":
				c.textAlign="center";
				c.font = '32px monospace';
				c.fillText("TERMINE !",Cw*0.5,Ch*0.5)
				switch (game.event){
				case "end":
					if (game.timer==0) {
						game.event="transition";
						game.timer=50;
					}
					break;
				case "transition":
					c.fillStyle="black";
					c.globalAlpha = 0.92*(1-game.timer/50);
					c.fillRect(0,0,canvas.width,canvas.height)
					if (game.timer==0) {
						if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
						game.stats.avgrep=calcAvgTResp(game.stats.inputT)
						game.event="finpop";
						game.timer=20;
						setmenu(2,"lr",0.17,0.82,0.27,0);
					}
					break;
				case "finpop":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					if (game.inputType=="phone") {
						c.globalAlpha = 0.15*(1-game.timer/20);
						c.fillRect(Cw*0.185,Ch*0.785,Cw*0.21,Ch*0.12)
						c.fillRect(Cw*0.46,Ch*0.785,Cw*0.34,Ch*0.12)
					}
					c.globalAlpha = 1-game.timer/20;
					c.textAlign="center";
					c.font = '38px monospace';
					c.fillText("Fin de la partie !",Cw*0.5,Ch*0.18)
					c.font = '30px monospace';
					c.textAlign="start";
					c.fillText("Mode: "+returnMode(),Cw*0.13,Ch*0.28)
					game.battle.add? c.drawImage(icon_plusON,Cw*0.6,Ch*0.225,35,35) :c.drawImage(icon_plus,Cw*0.6,Ch*0.225,35,35) ;
					game.battle.sub? c.drawImage(icon_moinsON,Cw*0.66,Ch*0.225,35,35) :c.drawImage(icon_moins,Cw*0.66,Ch*0.225,35,35) ;
					game.battle.mult?  c.drawImage(icon_multON,Cw*0.72,Ch*0.225,35,35) :c.drawImage(icon_mult,Cw*0.72,Ch*0.225,35,35) ;
					if(game.battle.numopp==1)  c.fillText(">1<",Cw*0.8,Ch*0.28);
					if(game.battle.numopp==2)  c.fillText(">12<",Cw*0.8,Ch*0.28);
					if(game.battle.numopp==3)  c.fillText(">123<",Cw*0.8,Ch*0.28);
					c.font = '36px monospace';
					c.fillText("Score : "+game.stats.score,Cw*0.13,Ch*0.37)
					c.font = '30px monospace';
					c.fillText("Combo max : "+game.stats.maxcombo,Cw*0.13,Ch*0.46)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.fillText("Bonnes réponses : "+game.stats.clear,Cw*0.13,Ch*0.54)
					c.fillText("Mauvaise réponses : "+game.stats.miss,Cw*0.13,Ch*0.61)
					c.fillText("Temps de réponse moyen : "+game.stats.avgrep+"sec",Cw*0.13,Ch*0.68)
					c.fillText("Durée de la partie : "+game.stats.timeTot/100+"sec",Cw*0.13,Ch*0.75)
					c.fillText("Rejouer      Retour au menu",Cw*0.22,Ch*0.86)
					if (game.inputType=="keyboard") {
						movemenu()
						showcursor()
						if (key.space) {
							resetStats()
							switch (game.menu.target){
							case 1:
								game.mainevent="starting";
								game.event="transition";
								game.timer=20;
								break;
							case 2:
								setmenu(3,"lr",0,0,0,0);
								game.screen="hub";
								game.event="first";
								break;
							}
						}
					}
				}
				break;
			default:
				errormsg("mainevent error !")
				break;
			}
			break;
		case "game-mode2":
			if (game.anim.decaybar.mode=="alt") {
				game.anim.decaybar.invert ? game.anim.decaybar.time++:game.anim.decaybar.time--;
			}else {
				game.anim.decaybar.time=40;
			}
			if (game.anim.decaybar.time==0||game.anim.decaybar.time==40) game.anim.decaybar.invert=!game.anim.decaybar.invert;
			if (game.stats.timer<=game.stats.maxtimer*0.2 && game.anim.lowtimer.mode=="alt") {
				game.anim.lowtimer.time>0 ? game.anim.lowtimer.time--:game.anim.lowtimer.time=30;
			}else {
				game.anim.lowtimer.time=30;
			}
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '22px monospace';
			c.fillText("Temps :",Cw*0.1,Ch*0.1)
			c.fillText("Score :",Cw*0.65,Ch*0.1)
			c.textAlign="start";
			c.font = '20px monospace';
			c.fillText("mode PV "+returnMode(),Cw*0.02,Ch*0.04)
			if(game.battle.add)  c.fillText("+",Cw*0.36,Ch*0.04);
			if(game.battle.sub)  c.fillText("-",Cw*0.40,Ch*0.04);
			if(game.battle.mult)  c.fillText("x",Cw*0.44,Ch*0.04);
			c.font = '28px monospace';
			c.textAlign="start";
			
			if (game.stats.combo>4) c.fillText("COMBO "+game.stats.combo,Cw*0.13,Ch*0.25);
			if (game.stats.combo>9) c.fillText("x "+checkCombo(game.stats.combo),Cw*0.135,Ch*0.3);
			c.fillText(game.stats.timer/100,Cw*0.07,Ch*0.17)
			c.fillText(game.stats.score,Cw*0.67,Ch*0.17)
			c.fillRect(Cw*0.203,Ch*0.125,Cw*0.347*(game.stats.timer/game.stats.maxtimer),Ch*0.04)
			c.fillText("PV : "+game.stats.pv,Cw*0.1,Ch*0.85)
			c.fillText("/ "+game.stats.maxpv,Cw*0.3,Ch*0.85)
			c.fillRect(Cw*0.203,Ch*0.875,Cw*0.494*(game.stats.pv/game.stats.maxpv),Ch*0.07)
			c.fillStyle="red";
			c.globalAlpha=0.5;
			c.fillRect(Cw*0.203+Cw*0.494*(game.stats.pv/game.stats.maxpv),Ch*0.875,Cw*0.494*(game.battle.dmg/game.stats.maxpv),Ch*0.07)
			c.globalAlpha=0.3+game.anim.decaybar.time/80;
			c.fillRect(Cw*0.55-Cw*0.35*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.12,Cw*0.35*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.05)
			if (game.stats.timer<=game.stats.maxtimer*0.2 && game.mainevent!="starting" && game.anim.lowtimer.mode!="none") {
				c.globalAlpha=0.2+game.anim.lowtimer.time/50;
				c.fillRect(Cw*0.203,Ch*0.125,Cw*0.347*(game.stats.timer/game.stats.maxtimer),Ch*0.04)
			}
			c.globalAlpha=1;
			c.strokeStyle="grey";
			c.strokeRect(Cw*0.2,Ch*0.12,Cw*0.35,Ch*0.05)
			c.strokeRect(Cw*0.2,Ch*0.87,Cw*0.5,Ch*0.08)
			c.fillStyle="white";
			switch (game.mainevent){
			case "starting":
				switch (game.event){
				case "set":
					game.stats.pv=0;
					game.stats.timer=0;
					switch (game.setbtl.dif){
					case 2: 			//très facile
						game.stats.maxpv=100;
						game.stats.maxtimer=1000;
						game.battle.rangemin=3;
						game.battle.rangemax=8;
						game.battle.rangeminstep=0.3;
						game.battle.rangemaxstep=0.75;
						game.battle.regen=5;
						game.battle.regenstep=3;
						game.battle.decaystep=20;
						game.battle.timerhplose=25;
						break;
					case 1.5: 			//facile
						game.stats.maxpv=100;
						game.stats.maxtimer=1000;
						game.battle.rangemin=5;
						game.battle.rangemax=15;
						game.battle.rangeminstep=0.35;
						game.battle.rangemaxstep=0.9;
						game.battle.regen=5;
						game.battle.regenstep=5;
						game.battle.decaystep=20;
						game.battle.timerhplose=25;
						break;
					case 1: 			//normal
						game.stats.maxpv=100;
						game.stats.maxtimer=1100;
						game.battle.rangemin=7;
						game.battle.rangemax=20;
						game.battle.rangeminstep=0.6;
						game.battle.rangemaxstep=1.3;
						game.battle.regen=3;
						game.battle.regenstep=5;
						game.battle.decaystep=30;
						game.battle.timerhplose=50;
						break;
					case 0.7: 			//difficile
						game.stats.maxpv=100;
						game.stats.maxtimer=1200;
						game.battle.rangemin=9;
						game.battle.rangemax=25;
						game.battle.rangeminstep=1.1;
						game.battle.rangemaxstep=1.7;
						game.battle.regen=1;
						game.battle.regenstep=3;
						game.battle.decaystep=30;
						game.battle.timerhplose=80;
						break;
					}
					game.event="transition";
					game.timer=20;
					break;
				case "transition":
					if (game.timer==0) {
						if (game.stats.pv<100) {
							game.stats.pv++;
						}
						if (game.stats.timer<game.stats.maxtimer) {
							game.stats.timer+=10;
						}
						else {
							game.battle.dmg=0;
							game.event="attention";
							game.timer=20
						}
					}
					break;
				case "attention":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("Prêt ?",Cw*(0.5*(1-game.timer/20)),Ch*0.5)
					if (game.timer==0) {
						game.timer=50;
						game.event="pret"
					}
					break;
				case "pret":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("Prêt ?",Cw*0.5,Ch*0.5)
					if (game.timer==0) {
						game.timer=20;
						game.event="partez"
					}
					break;
				case "partez":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("Prêt ?",Cw*(0.5+0.6*(1-game.timer/20)),Ch*0.5)
					c.fillText("PARTEZ !",Cw*(0.5*(1-game.timer/20)),Ch*0.5)
					if (game.timer==0) {
						game.timer=20;
						game.event="start"
					}
					break;
				case "start":
					c.textAlign="center";
					c.font = '30px monospace';
					c.fillText("PARTEZ !",Cw*0.5,Ch*0.5)
					if (game.timer==0) {
						game.event="";
						game.mainevent="play";
						input=0;
						IGTtimer()
						RTAtimer()
						generatePuzzleMode2()
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				break;
			case "play":
				if (game.battle.dmg>0) game.battle.dmg--;
				c.textAlign="center";
				game.inputType=="phone" ? c.font = '30px monospace': c.font = '32px monospace';
				c.fillStyle="white";
				game.inputType=="phone" ? c.font = '38px monospace': c.font = '40px monospace';
				game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
				drawPuzzle()
				inputPlayer()
				if (game.stats.timer<=0) {
					game.stats.timer=0;
					game.mainevent="wait";
					game.event="calc";
					game.timer=25;
				}
				if (game.stats.pv<=0) {
					game.stats.pv=0;
					game.mainevent="gameover";
					game.event="begin";
					game.timer=100;
				}
				if (key.space) {
					game.mainevent="wait";
					game.event="calc";
				}
				break;
			case "wait":
				drawPuzzle()
				c.textAlign="center";
				c.font = '32px monospace';
				switch(game.event){
				case "calc":
					pass = validatePuzzleMode2()
					pass ? c.fillStyle ="green": c.fillStyle="red";
					c.font = '40px monospace';
					game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
					game.event="wait";
					game.timer=25;
					break;
				case "wait":
					pass ? c.fillStyle ="green": c.fillStyle="red";
					game.inputType=="phone" ? c.font = '38px monospace': c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					game.inputType=="phone" ? c.font = '24px monospace': c.font = '26px monospace';
					c.fillText("+ "+game.battle.score,Cw*0.8,Ch*0.23)
					if (game.timer==0) {
						game.event="";
						game.mainevent="play";
						IGTtimer()
						generatePuzzleMode2()
						input=0;
					}
				}
				break;
			case "gameover":
				c.textAlign="center";
				game.inputType=="phone" ? c.font = '30px monospace': c.font = '32px monospace';
				c.fillText("TERMINE !",Cw*0.5,Ch*0.5)
				switch (game.event){
				case "begin":
					if (game.battle.dmg>20) game.battle.dmg--;
					if (game.battle.dmg>0) game.battle.dmg--;
					drawPuzzle()
					pass ? c.fillStyle ="green": c.fillStyle="red";
					c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					if (game.battle.dmg==0) {
						game.event="transition";
						game.timer=15;
					}
					break;
				case "end":
					if (game.timer==0) {
						game.event="transition";
						game.timer=50;
					}
					break;
				case "transition":
					c.fillStyle="black";
					c.globalAlpha = 0.92*(1-game.timer/50);
					c.fillRect(0,0,canvas.width,canvas.height)
					if (game.timer==0) {
						if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
						game.stats.avgrep=calcAvgTResp(game.stats.inputT)
						game.event="finpop";
						game.timer=20;
						setmenu(2,"lr",0.17,0.82,0.27,0);
					}
					break;
				case "finpop":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					if (game.inputType=="phone") {
						c.globalAlpha = 0.15*(1-game.timer/20);
						c.fillRect(Cw*0.185,Ch*0.785,Cw*0.21,Ch*0.12)
						c.fillRect(Cw*0.46,Ch*0.785,Cw*0.34,Ch*0.12)
					}
					c.globalAlpha = 1-game.timer/20;
					c.textAlign="center";
					c.font = '38px monospace';
					c.fillText("Fin de la partie !",Cw*0.5,Ch*0.18)
					c.font = '30px monospace';
					c.textAlign="start";
					c.fillText("Mode: PV "+returnMode(),Cw*0.13,Ch*0.28)
					game.battle.add? c.drawImage(icon_plusON,Cw*0.66,Ch*0.225,35,35) :c.drawImage(icon_plus,Cw*0.66,Ch*0.225,35,35);
					game.battle.sub? c.drawImage(icon_moinsON,Cw*0.72,Ch*0.225,35,35) :c.drawImage(icon_moins,Cw*0.72,Ch*0.225,35,35);
					//game.battle.mult?  c.drawImage(icon_multON,Cw*0.72,Ch*0.225,35,35) :c.drawImage(icon_mult,Cw*0.72,Ch*0.225,35,35);
					c.font = '36px monospace';
					c.fillText("Score : "+game.stats.score,Cw*0.13,Ch*0.37)
					c.font = '30px monospace';
					c.fillText("Combo max : "+game.stats.maxcombo,Cw*0.13,Ch*0.46)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.fillText("Bonnes réponses : "+game.stats.clear,Cw*0.13,Ch*0.54)
					c.fillText("Mauvaise réponses : "+game.stats.miss,Cw*0.13,Ch*0.61)
					c.fillText("Temps de réponse moyen : "+game.stats.avgrep+"sec",Cw*0.13,Ch*0.68)
					c.fillText("Durée de la partie : "+game.stats.timeTot/100+"sec",Cw*0.13,Ch*0.75)
					c.fillText("Rejouer      Retour au menu",Cw*0.22,Ch*0.86)
					if (game.inputType=="keyboard") {
						movemenu()
						showcursor()
						if (key.space) {
							resetStats()
							switch (game.menu.target){
							case 1:
								game.mainevent="starting";
								game.event="set";
								break;
							case 2:
								setmenu(3,"lr",0,0,0,0,2);
								game.screen="hub";
								game.event="first";
								break;
							}
						}
					}
				}
				break;
			default:
				errormsg("mainevent error !")
				break;
			}
			break;
		default :
			errormsg("screenevent error !")
			break;
	}
	c.globalAlpha=0.5;
	c.font = '12px monospace';
	c.fillStyle = "white";
	c.textAlign="start";
	c.fillText("Réalisé par @Yenseng3", Cw*0.01, Ch*0.99);
	c.textAlign="end";
	c.fillText("Version BETA 1.2.1", Cw*0.99, Ch*0.99);

	requestAnimationFrame(loopAnimation)
}
loopAnimation()
function resetStats(){
	game.stats.score = 0;
	game.stats.clear = 0;
	game.stats.miss = 0;
	game.stats.combo = 0;
	game.stats.maxcombo = 0;
	game.stats.timer = 0;
	game.stats.timeRep = 0;
	game.stats.timeTot = 0;
	game.stats.avgrep = 0;
	game.stats.inputT = [];
	game.stats.timerDecay = 0;
	game.battle.num1= 0;
	game.battle.num2= 0;
	game.battle.dmg = 0; 
	input=0;
	pass=false;
}
function IGTtimer(){
	if (game.mainevent=="play") {
		if (game.stats.timer>0) {
			game.stats.timer--;
			game.stats.timeRep++;
			setTimeout(IGTtimer,9)
		}
	}
}

function RTAtimer(){
	if (game.mainevent!="gameover"&&game.mainevent!="pause") {
		game.stats.timeTot++;
		setTimeout(RTAtimer,9)
	}
}

function generatePuzzleMode1() {
	let tabsymb= [];
	if (game.battle.add) tabsymb.push("plus");
	if (game.battle.sub) tabsymb.push("moins");
	if (game.battle.mult) tabsymb.push("mult");
	game.stats.timeRep=0;
	game.battle.num1= Math.floor(Math.random()*Math.pow(10,game.battle.numopp));
	game.battle.num2= Math.floor(Math.random()*Math.pow(10,game.battle.numopp));
	game.battle.symb= tabsymb[Math.floor(Math.random()*tabsymb.length)];
	if (game.battle.symb=="mult"&& game.battle.numopp>=2) {
		if (game.battle.numopp>=2&&game.battle.mode=="normal"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*20)+5;
			game.battle.num2= Math.floor(Math.random()*20)+5;
		}
		if (game.battle.numopp==2&&game.battle.mode=="hard"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*40)+5;
			game.battle.num2= Math.floor(Math.random()*12)+5;
		}
		if (game.battle.numopp==3&&game.battle.mode=="hard"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*70)+5;
			game.battle.num2= Math.floor(Math.random()*12)+5;
		}
		else if (game.battle.numopp==3&&game.battle.mode=="hard") {
			game.battle.num1= Math.floor(Math.random()*20)+5;
			game.battle.num2= Math.floor(Math.random()*20)+5;
		} else {
			game.battle.num1= Math.floor(Math.random()*12);
			game.battle.num2= Math.floor(Math.random()*12);
		}
	}
	game.battle.negat=false;
}

function generatePuzzleMode2() {
	let tabsymb= [];
	if (game.battle.add) tabsymb.push("plus");
	if (game.battle.sub) tabsymb.push("moins");
	//if (game.battle.mult) tabsymb.push("mult");
	game.stats.timeRep=0;
	if (pass) {
		if (game.battle.symb=="plus") {
			game.battle.num1=game.battle.num1+game.battle.num2;
		}
		else if (game.battle.symb=="moins") {
			game.battle.num1=game.battle.num1-game.battle.num2;
		}
	}
	game.battle.num2= Math.floor(Math.random()*game.battle.rangemax+game.battle.rangemin);
	game.battle.symb= tabsymb[Math.floor(Math.random()*tabsymb.length)];
	/*if (game.battle.symb=="mult"&& game.battle.numopp>=2) {
		if (game.battle.numopp>=2&&game.battle.mode=="normal"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*20)+5;
			game.battle.num2= Math.floor(Math.random()*20)+5;
		}
		if (game.battle.numopp==2&&game.battle.mode=="hard"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*40)+5;
			game.battle.num2= Math.floor(Math.random()*12)+5;
		}
		if (game.battle.numopp==3&&game.battle.mode=="hard"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*70)+5;
			game.battle.num2= Math.floor(Math.random()*12)+5;
		}
		else if (game.battle.numopp==3&&game.battle.mode=="hard") {
			game.battle.num1= Math.floor(Math.random()*20)+5;
			game.battle.num2= Math.floor(Math.random()*20)+5;
		} else {
			game.battle.num1= Math.floor(Math.random()*12);
			game.battle.num2= Math.floor(Math.random()*12);
		}
	}*/
	game.battle.negat=false;
}

function validatePuzzle() {
	let validate = false;
	if (game.battle.negat) input=input*-1;
	switch (game.battle.symb) {
	case "plus":
		if (game.battle.num1+game.battle.num2==input) validate=true;
		break;
	case "moins":
		if (game.battle.num1-game.battle.num2==input) validate=true;
		break;
	case "mult":
		if (game.battle.num1*game.battle.num2==input) validate=true;
		break;
	/*case "div":
		if (game.battle.num1/game.battle.num2==input) validate=true;
		break;*/
	}
	game.stats.inputT.push(game.stats.timeRep)
	if (validate) {
		game.stats.combo++;
		game.stats.clear++;
		//console.log( game.stats.timeRep +" / "+(2-game.setbtl.dif+game.battle.numopp+game.battle.symbnum)+" / "+(game.stats.timeRep/(2-game.setbtl.dif+game.battle.numopp+game.battle.symbnum))+" = "+(200-game.stats.timeRep/(2-game.setbtl.dif+game.battle.numopp+game.battle.symbnum)))
		let score = 200-game.stats.timeRep/(2-game.setbtl.dif+game.battle.numopp+game.battle.symbnum);
		if (score<50) score=50;
		score = Math.floor(score*checkCombo(game.stats.combo))
		game.stats.score+= score;
		game.battle.score= score;
		let bonustime=0;
		if (game.battle.mode=="very-easy"||game.battle.mode=="easy") {
			bonustime = Math.floor((300-game.stats.clear)*game.setbtl.dif+game.battle.numopp/2+game.battle.symbnum/3);
		} else {
			bonustime = Math.floor((300-game.stats.clear)*(2-game.setbtl.dif+game.battle.numopp/2-(1-game.battle.symbnum/3)));
		}
		if (bonustime<120) {bonustime=120}
		game.stats.timer+=bonustime;
		if (game.stats.timer>game.stats.maxtimer-game.stats.maxtimer*(0.33*(game.stats.clear/200*(game.setbtl.dif/1)))) game.stats.timer=Math.floor(game.stats.maxtimer-game.stats.maxtimer*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))));
	} else {
		game.stats.miss++;
		let malustime = Math.floor(200+100*game.stats.clear/100);
		if (malustime>500) {malustime=500}
		game.stats.timer-=malustime;
		if (game.stats.timer<0) game.stats.timer=0;
		if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
		game.stats.combo=0;
		game.battle.score=0;
	}
	return validate
}
function validatePuzzleMode2() {
	let validate = false;
	if (game.battle.negat) input=input*-1;
	switch (game.battle.symb) {
	case "plus":
		if (game.battle.num1+game.battle.num2==input) validate=true;
		break;
	case "moins":
		if (game.battle.num1-game.battle.num2==input) validate=true;
		break;
	case "mult":
		if (game.battle.num1*game.battle.num2==input) validate=true;
		break;
	/*case "div":
		if (game.battle.num1/game.battle.num2==input) validate=true;
		break;*/
	}
	game.stats.inputT.push(game.stats.timeRep)
	if (validate && game.stats.timer>0) {
		game.stats.combo++;
		game.stats.clear++;
		let score = 200-game.stats.timeRep/3;
		if (score<50) score=50;
		score = Math.floor(score*checkCombo(game.stats.combo))
		game.stats.score+= score;
		game.battle.score= score;
		if (game.stats.clear%game.battle.decaystep==0 && game.stats.timerDecay<game.stats.maxtimer*0.5) game.stats.timerDecay+=100;
		if (game.stats.clear%game.battle.regenstep==0 && game.stats.pv<game.stats.maxpv) game.stats.pv+=game.battle.regen;
		if (game.stats.pv>game.stats.maxpv) game.stats.pv=game.stats.maxpv;
		game.battle.rangemin+=game.battle.rangeminstep;
		game.battle.rangemax+=game.battle.rangemaxstep;
	} else {
		game.stats.miss++;
		if (game.stats.timer==0) {
			game.stats.pv-=game.battle.timerhplose;
			game.battle.dmg+=game.battle.timerhplose;
		}
		else {
			let dmg=0
			switch (game.battle.symb) {
			case "plus":
				dmg=(game.battle.num1+game.battle.num2)-input;
				break;
			case "moins":
				dmg=(game.battle.num1-game.battle.num2)-input;
				break;
			case "mult":
				dmg=game.battle.num1*game.battle.num2;
				break;
			}
			if (dmg<0) dmg=dmg*-1;
			game.stats.pv-=dmg;
			game.battle.dmg+=dmg;
		}
		if (game.stats.pv<0) game.stats.pv=0;
		if (game.battle.dmg>game.stats.maxpv) game.battle.dmg=game.stats.maxpv;
		if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
		game.stats.combo=0;
		game.battle.score=0;
	}
	game.stats.timer=game.stats.maxtimer-game.stats.timerDecay;
	return validate
}
function drawPuzzle(){
	c.textAlign="center";
	game.inputType=="phone" ? c.font = '28px monospace': c.font = '30px monospace';
	switch(game.battle.symb) {
	case "plus":
		c.drawImage(btl_plus,Cw*0.5-75,Ch*0.43-75,150,150)
		c.fillStyle ="white"
		c.shadowColor="white";
		c.shadowBlur=5;
		c.fillText(game.battle.num1+" + "+game.battle.num2,Cw*0.5,Ch*0.455)
		c.fillStyle ="black"
		c.fillText(game.battle.num1+" + "+game.battle.num2,Cw*0.5,Ch*0.455)
		break;
	case "moins":
		c.drawImage(btl_moins,Cw*0.5-75,Ch*0.43-75,150,150)
		c.fillStyle ="white"
		c.shadowColor="white";
		c.shadowBlur=5;
		c.fillText(game.battle.num1+" - "+game.battle.num2,Cw*0.5,Ch*0.455)
		c.fillStyle ="black"
		c.fillText(game.battle.num1+" - "+game.battle.num2,Cw*0.5,Ch*0.455)
		break;
	case "mult":
		c.drawImage(btl_mult,Cw*0.5-75,Ch*0.43-75,150,150)
		c.fillStyle ="white"
		c.shadowColor="white";
		c.shadowBlur=5;
		c.fillText(game.battle.num1+" x "+game.battle.num2,Cw*0.5,Ch*0.455)
		c.fillStyle ="black"
		c.fillText(game.battle.num1+" x "+game.battle.num2,Cw*0.5,Ch*0.455)
		break;
	}
	c.shadowColor="none";
	c.shadowBlur=0;
}
function returnMode(){
	switch (game.battle.mode){
	case "very-easy":
		return "Très facile";
		break;
	case "easy":
		return "Facile";
		break;
	case "normal":
		return "Normal";
		break;
	case "hard":
		return "Difficile";
		break;
	}
}

function checkCombo(combo){
	if (combo<5) {
		return 1
	}
	else if (combo<10) {
		return 1.05
	}
	else if (combo<15) {
		return 1.1
	}
	else if (combo<20) {
		return 1.2
	}
	else if (combo<30) {
		return 1.25
	}
	else if (combo<40) {
		return 1.3
	}
	else if (combo<50) {
		return 1.5
	}
	else if (combo<75) {
		return 1.75
	}
	else if (combo<100) {
		return 2
	}
	else if (combo<150) {
		return 2.5
	}
	else if (combo<200) {
		return 3
	}
	else if (combo<300) {
		return 4
	} else {
		return 5
	}
}

function calcAvgTResp(inputTab){
	let avg = 0;
	if (inputTab.length>0) {
		for (let i =0 ; i < inputTab.length; i++) {
			avg+= inputTab[i];
		}
		avg=Math.floor(avg/inputTab.length)
	}
	return avg/100
}

function errormsg(txt) {
	c.fillStyle="white";
	c.globalAlpha=1;
	c.textAlign="center";
	c.font = '26px monospace';
	c.fillText(txt,Cw*0.5,Ch*0.5)
}
chargement++