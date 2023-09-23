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
const key = {
	q:false,
	d:false,
	p:false,
	space:false,
	up:false,
	right:false,
	down:false,
	left:false,
	cooldown : 0,
	cooldownmax : 1,
	pausecooldown : 0
};

const Cw= canvas.width, Ch= canvas.height;
const game = {
	screen : "loading",
	mainevent : "mainmenu",
	event : "",
	inputType:"keyboard",
	prevevent : "",
	prevtimer : 0,
	option : {
		music : 100,
		sound : 100,
		inputOpacity: 60,
		bckgrndOpacity: 100,
	},
	menu : {
		options : 3,
		target : 1,
		direction : "ud",
		initx : 0.32,
		inity : 0.54,
		posx : 0.32,
		posy : 0.54,
		padx : 0.00,
		pady : 0.07,
		select : false
	},
	stats : {
		score : 0,
		clear : 0,
		miss : 0,
		combo : 0,
		maxcombo : 0,
		timer : 0,
		maxtimer : 0,
		time : 0,
		maxtime : 0,
		timerDecay : 0,
		timeRep : 0,
		timeTot : 0,
		avgrep : 0,
		inputT : [],
		pv:0,
		maxpv:0,
		vies:0,
		maxvies:0
	},
	setbtl : {
		mode:1,
		dif:1,
		chif:1
	},
	battle : {
		gamemode: "",
		mode : "very-easy",
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
		left:0,
		symb:"",
		dmg:0,
		rangemin:0,
		rangemax:0,
		rangeminstep:0.3,
		rangemaxstep:0.75,
		regen:2,
		regenstep:1,
		decaystep:20,
		decaytimer:0,
		timerhplose:25,
		skiptonext:false,
		order:"",
	},
	level : {
		world:1,
		stage:1,
		encounter:[]
	},
	timer:0
}
const anim = {
	decaybar: {
		time:39,
		invert:false,
		mode:"alt"
	},
	lowtimer:{
		time:30,
		mode:"alt"
	},
	perfect:{
		globalOp:0,
		whitescreen:0,
		layer1pos:0,
		layer2opacity:0,
		transition:0,
		ratio:1
	},
	lvlselect:{
		time:59,
		invert:false,
	},
	lvltransition:{
		time:100,
	},
	operation:{
		time:59,
		invert:false,
	},
	background:{
		type:3,
		stock:[],
		timer:0,
	}
}
let input = 0;
let prev = {
	result:0,
	num1:0,
	num2:0
}
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
const icon_timer= new Image();
const icon_lesson= new Image();
const icon_life= new Image();
const icon_operation= new Image();
const icon_lt_life= new Image();
const icon_lt_timer= new Image();
const icon_lt_time= new Image();
const menu_lvl= new Image();
const menu_time= new Image();
const menu_life= new Image();
const menu_opt= new Image();
const txt_perfect= new Image();
const txt_perfect1= new Image();
const txt_perfect2= new Image();
const ui_hpbar= new Image();
const ui_timerbar= new Image();
const ui_timebar= new Image();
const ui_timer= new Image();
const ui_time= new Image();
const ui_lifebar1= new Image();
const ui_lifebar3= new Image();
const ui_lifebar5= new Image();
const ui_lifebar7= new Image();
const ui_lifebar10= new Image();
const ui_lifebar20= new Image();
const ui_progressbar= new Image();
const btn_enter= new Image();
const btn_return= new Image();
const btn_plusmoins= new Image();
const lvlmap_level= new Image();
const lvlmap_levelP= new Image();
const lvlmap_center= new Image();
const lvlmap_select= new Image();
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
icon_timer.src = directory+"icon_timer.png";
icon_lesson.src = directory+"icon_lesson.png";
icon_life.src = directory+"icon_life.png";
icon_operation.src = directory+"icon_operation.png";
icon_lt_life.src = directory+"icon_lt_life.png";
icon_lt_timer.src = directory+"icon_lt_timer.png";
icon_lt_time.src = directory+"icon_lt_time.png";
menu_lvl.src = directory+"menu_level.png";
menu_time.src = directory+"menu_time.png";
menu_life.src = directory+"menu_life.png";
menu_opt.src = directory+"menu_options.png";
txt_perfect.src = directory+"txt_perfect.png";
txt_perfect1.src = directory+"txt_perfect_layer1.png";
txt_perfect2.src = directory+"txt_perfect_layer2.png";
ui_hpbar.src = directory+"UI_hpbar.png";
ui_timerbar.src = directory+"UI_timerbar.png";
ui_timebar.src = directory+"UI_timebar.png";
ui_timer.src = directory+"UI_timer.png";
ui_time.src = directory+"UI_time.png";
ui_lifebar1.src = directory+"UI_lifebar1.png";
ui_lifebar3.src = directory+"UI_lifebar3.png";
ui_lifebar5.src = directory+"UI_lifebar5.png";
ui_lifebar7.src = directory+"UI_lifebar7.png";
ui_lifebar10.src = directory+"UI_lifebar10.png";
ui_lifebar20.src = directory+"UI_lifebar20.png";
ui_progressbar.src = directory+"UI_progressbar.png";
btn_enter.src = directory+"btn_enter.png";
btn_return.src = directory+"btn_return.png";
btn_plusmoins.src = directory+"btn_plusmoins.png";
lvlmap_level.src = directory+"lvlmap_level.png";
lvlmap_levelP.src = directory+"lvlmap_levelP.png";
lvlmap_center.src = directory+"lvlmap_center.png";
lvlmap_select.src = directory+"lvlmap_select.png";
function loopAnimation() {
	if (key.cooldown>0) {key.cooldown--}
	if (game.timer>0) {game.timer--}
	c.fillStyle="black";
	c.globalAlpha = 1;
	c.fillRect(0,0,canvas.width,canvas.height)
	switch (game.screen) {
		case "loading":
			if (chargement!=4) {
				c.fillStyle="black";
				c.fillRect(0,0,canvas.width,canvas.height)
				c.textAlign="center";
				c.font = '20px monospace';
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
			showbackground()
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
							setmenu(4,"lr",0,0,0,0);
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
			showbackground()
			c.fillStyle="white";
			if (game.inputType=="phone") {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.18,Ch*0.39,Cw*0.14,Ch*0.2)
				c.fillRect(Cw*0.34,Ch*0.47,Cw*0.32,Ch*0.11)
				c.fillRect(Cw*0.68,Ch*0.39,Cw*0.14,Ch*0.2)
			}
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '100px monospace';
			c.fillText("<",Cw*0.25,Ch*0.55)
			c.fillText(">",Cw*0.75,Ch*0.55)
			game.inputType=="phone" ? c.font = '28px monospace': c.font = '26px monospace';
			switch (game.menu.target){
			case 1:
				c.drawImage(menu_lvl,Cw*0.5-75,Ch*0.25-75,150,150)
				c.fillText("Niveaux",Cw*0.5,Ch*0.55)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Obtenez la meilleur note dans chaque",Cw*0.05,Ch*0.65)
				c.fillText("niveaux et montrez que vous êtes un pro",Cw*0.05,Ch*0.70)
				c.fillText("Des calculs mentaux !",Cw*0.05,Ch*0.75)
				c.fillText("",Cw*0.05,Ch*0.82)
				c.fillText("",Cw*0.05,Ch*0.89)
				break;
			case 2:
				c.drawImage(menu_time,Cw*0.5-75,Ch*0.25-75,150,150)
				c.fillText("Survi Temps",Cw*0.5,Ch*0.55)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Survivez le plus longtemps possible en",Cw*0.05,Ch*0.65)
				c.fillText("réalisant le plus d'opérations possible !",Cw*0.05,Ch*0.70)
				c.fillText("Cumulez du temps supplémentaire et des points",Cw*0.05,Ch*0.77)
				c.fillText("pour chaque bonne réponse.",Cw*0.05,Ch*0.82)
				c.fillText("Idéal pour faire une partie personnalisée.",Cw*0.05,Ch*0.89)
				break;
			case 3:
				c.drawImage(menu_life,Cw*0.5-75,Ch*0.25-75,150,150)
				c.fillText("Survi Vies",Cw*0.5,Ch*0.55)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Gardez vos points de vies le plus élevé possible,",Cw*0.05,Ch*0.65)
				c.fillText("une erreur peut vous être fatale.",Cw*0.05,Ch*0.70)
				c.fillText("Cumulez des points pour chaque bonne réponse et",Cw*0.05,Ch*0.77)
				c.fillText("atteignez des sommets avec le cumul des résultats.",Cw*0.05,Ch*0.82)
				c.fillText("Un bon entrainement pour garder le fil.",Cw*0.05,Ch*0.89)
				break;
			case 4:
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
			switch (game.event){
			case "fadeout":
				anim.lvltransition.time--;
					c.fillStyle="black";
					c.globalAlpha=anim.lvltransition.time/50;
					c.fillRect(0,0,Cw,Ch)
					if (anim.lvltransition.time<=0) {
						game.event="";
					}
				break;
			default:
				if (game.inputType=="keyboard") {
					movemenu()
				}
				if (key.space) {
					switch (game.menu.target){
					case 1:
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.screen="level-select";
						game.mainevent="map";
						game.event="select";
						break;
					case 2:
						setmenu(4,"lr",0.065,0.43,0.23,0);
						game.screen="mode1";
						game.mainevent="first";
						break;
					case 3:
						setmenu(3,"lr",0.165,0.43,0.23,0);
						game.screen="mode2";
						game.mainevent="first";
						if (game.battle.mult) game.battle.mult=false;
						break;				
					case 4:
						setmenu(4,"ud",0.045,0.46,0,0.1,4);
						game.screen="options";
						game.mainevent="menu";
						game.event="back";
						break;
					}
				}
				break;
			}
			break;
		case "options":
			showbackground()
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '30px monospace';
			c.fillText("> Options <",Cw*0.5,Ch*0.15)
			game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
			c.textAlign="start";
			c.fillText("Aperçu :",Cw*0.05,Ch*0.32)
			c.fillText("Opacité Aide",Cw*0.1,Ch*0.5)
			c.fillText("Opacité fond",Cw*0.1,Ch*0.6)
			c.fillText("Animation chrono",Cw*0.1,Ch*0.7)
			c.fillText("Retour",Cw*0.1,Ch*0.8)
			c.textAlign="center";
			c.fillRect(Cw*0.628,Ch*0.465,Cw*0.244*(game.option.inputOpacity/100),Ch*0.04)
			c.drawImage(ui_progressbar,Cw*0.62,Ch*0.462,Cw*0.26,Ch*0.05)
			c.fillRect(Cw*0.628,Ch*0.565,Cw*0.244*(game.option.bckgrndOpacity/100),Ch*0.04)
			c.drawImage(ui_progressbar,Cw*0.62,Ch*0.562,Cw*0.26,Ch*0.05)
			if (game.inputType=="keyboard") {
				movemenu()
			}
			switch (anim.lowtimer.mode){
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
				c.drawImage(inputframe,Cw*0.29,Ch*0.2,100,80)
				c.drawImage(inputframe,Cw*0.45,Ch*0.2,100,80)
				c.drawImage(inputframe,Cw*0.61,Ch*0.2,100,80)
				c.drawImage(btn_enter,Cw*0.32,Ch*0.225,60,60)
				c.drawImage(btn_plusmoins,Cw*0.48,Ch*0.23,60,60)
				c.drawImage(btn_return,Cw*0.64,Ch*0.23,60,60)
				c.globalAlpha=1;
				c.font = '26px monospace';
				if (game.inputType=="phone") {c.fillStyle="red";c.fillText("Ne s'affiche pas en mode téléphone !",Cw*0.5,Ch*0.43);c.fillStyle="white";}
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Opacité de l'aide montré en jeu pour ",Cw*0.1,Ch*0.9)
				c.fillText("rappeler les contrôles.",Cw*0.1,Ch*0.95)
				break;
			case "opa.bckgrnd":
				c.globalAlpha=1;
				c.font = '26px monospace';
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Opacité des décors animées en fond.",Cw*0.1,Ch*0.9)
				c.fillText("",Cw*0.1,Ch*0.95)
				break;
			case "animchrono":
				if (anim.lowtimer.mode=="alt") {
					anim.lowtimer.time>0 ? anim.lowtimer.time--:anim.lowtimer.time=30;
				}else {
					anim.lowtimer.time=30
				}
				if (anim.decaybar.mode=="alt") {
					anim.decaybar.invert ? anim.decaybar.time++:anim.decaybar.time--;
				}else {
					anim.decaybar.time=39;
				}
				if (anim.decaybar.time==0||anim.decaybar.time==40) anim.decaybar.invert=!anim.decaybar.invert;
				c.fillRect(Cw*0.35,Ch*0.285,Cw*0.5*0.12,Ch*0.125)
				c.fillStyle="red"
				c.globalAlpha=0.2+anim.lowtimer.time/50;
				c.fillRect(Cw*0.35,Ch*0.285,Cw*0.5*0.12,Ch*0.125)
				c.globalAlpha=1;
				c.fillStyle="red";
				c.globalAlpha=0.3+anim.decaybar.time/80;
				c.fillRect(Cw*0.577,Ch*0.285,Cw*0.07,Ch*0.08)
				c.globalAlpha=1;
				c.drawImage(ui_timerbar,Cw*0.5-101,Ch*0.275,202,72)
				c.fillStyle="white";
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Mode d'animation pour le chronomètre.",Cw*0.1,Ch*0.9)
				c.fillText("",Cw*0.1,Ch*0.95)
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
					game.event="opa.bckgrnd";
					break;
				case 3:
					game.event="animchrono";
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
						setmenu(11,"lr",0,0,0,0,game.option.bckgrndOpacity/10+1);
						game.mainevent="select";
						break;
					case 3:
						switch(anim.lowtimer.mode){
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
						setmenu(4,"lr",0,0,0,0,4);
						game.screen="hub";
						game.mainevent="";
						game.event="";
						break;
					}
				}
				if (key.d) {
					setmenu(4,"lr",0,0,0,0,4);
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
				case "opa.bckgrnd":
					c.fillText("<",Cw*0.59,Ch*0.61)
					c.fillText(">",Cw*0.91,Ch*0.61)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.54,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.54,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.54,Cw*0.075,Ch*0.1)
					}
					game.option.bckgrndOpacity=(game.menu.target-1)*10;
					if (key.d||key.space) {
						setmenu(4,"ud",0.045,0.46,0,0.1,2);
						game.mainevent="menu";
					}
					break;
				case "animchrono":
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
						anim.lowtimer.mode="fix";
						anim.decaybar.mode="fix";
						break;
					case 2:
						anim.lowtimer.mode="alt";
						anim.decaybar.mode="alt";
						break;
					}
					if (key.d||key.space) {
						setmenu(4,"ud",0.045,0.46,0,0.1,3);
						game.mainevent="menu";
					}
					break;
				}
				break;
			default:
				errormsg("Mainevent error !")
				break;
			}
			break;
		case "mode1":
			showbackground()
			let mult = 1;
			let multn = 1;
			let multd = 1;
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '30px monospace';
			c.fillText("> Mode Temps <",Cw*0.5,Ch*0.15)
			if (game.inputType=="keyboard") {
				movemenu()
			} else {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.01,Ch*0.02,Cw*0.285,Ch*0.1)
				c.globalAlpha=1;
				c.textAlign="start";
				c.font = '20px monospace';
				c.fillText("Retour au menu",Cw*0.02,Ch*0.08)
			}
			switch (game.mainevent){
			case "first":
				c.textAlign="center";
				c.font = '24px monospace';
				game.battle.add ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_plus,Cw*0.12,Ch*0.28,100,100)
				game.battle.sub ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_moins,Cw*0.42,Ch*0.28,100,100)
				game.battle.mult ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_mult,Cw*0.72,Ch*0.28,100,100)
				c.globalAlpha=1;
				game.battle.add ? c.fillText("Actif",Cw*0.20,Ch*0.6): c.fillText("désact.",Cw*0.20,Ch*0.6);
				game.battle.sub ? c.fillText("Actif",Cw*0.50,Ch*0.6): c.fillText("désact.",Cw*0.50,Ch*0.6);
				game.battle.mult ? c.fillText("Actif",Cw*0.80,Ch*0.6): c.fillText("désact.",Cw*0.80,Ch*0.6);
				c.fillText("Suivant",Cw*0.5,Ch*0.72)
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.1,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.4,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.7,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.4,Ch*0.645,130,50)
				}
				else {
					switch (game.menu.target){
					case 1:
						c.drawImage(inputframe,Cw*0.1,Ch*0.26,Cw*0.195,Ch*0.26)
						break;
					case 2:
						c.drawImage(inputframe,Cw*0.4,Ch*0.26,Cw*0.195,Ch*0.26)
						break;
					case 3:
						c.drawImage(inputframe,Cw*0.7,Ch*0.26,Cw*0.195,Ch*0.26)
						break;
					case 4:
						c.drawImage(inputframe,Cw*0.4,Ch*0.655,Cw*0.2,Ch*0.1)
						break;
					}
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
							setmenu(4,"lr",0.3,0.56,0,0);
							game.mainevent="second"
						}
						break;
					default:
						break;
					}
				}
				if (key.down) {
					key.down=false;
					game.menu.target=4;
				}
				if (key.up) {
					key.up=false;
					game.menu.target=2;
				}
				if (key.d) {
					setmenu(4,"lr",0,0,0,0,2);
					game.screen="hub";
					game.mainevent=""
				}
				if (game.battle.symbnum==1) game.setbtl.mode=0.75;
				if (game.battle.symbnum==2) game.setbtl.mode=1;
				if (game.battle.symbnum==3) game.setbtl.mode=1.2;
				break;
			case "second":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '24px monospace':c.font = '26px monospace';
				c.fillText("Types :",Cw*0.03,Ch*0.27)
				game.battle.add ? c.drawImage(icon_plusON,Cw*0.2,Ch*0.2,50,50): c.drawImage(icon_plus,Cw*0.2,Ch*0.2,50,50);
				game.battle.sub ? c.drawImage(icon_moinsON,Cw*0.3,Ch*0.2,50,50): c.drawImage(icon_moins,Cw*0.3,Ch*0.2,50,50);
				game.battle.mult ? c.drawImage(icon_multON,Cw*0.4,Ch*0.2,50,50): c.drawImage(icon_mult,Cw*0.4,Ch*0.2,50,50);
				game.inputType=="phone"? c.font = '27px monospace':c.font = '30px monospace';
				c.fillText("Format :",Cw*0.15,Ch*0.45)
				c.textAlign="center";
				c.font = '80px monospace';
				c.fillText("<",Cw*0.3,Ch*0.62)
				c.fillText(">",Cw*0.7,Ch*0.62)
				game.inputType=="phone"? c.font = '26px monospace':c.font = '28px monospace';
				if (game.inputType=="phone") {c.fillText("Retour",Cw*0.14,Ch*0.6);c.fillText("Suiv.",Cw*0.86,Ch*0.6)}
				switch (game.menu.target) {
				case 1:
					c.fillText("1 + 1",Cw*0.5,Ch*0.6)
					game.setbtl.chif=0.66;
					game.battle.numopp=1;
					break;
				case 2:
					c.fillText("12 + 12",Cw*0.5,Ch*0.6)
					game.setbtl.chif=1;
					game.battle.numopp=2;
					break;
				case 3:
					c.fillText("123 + 123",Cw*0.5,Ch*0.6)
					game.setbtl.chif=1.5;
					game.battle.numopp=3;
					break;
				case 4:
					c.fillText("1234 + 1234",Cw*0.5,Ch*0.6)
					game.setbtl.chif=1.9;
					game.battle.numopp=4;
					break;
				}
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.04,Ch*0.535,Cw*0.2,Ch*0.1)
					c.fillRect(Cw*0.25,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.64,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.76,Ch*0.535,Cw*0.2,Ch*0.1)
				}
				if (key.d) {
					setmenu(4,"lr",0.065,0.43,0.23,0);
					game.mainevent="first";
				}
				if (key.space) {
					setmenu(4,"lr",0.3,0.71,0,0);
					game.mainevent="third";
				}
				break;
			case "third":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '24px monospace':c.font = '26px monospace';
				c.fillText("Types :",Cw*0.03,Ch*0.27)
				game.battle.add ? c.drawImage(icon_plusON,Cw*0.2,Ch*0.2,50,50): c.drawImage(icon_plus,Cw*0.2,Ch*0.2,50,50);
				game.battle.sub ? c.drawImage(icon_moinsON,Cw*0.3,Ch*0.2,50,50): c.drawImage(icon_moins,Cw*0.3,Ch*0.2,50,50);
				game.battle.mult ? c.drawImage(icon_multON,Cw*0.4,Ch*0.2,50,50): c.drawImage(icon_mult,Cw*0.4,Ch*0.2,50,50);
				c.fillText("Format :",Cw*0.5,Ch*0.27)
				switch (game.battle.numopp) {
				case 1:
					c.fillText(">1<",Cw*0.7,Ch*0.27)
					break;
				case 2:
					c.fillText(">2<",Cw*0.7,Ch*0.27)
					break;
				case 3:
					c.fillText(">3<",Cw*0.7,Ch*0.27)
					break;
				case 4:
					c.fillText(">4<",Cw*0.7,Ch*0.27)
					break;
				}
				game.inputType=="phone"? c.font = '27px monospace':c.font = '30px monospace';
				c.fillText("Difficulté :",Cw*0.15,Ch*0.45)
				c.textAlign="center";
				c.font = '80px monospace';
				c.fillText("<",Cw*0.3,Ch*0.62)
				c.fillText(">",Cw*0.7,Ch*0.62)
				game.inputType=="phone"? c.font = '26px monospace':c.font = '28px monospace';
				if (game.inputType=="phone") {c.fillText("Retour",Cw*0.14,Ch*0.6);c.fillText("Suiv.",Cw*0.86,Ch*0.6)}
				switch (game.menu.target) {
				case 1:
					c.fillText("Très facile",Cw*0.5,Ch*0.6)
					game.setbtl.dif=2;
					game.battle.mode="very-easy";
					break;
				case 2:
					c.fillText("Facile",Cw*0.5,Ch*0.6)
					game.setbtl.dif=1.5;
					game.battle.mode="easy";
					break;
				case 3:
					c.fillText("Normal",Cw*0.5,Ch*0.6)
					game.setbtl.dif=1;
					game.battle.mode="normal";
					break;
				case 4:
					c.fillText("Difficile",Cw*0.5,Ch*0.6)
					game.setbtl.dif=0.7;
					game.battle.mode="hard";
					break;
				}
				
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.04,Ch*0.535,Cw*0.2,Ch*0.1)
					c.fillRect(Cw*0.25,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.64,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.76,Ch*0.535,Cw*0.2,Ch*0.1)
				}
				if (key.d) {
					setmenu(4,"lr",0.3,0.56,0,0,game.battle.numopp);
					game.mainevent="second";
				}
				if (key.space) {
					setmenu(2,"lr",0.05,0.605,0.31,0,2);
					game.mainevent="fourth";
					game.event="ready"
				}
				break;
			case "fourth":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '24px monospace':c.font = '26px monospace';
				c.fillText("Types :",Cw*0.03,Ch*0.27)
				game.battle.add ? c.drawImage(icon_plusON,Cw*0.2,Ch*0.2,50,50): c.drawImage(icon_plus,Cw*0.2,Ch*0.2,50,50);
				game.battle.sub ? c.drawImage(icon_moinsON,Cw*0.3,Ch*0.2,50,50): c.drawImage(icon_moins,Cw*0.3,Ch*0.2,50,50);
				game.battle.mult ? c.drawImage(icon_multON,Cw*0.4,Ch*0.2,50,50): c.drawImage(icon_mult,Cw*0.4,Ch*0.2,50,50);
				c.fillText("Format :",Cw*0.5,Ch*0.27)
				switch (game.battle.numopp) {
				case 1:
					c.fillText(">1<",Cw*0.7,Ch*0.27)
					break;
				case 2:
					c.fillText(">2<",Cw*0.7,Ch*0.27)
					break;
				case 3:
					c.fillText(">3<",Cw*0.7,Ch*0.27)
					break;
				case 4:
					c.fillText(">4<",Cw*0.7,Ch*0.27)
					break;
				}
				c.fillText("Difficulté :",Cw*0.03,Ch*0.37)
				switch (game.setbtl.dif) {
				case 2:
					c.fillText("Très facile",Cw*0.3,Ch*0.37)
					break;
				case 1.5:
					c.fillText("facile",Cw*0.3,Ch*0.37)
					break;
				case 1:
					c.fillText("Normal",Cw*0.3,Ch*0.37)
					break;
				case 0.7:
					c.fillText("Difficile",Cw*0.3,Ch*0.37)
					break;
				}
				c.textAlign="center";
				c.fillText("Jouer avec ces paramètres ?",Cw*0.5,Ch*0.5)
				c.font = '42px monospace';
				c.fillText("Jouer",Cw*0.5,Ch*0.65)
				c.font = '30px monospace';
				c.fillText("Retour",Cw*0.18,Ch*0.65)
				break;
			default:
				errormsg("Mainevent error")
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
				c.fillText("Appuyez pour faire vos choix",Cw*0.24,Ch*0.9)
			}
			switch (game.event){
			case "":
				break;
			case "ready":
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.07,Ch*0.57,Cw*0.22,Ch*0.12)
					c.fillRect(Cw*0.37,Ch*0.55,Cw*0.26,Ch*0.14)
				}
				else {
					c.globalAlpha=1;
					showcursor()
				}
				if (key.d) {
					setmenu(4,"lr",0.3,0.56,0,0);
					game.mainevent="third";
					game.event="";
				}
				if (key.space) {
					switch (game.menu.target){
					case 1:
						setmenu(4,"lr",0.3,0.56,0,0);
						game.mainevent="third";
						game.event="";
						break;
					case 2:
						game.event="transition";
						game.timer=7;
						break;
					}
				}
				break;
			case "transition":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7;
				c.fillRect(Cw*0.5-Cw*(0.5*((7-game.timer)/7)),Ch*0.5,Cw*((7-game.timer)/7),5)
				if (game.timer==0) {
					game.event="transition2";
					game.timer=25;
				}
				break;
			case "transition2":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7+0.3*((25-game.timer)/25);
				c.fillRect(0,Ch*0.5-Ch*(0.5*(25-game.timer)/25),Cw,5+Ch*((25-game.timer)/25))
				if (game.timer==0) {
					game.event="transition3";
					game.timer=30;
				}
				break;
			case "transition3":
				c.globalAlpha=1;;
				c.fillStyle="rgb(240,240,240)";
				c.fillRect(0,0,Cw,Ch)
				if (game.timer==0) {
					mult=game.setbtl.mode;
					multn=game.setbtl.chif;
					multd=game.setbtl.dif;
					game.screen="survival";
					game.mainevent="starting";
					game.event="fadeout";
					game.battle.gamemode="survival-timer";
					game.stats.maxtimer=(Math.floor(20*mult*multn*multd))*60;
					game.timer=60;
					anim.background.type=Math.floor(Math.random()*4);
					anim.lvltransition.time=100;
					if (anim.background.stock.length>0) anim.background.stock.splice(0,anim.background.stock.length);
				}
				break;
			default:
				errormsg("Event error !")
				break;
			}
			break;
		case "mode2":
			showbackground()
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '30px monospace';
			c.fillText("> Mode vies <",Cw*0.5,Ch*0.15)
			c.font = '22px monospace';
			c.textAlign="start";
			if (game.inputType=="keyboard") {
				movemenu()
			} else {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.01,Ch*0.02,Cw*0.285,Ch*0.1)
				c.globalAlpha=1;
				c.font = '20px monospace';
				c.fillText("Retour au menu",Cw*0.02,Ch*0.08)
			}
			switch (game.mainevent){
			case "first":
				c.textAlign="center";
				c.font = '24px monospace';
				game.battle.add ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_plus,Cw*0.27,Ch*0.28,100,100)
				game.battle.sub ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_moins,Cw*0.57,Ch*0.28,100,100)
				c.globalAlpha=1;
				game.battle.add ? c.fillText("Actif",Cw*0.35,Ch*0.6): c.fillText("désact.",Cw*0.35,Ch*0.6);
				game.battle.sub ? c.fillText("Actif",Cw*0.65,Ch*0.6): c.fillText("désact.",Cw*0.65,Ch*0.6);
				c.fillText("Suivant",Cw*0.5,Ch*0.72)
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.25,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.55,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.4,Ch*0.645,130,50)
				}
				else {
					switch (game.menu.target){
					case 1:
						c.drawImage(inputframe,Cw*0.25,Ch*0.26,Cw*0.195,Ch*0.26)
						break;
					case 2:
						c.drawImage(inputframe,Cw*0.55,Ch*0.26,Cw*0.195,Ch*0.26)
						break;
					case 3:
						c.drawImage(inputframe,Cw*0.4,Ch*0.655,Cw*0.2,Ch*0.1)
						break;
					}
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
						if (game.battle.symbnum>0) {
							setmenu(4,"lr",0.3,0.63,0,0);
							game.mainevent="second";
						}
						break;
					default:
						break;
					}
				}
				if (key.down) {
					key.down=false;
					game.menu.target=4;
				}
				if (key.up) {
					key.up=false;
					game.menu.target=2;
				}
				if (key.d) {
					setmenu(4,"lr",0,0,0,0,3);
					game.screen="hub";
					game.event=""
				}
				break;
			case "second":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '24px monospace':c.font = '26px monospace';
				c.fillText("Types :",Cw*0.03,Ch*0.27)
				game.battle.add ? c.drawImage(icon_plusON,Cw*0.2,Ch*0.2,50,50): c.drawImage(icon_plus,Cw*0.2,Ch*0.2,50,50);
				game.battle.sub ? c.drawImage(icon_moinsON,Cw*0.3,Ch*0.2,50,50): c.drawImage(icon_moins,Cw*0.3,Ch*0.2,50,50);
				game.inputType=="phone"? c.font = '27px monospace':c.font = '30px monospace';
				c.fillText("Difficulté :",Cw*0.15,Ch*0.45)
				c.textAlign="center";
				c.font = '80px monospace';
				c.fillText("<",Cw*0.3,Ch*0.62)
				c.fillText(">",Cw*0.7,Ch*0.62)
				game.inputType=="phone"? c.font = '26px monospace':c.font = '28px monospace';
				if (game.inputType=="phone") {c.fillText("Retour",Cw*0.14,Ch*0.6);c.fillText("Suiv.",Cw*0.86,Ch*0.6)}
				switch (game.menu.target) {
				case 1:
					c.fillText("Très facile",Cw*0.5,Ch*0.6)
					game.setbtl.dif=2;
					game.battle.mode="very-easy";
					break;
				case 2:
					c.fillText("Facile",Cw*0.5,Ch*0.6)
					game.setbtl.dif=1.5;
					game.battle.mode="easy";
					break;
				case 3:
					c.fillText("Normal",Cw*0.5,Ch*0.6)
					game.setbtl.dif=1;
					game.battle.mode="normal";
					break;
				case 4:
					c.fillText("Difficile",Cw*0.5,Ch*0.6)
					game.setbtl.dif=0.7;
					game.battle.mode="hard";
					break;
				}
				
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.04,Ch*0.535,Cw*0.2,Ch*0.1)
					c.fillRect(Cw*0.25,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.64,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.76,Ch*0.535,Cw*0.2,Ch*0.1)
				}
				if (key.d) {
					setmenu(3,"lr",0,0,0,0);
					game.mainevent="first";
				}
				if (key.space) {
					setmenu(2,"lr",0.05,0.605,0.31,0,2);
					game.mainevent="third";
					game.event="ready";
				}
				break;
			case "third":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '24px monospace':c.font = '26px monospace';
				c.fillText("Types :",Cw*0.03,Ch*0.27)
				game.battle.add ? c.drawImage(icon_plusON,Cw*0.2,Ch*0.2,50,50): c.drawImage(icon_plus,Cw*0.2,Ch*0.2,50,50);
				game.battle.sub ? c.drawImage(icon_moinsON,Cw*0.3,Ch*0.2,50,50): c.drawImage(icon_moins,Cw*0.3,Ch*0.2,50,50);
				c.fillText("Difficulté :",Cw*0.03,Ch*0.37)
				switch (game.setbtl.dif) {
				case 2:
					c.fillText("Très facile",Cw*0.3,Ch*0.37)
					break;
				case 1.5:
					c.fillText("facile",Cw*0.3,Ch*0.37)
					break;
				case 1:
					c.fillText("Normal",Cw*0.3,Ch*0.37)
					break;
				case 0.7:
					c.fillText("Difficile",Cw*0.3,Ch*0.37)
					break;
				}
				c.drawImage(icon_life,Cw*0.5,Ch*0.2,50,50)
				c.fillText("100 PV",Cw*0.62,Ch*0.27)
				c.textAlign="center";
				c.fillText("Jouer avec ces paramètres ?",Cw*0.5,Ch*0.5)
				c.font = '42px monospace';
				c.fillText("Jouer",Cw*0.5,Ch*0.65)
				c.font = '30px monospace';
				c.fillText("Retour",Cw*0.18,Ch*0.65)
				break;
			default:
				errormsg("Mainevent error !")
				break;
			}
			c.globalAlpha=1;
			c.textAlign="start";
			c.font = '22px monospace';
			if (game.battle.mode=="very-easy"||game.battle.mode=="easy") {
				c.fillText("Temps maximum : 10 secondes",Cw*0.25,Ch*0.83)
			} else if (game.battle.mode=="normal") {
				c.fillText("Temps maximum : 9 secondes",Cw*0.25,Ch*0.83)
			} else {
				c.fillText("Temps maximum : 8 secondes",Cw*0.25,Ch*0.83)
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
				c.fillText("Appuyez pour faire vos choix",Cw*0.24,Ch*0.9)
			}
			switch (game.event){
			case "":
				break;
			case "ready":
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.07,Ch*0.57,Cw*0.22,Ch*0.12)
					c.fillRect(Cw*0.37,Ch*0.55,Cw*0.26,Ch*0.14)
				}
				else {
					c.globalAlpha=1;
					showcursor()
				}
				if (key.d) {
					setmenu(4,"lr",0.3,0.56,0,0);
					game.mainevent="second";
					game.event="";
				}
				if (key.space) {
					switch (game.menu.target){
					case 1:
						setmenu(4,"lr",0.3,0.56,0,0);
						game.mainevent="second";
						game.event="";
						break;
					case 2:
						game.event="transition";
						game.timer=7;
						break;
					}
				}
				break;
			case "transition":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7;
				c.fillRect(Cw*0.5-Cw*(0.5*((7-game.timer)/7)),Ch*0.5,Cw*((7-game.timer)/7),5)
				if (game.timer==0) {
					game.event="transition2";
					game.timer=25;
				}
				break;
			case "transition2":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7+0.3*((25-game.timer)/25);
				c.fillRect(0,Ch*0.5-Ch*(0.5*(25-game.timer)/25),Cw,5+Ch*((25-game.timer)/25))
				if (game.timer==0) {
					game.event="transition3";
					game.timer=30;
				}
				break;
			case "transition3":
				c.globalAlpha=1;;
				c.fillStyle="rgb(240,240,240)";
				c.fillRect(0,0,Cw,Ch)
				if (game.timer==0) {
					game.screen="survival";
					game.battle.gamemode="survival-life";
					game.mainevent="starting";
					game.event="set";
					game.timer=60;
					anim.background.type=Math.floor(Math.random()*4);
					anim.lvltransition.time=100;
					if (anim.background.stock.length>0) anim.background.stock.splice(0,anim.background.stock.length);
				}
				break;
			default:
				errormsg("Event error !")
				break;
			}
			break;
		case "level-select":
			showbackground()
			anim.lvlselect.invert ? anim.lvlselect.time++:anim.lvlselect.time--;
			if (anim.lvlselect.time==0||anim.lvlselect.time==60) anim.lvlselect.invert=!anim.lvlselect.invert;
			c.fillStyle="white";
			if (game.inputType=="phone") {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.07,Ch*0.81,Cw*0.22,Ch*0.13)
				c.fillRect(Cw*0.34,Ch*0.82,Cw*0.32,Ch*0.14)
				if (game.menu.target>1) {
					c.fillRect(Cw*0.25,Ch*0.34,Cw*0.12,Ch*0.2)
				}
				if (game.menu.target<game.menu.options) {
					c.fillRect(Cw*0.63,Ch*0.34,Cw*0.12,Ch*0.2)
				}	
			}
			c.globalAlpha = 1;
			c.textAlign="center";
			c.font = '42px monospace';
			c.fillText("Jouer",Cw*0.5,Ch*0.92)
			c.font = '30px monospace';
			c.fillText("Retour",Cw*0.18,Ch*0.9)
			c.font = '24px monospace';
			c.textAlign="start";
			c.fillText("Record :",Cw*0.05,Ch*0.65)
			c.globalAlpha = 0.2;
			c.font = '28px monospace';
			c.textAlign="end";
			c.fillText("00000000",Cw*0.26,Ch*0.72)
			c.globalAlpha = 1;
			c.fillText(saves.levels[game.level.world][game.level.stage].score,Cw*0.26,Ch*0.72)
			switch (game.mainevent){
			case "map":
				c.shadowColor="white";
				c.shadowBlur=5+anim.lvlselect.time/3;
				c.drawImage(lvlmap_select,Cw*0.5-75,Ch*0.35,150,150)
				c.shadowColor="none";
				c.shadowBlur=0;
				
				c.textAlign="center";
				c.font = '26px monospace';
				saves.levels[game.level.world][game.level.stage].perfect?c.fillStyle="yellow":c.fillStyle="white";
				c.fillText(levels[game.level.world][game.level.stage].title,Cw*0.5,Ch*0.65)
				c.font = '20px monospace';
				c.fillStyle="white";
				c.textAlign="start";
				if (levels[game.level.world][game.level.stage].time>0) {
					c.drawImage(icon_lt_time,Cw*0.75-20,Ch*0.6,40,40)
					c.fillText(ShowTimer(levels[game.level.world][game.level.stage].time)+" s",Cw*0.8,Ch*0.66)
				}
				if (levels[game.level.world][game.level.stage].timer>0) {
					c.drawImage(icon_lt_timer,Cw*0.75-20,Ch*0.67,40,40)
					c.fillText(ShowTimer(levels[game.level.world][game.level.stage].timer)+" s",Cw*0.8,Ch*0.73)
				}
				if (levels[game.level.world][game.level.stage].life>0) {
					c.drawImage(icon_lt_life,Cw*0.75-20,Ch*0.74,40,40)
					c.fillText(levels[game.level.world][game.level.stage].life+" vies",Cw*0.8,Ch*0.8)
				}
				if (levels[game.level.world][game.level.stage].hp>0) {
					c.drawImage(icon_lt_life,Cw*0.75-20,Ch*0.74,40,40)
					c.fillText(levels[game.level.world][game.level.stage].hp+" PV",Cw*0.8,Ch*0.8)
				}
				c.font = '40px monospace';
				c.drawImage(icon_operation,Cw*0.4-28,Ch*0.7,56,56)
				c.fillText(levels[game.level.world][game.level.stage].count,Cw*0.47,Ch*0.795)
				c.font = '28px monospace';
				c.textAlign="end";
				c.globalAlpha = 1;
				c.fillText(saves.levels[game.level.world][game.level.stage].score,Cw*0.26,Ch*0.72)
				switch (game.event){
				case "fadeout":
				case "select":
					for (let i = game.level.stage-1; i <= game.level.stage+1; i++) {
						if (i>=1&&i<=game.menu.options) {
							c.font = '40px monospace';
							c.textAlign="center";
							c.fillText(i,Cw*0.5+(Cw*0.36)*(i-game.level.stage),Ch*0.35)

							switch (levels[game.level.world][i].type){
							case "lesson":
								c.drawImage(icon_lesson,Cw*0.5-50+(Cw*0.36)*(i-game.level.stage),Ch*0.05,100,100)
								break;
							case "chrono":
								c.drawImage(icon_timer,Cw*0.5-50+(Cw*0.36)*(i-game.level.stage),Ch*0.05,100,100)
								break;
							case "vies":
								c.drawImage(icon_life,Cw*0.5-50+(Cw*0.36)*(i-game.level.stage),Ch*0.05,100,100)
								break;
							case "pv":
								c.drawImage(icon_life,Cw*0.5-50+(Cw*0.36)*(i-game.level.stage),Ch*0.05,100,100)
								break;
							case "boss":
								break;
							}
							c.drawImage(lvlmap_level,Cw*0.5-75+(Cw*0.36)*(i-game.level.stage),Ch*0.35,150,150)
							if (saves.levels[game.level.world][i].perfect){
								c.drawImage(lvlmap_levelP,Cw*0.5-75+(Cw*0.36)*(i-game.level.stage),Ch*0.35,150,150)
							}
							if (saves.levels[game.level.world][i].clear){
								c.drawImage(lvlmap_center,Cw*0.5-75+(Cw*0.36)*(i-game.level.stage),Ch*0.35,150,150)
							}
						}
					}
					c.textAlign="center";
					c.font = '100px monospace';
					if (game.menu.target>1) {
						c.fillText("<",Cw*0.31,Ch*0.5)
					}
					if (game.menu.target<game.menu.options) {
						c.fillText(">",Cw*0.69,Ch*0.5)
					}
					game.level.stage=game.menu.target;
					break;
				case "selected":
				case "transition":
				case "transition2":
				case "transition3":
					c.font = '40px monospace';
					c.textAlign="center";
					c.fillText(game.level.stage,Cw*0.5,Ch*0.35)

					switch (levels[game.level.world][game.level.stage].type){
					case "lesson":
						c.drawImage(icon_lesson,Cw*0.5-50,Ch*0.05,100,100)
						break;
					case "chrono":
						c.drawImage(icon_timer,Cw*0.5-50,Ch*0.05,100,100)
						break;
					case "vies":
						c.drawImage(icon_life,Cw*0.5-50,Ch*0.05,100,100)
						break;
					case "pv":
						c.drawImage(icon_life,Cw*0.5-50,Ch*0.05,100,100)
						break;
					case "boss":
						break;
					}
					c.drawImage(lvlmap_level,Cw*0.5-75,Ch*0.35,150,150)
					if (saves.levels[game.level.world][game.level.stage].perfect){
						c.drawImage(lvlmap_levelP,Cw*0.5-75,Ch*0.35,150,150)
					}
					if (saves.levels[game.level.world][game.level.stage].clear){
						c.drawImage(lvlmap_center,Cw*0.5-75,Ch*0.35,150,150)
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				switch(game.event){
				case "fadeout":
					anim.lvltransition.time--;
					c.fillStyle="black";
					c.globalAlpha=anim.lvltransition.time/50;
					c.fillRect(0,0,Cw,Ch)
					if (anim.lvltransition.time<=0) {
						game.event="select";
					}
					break;
				case "select":
					movemenu()
					if (key.space) {
						setmenu(2,"lr",0.05,0.86,0.31,0,2);
						game.event="selected"
					}
					if (key.d) {
						setmenu(4,"lr",0,0,0,0);
						game.screen="hub";
						game.mainevent="";
						game.event=""
					}
					break;
				case "selected":
					movemenu()
					showcursor()
					if (key.space) {
						switch (game.menu.target){
						case 1:
							setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
							game.event="select";
							break;
						case 2:
							game.event="transition";
							game.timer=7;
							break;
						}
					}
					if (key.d) {
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.event="select"
					}
					break;
				case "transition":
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=0.7;
					c.fillRect(Cw*0.5-Cw*(0.5*((7-game.timer)/7)),Ch*0.5,Cw*((7-game.timer)/7),5)
					if (game.timer==0) {
						game.event="transition2";
						game.timer=25;
					}
					break;
				case "transition2":
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=0.7+0.3*((25-game.timer)/25);
					c.fillRect(0,Ch*0.5-Ch*(0.5*(25-game.timer)/25),Cw,5+Ch*((25-game.timer)/25))
					if (game.timer==0) {
						game.event="transition3";
						game.timer=30;
					}
					break;
				case "transition3":
					c.globalAlpha=1;;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						game.screen="level";
						game.mainevent="starting";
						game.event="set";
						anim.lvltransition.time=100;
						game.timer=60;
						anim.background.type=Math.floor(Math.random()*4);
						if (anim.background.stock.length>0) anim.background.stock.splice(0,anim.background.stock.length);
					}
					break;
				default:
					break;
				}
				break;
			default:
				errormsg("mainevent error !")
				break;
			}
			break;
		case "survival":
			showbackground()
			RTAtimer()
			anim.operation.invert ? anim.operation.time++:anim.operation.time--;
			if (anim.operation.time==0||anim.operation.time==60) anim.operation.invert=!anim.operation.invert;
			if (anim.decaybar.mode=="alt") {
				anim.decaybar.invert ? anim.decaybar.time++:anim.decaybar.time--;
			}else {
				anim.decaybar.time=40;
			}
			if (anim.decaybar.time==0||anim.decaybar.time==40) anim.decaybar.invert=!anim.decaybar.invert;
			if (game.stats.timer<=game.stats.maxtimer*0.2 && anim.lowtimer.mode=="alt") {
				anim.lowtimer.time>0 ? anim.lowtimer.time--:anim.lowtimer.time=30;
			}else {
				anim.lowtimer.time=30;
			}
			c.fillStyle="white";
			c.globalAlpha=1;
			c.font = '26px monospace';
			c.textAlign="start";
			c.fillText("Score :",Cw*0.03,Ch*0.77)
			c.font = '20px monospace';
			c.textAlign="center";
			c.fillText("Correct",Cw*0.5,Ch*0.08)
			c.globalAlpha=0.15;
			c.fillRect(Cw*0.035,Ch*0.875,120,40)
			c.globalAlpha=0.6;
			c.font = '26px monospace';
			c.fillText("Pause",Cw*0.125,Ch*0.94)
			c.globalAlpha=1;
			c.font = '40px monospace';
			c.fillText(game.stats.clear,Cw*0.5,Ch*0.17)
			c.font = '30px monospace';
			c.textAlign="start";
			c.fillRect(Cw*0.118,Ch*0.1,Cw*0.295*(game.stats.timer/game.stats.maxtimer),Ch*0.113)
			c.fillStyle="red";
			c.globalAlpha=0.3+anim.decaybar.time/80;
			if (game.battle.gamemode=="survival-timer") c.fillRect(Cw*0.413-Cw*0.295*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))),Ch*0.1,Cw*0.295*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))),Ch*0.113);
			if (game.battle.gamemode=="survival-life") c.fillRect(Cw*0.413-Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.1,Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.113);
			if (game.stats.timer<=game.stats.maxtimer*0.2 && game.mainevent!="starting" && anim.lowtimer.mode!="none") {
				c.globalAlpha=0.2+anim.lowtimer.time/50;
				c.fillRect(Cw*0.118,Ch*0.1,Cw*0.295*(game.stats.timer/game.stats.maxtimer),Ch*0.113)
			}
			c.globalAlpha=1;
			c.fillStyle="white";
			c.drawImage(ui_timer,Cw*0.01,Ch*0.09,60,60)
			c.drawImage(ui_timerbar,Cw*0.11,Ch*0.09,202,72)
			c.textAlign="end";
			c.fillText(ShowTimer(game.stats.timer),Cw*0.4,Ch*0.226)
			c.globalAlpha = 0.2;
			c.fillText("00000000",Cw*0.225,Ch*0.83)
			c.globalAlpha = 1;
			c.fillText(game.stats.score,Cw*0.225,Ch*0.83)
			c.textAlign="start";
			c.globalAlpha=1;
			if (game.battle.gamemode=="survival-life") {
				c.fillRect(Cw*0.26,Ch*0.865,Cw*0.48*(game.stats.pv/game.stats.maxpv),Ch*0.08)
				c.fillStyle="red";
				c.globalAlpha=0.5;
				c.fillRect(Cw*0.26+Cw*0.48*(game.stats.pv/game.stats.maxpv),Ch*0.865,Cw*0.48*(game.battle.dmg/game.stats.maxpv),Ch*0.08)
				c.fillStyle="white";
				c.globalAlpha=1;
				c.drawImage(ui_hpbar,Cw*0.25,Ch*0.75,Cw*0.5,94)
				c.fillText(Math.floor(game.stats.pv),Cw*0.412,Ch*0.848)
				c.fillText("/"+game.stats.maxpv,Cw*0.5,Ch*0.848)
			}
			c.font = '28px monospace';
			c.textAlign="start";
			if (game.stats.combo>4) c.fillText("COMBO "+game.stats.combo,Cw*0.11,Ch*0.35);
			if (game.stats.combo>9) c.fillText("x "+checkCombo(game.stats.combo),Cw*0.115,Ch*0.4);

			switch (game.mainevent){
			case "starting":
				switch (game.event){
				case "set":
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					game.stats.pv=0;
					game.stats.timer=0;
					switch (game.setbtl.dif){
					case 2:
						game.stats.maxpv=100;
						game.stats.maxtimer=600;
						game.battle.rangemin=3;
						game.battle.rangemax=8;
						game.battle.rangeminstep=0.3;
						game.battle.rangemaxstep=0.75;
						game.battle.regen=5;
						game.battle.regenstep=3;
						game.battle.decaystep=20;
						game.battle.timerhplose=25;
						break;
					case 1.5:
						game.stats.maxpv=100;
						game.stats.maxtimer=600;
						game.battle.rangemin=5;
						game.battle.rangemax=15;
						game.battle.rangeminstep=0.35;
						game.battle.rangemaxstep=0.9;
						game.battle.regen=5;
						game.battle.regenstep=5;
						game.battle.decaystep=20;
						game.battle.timerhplose=25;
						break;
					case 1:
						game.stats.maxpv=100;
						game.stats.maxtimer=540;
						game.battle.rangemin=7;
						game.battle.rangemax=20;
						game.battle.rangeminstep=0.6;
						game.battle.rangemaxstep=1.3;
						game.battle.regen=3;
						game.battle.regenstep=5;
						game.battle.decaystep=30;
						game.battle.timerhplose=50;
						break;
					case 0.7:
						game.stats.maxpv=100;
						game.stats.maxtimer=480;
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
					game.event="fadeout";
					break;
				case "fadeout":
					anim.lvltransition.time--;
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=anim.lvltransition.time/100;
					c.fillRect(0,0,Cw,Ch)
					if (anim.lvltransition.time<=0) {
						game.event="transition";
						game.timer=20
					}
					break;
				case "transition":
					if (game.timer==0) {
						switch (game.battle.gamemode) {
						case "survival-timer":
							if (game.stats.timer<game.stats.maxtimer*3/4) {
								game.stats.timer+=Math.floor((game.stats.maxtimer*3/4)/40);
							}
							else {
								game.event="attention";
								game.timer=20
							}
							break;
						case "survival-life":
							if (game.stats.pv<game.stats.maxpv) {
								game.stats.pv+=game.stats.maxpv/40;
							}
							if (game.stats.timer<game.stats.maxtimer) {
								game.stats.timer+=game.stats.maxtimer/40;
							}
							else {
								game.battle.dmg=0;
								game.event="attention";
								game.timer=20
							}
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
						switch (game.battle.gamemode){
						case "survival-timer":
							generatePuzzleMode1()
							break;
						case "survival-life":
							generatePuzzleMode2()
							break;
						}
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				if (key.p) {
					game.prevevent=game.mainevent;
					game.mainevent="pause";
					game.prevtimer=game.timer;
					game.timer=40;
				}
				break;
			case "play":
				if (game.battle.dmg>0) game.battle.dmg--;
				if (game.stats.timer>0) game.stats.timer--;
				if (game.stats.time>0) game.stats.time--;
				game.stats.timeRep++;
				c.textAlign="center";
				c.font = '32px monospace';
				c.fillStyle="white";
				c.font = '40px monospace';
				game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
				drawPuzzle()
				inputPlayer()
				switch (game.battle.gamemode){
				case "survival-timer":
					if (game.stats.timer<=0) {
						game.stats.timer=0;
						game.mainevent="gameover";
						game.event="end";
						game.timer=100;
					}
					break;
				case "survival-life":
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
					break;
				}
				
				if (key.space) {
					game.mainevent="wait";
					game.event="calc";
				}
				if (key.p) {
					game.prevevent=game.mainevent;
					game.mainevent="pause";
					game.prevtimer=game.timer;
					game.timer=40;
				}
				break;
			case "wait":
				drawPuzzle()
				c.textAlign="center";
				c.font = '32px monospace';
				switch(game.event){
				case "calc":
					switch (game.battle.gamemode){
					case "survival-timer":
						pass =validatePuzzle()
						break;
					case "survival-life":
						pass =validatePuzzle2()
						break;
					}
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					c.font = '40px monospace';
					game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
					game.event="wait";
					game.timer=20;
					break;
				case "wait":
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					c.font = '26px monospace';
					if (pass) c.fillText("+ "+game.battle.score,Cw*0.2,Ch*0.7);
					if (game.timer==0) {
						game.event="";
						game.mainevent="play";
						input=0;
						switch (game.battle.gamemode){
						case "survival-timer":
							generatePuzzleMode1()
							break;
						case "survival-life":
							generatePuzzleMode2()
							break;
						}
					}
					break;
				default:
					errormsg("event error !");
					break;
				}
				if (key.p) {
					game.prevevent=game.mainevent;
					game.mainevent="pause";
					game.prevtimer=game.timer;
					game.timer=40;
				}
				break;
			case "pause":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
				c.globalAlpha=1;
				c.fillStyle="white";
				c.textAlign="center";
				c.font = '38px monospace';
				c.fillText("PAUSE",Cw*0.5,Ch*0.5)
				if (game.inputType=="keyboard") {
					c.font = '24px monospace';
					c.fillText("Appuyez sur [Espace] pour reprendre",Cw*0.5,Ch*0.7)
					c.fillText("[D] pour Quitter la partie",Cw*0.5,Ch*0.85)
				} else {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.3,Ch*0.78,Cw*0.4,Ch*0.12)
					c.globalAlpha=1;
					c.font = '22px monospace';
					c.fillText("Toucher l'écran pour reprendre",Cw*0.5,Ch*0.7)
					c.fillText("Quitter la partie",Cw*0.5,Ch*0.85)
				}
				if ((key.space||key.p)&& game.timer==0) {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					key.p=false;
					key.space=false
				}
				if (key.d) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				break;
			case "exit":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,Ch*0.05,Cw,Ch)
				c.globalAlpha=1;
				c.fillStyle="white";
				c.textAlign="center";
				c.font = '24px monospace';
				c.fillText("Êtes-vous sûre de vouloir quitter la partie ?",Cw*0.5,Ch*0.5)
				c.font = '22px monospace';
				c.fillText("Votre score ne sera pas sauvegardé.",Cw*0.5,Ch*0.6)
				movemenu()
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.24,Ch*0.765,Cw*0.225,Ch*0.12)
					c.fillRect(Cw*0.54,Ch*0.765,Cw*0.225,Ch*0.12)
				} else {
					showcursor()
				}
				c.globalAlpha=1;
				c.font = '30px monospace';
				c.fillText("Non",Cw*0.35,Ch*0.845)
				c.fillText("Oui",Cw*0.65,Ch*0.845)
				if (key.d) {
					game.mainevent="pause";
					key.d=false
				}
				if (key.space) {
					switch (game.menu.target){
					case 1:
						game.mainevent="pause";
						key.space=false;
						break;
					case 2:
						game.mainevent="exitgame";
						game.event="transition";
						game.timer=50;
						break;
					default:
						break;
					}
				}
				break;
			case "exitgame":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,Ch*0.05,Cw,Ch)
				c.globalAlpha=1;
				c.fillStyle="white";
				c.textAlign="center";
				c.font = '24px monospace';
				c.fillText("Êtes-vous sûre de vouloir quitter la partie ?",Cw*0.5,Ch*0.5)
				c.font = '22px monospace';
				c.fillText("Votre score ne sera pas sauvegardé.",Cw*0.5,Ch*0.6)
				c.font = '30px monospace';
				c.fillText("Non",Cw*0.35,Ch*0.845)
				c.fillText("Oui",Cw*0.65,Ch*0.845)
				switch (game.event){
				case "transition":
					c.fillStyle="black";
					c.globalAlpha=1-game.timer/50;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						game.event="wait";
						game.timer=20;
					}
					break;
				case "wait":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						resetStats()
						setmenu(4,"lr",0,0,0,0);
						game.screen="hub";
						game.mainevent="";
						game.event="fadeout";
						anim.lvltransition.time=50;
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				break;
			case "gameover":
				c.textAlign="center";
				c.font = '32px monospace';
				drawPuzzle()
				c.shadowColor="black";
				c.shadowBlur=3;
				c.fillText("TERMINE !",Cw*0.5,Ch*0.5)
				c.fillStyle="white";
				c.fillText("TERMINE !",Cw*0.5,Ch*0.5)
				c.shadowColor="";
				c.shadowBlur=0;
				switch (game.event){
				case "begin":
					if (game.battle.dmg>20) game.battle.dmg--;
					if (game.battle.dmg>0) game.battle.dmg--;
					pass ? c.fillStyle ="green": c.fillStyle="red";
					c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					if (game.battle.dmg==0 && game.timer<=0) {
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
				case "transition2":
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					c.globalAlpha = 1-game.timer/20;
					c.textAlign="center";
					c.font = '38px monospace';
					c.fillText("Fin de la partie !",Cw*0.5,Ch*0.18)
					c.font = '30px monospace';
					c.textAlign="start";
					switch (game.battle.gamemode) {
					case "survival-timer":
						c.fillText("Mode: "+returnMode(),Cw*0.13,Ch*0.28)
						game.battle.add? c.drawImage(icon_plusON,Cw*0.6,Ch*0.225,35,35) :c.drawImage(icon_plus,Cw*0.6,Ch*0.225,35,35) ;
						game.battle.sub? c.drawImage(icon_moinsON,Cw*0.66,Ch*0.225,35,35) :c.drawImage(icon_moins,Cw*0.66,Ch*0.225,35,35) ;
						game.battle.mult?  c.drawImage(icon_multON,Cw*0.72,Ch*0.225,35,35) :c.drawImage(icon_mult,Cw*0.72,Ch*0.225,35,35) ;
						switch (game.battle.numopp){
						case 1:
							c.fillText(">1<",Cw*0.8,Ch*0.28);
							break;
						case 2:
							c.fillText(">2<",Cw*0.8,Ch*0.28);
							break;
						case 3:
							c.fillText(">3<",Cw*0.8,Ch*0.28);
							break;
						case 4:
							c.fillText(">4<",Cw*0.8,Ch*0.28);
							break;
						}
						break;
					case "survival-life":
						c.fillText("Mode: PV "+returnMode(),Cw*0.13,Ch*0.28)
						game.battle.add? c.drawImage(icon_plusON,Cw*0.66,Ch*0.225,35,35) :c.drawImage(icon_plus,Cw*0.66,Ch*0.225,35,35);
						game.battle.sub? c.drawImage(icon_moinsON,Cw*0.72,Ch*0.225,35,35) :c.drawImage(icon_moins,Cw*0.72,Ch*0.225,35,35);
						break;
					}
					c.font = '36px monospace';
					c.fillText("Score : "+game.stats.score,Cw*0.13,Ch*0.37)
					c.font = '30px monospace';
					c.fillText("Combo max : "+game.stats.maxcombo,Cw*0.13,Ch*0.46)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.fillText("Bonnes réponses : "+game.stats.clear,Cw*0.13,Ch*0.54)
					c.fillText("Mauvaise réponses : "+game.stats.miss,Cw*0.13,Ch*0.61)
					c.fillText("Temps de réponse moyen : "+(Math.floor(game.stats.avgrep*100)/100)+" sec",Cw*0.13,Ch*0.68)
					c.fillText("Durée de la partie : "+ShowTimerRes(game.stats.timeTot)+" sec",Cw*0.13,Ch*0.75)
					c.fillText("Rejouer",Cw*0.22,Ch*0.86)
					c.fillText("Retour au menu",Cw*0.5,Ch*0.86)
					switch (game.event){
					case "finpop":
						if (game.inputType=="phone") {
							c.globalAlpha = 0.15*(1-game.timer/20);
							c.fillRect(Cw*0.185,Ch*0.785,Cw*0.21,Ch*0.12)
							c.fillRect(Cw*0.46,Ch*0.785,Cw*0.34,Ch*0.12)
						}
						else {
							movemenu()
							showcursor()
							if (key.space) {
								switch (game.menu.target){
								case 1:
									resetStats()
									switch (game.battle.gamemode) {
									case "survival-timer":
										game.mainevent="starting";
										game.event="transition";
										game.timer=20;
										break;
									case "survival-life":
										game.mainevent="starting";
										game.event="set";
										game.timer=20;
										break;
									}
									break;
								case 2:
									game.event="transition2";
									game.timer=50;
									break;
								}
							}
						}
						break;
					case "transition2":
						c.fillStyle="black";
						c.globalAlpha=1-game.timer/50;
						c.fillRect(0,0,Cw,Ch)
						if (game.timer==0) {
							resetStats()
							game.event="transition3";
							game.timer=20;
						}
						break;
					case "transition3":
						c.fillStyle="black";
						c.globalAlpha=1;
						c.fillRect(0,0,Cw,Ch)
						if (game.timer==0) {
							setmenu(4,"lr",0,0,0,0,2);
							game.screen="hub";
							game.mainevent="";
							game.event="fadeout";
							anim.lvltransition.time=50;
						}
						break;
					default:
						break;
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				break;
			default:
				errormsg("mainevent error !")
				break;
			}
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="start";
			c.font = '20px monospace';
			c.fillText("mode "+returnMode(),Cw*0.02,Ch*0.04)
			if(game.battle.add)  c.fillText("+",Cw*0.3,Ch*0.04);
			if(game.battle.sub)  c.fillText("-",Cw*0.34,Ch*0.04);
			if(game.battle.mult)  c.fillText("x",Cw*0.38,Ch*0.04);
			if (game.battle.gamemode=="survival-timer") {
				switch (game.battle.numopp){
				case 1:
					c.fillText(">1<",Cw*0.42,Ch*0.04);
					break;
				case 2:
					c.fillText(">2<",Cw*0.42,Ch*0.04);
					break;
				case 3:
					c.fillText(">3<",Cw*0.42,Ch*0.04);
					break;
				case 4:
					c.fillText(">4<",Cw*0.42,Ch*0.04);
					break;
				}
			}
			break;
		case "level":
			showbackground()
			RTAtimer()
			anim.operation.invert ? anim.operation.time++:anim.operation.time--;
			if (anim.operation.time==0||anim.operation.time==60) anim.operation.invert=!anim.operation.invert;
			if (anim.decaybar.mode=="alt") {
				anim.decaybar.invert ? anim.decaybar.time++:anim.decaybar.time--;
			}else {
				anim.decaybar.time=40;
			}
			if (anim.decaybar.time==0||anim.decaybar.time==40) anim.decaybar.invert=!anim.decaybar.invert;
			if ((game.stats.timer<=game.stats.maxtimer*0.2||game.stats.time<=game.stats.maxtime*0.2) && anim.lowtimer.mode=="alt") {
				anim.lowtimer.time>0 ? anim.lowtimer.time--:anim.lowtimer.time=30;
			}else {
				anim.lowtimer.time=30;
			}
			c.fillStyle="white";
			c.globalAlpha=1;
			c.font = '26px monospace';
			c.textAlign="start";
			c.fillText("Score :",Cw*0.03,Ch*0.77)
			c.font = '20px monospace';
			c.textAlign="center";
			c.fillText("Restant",Cw*0.5,Ch*0.08)
			c.globalAlpha=0.15;
			c.fillRect(Cw*0.035,Ch*0.875,120,40)
			c.globalAlpha=0.6;
			c.font = '26px monospace';
			c.fillText("Pause",Cw*0.125,Ch*0.94)
			c.globalAlpha=1;
			c.font = '40px monospace';
			c.fillText(game.battle.left,Cw*0.5,Ch*0.17)
			c.font = '30px monospace';
			c.textAlign="start";
			if (game.stats.maxtimer>0) {
				c.fillRect(Cw*0.118,Ch*0.1,Cw*0.295*(game.stats.timer/game.stats.maxtimer),Ch*0.113)
				c.fillStyle="red";
				c.globalAlpha=0.3+anim.decaybar.time/80;
				if (game.battle.decaystep>0) c.fillRect(Cw*0.413-Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.1,Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.113);
				if (game.stats.timer<=game.stats.maxtimer*0.2 && game.mainevent!="starting" && anim.lowtimer.mode!="none") {
					c.globalAlpha=0.2+anim.lowtimer.time/50;
					c.fillRect(Cw*0.118,Ch*0.1,Cw*0.295*(game.stats.timer/game.stats.maxtimer),Ch*0.113)
				}
				c.globalAlpha=1;
				c.fillStyle="white";
				c.drawImage(ui_timer,Cw*0.01,Ch*0.09,60,60)
				c.drawImage(ui_timerbar,Cw*0.11,Ch*0.09,202,72)
			}
			if (game.stats.maxtime>0) {
				c.fillRect(Cw*0.611+Cw*0.289*(1-game.stats.time/game.stats.maxtime),Ch*0.1,Cw*0.289*(game.stats.time/game.stats.maxtime),Ch*0.113)
				c.fillStyle="red";
				c.globalAlpha=0.3+anim.decaybar.time/80;
				if (game.stats.time<=game.stats.maxtime*0.2 && game.mainevent!="starting" && anim.lowtimer.mode!="none") {
					c.globalAlpha=0.2+anim.lowtimer.time/50;
					c.fillRect(Cw*0.611+Cw*0.289*(1-game.stats.time/game.stats.maxtime),Ch*0.1,Cw*0.289*(game.stats.time/game.stats.maxtime),Ch*0.113)
				}
				c.globalAlpha=1;
				c.fillStyle="white";
				c.drawImage(ui_time,Cw*0.9,Ch*0.09,60,60)
				c.drawImage(ui_timebar,Cw*0.6,Ch*0.09,202,72)
			}
			c.textAlign="end";
			if (game.stats.maxtimer>0) c.fillText(ShowTimer(game.stats.timer),Cw*0.4,Ch*0.226);
			if (game.stats.maxtime>0) c.fillText(ShowTimer(game.stats.time),Cw*0.775,Ch*0.226);
			c.globalAlpha = 0.2;
			c.fillText("00000000",Cw*0.225,Ch*0.83)
			c.globalAlpha = 1;
			c.fillText(game.stats.score,Cw*0.225,Ch*0.83)
			c.textAlign="start";
			c.globalAlpha=1;
			if (game.stats.maxpv>0) {
				c.fillRect(Cw*0.26,Ch*0.865,Cw*0.48*(game.stats.pv/game.stats.maxpv),Ch*0.08)
				c.fillStyle="red";
				c.globalAlpha=0.5;
				c.fillRect(Cw*0.26+Cw*0.48*(game.stats.pv/game.stats.maxpv),Ch*0.865,Cw*0.48*(game.battle.dmg/game.stats.maxpv),Ch*0.08)
				c.fillStyle="white";
				c.globalAlpha=1;
				c.drawImage(ui_hpbar,Cw*0.25,Ch*0.75,Cw*0.5,94)
				c.fillText(Math.floor(game.stats.pv),Cw*0.412,Ch*0.848)
				c.fillText("/"+game.stats.maxpv,Cw*0.5,Ch*0.848)
			}
			if (game.stats.maxvies>0) {
				c.fillRect(Cw*0.268,Ch*0.867,Cw*0.474*(game.stats.vies/game.stats.maxvies),Ch*0.08)
				c.fillStyle="red";
				c.globalAlpha=0.5;
				c.fillRect(Cw*0.268+Cw*0.474*(game.stats.vies/game.stats.maxvies),Ch*0.867,Cw*0.474*(game.battle.dmg/game.stats.maxvies),Ch*0.08)
				c.fillStyle="white";
				c.globalAlpha=1;
				switch (game.stats.maxvies) {
				case 1:
					c.drawImage(ui_lifebar1,Cw*0.255,Ch*0.75,Cw*0.5,94)
					break;
				case 3:
					c.drawImage(ui_lifebar3,Cw*0.255,Ch*0.75,Cw*0.5,94)
					break;
				case 5:
					c.drawImage(ui_lifebar5,Cw*0.255,Ch*0.75,Cw*0.5,94)
					break;
				case 7:
					c.drawImage(ui_lifebar7,Cw*0.255,Ch*0.75,Cw*0.5,94)
					break;
				case 10:
					c.drawImage(ui_lifebar10,Cw*0.255,Ch*0.75,Cw*0.5,94)
					break;
				case 20:
					c.drawImage(ui_lifebar20,Cw*0.255,Ch*0.75,Cw*0.5,94)
					break;
				}
				c.textAlign="center";
				c.fillText(Math.floor(game.stats.vies),Cw*0.5,Ch*0.848)
			}
			c.font = '28px monospace';
			c.textAlign="start";
			if (game.stats.combo>4) c.fillText("COMBO "+game.stats.combo,Cw*0.11,Ch*0.35);
			if (game.stats.combo>9) c.fillText("x "+checkCombo(game.stats.combo),Cw*0.115,Ch*0.4);

			switch (game.mainevent){
			case "starting":
				switch (game.event){
				case "set":
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					game.stats.pv=0;
					game.stats.vies=0;
					game.stats.timer=0;
					game.stats.time=0;
						game.stats.maxpv=levels[game.level.world][game.level.stage].hp;
						game.stats.maxvies=levels[game.level.world][game.level.stage].life;
						game.stats.maxtimer=levels[game.level.world][game.level.stage].timer;
						game.stats.maxtime=levels[game.level.world][game.level.stage].time;
						game.battle.gamemode=levels[game.level.world][game.level.stage].type;
						game.battle.bossbar=levels[game.level.world][game.level.stage].boss;
						game.battle.bonustime=levels[game.level.world][game.level.stage].gaintime;
						game.battle.decaystep=levels[game.level.world][game.level.stage].decaystep;
						game.battle.decaytimer=levels[game.level.world][game.level.stage].timerdecay;
						game.battle.timerhplose=levels[game.level.world][game.level.stage].timerhplose;
						game.battle.skiptonext=levels[game.level.world][game.level.stage].skiptonext;
						game.battle.left=levels[game.level.world][game.level.stage].count;
						game.battle.order=levels[game.level.world][game.level.stage].order;
						game.level.encounter=JSON.parse(JSON.stringify(levels[game.level.world][game.level.stage].level))
					game.event="fadeout";
					break;
				case "fadeout":
					anim.lvltransition.time--;
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=anim.lvltransition.time/100;
					c.fillRect(0,0,Cw,Ch)
					if (anim.lvltransition.time<=0) {
						game.event="transition";
						game.timer=20
					}
					break;
				case "transition":
					if (game.timer==0) {
						if (game.stats.pv<game.stats.maxpv) {
							game.stats.pv+=game.stats.maxpv/40;
							if (game.stats.pv>game.stats.maxpv) game.stats.pv=game.stats.maxpv;
						}
						if (game.stats.vies<game.stats.maxvies) {
							game.stats.vies+=game.stats.maxvies/40;
							if (game.stats.vies>game.stats.maxvies) game.stats.vies=game.stats.maxvies;
						}
						if (game.stats.timer<game.stats.maxtimer) {
							game.stats.timer+=game.stats.maxtimer/40;
							if (game.stats.timer>game.stats.maxtimer) game.stats.timer=game.stats.maxtimer;
						}
						if (game.stats.time<game.stats.maxtime) {
							game.stats.time+=game.stats.maxtime/40;
							if (game.stats.time>game.stats.maxtime) game.stats.time=game.stats.maxtime;
						}
						if (game.stats.pv==game.stats.maxpv&&game.stats.vies==game.stats.maxvies&&game.stats.timer==game.stats.maxtimer) {
							game.battle.dmg=0;
							game.event="attention";
							game.timer=20
						}
					}
					break;
				case "attention":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					c.fillText("Prêt ?",Cw*(0.5*(1-game.timer/20)),Ch*0.5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer==0) {
						game.timer=50;
						game.event="pret"
					}
					break;
				case "pret":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					c.fillText("Prêt ?",Cw*0.5,Ch*0.5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer==0) {
						game.timer=20;
						game.event="partez"
					}
					break;
				case "partez":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					c.fillText("Prêt ?",Cw*(0.5+0.6*(1-game.timer/20)),Ch*0.5)
					c.fillText("PARTEZ !",Cw*(0.5*(1-game.timer/20)),Ch*0.5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer==0) {
						game.timer=20;
						game.event="start"
					}
					break;
				case "start":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					c.fillText("PARTEZ !",Cw*0.5,Ch*0.5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer==0) {
						game.event="";
						game.mainevent="play";
						generatePuzzleModelvl()
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				if (key.p) {
					game.prevevent=game.mainevent;
					game.mainevent="pause";
					game.prevtimer=game.timer;
					game.timer=40;
				}
				break;
			case "play":
				if (game.battle.dmg>0) game.battle.dmg--;
				if (game.battle.dmg>0) game.battle.dmg--;
				if (game.stats.timer>0) game.stats.timer--;
				if (game.stats.time>0) game.stats.time--;
				game.stats.timeRep++;
				c.textAlign="center";
				c.font = '32px monospace';
				c.fillStyle="white";
				c.font = '40px monospace';
				game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
				drawPuzzle()
				inputPlayer()
				switch (game.battle.gamemode){
				case "vies":
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=25;
					}
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=50;
					}
					break;
				case "pv":
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=25;
					}
					if (game.stats.pv<=0 && game.stats.maxpv>0) {
						game.stats.pv=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=50;
					}
					break;
				case "boss":
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=25;
					}
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=50;
					}
					if (game.stats.pv<=0 && game.stats.maxpv>0) {
						game.stats.pv=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=50;
					}
					break;
				case "chrono":
					if (game.stats.time<=0 && game.stats.maxtime>0) {
						game.stats.time=0;
						game.mainevent="gameover";
						game.event="end";
						game.timer=100;
					}
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="gameover";
						game.event="end";
						game.timer=100;
					}
					if (game.stats.pv<=0 && game.stats.maxpv>0) {
						game.stats.pv=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=50;
					}
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=50;
					}
					break;
				case "lesson":
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=50;
					}
					break;
				default:
					break;
				}
				if (key.space) {
					game.mainevent="wait";
					game.event="calc";
				}
				if (key.p) {
					game.prevevent=game.mainevent;
					game.mainevent="pause";
					game.prevtimer=game.timer;
					game.timer=40;
				}
				break;
			case "wait":
				drawPuzzle()
				c.textAlign="center";
				c.font = '32px monospace';
				switch(game.event){
				case "calc":
					pass =validatePuzzlelvl()
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					c.font = '40px monospace';
					game.battle.negat ? c.fillText("-"+input,Cw*0.5,Ch*0.72):c.fillText(input,Cw*0.5,Ch*0.72);
					game.event="wait";
					game.timer=20;
					break;
				case "wait":
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					c.font = '26px monospace';
					if (pass) c.fillText("+ "+game.battle.score,Cw*0.2,Ch*0.7);
					if (game.timer==0) {
						game.event="";
						game.mainevent="play";
						input=0;
						generatePuzzleModelvl()
					}
				}
				if (key.p) {
					game.prevevent=game.mainevent;
					game.mainevent="pause";
					game.prevtimer=game.timer;
					game.timer=40;
				}
				break;
			case "pause":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
				c.globalAlpha=1;
				c.fillStyle="white";
				c.textAlign="center";
				c.font = '38px monospace';
				c.fillText("PAUSE",Cw*0.5,Ch*0.5)
				if (game.inputType=="keyboard") {
					c.font = '24px monospace';
					c.fillText("Appuyez sur [Espace] pour reprendre",Cw*0.5,Ch*0.7)
					c.fillText("[D] pour Quitter la partie",Cw*0.5,Ch*0.85)
				} else {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.3,Ch*0.78,Cw*0.4,Ch*0.12)
					c.globalAlpha=1;
					c.font = '22px monospace';
					c.fillText("Toucher l'écran pour reprendre",Cw*0.5,Ch*0.7)
					c.fillText("Quitter la partie",Cw*0.5,Ch*0.85)
				}
				if ((key.space||key.p)&& game.timer==0) {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					key.p=false;
					key.space=false
				}
				if (key.d) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				break;
			case "exit":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,Ch*0.05,Cw,Ch)
				c.globalAlpha=1;
				c.fillStyle="white";
				c.textAlign="center";
				c.font = '24px monospace';
				c.fillText("Êtes-vous sûre de vouloir quitter la partie ?",Cw*0.5,Ch*0.5)
				c.font = '22px monospace';
				c.fillText("Votre score ne sera pas sauvegardé.",Cw*0.5,Ch*0.6)
				movemenu()
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.24,Ch*0.765,Cw*0.225,Ch*0.12)
					c.fillRect(Cw*0.54,Ch*0.765,Cw*0.225,Ch*0.12)
				} else {
					showcursor()
				}
				c.globalAlpha=1;
				c.font = '30px monospace';
				c.fillText("Non",Cw*0.35,Ch*0.845)
				c.fillText("Oui",Cw*0.65,Ch*0.845)
				if (key.d) {
					game.mainevent="pause";
					key.d=false
				}
				if (key.space) {
					switch (game.menu.target){
					case 1:
						game.mainevent="pause";
						key.space=false;
						break;
					case 2:
						game.mainevent="exitgame";
						game.event="transition";
						game.timer=50;
						break;
					default:
						break;
					}
				}
				break;
			case "exitgame":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,Ch*0.05,Cw,Ch)
				c.globalAlpha=1;
				c.fillStyle="white";
				c.textAlign="center";
				c.font = '24px monospace';
				c.fillText("Êtes-vous sûre de vouloir quitter la partie ?",Cw*0.5,Ch*0.5)
				c.font = '22px monospace';
				c.fillText("Votre score ne sera pas sauvegardé.",Cw*0.5,Ch*0.6)
				c.font = '30px monospace';
				c.fillText("Non",Cw*0.35,Ch*0.845)
				c.fillText("Oui",Cw*0.65,Ch*0.845)
				switch (game.event){
				case "transition":
					c.fillStyle="black";
					c.globalAlpha=1-game.timer/50;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						game.event="wait";
						game.timer=20;
					}
					break;
				case "wait":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						resetStats()
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.screen="level-select";
						game.mainevent="map";
						game.event="fadeout";
						anim.lvltransition.time=50;
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				break;
			case "gameover":
				c.textAlign="center";
				c.font = '32px monospace';
				drawPuzzle()
				c.shadowColor="black";
				c.shadowBlur=3;
				c.fillText("Fin de partie !",Cw*0.5,Ch*0.5)
				c.fillStyle="white";
				c.fillText("Fin de partie !",Cw*0.5,Ch*0.5)
				c.shadowColor="";
				c.shadowBlur=0;
				switch (game.event){
				case "begin":
					if (game.battle.dmg>20) game.battle.dmg--;
					if (game.battle.dmg>0) game.battle.dmg--;
					pass ? c.fillStyle ="green": c.fillStyle="red";
					c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					if (game.battle.dmg<=0 && game.timer<=0) {
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
						setmenu(2,"lr",0.17,0.46,0.27,0);
					}
					break;
				case "finpop":
				case "transition2":
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					c.globalAlpha = 1-game.timer/20;
					c.textAlign="center";
					c.font = '38px monospace';
					c.fillText("Vous avez perdu !",Cw*0.5,Ch*0.18)
					c.font = '30px monospace';
					c.fillText("Niveau "+game.level.world+"-"+game.level.stage,Cw*0.5,Ch*0.3)
					c.textAlign="start";
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';

					c.fillText("Rejouer",Cw*0.22,Ch*0.5)
					c.fillText("Retour au menu",Cw*0.5,Ch*0.5)
					
					break;
				}
				switch (game.event){
				case "finpop":
					if (game.inputType=="phone") {
						c.globalAlpha = 0.15*(1-game.timer/20);
						c.fillRect(Cw*0.185,Ch*0.425,Cw*0.21,Ch*0.12)
						c.fillRect(Cw*0.46,Ch*0.425,Cw*0.34,Ch*0.12)
					}
					else {
						movemenu()
						showcursor()
						if (key.space) {
							resetStats()
							switch (game.menu.target){
							case 1:
								game.mainevent="starting";
								game.event="set";
								game.timer=20;
								break;
							case 2:
								game.event="transition2";
								game.timer=50;
								break;
							}
						}
					}
					break;
				case "transition2":
					c.fillStyle="black";
					c.globalAlpha=1-game.timer/50;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						resetStats()
						game.event="transition3";
						game.timer=20;
					}
					break;
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.screen="level-select";
						game.mainevent="map";
						game.event="fadeout";
						anim.lvltransition.time=50;
					}
					break;
				default:
					break;
				}
				break;
			case "perfect":
				c.fillStyle="white";
				c.textAlign="center";
				c.font = '32px monospace';
				c.fillText("TERMINE !",Cw*0.5,Ch*0.5)
				c.globalAlpha=anim.perfect.globalOp;
				if (anim.perfect.layer1pos>=90) c.globalAlpha=0;
				c.drawImage(txt_perfect1,Cw*0.5-(352*anim.perfect.ratio/2)+352*(anim.perfect.layer1pos/100),Ch*(0.65-(anim.perfect.ratio-1)/4)+0.5,26*anim.perfect.ratio,47*anim.perfect.ratio)
				c.globalAlpha=anim.perfect.transition*anim.perfect.globalOp;
				c.fillRect(Cw*0.5-(352*anim.perfect.ratio/2)+5,Ch*(0.65-(anim.perfect.ratio-1)/4)+2,342*anim.perfect.ratio,45*anim.perfect.ratio)
				c.globalAlpha=anim.perfect.globalOp;
				c.drawImage(txt_perfect,Cw*0.5-(352*anim.perfect.ratio/2),Ch*(0.65-(anim.perfect.ratio-1)/4),352*anim.perfect.ratio,48*anim.perfect.ratio)
				c.globalAlpha=anim.perfect.layer2opacity*anim.perfect.globalOp;
				c.drawImage(txt_perfect2,Cw*0.5-(352*anim.perfect.ratio/2),Ch*(0.65-(anim.perfect.ratio-1)/4),352*anim.perfect.ratio,48*anim.perfect.ratio)
				c.globalAlpha=anim.perfect.whitescreen/10;
				c.fillRect(0,0,Cw*1,Ch*1)
				switch (game.event){
				case "init":
					anim.perfect.globalOp=1;
					anim.perfect.whitescreen=10;
					anim.perfect.layer1pos=0;
					anim.perfect.layer2opacity=0;
					anim.perfect.transition=0;
					anim.perfect.ratio=1;
					game.event="phase1"
					break;
				case "phase1":
					anim.perfect.whitescreen--;
					if (anim.perfect.whitescreen<=0) game.event="phase2";
					break;
				case "phase2":
					anim.perfect.ratio+=0.0007;
					anim.perfect.layer1pos+=3;
					if (anim.perfect.layer1pos>=90) game.event="phase3";
					break;
				case "phase3":
					anim.perfect.ratio+=0.0007;
					anim.perfect.layer2opacity+=0.01;
					anim.perfect.transition+=0.1;
					if (anim.perfect.transition>=1) {anim.perfect.layer2opacity=1; game.event="phase4";}
					break;
				case "phase4":
					anim.perfect.ratio+=0.0007;
					anim.perfect.transition-=0.05;
					if (anim.perfect.transition<=0){anim.perfect.transition=0; game.event="phase5";}
					break;
				case "phase5":
					anim.perfect.ratio+=0.0007;
					if (anim.perfect.ratio>=1.1) game.event="phase6";
					break;
				case "phase6":
					anim.perfect.ratio+=0.0005;
					anim.perfect.globalOp-=0.015;
					if (anim.perfect.globalOp<=0) {
						game.mainevent="finish";
						game.event="transition";
						game.timer=15;
					}
					break;
				default:
					errormsg("event error !")
				}
				break;
			case "finish":
				c.textAlign="center";
				c.font = '32px monospace';
				c.shadowColor="black";
				c.shadowBlur=3;
				c.fillText("TERMINE !",Cw*0.5,Ch*0.5)
				c.shadowColor="";
				c.shadowBlur=0;
				switch (game.event){
				case "begin":
					if (game.battle.dmg>30) game.battle.dmg--;
					if (game.battle.dmg>0) game.battle.dmg--;
					drawPuzzle()
					pass ? c.fillStyle ="green": c.fillStyle="red";
					c.font = '40px monospace';
					c.fillText(input,Cw*0.5,Ch*0.72);
					if (game.battle.dmg==0) {
						saves.levels[game.level.world][game.level.stage].clear=true;
						registerScore(game.stats.score)
						game.event="end";
						game.timer=15;
					}
					break;
				case "end":
					if (game.timer==0) {
						if ((game.stats.maxvies>0&&game.stats.vies==game.stats.maxvies)||(game.stats.maxpv>0&&game.stats.pv==game.stats.maxpv)&&game.stats.miss==0) {
							saves.levels[game.level.world][game.level.stage].perfect=true;
							game.mainevent="perfect";
							game.event="init"
						}
						else {
							game.event="transition";
							game.timer=50
						}
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
				case "transition2":
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					c.globalAlpha = 1-game.timer/20;
					c.textAlign="center";
					c.font = '38px monospace';
					c.fillText("Vous avez gagné(e) !",Cw*0.5,Ch*0.18)
					c.font = '30px monospace';
					c.fillText("Niveau "+game.level.world+"-"+game.level.stage,Cw*0.5,Ch*0.28)
					c.textAlign="start";
					c.font = '36px monospace';
					c.fillText("Score : "+game.stats.score,Cw*0.13,Ch*0.37)
					c.font = '30px monospace';
					c.fillText("Combo max : "+game.stats.maxcombo,Cw*0.13,Ch*0.46)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.fillText("Bonnes réponses : "+game.stats.clear,Cw*0.13,Ch*0.54)
					c.fillText("Mauvaise réponses : "+game.stats.miss,Cw*0.13,Ch*0.61)
					c.fillText("Temps de réponse moyen : "+(Math.floor(game.stats.avgrep*100)/100)+"sec",Cw*0.13,Ch*0.68)
					c.fillText("Durée de la partie : "+ShowTimerRes(game.stats.timeTot)+"sec",Cw*0.13,Ch*0.75)
					c.fillText("Rejouer",Cw*0.22,Ch*0.86)
					c.fillText("Continuer",Cw*0.52,Ch*0.86)
					if (game.inputType=="keyboard") {
						movemenu()
						showcursor()
						if (key.space) {
							switch (game.menu.target){
							case 1:
								game.mainevent="starting";
								game.event="set";
								game.timer=20;
								break;
							case 2:
								game.event="transition2";
								game.timer=50;
								break;
							}
						}
					}
					break;
				default:
					errormsg("event error !")
				}
				switch (game.event){
				case "finpop":
					if (game.inputType=="phone") {
						c.globalAlpha = 0.15*(1-game.timer/20);
						c.fillRect(Cw*0.185,Ch*0.785,Cw*0.21,Ch*0.12)
						c.fillRect(Cw*0.46,Ch*0.785,Cw*0.3,Ch*0.12)
					}
					else {
						movemenu()
						showcursor()
						if (key.space) {
							resetStats()
							switch (game.menu.target){
							case 1:
								game.mainevent="starting";
								game.event="set";
								game.timer=20;
								break;
							case 2:
								game.event="transition2";
								game.timer=50;
								break;
							}
						}
					}
					break;
				case "transition2":
					c.fillStyle="black";
					c.globalAlpha=1-game.timer/50;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						resetStats()
						game.event="transition3";
						game.timer=20;
					}
					break;
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer==0) {
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.screen="level-select";
						game.mainevent="map";
						game.event="fadeout";
						anim.lvltransition.time=50;
					}
					break;
				default:
					break;
				}
				break;
			default:
				errormsg("mainevent error !")
				break;
			}
			c.fillStyle="white";
			c.globalAlpha=1;
			c.textAlign="start";
			c.font = '20px monospace';
			c.fillText("Niveau "+game.level.world+"-"+game.level.stage,Cw*0.02,Ch*0.04)
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
	c.fillText("Version BETA 1.3.2", Cw*0.99, Ch*0.99);
	requestAnimationFrame(loopAnimation)
}
loopAnimation()
chargement++