const directory="assets/game/assets/";


const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = 650;
canvas.height = 450;
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
	x: canvas.width/2,
	y: canvas.height/2,
	prex: canvas.width/2,
	prey: canvas.height/2,
	down:false,
	hasmove:false,
	range:0,
}
const key = {		//contrôles
	q:false,
	d:false,
	p:false,
	space:false,
	up:false,
	right:false,
	down:false,
	left:false,
	cooldown : 0,	//cooldown entre chaque input
	cooldownmax : 1, //cooldown max entre chaque input
	pausecooldown : 0 //max 40
};
const tile = {
	tx:141,		//largeur d'une tile
	ty:144,		//hauteur d'une tile
	tw:46,		//taille d'affichage horizontale pour une tile
	th:48		//taille d'affichage verticale pour une tile
}
const tilenum = {
	tx:188,		//largeur d'une tile
	ty:192,		//hauteur d'une tile
	tw:47,		//taille d'affichage horizontale pour une tile
	th:48		//taille d'affichage verticale pour une tile
}
const spritefont = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","?"];
const numfont = ["0","1","2","3","4","5","6","7","8","9",".","-","+","x"];

const version="dev_BETA-1.5.1";
const Cw= canvas.width, Ch= canvas.height;

let msPrev = window.performance.now()
const game = {
						//tag pour l'affichage et les événements
	screen : "loading",
	mainevent : "mainmenu",
	event : "",
	sideevent :"",
	inputType:"keyboard", //keyboard, phone
	prevevent : "",
	prevtimer : 0,
	fps:60,
	msPerFrame: 1000/60,

	option : {			//Options en jeu par défaut
		music : 100,
		sound : 100,
		inputOpacity: 60,
		bckgrndOpacity: 100,
		animation:"alt",
		font:"all",
		inputDirection:false,
		showfps:false
	},
	nosave:false,
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
		maxvies:0,
		level : [],
	},
	setbtl : {
		mode:1,
		dif:1,
		chif:1
	},
	battle : {
		gamemode: "",
		mode : "very-easy",		// very-easy, easy, normal, hard
		add : true,
		sub : false,
		mult : false,
		numopp : 1,
		symbnum : 1,
		score : 0,
		negat : false,
		num1:0,
		num2:0,
		left:0,
		symb:"", 		//plus, moins, mult, div
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
		arcade:{
			level:0,
			phase:"normal", //"normal"; "regen"
			maxclear:0,
			clear:0,
			gaintimer:40, //en %
			regen:0,
			regenlvl:0
		}
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
		mode:"alt"			//"alt" "fix"
	},
	lowtimer:{
		time:30,
		mode:"alt"			//"alt" "fix"
	},
	regenbar: {
		time:49,
		invert:false,
		mode:"alt"			//"alt" "fix"
	},
	perfect:{
		globalOp:2000,
		whitescreen:0,
		txtsize:348,
		posy:700,
		posx:0,
		posx2:0,
		wline:0,
		phase:0,
		transition:0,
		ratio:1
	},
	lvlselect:{
		time:1000,
		invert:false,
	},
	lvltransition:{
		time:100,
	},
	operation:{
		time:1000,
		invert:false,
		size:150,
		opacity:200,
		phase:0
	},
	background:{
		type:Math.floor(Math.random()*4),
		stock:[],
		speed:1,
		timer:0,
	},
	graph:{
		init:0,
		step:25
	},
	pause:{
		colorGB:127,
		opa:0,
	},
	combocolor:0,
	entity:{
		phase:0,
		size:200,
		rotation:0,
		opacity:100
	},
	burst:{
		phase:0,
		opacity1:100,
		opacity2:100,
		opacity3:100,
		rotation1:0,
		rotation2:90,
		rotation3:220,
		opacity:100,
		ratio:0.5,
		timer:0,
	}
}
let input = "";
let prev = {
	result:0,
	num1:0,
	num2:0
}
let pass= false;
let lang={};

const entity= new Image();
const blast= new Image();
const burst= new Image();
const btl_plus= new Image();
const btl_moins= new Image();
const btl_mult= new Image();
const inputframe= new Image();
const icon_operation= new Image();
const icons_lt= new Image();

const icons_menu= new Image();
const txt_perfect1= new Image();
const ui_hpbar= new Image();
const ui_timerbar= new Image();
const ui_timerbarprogress= new Image();

const ui_icons = new Image();

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
const frame_graph= new Image();
const frame_stats= new Image();
const font= new Image();
const font_num= new Image();
const cursor= new Image();

entity.src = directory+"entity.png";
blast.src = directory+"blast.png";
burst.src = directory+"burst.png";
btl_plus.src = directory+"plus.png";
btl_moins.src = directory+"moins.png";
btl_mult.src = directory+"mult.png";
inputframe.src = directory+"input.png";
icons_lt.src = directory+"icons_lt.png";

icon_operation.src = directory+"icon_operation.png";
icons_menu.src = directory+"icons_menu.png";
txt_perfect1.src = directory+"txt_perfect_layer1.png";

ui_hpbar.src = directory+"UI_hpbar.png";
ui_timerbar.src = directory+"UI_timerbar.png";
ui_timerbarprogress.src = directory+"UI_timerbarprogress.png";
ui_icons.src = directory+"UI_icons.png";

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

frame_stats.src = directory+"frame_stats.png";
frame_graph.src = directory+"frame_graph.png";

lvlmap_level.src = directory+"lvlmap_level.png";
lvlmap_levelP.src = directory+"lvlmap_levelP.png";
lvlmap_center.src = directory+"lvlmap_center.png";
lvlmap_select.src = directory+"lvlmap_select.png";

font.src = directory+"font.png";
font_num.src = directory+"font_numbers.png";
cursor.src = directory+"cursor.png";

let frameRate=0;
let frames=0;
let tstart=Date.now();
let msPassed=0;
let t=0;
let delta=0;
let nbFramePassed=0;

function loopAnimation() {
	requestAnimationFrame(loopAnimation)
	const msNow=window.performance.now()
	msPassed=msNow-msPrev;
	//if (msPassed<game.msPerFrame) return
	const excessTime=msPassed%game.msPerFrame;
	msPrev=msNow-excessTime;
	msPassed-=excessTime;
	nbFramePassed= msPassed/game.msPerFrame;

	if (key.cooldown>0) key.cooldown--;
	game.timer>0 ? game.timer-=msPassed : game.timer=0;
	key.pausecooldown>0 ? key.pausecooldown-=msPassed : key.pausecooldown=0;
	c.fillStyle="black";
	c.globalAlpha = 1;
	c.fillRect(0,0,canvas.width,canvas.height)
	switch (game.screen) {
		case "loading":
			if (chargement!=4) {
				hideErrorMsg()
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
				game.prevtimer++;
				if (game.prevtimer>6000) {
					setErrorMsg("ERREUR 1 : Un des fichiers du jeu n'a pas été correctement chargé, actualisez la page en vidant le cache du navigateur si le problème persiste.")
				}
			} else {
				game.prevtimer=0;
				hideErrorMsg()
				let Maj = checkSave()
				if (localStorage.getItem("version")==null) {
					game.screen="init";
					game.event="choix";
					setmenu(2,"lr",0.2,0.71,0.31,0);
				}
				else if (localStorage.getItem("version")!=null&&Maj==2) {
					game.screen="init";
					game.event="choix";
					setmenu(2,"lr",0.22,0.71,0.31,0);
				}
				else if (localStorage.getItem("version")!=version||Maj==1) {
					game.screen="maj";
					game.event="choix";
					setmenu(2,"lr",0.17,0.71,0.31,0);
				} else {
					optionsLoad()
					loadSave()
					game.screen="title";
					setmenu(2,"ud",0.3,0.47,0,0.09);
				}
			}
			break;
		case "maj":
			showbackground()
			c.globalAlpha=1;
			c.fillStyle="white";
			c.textAlign="center";
			c.font = '48px monospace';
			c.fillText("- Mise à jour -",Cw*0.5,Ch*0.14)
			game.inputType=="phone" ? c.font = '19px monospace': c.font = '21px monospace';
			c.fillText("Une version plus récente du jeu a été mise en ligne.",Cw*0.5,Ch*0.27)
			c.fillText("Les données sauvegardées actuelles que vous avez peuvent",Cw*0.5,Ch*0.34)
			c.fillText("être conserver en ajoutant celles de la mise à jour.",Cw*0.5,Ch*0.41)
			c.font = '22px monospace';
			
			switch(game.event){
			case "choix":
				c.textAlign="center";
				c.font = '26px monospace';
				c.fillText("Que faire des données actuelle ?",Cw*0.5,Ch*0.6)
				c.font = '22px monospace';
				c.fillText("Conserver",Cw*0.33,Ch*0.75)
				c.fillText("Réinitialiser",Cw*0.66,Ch*0.75)
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.18,Ch*0.68,Cw*0.3,Ch*0.11)
					c.fillRect(Cw*0.51,Ch*0.68,Cw*0.3,Ch*0.11)
				}
				else {
					c.textAlign="start";
					c.fillText("Contrôles :",Cw*0.12,Ch*0.85)
					c.fillStyle="yellow";
					c.fillText("Espace/ Entrée",Cw*0.1,Ch*0.90)
					c.fillText("Touche directionnel",Cw*0.1,Ch*0.96)
					c.fillStyle="white";
					c.fillText("- Valider/ Suivant",Cw*0.5,Ch*0.90)
					c.fillText("- Se déplacer",Cw*0.5,Ch*0.96)
					movemenu()
					showcursor()
				}
				if (key.space) {
					game.option.animation="alt";
					optionsUpdate()
					switch(game.menu.target){
					case 1:
						majSave()
						localStorage.setItem("version",version)
						game.screen="title";
						setmenu(2,"ud",0.3,0.47,0,0.09)
						break;
					case 2:
						resetSave()
						localStorage.setItem("version",version)
						game.screen="title";
						setmenu(2,"ud",0.3,0.47,0,0.09)
						break;
					}
				}
				break;
			}
			break;
		case "init":
			showbackground()
			c.globalAlpha=1;
			c.fillStyle="white";
			c.textAlign="center";
			c.font = '48px monospace';
			c.fillText("- Initialisation -",Cw*0.5,Ch*0.14)
			game.inputType=="phone" ? c.font = '19px monospace': c.font = '21px monospace';
			c.fillText("Ce jeu utilise le Stockage Locale de votre navigateur",Cw*0.5,Ch*0.27)
			c.fillText("pour enregistrer les données de progression.",Cw*0.5,Ch*0.34)
			c.fillText("Aucune données personnels ne sera récoltées.",Cw*0.5,Ch*0.41)
			c.font = '22px monospace';
			switch(game.event){
			case "choix":
				c.textAlign="center";
				c.font = '26px monospace';
				c.fillText("Activer ce système de sauvegarde ?",Cw*0.5,Ch*0.6)
				c.font = '22px monospace';
				c.fillText("Oui",Cw*0.33,Ch*0.75)
				c.fillText("Non",Cw*0.66,Ch*0.75)
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.18,Ch*0.68,Cw*0.3,Ch*0.11)
					c.fillRect(Cw*0.51,Ch*0.68,Cw*0.3,Ch*0.11)
				}
				else {
					c.textAlign="start";
					c.fillText("Contrôles :",Cw*0.12,Ch*0.85)
					c.fillStyle="yellow";
					c.fillText("Espace/ Entrée",Cw*0.1,Ch*0.90)
					c.fillText("Touche directionnel",Cw*0.1,Ch*0.96)
					c.fillStyle="white";
					c.fillText("- Valider/ Suivant",Cw*0.5,Ch*0.90)
					c.fillText("- Se déplacer",Cw*0.5,Ch*0.96)
					movemenu()
					showcursor()
				}
				if (key.space) {
					game.option.animation="alt";
					switch(game.menu.target){
					case 1:
						majSave()
						saveUpdate()
						optionsUpdate()
						localStorage.setItem("version",version)
						game.screen="title";
						setmenu(2,"ud",0.3,0.47,0,0.09)
						break;
					case 2:
						game.nosave=true;
						majSave()
						game.screen="title";
						setmenu(2,"ud",0.3,0.47,0,0.09)
						break;
					}
				}
				break;
			}
			break;
		case "title" :
			showbackground()
			switch (game.mainevent) {
				case "mainmenu" : 
					c.fillStyle="white";
					c.globalAlpha=1;
					c.textAlign="center";
					textfillplace(Cw*0.5,Ch*0.24,"SPEMATHS",64,true,"white",5)
					if (game.inputType=="keyboard") {
						c.font = '28px monospace';
						c.fillText("Commencer",Cw*0.5,Ch*0.52)
						c.fillStyle="grey";
						c.font = '20px monospace';
						c.fillText("Réinitialiser sauv.",Cw*0.5,Ch*0.6)
						if (game.nosave) {
							c.fillStyle="red";
							c.fillText("Sauvegarde désactivé !",Cw*0.5,Ch*0.05)
						}
						c.fillStyle="white";
						c.font = '22px monospace';
						c.fillText("Contrôles :",Cw*0.2,Ch*0.66)
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
						movemenu()
						showcursor()
					}else {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.3,Ch*0.78,Cw*0.4,Ch*0.12)
						c.globalAlpha=1;
						c.font = '30px monospace';
						c.fillText("Cliquez pour jouer",Cw*0.5,Ch*0.60)
						c.fillStyle="grey";
						c.font = '22px monospace';
						c.fillText("Réinitialiser sauv.",Cw*0.5,Ch*0.85)
					}
					if (key.space) {
						if(game.menu.target==1){
							setmenu(5,"lr",0,0,0,0);
							game.screen="hub";
						}
						if(game.menu.target==2){
							game.mainevent="reset";
							setmenu(2,"lr",0.17,0.71,0.31,0);
						}
					}
					break;
				case "reset" : 
					c.globalAlpha=1;
					c.fillStyle="white";
					c.textAlign="center";
					c.font = '26px monospace';
					c.fillText("Réinitialiser la sauvegarde ?!",Cw*0.5,Ch*0.5)
					c.font = '20px monospace';
					c.fillText("Attention : Ce choix n'est pas réverssible !",Cw*0.5,Ch*0.6)
					c.font = '22px monospace';
					c.fillText("Conserver",Cw*0.33,Ch*0.75)
					c.fillText("Réinitialiser",Cw*0.66,Ch*0.75)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.18,Ch*0.68,Cw*0.3,Ch*0.11)
						c.fillRect(Cw*0.51,Ch*0.68,Cw*0.3,Ch*0.11)
					}
					else {
						movemenu()
						showcursor()
					}
					if (key.space) {
						switch(game.menu.target){
						case 1:
							majSave()
							game.mainevent="mainmenu";
							setmenu(2,"ud",0.3,0.47,0,0.09)
							break;
						case 2:
							resetSave();
							game.mainevent="mainmenu";
							setmenu(2,"ud",0.3,0.47,0,0.09)
							break;
						}
					}
					else if (key.d) {
						game.mainevent="mainmenu";
						setmenu(2,"ud",0.3,0.47,0,0.09)
					}
					break;
				default : 
					errormsg("mainevent error !")
					break;
			}
			break;
		case "hub":
			showbackground()
			c.globalAlpha=0.5;
			if (game.nosave) {
				c.textAlign="center";
				c.font = '20px monospace';
				c.fillStyle="red";
				c.fillText("Sauvegarde désactivé !",Cw*0.5,Ch*0.05)
			}
			c.fillStyle="white";
			if (game.inputType=="phone") {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.08,Ch*0.39,Cw*0.14,Ch*0.2)
				c.fillRect(Cw*0.24,Ch*0.42,Cw*0.52,Ch*0.17)
				c.fillRect(Cw*0.78,Ch*0.39,Cw*0.14,Ch*0.2)
			}
			c.globalAlpha=1;
			c.textAlign="center";
			c.font = '100px monospace';
			showicons(Cw*0.5,Ch*0.25,150,"menu",game.menu.target-1)
			c.fillText("<",Cw*0.15,Ch*0.55)
			c.fillText(">",Cw*0.85,Ch*0.55)
			game.inputType=="phone" ? c.font = '32px monospace': c.font = '36px monospace';
			switch (game.menu.target){
			case 1:
				textfillplace(Cw*0.5,Ch*0.48,"NIVEAUX",36,true,"black",4)
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
				textfillplace(Cw*0.5,Ch*0.48,"ARCADE",36,true,"black",4)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Mettez à l'épreuve votre puissance de",Cw*0.05,Ch*0.65)
				c.fillText("calcul mental dans ce défi très difficile et",Cw*0.05,Ch*0.70)
				c.fillText("atteignez des records en cumulant un maximum",Cw*0.05,Ch*0.75)
				c.fillText("de points.",Cw*0.05,Ch*0.80)
				break;
			case 3:
				textfillplace(Cw*0.5,Ch*0.48,"SURVI TEMPS",36,true,"black",4)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Survivez le plus longtemps possible en",Cw*0.05,Ch*0.65)
				c.fillText("réalisant le plus d'opérations possibles !",Cw*0.05,Ch*0.70)
				c.fillText("Cumulez du temps supplémentaire et des points",Cw*0.05,Ch*0.77)
				c.fillText("pour chaque bonne réponse.",Cw*0.05,Ch*0.82)
				c.fillText("Idéal pour faire une partie personnalisée.",Cw*0.05,Ch*0.89)
				break;
			case 4:
				textfillplace(Cw*0.5,Ch*0.48,"SURVI VIES",36,true,"black",4)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Gardez vos points de vies le plus élevé possible,",Cw*0.05,Ch*0.65)
				c.fillText("une erreur peut vous être fatale.",Cw*0.05,Ch*0.70)
				c.fillText("Cumulez des points pour chaque bonne réponse et",Cw*0.05,Ch*0.77)
				c.fillText("atteignez des sommets avec le cumul des résultats.",Cw*0.05,Ch*0.82)
				c.fillText("Un bon entrainement pour garder le fil.",Cw*0.05,Ch*0.89)
				break;
			/*case 5:
				c.fillText("Record",Cw*0.5,Ch*0.55)
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.textAlign="start";
				c.fillStyle="white";
				c.fillText("Consultez vos records sur les différents modes",Cw*0.05,Ch*0.65)
				c.fillText("du jeu.",Cw*0.05,Ch*0.70)
				break;*/
			case 5:
				textfillplace(Cw*0.5,Ch*0.48,"OPTIONS",36,true,"black",4)
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
				anim.lvltransition.time-=msPassed;
				if (anim.lvltransition.time<=0) {
					anim.lvltransition.time=0;
					game.event=""
				}
				c.fillStyle="black";
				c.globalAlpha=anim.lvltransition.time/1600;
				c.fillRect(0,0,Cw,Ch)
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
						setmenu(4,"lr",0,0,0,0);
						game.screen="modeArcade";
						game.mainevent="first";
						game.event="";
						break;
					case 3:
						setmenu(4,"lr",0.065,0.43,0.23,0);
						game.screen="mode1";
						game.mainevent="first";
						game.event="";
						break;
					case 4:
						setmenu(3,"lr",0.165,0.43,0.23,0);
						game.screen="mode2";
						game.mainevent="first";
						game.event="";
						if (game.battle.mult) {game.battle.mult=false;game.battle.symbnum--}
						break;				
					case 5:
						setmenu(5,"ud",0.045,0.26,0,0.1,6);
						game.screen="options";
						game.mainevent="menu";
						game.event="back";
						game.sideevent="page1";
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
			textfillplace(Cw*0.5,Ch*0.12,"OPTIONS",30,true,"black",5)
			game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
			c.textAlign="start";
			if (game.sideevent=="page1") {
				c.fillText("Opacité Aide",Cw*0.1,Ch*0.3)
				c.fillText("Opacité fond",Cw*0.1,Ch*0.4)
				c.fillText("Sens d'écriture",Cw*0.1,Ch*0.5)
				c.fillText("Animations",Cw*0.1,Ch*0.6)
				c.fillText("Retour",Cw*0.1,Ch*0.7)
				c.fillRect(Cw*0.628,Ch*0.264,Cw*0.244*(game.option.inputOpacity/100),Ch*0.04)
				c.drawImage(ui_progressbar,Cw*0.62,Ch*0.261,Cw*0.26,Ch*0.05)
				c.fillRect(Cw*0.628,Ch*0.364,Cw*0.244*(game.option.bckgrndOpacity/100),Ch*0.04)
				c.drawImage(ui_progressbar,Cw*0.62,Ch*0.361,Cw*0.26,Ch*0.05)
				numfillplace(Cw*0.5,Ch*0.26,game.option.inputOpacity,24,"center",0,"black")
				numfillplace(Cw*0.5,Ch*0.36,game.option.bckgrndOpacity,24,"center",0,"black")
				c.textAlign="center";
				c.fillText("<  Page 1  >",Cw*0.5,Ch*0.8)
				switch (game.option.inputDirection){
				case false:
					c.fillText(">12345>",Cw*0.75,Ch*0.5)
					break;
				case true:
					c.fillText("<54321<",Cw*0.75,Ch*0.5)
					break;
				}
				switch (game.option.animation){
				case "alt":
					c.fillText("Alterné",Cw*0.75,Ch*0.6)
					break;
				case "fix":
					c.fillText("Fixe",Cw*0.75,Ch*0.6)
					break;
				}
			}
			else {
				c.fillText("Font personnalisé",Cw*0.1,Ch*0.3)
				c.fillText("Afficher FPS",Cw*0.1,Ch*0.4)
				c.fillText("Retour",Cw*0.1,Ch*0.5)
				c.textAlign="center";
				c.fillText("<  Page 2  >",Cw*0.5,Ch*0.8)
				switch (game.option.showfps){
				case false:
					c.fillText("Non",Cw*0.75,Ch*0.4)
					break;
				case true:
					c.fillText("Oui",Cw*0.75,Ch*0.4)
					break;
				}

				switch(game.option.font){
				case "none":
					c.fillText("Non",Cw*0.75,Ch*0.3)
					break;
				case "num":
					c.fillText("chiffre seul",Cw*0.75,Ch*0.3)
					break;
				case "txt":
					c.fillText("texte seul",Cw*0.75,Ch*0.3)
					break;
				case "all":
					c.fillText("Tout",Cw*0.75,Ch*0.3)
					break;
				}
			}
			
			if (game.inputType=="keyboard") {
				movemenu()
			}
			
			game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
			switch (game.event) {
			case "opa.input":
				numfillplace(Cw*0.5,Ch*0.26,game.option.inputOpacity,24,"center",0,"white")
				if (game.inputType=="phone") {c.fillStyle="red";c.fillText("Ne s'affiche pas en mode téléphone !",Cw*0.5,Ch*0.225);c.fillStyle="white";}
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Opacité de l'aide montré en jeu pour ",Cw*0.1,Ch*0.9)
				c.fillText("rappeler les contrôles.",Cw*0.1,Ch*0.95)
				break;
			case "opa.bckgrnd":
				numfillplace(Cw*0.5,Ch*0.36,game.option.bckgrndOpacity,24,"center",0,"white")
				c.textAlign="start";
				game.inputType=="phone" ? c.font = '20px monospace': c.font = '22px monospace';
				c.fillText("Opacité des décors animées en fond.",Cw*0.1,Ch*0.9)
				c.fillText("",Cw*0.1,Ch*0.95)
				break;
			case "inputdirect":
				c.textAlign="start";
				c.fillText("Sens d'écriture des entrées du joueur.",Cw*0.1,Ch*0.9)
				c.fillText("",Cw*0.1,Ch*0.95)
				break;
			case "animchrono":
				c.textAlign="start";
				c.fillText("Mode d'affichage des animations du jeu.",Cw*0.1,Ch*0.9)
				c.fillText("",Cw*0.1,Ch*0.95)
				break;
			case "customtext":
				c.fillStyle="white";
				c.textAlign="start";
				c.fillText("Choix d'affichage de la police d'écriture",Cw*0.1,Ch*0.9)
				c.fillText("créé pour le jeu.",Cw*0.1,Ch*0.95)
				break;
			case "fps":
				c.fillStyle="white";
				c.textAlign="start";
				c.fillText("Affichage du nombre d'image par secondes.",Cw*0.1,Ch*0.9)
				break;
			case "back":
				c.fillStyle="white";
				c.textAlign="start";
				
				c.fillText("Retour au menu principal.",Cw*0.1,Ch*0.9)
				break;
			}
			switch (game.mainevent){
			case "menu":
				
				switch (game.sideevent){
				case "page1":
					switch (game.menu.target) {
					case 1:
						game.event="opa.input";
						break;
					case 2:
						game.event="opa.bckgrnd";
						break;
					case 3:
						game.event="inputdirect";
						break;
					case 4:
						game.event="animchrono";
						break;
					case 5:
						game.event="back";
						break;
					}
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.24,Cw*0.48,Ch*0.08)
						c.fillRect(Cw*0.07,Ch*0.34,Cw*0.48,Ch*0.08)
						c.fillRect(Cw*0.07,Ch*0.44,Cw*0.48,Ch*0.08)
						c.fillRect(Cw*0.07,Ch*0.54,Cw*0.48,Ch*0.08)
						c.fillRect(Cw*0.07,Ch*0.64,Cw*0.2,Ch*0.08)
						c.fillRect(Cw*0.38,Ch*0.74,Cw*0.24,Ch*0.08)
					} else {
						showcursor()
					}
					break;
				case "page2":
					switch (game.menu.target) {
					case 1:
						game.event="customtext";
						break;
					case 2:
						game.event="fps";
						break;
					case 3:
						game.event="back";
						break;
					}
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.24,Cw*0.48,Ch*0.08)
						c.fillRect(Cw*0.07,Ch*0.34,Cw*0.48,Ch*0.08)
						c.fillRect(Cw*0.07,Ch*0.44,Cw*0.2,Ch*0.08)
						c.fillRect(Cw*0.38,Ch*0.74,Cw*0.24,Ch*0.08)
					} else {
						showcursor()
					}
					break;
				}
				if (key.left||key.right) {
					if(game.sideevent=="page1"){
						game.sideevent="page2"
						setmenu(3,"ud",0.045,0.26,0,0.1,3);
					}
					else {
						game.sideevent="page1";
						setmenu(5,"ud",0.045,0.26,0,0.1,5);
					}
					key.left=false;
					key.right=false;
				}
				if (key.space) {
					switch (game.sideevent){
					case "page1":
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
							switch(game.option.inputDirection){
							case false:
								setmenu(2,"lr",0,0,0,0,1);
								break;
							case true:
								setmenu(2,"lr",0,0,0,0,2);
								break;
							}
							game.mainevent="select";
							break;
						case 4:
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
						case 5:
							setmenu(5,"lr",0,0,0,0,5);
							game.screen="hub";
							game.mainevent="";
							game.event="";
							optionsUpdate()
							break;
						}
						break;
					case "page2":
						switch (game.menu.target){
							case 1:
							switch(game.option.font){
							case "none":
								setmenu(4,"lr",0,0,0,0,1);
								break;
							case "num":
								setmenu(4,"lr",0,0,0,0,2);
								break;
							case "txt":
								setmenu(4,"lr",0,0,0,0,3);
								break;
							case "all":
								setmenu(4,"lr",0,0,0,0,4);
								break;
							}
							game.mainevent="select";
							break;
						case 2:
							switch(game.option.showfps){
							case true:
								setmenu(2,"lr",0,0,0,0,2);
								break;
							case false:
								setmenu(2,"lr",0,0,0,0,1);
								break;
							}
							game.mainevent="select";
							break;
						case 3:
							setmenu(5,"lr",0,0,0,0,5);
							game.screen="hub";
							game.mainevent="";
							game.event="";
							optionsUpdate()
							break;
						}
						break;
					}
					
				}
				if (key.d) {
					setmenu(5,"lr",0,0,0,0,5);
					game.screen="hub";
					game.mainevent="";
					game.event="";
					game.sideevent="";
					optionsUpdate()
				}
				break;
			case "select":
				c.fillStyle="white";
				c.globalAlpha=1;
				c.textAlign="center";
				game.inputType=="keyboard" ?c.font = '30px monospace': c.font = '42px monospace';
				switch (game.event) {
				case "opa.input":
					c.fillText("<",Cw*0.59,Ch*0.305)
					c.fillText(">",Cw*0.91,Ch*0.305)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.24,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.24,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.24,Cw*0.075,Ch*0.1)
					}
					game.option.inputOpacity=(game.menu.target-1)*10;
					if (key.d||key.space) {
						setmenu(5,"ud",0.045,0.26,0,0.1,1);
						game.mainevent="menu";
					}
					break;
				case "opa.bckgrnd":
					c.fillText("<",Cw*0.59,Ch*0.405)
					c.fillText(">",Cw*0.91,Ch*0.405)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.34,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.34,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.34,Cw*0.075,Ch*0.1)
					}
					game.option.bckgrndOpacity=(game.menu.target-1)*10;
					if (key.d||key.space) {
						setmenu(5,"ud",0.045,0.26,0,0.1,2);
						game.mainevent="menu";
					}
					break;
				case "inputdirect":
					c.fillText("<",Cw*0.59,Ch*0.505)
					c.fillText(">",Cw*0.91,Ch*0.505)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.44,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.44,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.44,Cw*0.075,Ch*0.1)
					}
					switch (game.menu.target) {
					case 1:
						game.option.inputDirection=false;
						break;
					case 2:
						game.option.inputDirection=true;
						
						break;
					}
					if (key.d||key.space) {
						setmenu(5,"ud",0.045,0.26,0,0.1,3);
						game.mainevent="menu";
					}
					break;
				case "animchrono":
					c.fillText("<",Cw*0.59,Ch*0.605)
					c.fillText(">",Cw*0.91,Ch*0.605)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.54,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.54,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.54,Cw*0.075,Ch*0.1)
					}
					switch (game.menu.target) {
					case 1:
						game.option.animation="fix";
						setAnimationOptions(game.option.animation)
						break;
					case 2:
						game.option.animation="alt";
						setAnimationOptions(game.option.animation)
						break;
					}
					if (key.d||key.space) {
						setmenu(5,"ud",0.045,0.26,0,0.1,4);
						game.mainevent="menu";
					}
					break;
				case "customtext":
					c.fillText("<",Cw*0.59,Ch*0.305)
					c.fillText(">",Cw*0.91,Ch*0.305)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.24,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.24,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.24,Cw*0.075,Ch*0.1)
					}
					switch (game.menu.target) {
					case 1:
						game.option.font="none";
						break;
					case 2:
						game.option.font="num";
						break;
					case 3:
						game.option.font="txt";
						break;
					case 4:
						game.option.font="all";
						break;
					}
					if (key.d||key.space) {
						setmenu(3,"ud",0.045,0.26,0,0.1,1);
						game.mainevent="menu";
					}
					break;
				case "fps":
					c.fillText("<",Cw*0.59,Ch*0.405)
					c.fillText(">",Cw*0.91,Ch*0.405)
					if (game.inputType=="phone") {
						c.globalAlpha=0.15;
						c.fillRect(Cw*0.07,Ch*0.34,Cw*0.47,Ch*0.1)
						c.fillRect(Cw*0.55,Ch*0.34,Cw*0.075,Ch*0.1)
						c.fillRect(Cw*0.875,Ch*0.34,Cw*0.075,Ch*0.1)
					}
					switch (game.menu.target) {
					case 1:
						game.option.showfps=false;
						break;
					case 2:
						game.option.showfps=true;
						break;
					}
					if (key.d||key.space) {
						setmenu(3,"ud",0.045,0.26,0,0.1,2);
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
		case "scoreboard":

			break;
		case "modeArcade":
			showbackground()
			c.fillStyle="white";
			c.globalAlpha=1;
			textfillplace(Cw*0.5,Ch*0.12,"MODE ARCADE",30,true,"black",5)
			if (game.inputType=="keyboard") {
				movemenu()
			} else {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.005,Ch*0.007,Cw*0.4,Ch*0.08)
				c.globalAlpha=1;
				c.textAlign="start";
				textfillplace(Cw*0.02,Ch*0.02,"MENU PRINCIPAL",24,false,"black",6)
			}
			switch (game.mainevent){
			case "first":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '27px monospace':c.font = '30px monospace';
				c.fillText("Difficulté :",Cw*0.15,Ch*0.45)
				c.textAlign="center";
				c.font = '80px monospace';
				c.fillText("<",Cw*0.25,Ch*0.62)
				c.fillText(">",Cw*0.75,Ch*0.62)
				game.inputType=="phone"? c.font = '26px monospace':c.font = '28px monospace';
				if (game.inputType=="phone") textfillplace(Cw*0.5,Ch*0.67,"SUIVANT",32,true,"white",6);
				switch (game.menu.target) {
				case 1:
					textfillplace(Cw*0.5,Ch*0.54,"TRES FACILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=2;
					game.battle.mode="very-easy";
					break;
				case 2:
					textfillplace(Cw*0.5,Ch*0.54,"FACILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=1.5;
					game.battle.mode="easy";
					break;
				case 3:
					textfillplace(Cw*0.5,Ch*0.54,"NORMAL",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=1;
					game.battle.mode="normal";
					break;
				case 4:
					textfillplace(Cw*0.5,Ch*0.54,"DIFFICILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=0.7;
					game.battle.mode="hard";
					break;
				}
				
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.195,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.695,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.352,Ch*0.645,Cw*0.3,Ch*0.12)
				}
				if (key.d) {
					setmenu(5,"lr",0,0,0,0,2);
					game.screen="hub";
					game.mainevent="";
				}
				if (key.space) {
					setmenu(2,"lr",0.05,0.605,0.31,0,2);
					game.mainevent="second";
					game.event="ready";
				}
				c.globalAlpha=1;
				c.textAlign="start";
				c.font = '22px monospace';
				switch (game.battle.mode){
				case "very-easy":
					c.fillText("Temps maximum : 16 secondes",Cw*0.25,Ch*0.83)
					break;
				case "easy":
					c.fillText("Temps maximum : 14 secondes",Cw*0.25,Ch*0.83)
					break;
				case "normal":
					c.fillText("Temps maximum : 12 secondes",Cw*0.25,Ch*0.83)
					break;
				case "hard":
					c.fillText("Temps maximum : 12 secondes",Cw*0.25,Ch*0.83)
					break;
				}
				break;
			case "second":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '24px monospace':c.font = '26px monospace';
				c.fillText("Difficulté :",Cw*0.03,Ch*0.37)
				switch (game.setbtl.dif) {
				case 2:
					textfillplace(Cw*0.3,Ch*0.33,"TRES FACILE",24,false,"black",6)
					break;
				case 1.5:
					textfillplace(Cw*0.3,Ch*0.33,"FACILE",24,false,"black",6)
					break;
				case 1:
					textfillplace(Cw*0.3,Ch*0.33,"NORMAL",24,false,"black",6)
					break;
				case 0.7:
					textfillplace(Cw*0.3,Ch*0.33,"DIFFICILE",24,false,"black",6)
					break;
				}
				showicons(Cw*0.65,Ch*0.25,50,"lt",3)
				showicons(Cw*0.65,Ch*0.345,50,"lt",4)
				c.fillText("5 vies",Cw*0.72,Ch*0.27)
				switch (game.battle.mode){
				case "very-easy":
					c.fillText("16 sec.",Cw*0.72,Ch*0.37)
					break;
				case "easy":
					c.fillText("14 sec.",Cw*0.72,Ch*0.37)
					break;
				case "normal":
					c.fillText("12 sec.",Cw*0.72,Ch*0.37)
					break;
				case "hard":
					c.fillText("12 sec.",Cw*0.72,Ch*0.37)
					break;
				}
				
				c.textAlign="center";
				c.fillText("Jouer avec ces paramètres ?",Cw*0.5,Ch*0.5)
				textfillplace(Cw*0.5,Ch*0.59,"JOUER",36,true,"white",6)
				textfillplace(Cw*0.18,Ch*0.6,"RETOUR",26,true,"white",6)
				break;
			default:
				errormsg("Mainevent error")
				break;
			}
			c.globalAlpha=1;
			c.textAlign="start";
			c.font = '22px monospace';
			
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
					setmenu(4,"lr",0,0,0,0);
					game.mainevent="first";
					game.event="";
				}
				if (key.space) {
					switch (game.menu.target){
					case 1:
						setmenu(4,"lr",0,0,0,0);
						game.mainevent="first";
						game.event="";
						break;
					case 2:
						game.event="transition";
						game.timer=130;
						break;
					}
				}
				break;
			case "transition":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7;
				c.fillRect(Cw*0.5-Cw*(0.5*((133-game.timer)/133)),Ch*0.43,Cw*((133-game.timer)/133),5)
				if (game.timer<=0) {
					game.event="transition2";
					game.timer=400;
					anim.entity.phase=-1;
				}
				drawEntity()
				break;
			case "transition2":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7+0.3*((400-game.timer)/400);
				c.fillRect(0,Ch*0.43-Ch*(0.57*(400-game.timer)/400),Cw,5+Ch*1.17*((400-game.timer)/400))
				if (game.timer<=0) {
					game.event="transition3";
					game.timer=500;
					anim.entity.phase=0;
				}
				drawEntity()
				break;
			case "transition3":
				c.globalAlpha=1;;
				c.fillStyle="rgb(240,240,240)";
				c.fillRect(0,0,Cw,Ch)
				if (game.timer<=0) {
					game.screen="arcade";
					game.battle.gamemode="arcade";
					game.mainevent="starting";
					game.event="set";
					game.timer=1000;
					anim.background.type=Math.floor(Math.random()*4);
					anim.lvltransition.time=1600;
					if (anim.background.stock.length>0) anim.background.stock.splice(0,anim.background.stock.length);
				}
				break;
			default:
				errormsg("Event error !")
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
			textfillplace(Cw*0.5,Ch*0.12,"MODE TEMPS",30,true,"black",5)
			if (game.inputType=="keyboard") {
				movemenu()
			} else {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.005,Ch*0.007,Cw*0.4,Ch*0.08)
				c.globalAlpha=1;
				textfillplace(Cw*0.02,Ch*0.02,"MENU PRINCIPAL",24,false,"black",6)
			}
			switch (game.mainevent){
			case "first":
				game.battle.add ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_plus,Cw*0.12,Ch*0.28,100,100)
				game.battle.sub ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_moins,Cw*0.42,Ch*0.28,100,100)
				game.battle.mult ? c.globalAlpha=1: c.globalAlpha=0.4;
				c.drawImage(btl_mult,Cw*0.72,Ch*0.28,100,100)
				c.globalAlpha=1;
				game.battle.add ? textfillplace(Cw*0.2,Ch*0.56,"ACTIF",26,true,"white",6):textfillplace(Cw*0.2,Ch*0.56,"DESACT",26,true,"black",6);
				game.battle.sub ? textfillplace(Cw*0.5,Ch*0.56,"ACTIF",26,true,"white",6):textfillplace(Cw*0.5,Ch*0.56,"DESACT",26,true,"black",6);
				game.battle.mult ? textfillplace(Cw*0.8,Ch*0.56,"ACTIF",26,true,"white",6):textfillplace(Cw*0.8,Ch*0.56,"DESACT",26,true,"black",6);
				textfillplace(Cw*0.5,Ch*0.67,"SUIVANT",32,true,"white",6);
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.1,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.4,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.7,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.35,Ch*0.645,Cw*0.305,Ch*0.12)
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
						c.drawImage(inputframe,Cw*0.35,Ch*0.655,Cw*0.3,Ch*0.1)
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
					setmenu(5,"lr",0,0,0,0,3);
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
				game.battle.add ? showicons(Cw*0.2384,Ch*0.2555,50,"lt",0,1): showicons(Cw*0.2384,Ch*0.2555,50,"lt",0);
				game.battle.sub ? showicons(Cw*0.3384,Ch*0.2555,50,"lt",1,1): showicons(Cw*0.3384,Ch*0.2555,50,"lt",1);
				game.battle.mult ? showicons(Cw*0.4384,Ch*0.2555,50,"lt",2,1): showicons(Cw*0.4384,Ch*0.2555,50,"lt",2);
				if(game.inputType=="phone") {textfillplace(Cw*0.5,Ch*0.68,"SUIVANT",32,true,"white",6);textfillplace(Cw*0.18,Ch*0.7,"RETOUR",26,true,"white",6)}
				c.fillText("Format :",Cw*0.15,Ch*0.45)
				c.textAlign="center";
				c.font = '80px monospace';
				c.fillText("<",Cw*0.26,Ch*0.62)
				c.fillText(">",Cw*0.74,Ch*0.62)
				switch (game.menu.target) {
				case 1:
					numfillplace(Cw*0.5,Ch*0.54,"1 + 1",30,"center",6,(game.inputType=="phone"?"black":"white"))
					game.setbtl.chif=0.66;
					game.battle.numopp=1;
					break;
				case 2:
					numfillplace(Cw*0.5,Ch*0.54,"12 + 12",30,"center",6,(game.inputType=="phone"?"black":"white"))
					game.setbtl.chif=1;
					game.battle.numopp=2;
					break;
				case 3:
					numfillplace(Cw*0.5,Ch*0.54,"123 + 123",30,"center",6,(game.inputType=="phone"?"black":"white"))
					game.setbtl.chif=1.5;
					game.battle.numopp=3;
					break;
				case 4:
					numfillplace(Cw*0.5,Ch*0.54,"1234 + 1234",30,"center",6,(game.inputType=="phone"?"black":"white"))
					game.setbtl.chif=1.9;
					game.battle.numopp=4;
					break;
				}
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.07,Ch*0.675,Cw*0.23,Ch*0.1)
					c.fillRect(Cw*0.205,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.685,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.35,Ch*0.655,Cw*0.305,Ch*0.12)
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
				game.battle.add ? showicons(Cw*0.2384,Ch*0.2555,50,"lt",0,1): showicons(Cw*0.2384,Ch*0.2555,50,"lt",0);
				game.battle.sub ? showicons(Cw*0.3384,Ch*0.2555,50,"lt",1,1): showicons(Cw*0.3384,Ch*0.2555,50,"lt",1);
				game.battle.mult ? showicons(Cw*0.4384,Ch*0.2555,50,"lt",2,1): showicons(Cw*0.4384,Ch*0.2555,50,"lt",2);
				c.fillText("Format :",Cw*0.6,Ch*0.27)
				switch (game.battle.numopp) {
				case 1:
					c.fillText(">1<",Cw*0.8,Ch*0.27)
					break;
				case 2:
					c.fillText(">2<",Cw*0.8,Ch*0.27)
					break;
				case 3:
					c.fillText(">3<",Cw*0.8,Ch*0.27)
					break;
				case 4:
					c.fillText(">4<",Cw*0.8,Ch*0.27)
					break;
				}
				game.inputType=="phone"? c.font = '27px monospace':c.font = '30px monospace';
				if(game.inputType=="phone") {textfillplace(Cw*0.5,Ch*0.68,"SUIVANT",32,true,"white",6);textfillplace(Cw*0.18,Ch*0.7,"RETOUR",26,true,"white",6)}
				c.fillText("Difficulté :",Cw*0.15,Ch*0.45)
				c.textAlign="center";
				c.font = '80px monospace';
				c.fillText("<",Cw*0.26,Ch*0.62)
				c.fillText(">",Cw*0.74,Ch*0.62)
				switch (game.menu.target) {
				case 1:
					textfillplace(Cw*0.5,Ch*0.54,"TRES FACILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=2;
					game.battle.mode="very-easy";
					break;
				case 2:
					textfillplace(Cw*0.5,Ch*0.54,"FACILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=1.5;
					game.battle.mode="easy";
					break;
				case 3:
					textfillplace(Cw*0.5,Ch*0.54,"NORMAL",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=1;
					game.battle.mode="normal";
					break;
				case 4:
					textfillplace(Cw*0.5,Ch*0.54,"DIFFICILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=0.7;
					game.battle.mode="hard";
					break;
				}
				
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.07,Ch*0.675,Cw*0.23,Ch*0.1)
					c.fillRect(Cw*0.205,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.685,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.35,Ch*0.655,Cw*0.305,Ch*0.12)
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
				game.battle.add ? showicons(Cw*0.2384,Ch*0.2555,50,"lt",0,1): showicons(Cw*0.2384,Ch*0.2555,50,"lt",0);
				game.battle.sub ? showicons(Cw*0.3384,Ch*0.2555,50,"lt",1,1): showicons(Cw*0.3384,Ch*0.2555,50,"lt",1);
				game.battle.mult ? showicons(Cw*0.4384,Ch*0.2555,50,"lt",2,1): showicons(Cw*0.4384,Ch*0.2555,50,"lt",2);
				c.fillText("Format :",Cw*0.6,Ch*0.27)
				switch (game.battle.numopp) {
				case 1:
					c.fillText(">1<",Cw*0.8,Ch*0.27)
					break;
				case 2:
					c.fillText(">2<",Cw*0.8,Ch*0.27)
					break;
				case 3:
					c.fillText(">3<",Cw*0.8,Ch*0.27)
					break;
				case 4:
					c.fillText(">4<",Cw*0.8,Ch*0.27)
					break;
				}
				c.fillText("Difficulté :",Cw*0.03,Ch*0.38)
				switch (game.setbtl.dif) {
				case 2:
					textfillplace(Cw*0.3,Ch*0.33,"TRES FACILE",24,false,"black",6)
					break;
				case 1.5:
					textfillplace(Cw*0.3,Ch*0.33,"FACILE",24,false,"black",6)
					break;
				case 1:
					textfillplace(Cw*0.3,Ch*0.33,"NORMAL",24,false,"black",6)
					break;
				case 0.7:
					textfillplace(Cw*0.3,Ch*0.33,"DIFFICILE",24,false,"black",6)
					break;
				}
				showicons(Cw*0.65,Ch*0.345,50,"lt",4)
				c.fillText((Math.floor(20*game.setbtl.mode*game.setbtl.chif*game.setbtl.dif))+" sec. MAX",Cw*0.72,Ch*0.37)
				c.textAlign="center";
				c.fillText("Jouer avec ces paramètres ?",Cw*0.5,Ch*0.5)
				textfillplace(Cw*0.5,Ch*0.59,"JOUER",36,true,"white",6)
				textfillplace(Cw*0.18,Ch*0.6,"RETOUR",26,true,"white",6)
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
			switch (game.mainevent){
			case "first":
			case "second":
			case "third":
				c.fillText("Temps maximum : "+(Math.floor(20*mult*multn*multd))+" secondes",Cw*0.25,Ch*0.83)
				break;
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
						game.timer=130;
						break;
					}
				}
				break;
			case "transition":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7;
				c.fillRect(Cw*0.5-Cw*(0.5*((133-game.timer)/133)),Ch*0.43,Cw*((133-game.timer)/133),5)
				if (game.timer<=0) {
					game.event="transition2";
					game.timer=400;
					anim.entity.phase=-1;
				}
				drawEntity()
				break;
			case "transition2":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7+0.3*((400-game.timer)/400);
				c.fillRect(0,Ch*0.43-Ch*(0.57*(400-game.timer)/400),Cw,5+Ch*1.17*((400-game.timer)/400))
				if (game.timer<=0) {
					game.event="transition3";
					game.timer=500;
					anim.entity.phase=0;
				}
				drawEntity()
				break;
			case "transition3":
				c.globalAlpha=1;;
				c.fillStyle="rgb(240,240,240)";
				c.fillRect(0,0,Cw,Ch)
				if (game.timer<=0) {
					mult=game.setbtl.mode;
					multn=game.setbtl.chif;
					multd=game.setbtl.dif;
					game.screen="survival";
					game.mainevent="starting";
					game.event="fadeout";
					game.battle.gamemode="survival-timer";
					game.stats.maxtimer=(Math.floor(20*mult*multn*multd))*1000;
					game.timer=1000;
					anim.background.type=Math.floor(Math.random()*4);
					anim.lvltransition.time=1666;
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
			textfillplace(Cw*0.5,Ch*0.12,"MODE VIES",30,true,"black",5)
			c.font = '22px monospace';
			c.textAlign="start";
			if (game.inputType=="keyboard") {
				movemenu()
			} else {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.005,Ch*0.007,Cw*0.4,Ch*0.08)
				c.globalAlpha=1;
				textfillplace(Cw*0.02,Ch*0.02,"MENU PRINCIPAL",24,false,"black",6)
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
				game.battle.add ? textfillplace(Cw*0.35,Ch*0.56,"ACTIF",26,true,"white",6):textfillplace(Cw*0.35,Ch*0.56,"DESACT",26,true,"black",6);
				game.battle.sub ? textfillplace(Cw*0.65,Ch*0.56,"ACTIF",26,true,"white",6):textfillplace(Cw*0.65,Ch*0.56,"DESACT",26,true,"black",6);
				textfillplace(Cw*0.5,Ch*0.67,"SUIVANT",32,true,"white",6);
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.25,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.55,Ch*0.23,Cw*0.195,Ch*0.32)
					c.fillRect(Cw*0.35,Ch*0.645,Cw*0.305,Ch*0.12)
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
						c.drawImage(inputframe,Cw*0.35,Ch*0.655,Cw*0.3,Ch*0.1)
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
					game.menu.target=3;
				}
				if (key.up) {
					key.up=false;
					game.menu.target=2;
				}
				if (key.d) {
					setmenu(5,"lr",0,0,0,0,4);
					game.screen="hub";
					game.event=""
				}
				break;
			case "second":
				c.textAlign="start";
				game.inputType=="phone"? c.font = '24px monospace':c.font = '26px monospace';
				c.fillText("Types :",Cw*0.03,Ch*0.27)
				game.battle.add ? showicons(Cw*0.2384,Ch*0.2555,50,"lt",0,1): showicons(Cw*0.2384,Ch*0.2555,50,"lt",0);
				game.battle.sub ? showicons(Cw*0.3384,Ch*0.2555,50,"lt",1,1): showicons(Cw*0.3384,Ch*0.2555,50,"lt",1);
				game.inputType=="phone"? c.font = '27px monospace':c.font = '30px monospace';
				c.fillText("Difficulté :",Cw*0.15,Ch*0.45)
				c.textAlign="center";
				c.font = '80px monospace';
				c.fillText("<",Cw*0.26,Ch*0.62)
				c.fillText(">",Cw*0.74,Ch*0.62)
				if(game.inputType=="phone") {textfillplace(Cw*0.5,Ch*0.68,"SUIVANT",32,true,"white",6);textfillplace(Cw*0.18,Ch*0.7,"RETOUR",26,true,"white",6)}
				switch (game.menu.target) {
				case 1:
					textfillplace(Cw*0.5,Ch*0.54,"TRES FACILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=2;
					game.battle.mode="very-easy";
					break;
				case 2:
					textfillplace(Cw*0.5,Ch*0.54,"FACILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=1.5;
					game.battle.mode="easy";
					break;
				case 3:
					textfillplace(Cw*0.5,Ch*0.54,"NORMAL",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=1;
					game.battle.mode="normal";
					break;
				case 4:
					textfillplace(Cw*0.5,Ch*0.54,"DIFFICILE",30,true,(game.inputType=="phone"?"black":"white"),6)
					game.setbtl.dif=0.7;
					game.battle.mode="hard";
					break;
				}
				c.textAlign="start";
				c.font = '22px monospace';
				if (game.battle.mode=="very-easy"||game.battle.mode=="easy") {
					c.fillText("Temps maximum : 10 secondes",Cw*0.25,Ch*0.83)
				} else if (game.battle.mode=="normal") {
					c.fillText("Temps maximum : 9 secondes",Cw*0.25,Ch*0.83)
				} else {
					c.fillText("Temps maximum : 8 secondes",Cw*0.25,Ch*0.83)
				}
				if (game.inputType=="phone") {
					c.globalAlpha=0.15;
					c.fillRect(Cw*0.07,Ch*0.675,Cw*0.23,Ch*0.1)
					c.fillRect(Cw*0.205,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.685,Ch*0.49,Cw*0.11,Ch*0.17)
					c.fillRect(Cw*0.35,Ch*0.655,Cw*0.305,Ch*0.12)
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
				game.battle.add ? showicons(Cw*0.2384,Ch*0.2555,50,"lt",0,1): showicons(Cw*0.2384,Ch*0.2555,50,"lt",0);
				game.battle.sub ? showicons(Cw*0.3384,Ch*0.2555,50,"lt",1,1): showicons(Cw*0.3384,Ch*0.2555,50,"lt",1);
				c.fillText("Difficulté :",Cw*0.03,Ch*0.37)
				switch (game.setbtl.dif) {
				case 2:
					textfillplace(Cw*0.3,Ch*0.33,"TRES FACILE",24,false,"black",6)
					break;
				case 1.5:
					textfillplace(Cw*0.3,Ch*0.33,"FACILE",24,false,"black",6)
					break;
				case 1:
					textfillplace(Cw*0.3,Ch*0.33,"NORMAL",24,false,"black",6)
					break;
				case 0.7:
					textfillplace(Cw*0.3,Ch*0.33,"DIFFICILE",24,false,"black",6)
					break;
				}
				showicons(Cw*0.65,Ch*0.25,50,"lt",3)
				showicons(Cw*0.65,Ch*0.345,50,"lt",4)
				c.fillText("100 PV",Cw*0.72,Ch*0.27)
				switch (game.battle.mode){
				case "very-easy":
					c.fillText("10 sec.",Cw*0.72,Ch*0.37)
					break;
				case "easy":
					c.fillText("10 sec.",Cw*0.72,Ch*0.37)
					break;
				case "normal":
					c.fillText("9 sec.",Cw*0.72,Ch*0.37)
					break;
				case "hard":
					c.fillText("8 sec.",Cw*0.72,Ch*0.37)
					break;
				}
				c.textAlign="center";
				c.fillText("Jouer avec ces paramètres ?",Cw*0.5,Ch*0.5)
				textfillplace(Cw*0.5,Ch*0.59,"JOUER",36,true,"white",6)
				textfillplace(Cw*0.18,Ch*0.6,"RETOUR",26,true,"white",6)
				break;
			default:
				errormsg("Mainevent error !")
				break;
			}
			c.globalAlpha=1;
			c.textAlign="start";
			c.font = '22px monospace';
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
						game.timer=133;
						break;
					}
				}
				break;
			case "transition":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7;
				c.fillRect(Cw*0.5-Cw*(0.5*((133-game.timer)/133)),Ch*0.43,Cw*((133-game.timer)/133),5)
				if (game.timer<=0) {
					game.event="transition2";
					game.timer=400;
					anim.entity.phase=-1;
				}
				drawEntity()
				break;
			case "transition2":
				c.fillStyle="rgb(240,240,240)";
				c.globalAlpha=0.7+0.3*((400-game.timer)/400);
				c.fillRect(0,Ch*0.43-Ch*(0.57*(400-game.timer)/400),Cw,5+Ch*1.17*((400-game.timer)/400))
				if (game.timer<=0) {
					game.event="transition3";
					game.timer=500;
					anim.entity.phase=0;
				}
				drawEntity()
				break;
			case "transition3":
				c.globalAlpha=1;;
				c.fillStyle="rgb(240,240,240)";
				c.fillRect(0,0,Cw,Ch)
				if (game.timer<=0) {
					game.screen="survival";
					game.battle.gamemode="survival-life";
					game.mainevent="starting";
					game.event="set";
					game.timer=1000;
					anim.background.type=Math.floor(Math.random()*4);
					anim.lvltransition.time=1600;
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
			anim.lvlselect.invert ? anim.lvlselect.time+=msPassed:anim.lvlselect.time-=msPassed;
			if ((anim.lvlselect.time<=0&&!anim.lvlselect.invert)||(anim.lvlselect.time>=1000&&anim.lvlselect.invert)) anim.lvlselect.invert=!anim.lvlselect.invert;
			if(anim.lvlselect.time<0)anim.lvlselect.time=0;
			if(anim.lvlselect.time>1000)anim.lvlselect.time=1000;
			c.fillStyle="white";
			if (game.inputType=="phone") {
				c.globalAlpha=0.15;
				c.fillRect(Cw*0.07,Ch*0.825,Cw*0.23,Ch*0.13)
				c.fillRect(Cw*0.34,Ch*0.825,Cw*0.32,Ch*0.13)
				//c.fillRect(Cw*0.7,Ch*0.81,Cw*0.23,Ch*0.13)
				if (game.menu.target>1) {
					c.fillRect(Cw*0.25,Ch*0.34,Cw*0.12,Ch*0.2)
				}
				if (game.menu.target<game.menu.options) {
					c.fillRect(Cw*0.63,Ch*0.34,Cw*0.12,Ch*0.2)
				}	
			}
			c.globalAlpha = 1;
			c.textAlign="center";
			//c.fillText("Détails",Cw*0.82,Ch*0.9)
			textfillplace(Cw*0.5,Ch*0.85,"JOUER",36,true,"white",6)
			textfillplace(Cw*0.18,Ch*0.86,"RETOUR",26,true,"white",6)
			textfillplace(Cw*0.02,Ch*0.6,"RECORD",28,false,(saves.levels[game.level.world][game.level.stage].perfect?"gold":"black"),5)
			c.globalAlpha = 0.3;
			numfillplace(Cw*0.3,Ch*0.67,"00000000",30,"end",8)
			c.globalAlpha = 1;
			numfillplace(Cw*0.3,Ch*0.67,saves.levels[game.level.world][game.level.stage].score,30,"end",8,(saves.levels[game.level.world][game.level.stage].perfect?"gold":"black"))
			switch (game.mainevent){
			case "map":
				c.shadowColor="white";
				c.shadowBlur=5+anim.lvlselect.time/50;
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
					showicons(Cw*0.75,Ch*0.645,40,"lt",5)
					c.fillText(ShowTimer(levels[game.level.world][game.level.stage].time*1000)+" s",Cw*0.8,Ch*0.66)
				}
				if (levels[game.level.world][game.level.stage].timer>0) {
					showicons(Cw*0.75,Ch*0.715,40,"lt",4)
					c.fillText(ShowTimer(levels[game.level.world][game.level.stage].timer*1000)+" s",Cw*0.8,Ch*0.73)
				}
				if (levels[game.level.world][game.level.stage].life>0) {
					showicons(Cw*0.75,Ch*0.785,40,"lt",3)
					c.fillText(levels[game.level.world][game.level.stage].life+" vies",Cw*0.8,Ch*0.8)
				}
				if (levels[game.level.world][game.level.stage].hp>0) {
					showicons(Cw*0.75,Ch*0.785,40,"lt",3)
					c.fillText(levels[game.level.world][game.level.stage].hp+" PV",Cw*0.8,Ch*0.8)
				}
				c.font = '40px monospace';
				c.drawImage(icon_operation,Cw*0.4-28,Ch*0.7,56,56)
				numfillplace(Cw*0.5,Ch*0.72,levels[game.level.world][game.level.stage].count,40,"center",8,"brillant")
				switch (game.event){
				case "fadeout":
				case "select":
					for (let i = game.level.stage-1; i <= game.level.stage+1; i++) {
						if (i>=1&&i<=game.menu.options) {
							numfillplace(Cw*0.5+(Cw*0.36)*(i-game.level.stage),Ch*0.275,i,40,"center",5,"brillant")
							switch (levels[game.level.world][i].type){
							case "lesson":
								showicons(Cw*0.5+(Cw*0.36)*(i-game.level.stage),Ch*0.16,100,"ui",1)
								break;
							case "chrono":
								showicons(Cw*0.5+(Cw*0.36)*(i-game.level.stage),Ch*0.16,100,"ui",2)
								break;
							case "vies":
								showicons(Cw*0.5+(Cw*0.36)*(i-game.level.stage),Ch*0.16,100,"ui",0)
								break;
							case "pv":
								showicons(Cw*0.5+(Cw*0.36)*(i-game.level.stage),Ch*0.16,100,"ui",0)
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
					numfillplace(Cw*0.5,Ch*0.275,game.level.stage,40,"center",5,"brillant")

					switch (levels[game.level.world][game.level.stage].type){
					case "lesson":
						showicons(Cw*0.5,Ch*0.16,100,"ui",1)
						break;
					case "chrono":
						showicons(Cw*0.5,Ch*0.16,100,"ui",2)
						break;
					case "vies":
						showicons(Cw*0.5,Ch*0.16,100,"ui",0)
						break;
					case "pv":
						showicons(Cw*0.5,Ch*0.16,100,"ui",0)
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
					anim.lvltransition.time-=msPassed;
					if (anim.lvltransition.time<=0) {
						anim.lvltransition.time=0;
						game.event="select"
					}
					c.fillStyle="black";
					c.globalAlpha=anim.lvltransition.time/833;
					c.fillRect(0,0,Cw,Ch)
					break;
				case "select":
					movemenu()
					if (key.space) {
						setmenu(2,"lr",0.05,0.86,0.31,0,2);
						game.event="selected"
					}
					if (key.d) {
						setmenu(5,"lr",0,0,0,0);
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
							game.timer=133;
							anim.entity.phase=-3;
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
					c.fillRect(Cw*0.5-Cw*(0.5*((133-game.timer)/133)),Ch*0.43,Cw*((133-game.timer)/133),5)
					if (game.timer<=0) {
						game.event="transition2";
						game.timer=400;
						anim.entity.phase=-1;
					}
					drawEntity()
					break;
				case "transition2":
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=0.7+0.3*((400-game.timer)/400);
					c.fillRect(0,Ch*0.43-Ch*(0.57*(400-game.timer)/400),Cw,5+Ch*1.17*((400-game.timer)/400))
					if (game.timer<=0) {
						game.event="transition3";
						game.timer=500;
						anim.entity.phase=0;
					}
					drawEntity()
					break;
				case "transition3":
					c.globalAlpha=1;;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						game.screen="level";
						game.mainevent="starting";
						game.event="set";
						anim.lvltransition.time=1600;
						game.timer=1000;
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
			drawEntity()
			anim.combocolor=(anim.combocolor+msPassed/10)%360;
			anim.operation.invert ? anim.operation.time+=msPassed:anim.operation.time-=msPassed;
			if(anim.operation.time<0)anim.operation.time=0;
			if(anim.operation.time>2000)anim.operation.time=2000;
			if ((anim.operation.time<=0&&!anim.operation.invert)||(anim.operation.time>=2000&&anim.operation.invert)) anim.operation.invert=!anim.operation.invert;
			if (anim.decaybar.mode=="alt") {
				anim.decaybar.invert ? anim.decaybar.time+=msPassed:anim.decaybar.time-=msPassed;
				if (anim.decaybar.time>800) anim.decaybar.time=800;
				if (anim.decaybar.time<0) anim.decaybar.time=0;
			}else {
				anim.decaybar.time=666;
			}
			if ((anim.decaybar.time<=0&&!anim.decaybar.invert)||(anim.decaybar.time>=666&&anim.decaybar.invert)) anim.decaybar.invert=!anim.decaybar.invert;
			if (game.stats.timer<=game.stats.maxtimer*0.2 && anim.lowtimer.mode=="alt") {
				anim.lowtimer.time>0 ? anim.lowtimer.time-=msPassed:anim.lowtimer.time=500;
			}else {
				anim.lowtimer.time=500;
			}
			anim.pause.opa>0 ? anim.pause.opa-=msPassed : anim.pause.opa=0;
			c.fillStyle="white";
			c.globalAlpha=1;
			textfillplace(Cw*0.5,Ch*0.04,"CORRECT",22,true,"black",6)
			c.globalAlpha=0.15+anim.pause.opa/833;
			c.fillStyle="rgb(255,"+(255*(1-key.pausecooldown/7000))+","+(255*(1-key.pausecooldown/7000))+")";
			if(key.pausecooldown>0)c.fillRect(Cw*0.035,Ch*0.875,120*(1-key.pausecooldown/7000),40);
			c.fillRect(Cw*0.035,Ch*0.875,120,40)
			c.globalAlpha=0.6+anim.pause.opa/833;
			key.pausecooldown==0 ? textfillplace(Cw*0.125,Ch*0.895,"PAUSE",26,true,"black",5) : textfillplace(Cw*0.125,Ch*0.895,"PAUSE",26,true,"red",5);
			c.globalAlpha=1;
			numfillplace(Cw*0.5,Ch*0.12,game.stats.clear,40,"center",6,"brillant")
			c.font = '30px monospace';
			c.textAlign="start";
			c.drawImage(ui_timerbarprogress,0,0,ui_timerbarprogress.width*(game.stats.timer/game.stats.maxtimer),ui_timerbarprogress.height,Cw*0.119,Ch*0.096,Cw*0.293*(game.stats.timer/game.stats.maxtimer),Ch*0.117)
			c.fillStyle="red";
			c.globalAlpha=0.3+anim.decaybar.time/2000;
			if (game.battle.gamemode=="survival-timer") c.fillRect(Cw*0.413-Cw*0.295*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))),Ch*0.1,Cw*0.295*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))),Ch*0.072);
			if (game.battle.gamemode=="survival-life") c.fillRect(Cw*0.413-Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.1,Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.072);
			if (game.stats.timer<=game.stats.maxtimer*0.2 && game.mainevent!="starting" && anim.lowtimer.mode!="none") {
				c.globalAlpha=0.2+anim.lowtimer.time/1000;
				c.fillRect(Cw*0.119,Ch*0.1,Cw*0.295*(game.stats.timer/game.stats.maxtimer),Ch*0.113)
			}
			c.globalAlpha=1;
			c.fillStyle="white";
			showicons(Cw*0.055,Ch*0.16,60,"ui",2,0)
			c.drawImage(ui_timerbar,Cw*0.11,Ch*0.091,202,72)
			c.textAlign="end";
			numfillplace(Cw*0.4,Ch*0.18,ShowTimer(game.stats.timer),24,"end",3)
			textfillplace(Cw*0.02,Ch*0.74,"SCORE",26,false,"black",5)
			c.globalAlpha = 0.3;
			numfillplace(Cw*0.26,Ch*0.8,"00000000",26,"end",6)
			c.globalAlpha = 1;
			numfillplace(Cw*0.26,Ch*0.8,game.stats.score,26,"end",6)
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
				numfillplace(Cw*0.485,Ch*0.8,Math.floor(game.stats.pv),24,"end",6)
				numfillplace(Cw*0.594,Ch*0.8,Math.floor(game.stats.maxpv),24,"end",6)
				c.fillText("/",Cw*0.492,Ch*0.848)
			}
			c.font = '28px monospace';
			c.textAlign="start";
			if (game.stats.combo>4) {
				textfillplace(Cw*0.03,Ch*0.325,"COMBO",30,false,colorCombo(game.stats.combo),5);
				numfillplace(Cw*0.225,Ch*0.325,game.stats.combo,30,"start",7,colorCombo(game.stats.combo));
			}
			if (game.stats.combo>9) {
				textfillplace(Cw*0.08,Ch*0.415,"X",18,false,colorCombo(game.stats.combo),5);
				numfillplace(Cw*0.1,Ch*0.4,checkCombo(game.stats.combo),24,"start",7,colorCombo(game.stats.combo));
			}
			switch (game.mainevent){
			case "starting":
				switch (game.event){
				case "set":
					anim.entity.phase=0;
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					game.stats.pv=0;
					game.stats.timer=0;
					if (game.battle.gamemode=="survival-life") {
						switch (game.setbtl.dif){
						case 2: 			//très facile
							game.stats.maxpv=100;
							game.stats.maxtimer=10000;
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
							game.stats.maxtimer=10000;
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
							game.stats.maxtimer=9000;
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
							game.stats.maxtimer=8000;
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
					}
					else if (game.battle.gamemode=="survival-timer"){
						game.stats.maxtimer=(Math.floor(20*game.setbtl.mode*game.setbtl.chif*game.setbtl.dif))*1000;
					}
					game.event="fadeout";
					break;
				case "fadeout":
					anim.entity.phase=0;
					anim.lvltransition.time-=msPassed;
					if (anim.lvltransition.time<=0) {
						anim.lvltransition.time=0;
						game.event="transition";
						game.timer=333
						anim.entity.phase=1;
					}
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=anim.lvltransition.time/1666;
					c.fillRect(0,0,Cw,Ch)
					break;
				case "transition":
					if (game.timer<=0) {
						switch (game.battle.gamemode) {
						case "survival-timer":
							if (game.stats.timer<game.stats.maxtimer*3/4) game.stats.timer+=Math.floor((game.stats.maxtimer*3/4)/30);
							else {
								game.event="attention";
								game.timer=333;
								anim.entity.phase=2
							}
							break;
						case "survival-life":
							if (game.stats.pv<game.stats.maxpv) {
								game.stats.pv+=game.stats.maxpv/30;
								if (game.stats.pv>game.stats.maxpv) game.stats.pv=game.stats.maxpv;
							}
							if (game.stats.timer<game.stats.maxtimer) game.stats.timer+=game.stats.maxtimer/30;
							else {
								game.battle.dmg=0;
								game.event="attention";
								game.timer=333;
								anim.entity.phase=2
							}
						}
					}
					break;
				case "attention":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5*(1-game.timer/266),Ch*0.45,"PRET?",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
						game.timer=1166;
						game.event="pret";
						anim.entity.phase=3
					}
					break;
				case "pret":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5,Ch*0.45,"PRET?",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=300) anim.entity.phase=4;
					if (game.timer<=0) {
						game.timer=266;
						game.event="partez"
					}
					break;
				case "partez":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*(0.5+0.6*(1-game.timer/266)),Ch*0.45,"PRET?",36,true,"white",5)
					textfillplace(Cw*(0.5*(1-game.timer/266)),Ch*0.45,"PARTEZ!",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
						game.timer=500;
						game.event="start"
					}
					break;
				case "start":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5,Ch*0.45,"PARTEZ!",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
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
					pauseGame()
				}
				break;
			case "play":
				if (game.battle.dmg>0) game.battle.dmg--;
				if (game.stats.timer>0) game.stats.timer-=msPassed;
				if (game.stats.time>0) game.stats.time-=msPassed;
				game.stats.timeRep+=msPassed;
				c.textAlign="center";
				c.font = '32px monospace';
				c.fillStyle="white";
				c.font = '40px monospace';
				if(input==""){
					c.globalAlpha=0.6;
					game.battle.negat ? numfillplace(Cw*0.5,Ch*0.68,"-"+0,40,"center",7):numfillplace(Cw*0.5,Ch*0.68,0,40,"center",7);
				}
				else {
					game.battle.negat ? numfillplace(Cw*0.5,Ch*0.68,"-"+input,40,"center",7):numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7);
				}
				c.globalAlpha=1;
				drawPuzzle()
				inputPlayer()
				switch (game.battle.gamemode){
				case "survival-timer":
					if (game.stats.timer<=0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=400;
					}
					break;
				case "survival-life":
					if (game.stats.timer<=0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=400;
					}
					if (game.stats.pv<=0) {
						game.stats.pv=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=1600;
					}
					break;
				}
				
				if (key.space&&game.mainevent!="gameover"&&game.mainevent!="wait") {
					game.mainevent="wait";
					game.event="calc";
				}
				if (key.p) {
					pauseGame()
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
						if (input=="") input=0;
						pass =validatePuzzle()
						break;
					case "survival-life":
						if (input=="") input=0;
						pass =validatePuzzle2()
						break;
					}
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					game.event="wait";
					game.timer=333;
					break;
				case "wait":
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					c.font = '26px monospace';
					if (pass) c.fillText("+ "+game.battle.score,Cw*0.2,Ch*0.7);
					if (game.timer<=0) {
						if (game.stats.timer<=0) {
							game.stats.timer=0;
							game.mainevent="gameover";
							game.event="end";
							game.timer=1600;
						}
						else {
							game.event="";
							game.mainevent="play";
							input="";
							switch (game.battle.gamemode){
							case "survival-timer":
								generatePuzzleMode1()
								break;
							case "survival-life":
								generatePuzzleMode2()
								break;
							}
						}
					}
					break;
				default:
					errormsg("event error !");
					break;
				}
				if (key.p) {
					pauseGame()
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
				textfillplace(Cw*0.5,Ch*0.45,"PAUSE",40,true,"black",5)
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
				if ((key.space||key.p)&& game.timer<=0) {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					key.p=false;
					key.space=false;
					key.pausecooldown=7000
				}
				if (key.d) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				break;
			case "exit":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
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
						game.timer=833;
						break;
					default:
						break;
					}
				}
				break;
			case "exitgame":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
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
					c.globalAlpha=1-game.timer/833;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						game.event="wait";
						game.timer=333;
					}
					break;
				case "wait":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						resetStats()
						setmenu(5,"lr",0,0,0,0,3);
						game.screen="hub";
						game.mainevent="";
						game.event="fadeout";
						anim.lvltransition.time=1600;
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
				textfillplace(Cw*0.5,Ch*0.45,"FIN DE PARTIE!",32,true,"white",5)
				c.shadowColor="";
				c.shadowBlur=0;
				switch (game.event){
				case "begin":
					if (game.battle.dmg>20) game.battle.dmg--;
					if (game.battle.dmg>0) game.battle.dmg--;
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					if (game.battle.dmg==0 && game.timer<=0) {
						game.event="transition";
						game.timer=266;
					}
					break;
				case "end":
					if (game.timer<=0) {
						game.event="transition";
						game.timer=833;
					}
					break;
				case "transition":
					c.fillStyle="black";
					c.globalAlpha = 0.92*(1-game.timer/833);
					c.fillRect(0,0,canvas.width,canvas.height)
					if (game.timer<=0) {
						if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
						game.stats.avgrep=calcAvgTResp(game.stats.inputT)
						game.event="finpop";
						game.timer=333;
						setmenu(3,"lr",0.11,0.83,0.26,0);
					}
					break;
				case "finpop":
				case "transition2":
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					switch(game.event){
					case "finpop":
						c.globalAlpha = 1-game.timer/333;
						break;
					case "transition2":
					case "transition3":
						c.globalAlpha = game.timer/833;
						break;
					}
					
					textfillplace(Cw*0.5,Ch*0.1,"FIN DE PARTIE!",40,true,"black",5)
					c.textAlign="start";
					switch (game.setbtl.dif) {
					case 2:
						textfillplace(Cw*0.18,Ch*0.23,"TRES FACILE",30,false,"black",7)
						break;
					case 1.5:
						textfillplace(Cw*0.18,Ch*0.23,"FACILE",30,false,"black",7)
						break;
					case 1:
						textfillplace(Cw*0.18,Ch*0.23,"NORMAL",30,false,"black",7)
						break;
					case 0.7:
						textfillplace(Cw*0.18,Ch*0.23,"DIFFICILE",30,false,"black",7)
						break;
					}
					switch (game.battle.gamemode) {
					case "survival-timer":
						game.battle.add? showicons(Cw*0.6,Ch*0.26,40,"lt",0,1):showicons(Cw*0.6,Ch*0.26,40,"lt",0,0);
						game.battle.sub? showicons(Cw*0.68,Ch*0.26,40,"lt",1,1):showicons(Cw*0.68,Ch*0.26,40,"lt",1,0);
						game.battle.mult? showicons(Cw*0.76,Ch*0.26,40,"lt",2,1):showicons(Cw*0.76,Ch*0.26,40,"lt",2,0);
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
						game.battle.add? showicons(Cw*0.6,Ch*0.26,40,"lt",0,1):showicons(Cw*0.6,Ch*0.26,40,"lt",0,0);
						game.battle.sub? showicons(Cw*0.68,Ch*0.26,40,"lt",1,1):showicons(Cw*0.68,Ch*0.26,40,"lt",1,0);
						break;
					}
					textfillplace(Cw*0.13,Ch*0.32,"SCORE",36,false,"black",5)
					numfillplace(Cw*0.38,Ch*0.325,game.stats.score,32,"start",5)
					textfillplace(Cw*0.13,Ch*0.41,"COMBO",32,false,"black",5)
					textfillplace(Cw*0.34,Ch*0.42,"MAX",26,false,"black",5)
					numfillplace(Cw*0.46,Ch*0.405,game.stats.maxcombo,32,"start",5)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.fillText("Bonnes réponses : "+game.stats.clear,Cw*0.13,Ch*0.54)
					c.fillText("Mauvaise réponses : "+game.stats.miss,Cw*0.13,Ch*0.61)
					c.fillText("Temps de réponse moyen : "+(Math.floor(game.stats.avgrep*100)/100)+" sec",Cw*0.13,Ch*0.68)
					c.fillText("Durée de la partie : "+ShowTimerRes(game.stats.timeTot)+" sec",Cw*0.13,Ch*0.75)
					textfillplace(Cw*0.25,Ch*0.83,"REJOUER",24,true,"white",5)
					textfillplace(Cw*0.51,Ch*0.83,"SUIVANT",24,true,"white",5)
					textfillplace(Cw*0.75,Ch*0.83,"STATS",24,true,"white",5)
					switch (game.event){
					case "finpop":
						if (game.inputType=="phone") {
							c.globalAlpha = 0.15*(1-game.timer/333);
							c.fillRect(Cw*0.13,Ch*0.79,Cw*0.24,Ch*0.125)
							c.fillRect(Cw*0.38,Ch*0.79,Cw*0.26,Ch*0.125)
							c.fillRect(Cw*0.65,Ch*0.79,Cw*0.24,Ch*0.125)
						}
						else {
							movemenu()
							showcursor()
							if (key.space) {
								switch (game.menu.target){
								case 1:
									resetStats()
									game.mainevent="starting";
									game.event="set";
									game.timer=333;
									break;
								case 2:
									game.event="transition2";
									game.timer=833;
									break;
								case 3:
									game.mainevent="stats";
									game.event="global";
									setmenu(game.stats.level.length,"ud",0,0,0,0);
									anim.graph.init=0;
									break;
								}
							}
						}
						break;
					case "transition2":
						c.fillStyle="black";
						c.globalAlpha=1-game.timer/833;
						c.fillRect(0,0,Cw,Ch)
						if (game.timer<=0) {
							resetStats()
							game.event="transition3";
							game.timer=333;
						}
						break;
					case "transition3":
						c.fillStyle="black";
						c.globalAlpha=1;
						c.fillRect(0,0,Cw,Ch)
						if (game.timer<=0) {
							setmenu(5,"lr",0,0,0,0,3);
							game.screen="hub";
							game.mainevent="";
							game.event="fadeout";
							anim.lvltransition.time=833;
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
			case "stats":
				c.fillStyle="black";
				c.globalAlpha = 0.92;
				c.fillRect(0,0,canvas.width,canvas.height)
				c.textAlign="center";
				if (game.inputType=="phone") {
					c.fillStyle="white";
					c.globalAlpha = 0.15;
					c.fillRect(Cw*0.27,Ch*0.145,Cw*0.08,Ch*0.11)
					c.fillRect(Cw*0.65,Ch*0.145,Cw*0.08,Ch*0.11)
					c.fillRect(Cw*0.77,Ch*0.15,Cw*0.2,Ch*0.1)
				}
				else {
					c.globalAlpha=1;
					c.fillStyle="yellow";
					c.font = '22px monospace';
					c.fillText("D",Cw*0.78,Ch*0.2)
				}
				c.font = '26px monospace';
				c.fillStyle="white";
				c.globalAlpha=1;
				c.fillText("Retour",Cw*0.87,Ch*0.22)
				c.font = '32px monospace';
				c.fillText("Statistiques de performance",Cw*0.5,Ch*0.125)
				movemenu()
				switch(game.event){
				case "global":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<       Global   >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",6,0)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.textAlign="start";
					c.fillText("N°    Opération        Résultat       Temps",Cw*0.07,Ch*0.3)
					let j=0;
					if (game.stats.level.length>0) {
						for (let i=game.menu.target-1; i < game.menu.target+9; i++) {
							if (i<game.stats.level.length&&i>=0) {
								c.textAlign="center";
								game.stats.level[i].opleft!=j ? c.fillText(game.stats.level[i].opleft ,Cw*0.085,Ch*0.43+Ch*0.055*(i-game.menu.target)):c.fillText("|",Cw*0.085,Ch*0.43+Ch*0.055*(i-game.menu.target));
								j=game.stats.level[i].opleft;
								c.fillText(game.stats.level[i].num1 ,Cw*0.22,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillText(game.stats.level[i].optype ,Cw*0.3,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillText(game.stats.level[i].num2 ,Cw*0.38,Ch*0.43+Ch*0.055*(i-game.menu.target))
								game.stats.level[i].valide ?  c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
								c.fillText(game.stats.level[i].inputP ,Cw*0.532,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillStyle="white";
								if (!game.stats.level[i].valide) {
									c.textAlign="start";
									c.fillText("-> "+game.stats.level[i].result,Cw*0.61,Ch*0.43+Ch*0.055*(i-game.menu.target))
								}
								c.textAlign="end";
								c.fillText(Math.floor(game.stats.level[i].timeResp*100)/100+"s",Cw*0.95,Ch*0.43+Ch*0.055*(i-game.menu.target))
							}
						}
					}
					else {
						c.textAlign="center";
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_stats,Cw*0.025,Ch*0.31,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.035,Ch*0.33,Cw*0.93,Ch*0.055)
					if (key.left) {
						game.event="temps";
						key.left=false;
					}
					if (key.right) {
						game.event="vies";
						key.right=false;
					}
					break;
				case "vies":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<        Vies    >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",3,0)
					let maxHP=get_maxhp(game.stats.maxvies,game.stats.maxpv);
					if (game.menu.target<anim.graph.init+2&&anim.graph.init>0) {
						anim.graph.init--;
					} else if (game.menu.target>anim.graph.init+anim.graph.step-2&&anim.graph.init<game.menu.options) {
						anim.graph.init++;
					}
					if (maxHP>0 && game.stats.level.length>0) {
						c.font = '20px monospace';
						c.fillText(maxHP,Cw*0.045,Ch*0.32)
						c.fillText(0,Cw*0.045,Ch*0.82)
						c.fillText(anim.graph.init,Cw*0.085,Ch*0.85)
						c.strokeStyle="grey";
						c.lineWidth=1;
						c.globalAlpha=0.5;
						for (let i = 0; i < anim.graph.step; i++) {
							c.strokeRect(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1),Ch*0.8-Ch*0.515,1,Ch*0.515)
						}
						c.fillStyle="white";
						c.strokeStyle="red";
						c.lineWidth=3;
						c.globalAlpha=1;
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].HPleft/maxHP))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].HPleft/maxHP))
								if (i == anim.graph.init+anim.graph.step-1||i==game.stats.level.length-1) c.fillText((i+1),Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.85);
							}
						}
						c.stroke()
						c.strokeStyle="white";
						c.lineWidth=1;
						c.fillStyle="red";
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].HPleft/maxHP),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.textAlign="center";
						c.fillStyle="white";
						c.fillText("N°",Cw*0.12,Ch*0.91)
						c.fillText("PV restant",Cw*0.27,Ch*0.91)
						c.fillText("PV perdu",Cw*0.47,Ch*0.91)
						c.fillText("Temps Réponse/Restant",Cw*0.75,Ch*0.91)
						c.fillText(game.stats.level[game.menu.target-1].opleft ,Cw*0.12,Ch*0.955)
						c.fillText(game.stats.level[game.menu.target-1].HPleft ,Cw*0.27,Ch*0.955)
						game.stats.level[game.menu.target-1].valide ?  c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
						c.fillText(game.stats.level[game.menu.target-1].HPlost ,Cw*0.47,Ch*0.955)
						c.fillStyle="white";
						c.textAlign="end";
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timeResp*100)/100+"s",Cw*0.75,Ch*0.955)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerleft*100)/100+"s",Cw*0.92,Ch*0.955)
					}
					else {
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_graph,Cw*0.025,Ch*0.24,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.08,Ch*0.87,Cw*0.87,Ch*0.1)
					if (key.left) {
						game.event="global";
						key.left=false;
					}
					if (key.right) {
						game.event="temps";
						key.right=false;
					}
					break;
				case "temps":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<       Temps    >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",4,0)
					let maxTimer=game.stats.maxtimer/1000;
					if (game.menu.target<anim.graph.init+2&&anim.graph.init>0) {
						anim.graph.init--;
					} else if (game.menu.target>anim.graph.init+anim.graph.step-2&&anim.graph.init<game.menu.options) {
						anim.graph.init++;
					}
					if (maxTimer>0 && game.stats.level.length>0) {
						c.font = '20px monospace';
						c.fillText(maxTimer+"s",Cw*0.045,Ch*0.32)
						c.fillText(0,Cw*0.045,Ch*0.82)
						c.fillText(anim.graph.init,Cw*0.085,Ch*0.85)
						c.strokeStyle="grey";
						c.lineWidth=1;
						c.globalAlpha=0.5;
						for (let i = 0; i < anim.graph.step; i++) {
							c.strokeRect(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1),Ch*0.8-Ch*0.515,1,Ch*0.515)
						}
						c.fillStyle="white";
						c.lineWidth=3;
						c.globalAlpha=1;
						c.strokeStyle="rgb(38, 183, 255)";
						c.beginPath()
						c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].maxtimer/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].maxtimer/maxTimer))
								if (i == anim.graph.init+anim.graph.step-1||i==game.stats.level.length-1) c.fillText((i+1),Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.85);
							}
						}
						c.stroke()
						c.strokeStyle="rgb(80, 80, 255)";
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].timerB/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.51*(game.stats.level[anim.graph.init].timerB/maxTimer))
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].timerB/maxTimer))
							}
						}
						c.stroke()
						c.strokeStyle="rgb(75, 214, 71)";
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].timeResp/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].timeResp/maxTimer))
							}
						}
						c.stroke()
						c.strokeStyle="white";
						c.fillStyle="rgb(80, 80, 255)";
						c.lineWidth=1;
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].timerB/maxTimer),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.fillStyle="rgb(75, 214, 71)";
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].timeResp/maxTimer),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.textAlign="center";
						c.fillStyle="rgb(38, 183, 255)";
						c.fillText("Temps Max.",Cw*0.26,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].maxtimer*100)/100+"s" ,Cw*0.26,Ch*0.955)
						c.fillStyle="rgb(80, 80, 255)";
						c.fillText("Action",Cw*0.41,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerB*100)/100+"s" ,Cw*0.41,Ch*0.955)
						c.fillStyle="rgb(75, 214, 71)";
						c.fillText("Réponse",Cw*0.54,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timeResp*100)/100+"s",Cw*0.54,Ch*0.955)
						c.fillStyle="white";
						c.fillText("N°",Cw*0.12,Ch*0.91)
						c.fillText("Temps Bonus/Restant",Cw*0.77,Ch*0.91)
						c.fillText(game.stats.level[game.menu.target-1].opleft ,Cw*0.12,Ch*0.955)
						c.textAlign="end";
						game.stats.level[game.menu.target-1].valide ?  c.fillStyle ="white": c.fillStyle="rgb(217, 38, 22)";
						game.stats.level[game.menu.target-1].bonustime==0 ? c.fillStyle ="rgb(50, 50, 50)":null;
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].bonustime*100)/100+"s",Cw*0.79,Ch*0.955)
						game.stats.level[game.menu.target-1].timerleft==game.stats.level[game.menu.target-1].maxtimer ?  c.fillStyle ="rgb(237, 216, 24)": c.fillStyle="white";
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerleft*100)/100+"s",Cw*0.93,Ch*0.955)
					}
					else {
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_graph,Cw*0.025,Ch*0.24,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.08,Ch*0.87,Cw*0.87,Ch*0.1)
					if (key.left) {
						game.event="vies";
						key.left=false;
					}
					if (key.right) {
						game.event="global";
						key.right=false;
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				if (key.d) {
					game.mainevent="gameover";
					game.event="finpop";
					setmenu(3,"lr",0.11,0.83,0.26,0,3);
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
			drawEntity()
			drawBurst()
			anim.combocolor=(anim.combocolor+msPassed/10)%360;
			anim.operation.invert ? anim.operation.time+=msPassed:anim.operation.time-=msPassed;
			if(anim.operation.time<0)anim.operation.time=0;
			if(anim.operation.time>2000)anim.operation.time=2000;
			if ((anim.operation.time<=0&&!anim.operation.invert)||(anim.operation.time>=2000&&anim.operation.invert)) anim.operation.invert=!anim.operation.invert;
			if (anim.decaybar.mode=="alt") {
				anim.decaybar.invert ? anim.decaybar.time+=msPassed:anim.decaybar.time-=msPassed;
				if (anim.decaybar.time>800) anim.decaybar.time=800;
				if (anim.decaybar.time<0) anim.decaybar.time=0;
			}else {
				anim.decaybar.time=800;
			}
			if ((anim.decaybar.time<=0&&!anim.decaybar.invert)||(anim.decaybar.time>=800&&anim.decaybar.invert)) anim.decaybar.invert=!anim.decaybar.invert;
			if (game.stats.timer<=game.stats.maxtimer*0.2 && anim.lowtimer.mode=="alt") {
				anim.lowtimer.time>0 ? anim.lowtimer.time-=msPassed:anim.lowtimer.time=700;
			}else {
				anim.lowtimer.time=700;
			}
			anim.pause.opa>0 ? anim.pause.opa-=msPassed : anim.pause.opa=0;
			c.fillStyle="white";
			c.globalAlpha=1;
			textfillplace(Cw*0.5,Ch*0.04,"RESTANT",22,true,"black",6)
			c.globalAlpha=0.15+anim.pause.opa/833;
			c.fillStyle="rgb(255,"+(255*(1-key.pausecooldown/7000))+","+(255*(1-key.pausecooldown/7000))+")";
			if(key.pausecooldown>0)c.fillRect(Cw*0.035,Ch*0.875,120*(1-key.pausecooldown/7000),40);
			c.fillRect(Cw*0.035,Ch*0.875,120,40)
			c.globalAlpha=0.6+anim.pause.opa/833;
			key.pausecooldown<=0?textfillplace(Cw*0.125,Ch*0.895,"PAUSE",26,true,"black",5):textfillplace(Cw*0.125,Ch*0.895,"PAUSE",26,true,"red",5);
			c.globalAlpha=1;
			c.fillStyle="white";
			numfillplace(Cw*0.5,Ch*0.12,game.battle.left,40,"center",6,"brillant")
			if (game.stats.maxtimer>0) {
				c.drawImage(ui_timerbarprogress,0,0,ui_timerbarprogress.width*(game.stats.timer/game.stats.maxtimer),ui_timerbarprogress.height,Cw*0.119,Ch*0.096,Cw*0.293*(game.stats.timer/game.stats.maxtimer),Ch*0.117)
				c.fillStyle="red";
				c.globalAlpha=0.3+anim.decaybar.time/2000;
				if (game.battle.decaystep>0) c.fillRect(Cw*0.413-Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.1,Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.072);
				if (game.stats.timer<=game.stats.maxtimer*0.2 && game.mainevent!="starting" && anim.lowtimer.mode!="none") {
					c.globalAlpha=0.2+anim.lowtimer.time/1000;
					c.fillRect(Cw*0.119,Ch*0.1,Cw*0.295*(game.stats.timer/game.stats.maxtimer),Ch*0.113)
				}
				c.globalAlpha=1;
				c.fillStyle="white";
				showicons(Cw*0.055,Ch*0.16,60,"ui",2,0)
				c.drawImage(ui_timerbar,Cw*0.11,Ch*0.09,202,72)
			}
			if (game.stats.maxtime>0) {
				mirrorDraw(ui_timerbarprogress,0,0,ui_timerbarprogress.width*(game.stats.time/game.stats.maxtime),ui_timerbarprogress.height,Cw*0.88,Ch*0.096,Cw*0.293*(game.stats.time/game.stats.maxtime),Ch*0.117)
				c.fillStyle="red";
				c.globalAlpha=0.3+anim.decaybar.time/2000;
				if (game.stats.time<=game.stats.maxtime*0.2 && game.mainevent!="starting" && anim.lowtimer.mode!="none") {
					c.globalAlpha=0.2+anim.lowtimer.time/1000;
					c.fillRect(Cw*0.59+Cw*0.29*(1-game.stats.time/game.stats.maxtime),Ch*0.1,Cw*0.289*(game.stats.time/game.stats.maxtime),Ch*0.113)
				}
				c.globalAlpha=1;
				c.fillStyle="white";
				showicons(Cw*0.94,Ch*0.16,60,"ui",3,0)
				mirrorDraw(ui_timerbar,0,0,ui_timerbar.width,ui_timerbar.height,Cw*0.89,Ch*0.09,202,72)
			}
			if (game.stats.maxtimer>0) numfillplace(Cw*0.4,Ch*0.18,ShowTimer(game.stats.timer),24,"end",3);
			if (game.stats.maxtime>0) numfillplace(Cw*0.75,Ch*0.18,ShowTimer(game.stats.time),24,"end",3);
			textfillplace(Cw*0.02,Ch*0.74,"SCORE",26,false,"black",5)
			c.globalAlpha = 0.3;
			numfillplace(Cw*0.26,Ch*0.8,"00000000",26,"end",6)
			c.globalAlpha = 1;
			numfillplace(Cw*0.26,Ch*0.8,game.stats.score,26,"end",6)
			c.textAlign="start";
			c.globalAlpha=1;
			if (game.stats.maxpv>0) {
				c.fillRect(Cw*0.26,Ch*0.865,Cw*0.48*(game.stats.pv/game.stats.maxpv),Ch*0.08)
				c.fillStyle="red";
				c.globalAlpha=0.5;
				c.fillRect(Cw*0.26+Cw*0.48*(game.stats.pv/game.stats.maxpv),Ch*0.865,Cw*0.48*(game.battle.dmg/game.stats.maxpv),Ch*0.08)
				c.fillStyle="white";
				c.font = '32px monospace';
				c.globalAlpha=1;
				c.drawImage(ui_hpbar,Cw*0.25,Ch*0.75,Cw*0.5,94)
				numfillplace(Cw*0.485,Ch*0.8,Math.floor(game.stats.pv),24,"end",6)
				numfillplace(Cw*0.594,Ch*0.8,Math.floor(game.stats.maxpv),24,"end",6)
				c.fillText("/",Cw*0.492,Ch*0.848)
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
				numfillplace(Cw*0.5,Ch*0.8,Math.floor(game.stats.vies),26,"center",5)
			}
			c.font = '28px monospace';
			c.textAlign="start";
			if (game.stats.combo>4) {
				textfillplace(Cw*0.03,Ch*0.325,"COMBO",30,false,colorCombo(game.stats.combo),5);
				numfillplace(Cw*0.225,Ch*0.325,game.stats.combo,30,"start",7,colorCombo(game.stats.combo));
			}
			if (game.stats.combo>9) {
				textfillplace(Cw*0.08,Ch*0.415,"X",18,false,colorCombo(game.stats.combo),5);
				numfillplace(Cw*0.1,Ch*0.4,checkCombo(game.stats.combo),24,"start",7,colorCombo(game.stats.combo));
			}
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
						game.stats.maxtimer=levels[game.level.world][game.level.stage].timer*1000;
						game.stats.maxtime=levels[game.level.world][game.level.stage].time*1000;
						game.battle.gamemode=levels[game.level.world][game.level.stage].type;
						game.battle.bossbar=levels[game.level.world][game.level.stage].boss;
						game.battle.bonustime=levels[game.level.world][game.level.stage].gaintime*1000;
						game.battle.decaystep=levels[game.level.world][game.level.stage].decaystep;
						game.battle.decaytimer=levels[game.level.world][game.level.stage].timerdecay*1000;
						game.battle.timerhplose=levels[game.level.world][game.level.stage].timerhplose;
						game.battle.skiptonext=levels[game.level.world][game.level.stage].skiptonext;
						game.battle.left=levels[game.level.world][game.level.stage].count;
						game.battle.order=levels[game.level.world][game.level.stage].order;
						game.level.encounter=JSON.parse(JSON.stringify(levels[game.level.world][game.level.stage].level))
					game.event="fadeout";
					break;
				case "fadeout":
					anim.lvltransition.time-=msPassed;
					if (anim.lvltransition.time<0) anim.lvltransition.time=0;
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=anim.lvltransition.time/1666;
					c.fillRect(0,0,Cw,Ch)
					if (anim.lvltransition.time<=0) {
						game.event="transition";
						game.timer=333;
						anim.entity.phase=1;
					}
					break;
				case "transition":
					if (game.timer<=0) {
						if (game.stats.pv<game.stats.maxpv) {
							game.stats.pv+=game.stats.maxpv/30;
							if (game.stats.pv>game.stats.maxpv) game.stats.pv=game.stats.maxpv;
						}
						if (game.stats.vies<game.stats.maxvies) {
							game.stats.vies+=game.stats.maxvies/30;
							if (game.stats.vies>game.stats.maxvies) game.stats.vies=game.stats.maxvies;
						}
						if (game.stats.timer<game.stats.maxtimer) {
							game.stats.timer+=game.stats.maxtimer/30;
							if (game.stats.timer>game.stats.maxtimer) game.stats.timer=game.stats.maxtimer;
						}
						if (game.stats.time<game.stats.maxtime) {
							game.stats.time+=game.stats.maxtime/30;
							if (game.stats.time>game.stats.maxtime) game.stats.time=game.stats.maxtime;
						}
						if (game.stats.pv==game.stats.maxpv&&game.stats.vies==game.stats.maxvies&&game.stats.timer==game.stats.maxtimer&&game.stats.time==game.stats.maxtime) {
							game.battle.dmg=0;
							game.event="attention";
							game.timer=266;
							anim.entity.phase=2;
						}
					}
					break;
				case "attention":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5*(1-game.timer/266),Ch*0.45,"PRET?",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
						game.timer=1166;
						game.event="pret"
					}
					break;
				case "pret":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5,Ch*0.45,"PRET?",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=300)anim.entity.phase=3;
					if (game.timer<=0) {
						game.timer=266;
						game.event="partez"
						anim.entity.phase=4;
					}
					break;
				case "partez":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*(0.5+0.6*(1-game.timer/266)),Ch*0.45,"PRET?",36,true,"white",5)
					textfillplace(Cw*(0.5*(1-game.timer/266)),Ch*0.45,"PARTEZ!",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
						game.timer=500;
						game.event="start"
					}
					break;
				case "start":
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5,Ch*0.45,"PARTEZ!",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
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
					pauseGame()
				}
				break;
			case "play":
				if (game.battle.dmg>0) game.battle.dmg--;
				if (game.battle.dmg>0) game.battle.dmg--;
				if (game.stats.timer>0) game.stats.timer-=msPassed;
				if (game.stats.time>0) game.stats.time-=msPassed;
				game.stats.timeRep+=msPassed;
				c.textAlign="center";
				c.font = '32px monospace';
				c.fillStyle="white";
				c.font = '40px monospace';
				if(input==""){
					c.globalAlpha=0.6;
					game.battle.negat ? numfillplace(Cw*0.5,Ch*0.68,"-"+0,40,"center",7):numfillplace(Cw*0.5,Ch*0.68,0,40,"center",7);
				}
				else {
					game.battle.negat ? numfillplace(Cw*0.5,Ch*0.68,"-"+input,40,"center",7):numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7);
				}
				drawPuzzle()
				inputPlayer()
				switch (game.battle.gamemode){
				case "vies":
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=400;
					}
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=833;
					}
					break;
				case "pv":
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=400;
					}
					if (game.stats.pv<=0 && game.stats.maxpv>0) {
						game.stats.pv=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=833;
					}
					break;
				case "boss":
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="wait";
						game.event="calc";
						game.timer=400;
					}
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=833;
					}
					if (game.stats.pv<=0 && game.stats.maxpv>0) {
						game.stats.pv=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=833;
					}
					break;
				case "chrono":
					if (game.stats.time<=0 && game.stats.maxtime>0) {
						game.stats.time=0;
						game.mainevent="gameover";
						game.event="end";
						game.timer=1666;
					}
					if (game.stats.timer<=0 && game.stats.maxtimer>0) {
						game.stats.timer=0;
						game.mainevent="gameover";
						game.event="end";
						game.timer=1666;
					}
					if (game.stats.pv<=0 && game.stats.maxpv>0) {
						game.stats.pv=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=833;
					}
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=833;
					}
					break;
				case "lesson":
					if (game.stats.vies<=0 && game.stats.maxvies>0) {
						game.stats.vies=0;
						game.mainevent="gameover";
						game.event="begin";
						game.timer=833;
					}
					break;
				default:
					break;
				}
				if (key.space&&game.mainevent!="gameover"&&game.mainevent!="wait") {
					game.mainevent="wait";
					game.event="calc";
				}
				if (key.p) {
					pauseGame()
				}
				break;
			case "wait":
				drawPuzzle()
				c.textAlign="center";
				c.font = '32px monospace';
				switch(game.event){
				case "calc":
					if (input=="") input=0;
					pass =validatePuzzlelvl()
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					game.event="wait";
					game.timer=333;
					break;
				case "wait":
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					c.font = '26px monospace';
					if (pass) c.fillText("+ "+game.battle.score,Cw*0.2,Ch*0.7);
					if (game.timer<=0) {
						game.event="";
						game.mainevent="play";
						input="";
						generatePuzzleModelvl(pass,false)
					}
				}
				if (key.p) {
					pauseGame()
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
				textfillplace(Cw*0.5,Ch*0.45,"PAUSE",40,true,"black",5)
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
				if ((key.space||key.p)&& game.timer<=0) {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					key.p=false;
					key.space=false;
					key.pausecooldown=7000
				}
				if (key.d) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				break;
			case "exit":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
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
						game.timer=833;
						break;
					default:
						break;
					}
				}
				break;
			case "exitgame":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
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
					c.globalAlpha=1-game.timer/833;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						game.event="wait";
						game.timer=333;
					}
					break;
				case "wait":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						resetStats()
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.screen="level-select";
						game.mainevent="map";
						game.event="fadeout";
						anim.lvltransition.time=833;
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
				textfillplace(Cw*0.5,Ch*0.45,"FIN DE PARTIE!",32,true,"white",5)
				c.shadowColor="";
				c.shadowBlur=0;
				switch (game.event){
				case "begin":
					if (game.battle.dmg>20) game.battle.dmg-=2;
					if (game.battle.dmg>0) game.battle.dmg--;
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					if (game.battle.dmg<=0 && game.timer<=0) {
						game.event="transition";
						game.timer=266;
					}
					break;
				case "end":
					if (game.timer<=0) {
						game.event="transition";
						game.timer=833;
					}
					break;
				case "transition":
					c.fillStyle="black";
					c.globalAlpha = 0.92*(1-game.timer/833);
					c.fillRect(0,0,canvas.width,canvas.height)
					if (game.timer<=0) {
						if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
						game.stats.avgrep=calcAvgTResp(game.stats.inputT)
						game.event="finpop";
						game.timer=333;
						setmenu(3,"lr",0.11,0.83,0.26,0);
					}
					break;
				case "finpop":
				case "transition1":
				case "transition2":
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					switch(game.event){
					case "finpop":
						c.globalAlpha=1;
						break;
					case "transition1":
						c.globalAlpha = 1-game.timer/333;
						break;
					case "transition2":
					case "transition3":
						c.globalAlpha = game.timer/833;
						break;
					}
					c.textAlign="center";
					textfillplace(Cw*0.5,Ch*0.09,"DEFAITE",50,true,"black",5)
					c.font = '30px monospace';
					c.fillText("Niveau "+game.level.world+"-"+game.level.stage,Cw*0.5,Ch*0.3)
					c.textAlign="start";
					textfillplace(Cw*0.25,Ch*0.83,"REJOUER",24,true,"white",5)
					textfillplace(Cw*0.51,Ch*0.83,"SUIVANT",24,true,"white",5)
					textfillplace(Cw*0.75,Ch*0.83,"STATS",24,true,"white",5)
					break;
				}
				switch (game.event){
				case "finpop":
					if (game.inputType=="phone") {
						c.globalAlpha = 0.15;
						c.fillRect(Cw*0.13,Ch*0.79,Cw*0.24,Ch*0.125)
						c.fillRect(Cw*0.38,Ch*0.79,Cw*0.26,Ch*0.125)
						c.fillRect(Cw*0.65,Ch*0.79,Cw*0.24,Ch*0.125)
					}
					else {
						movemenu()
						showcursor()
						if (key.space) {
							switch (game.menu.target){
							case 1:
								resetStats()
								game.mainevent="starting";
								game.event="set";
								game.timer=333;
								break;
							case 2:
								game.event="transition2";
								game.timer=833;
								break;
							case 3:
								game.prevevent="gameover";
								game.mainevent="stats";
								game.event="global";
								setmenu(game.stats.level.length,"ud",0,0,0,0);
								anim.graph.init=0;
								break;
							}
						}
					}
					break;
				case "transition2":
					c.fillStyle="black";
					c.globalAlpha=1-game.timer/833;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						resetStats()
						game.event="transition3";
						game.timer=333;
					}
					break;
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.screen="level-select";
						game.mainevent="map";
						game.event="fadeout";
						anim.lvltransition.time=833;
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
				c.shadowColor="black";
				c.shadowBlur=3;
				textfillplace(Cw*0.5,Ch*0.45,"TERMINE!",32,true,"white",5)
				c.shadowColor="";
				c.shadowBlur=0;
				c.globalAlpha=anim.perfect.globalOp/3000;
				c.fillRect(0,Ch*0.45,Cw*anim.perfect.wline/500,Ch*0.15*anim.perfect.ratio)
				c.shadowColor="black";
				c.shadowBlur=3;
				textfillplace(Cw*0.49+Cw*0.02*(anim.perfect.posx2/1000),Ch*0.475-anim.perfect.posy,"PARFAIT",anim.perfect.txtsize*anim.perfect.ratio,true,(anim.perfect.phase==1?"gold":"black"),1)
				c.shadowColor="";
				c.shadowBlur=0;
				c.globalAlpha=anim.perfect.whitescreen/500;
				c.fillRect(0,0,Cw*1,Ch*1)
				switch (game.event){
				case "init":
					anim.perfect.globalOp=3000;
					anim.perfect.whitescreen=0;
					anim.perfect.txtsize=348;
					anim.perfect.posy=500;
					anim.perfect.posx=0;
					anim.perfect.posx2=0;
					anim.perfect.wline=0;
					anim.perfect.phase=0;
					anim.perfect.transition=0;
					anim.perfect.ratio=1;
					game.event="phase1"
					break;
				case "phase1":
					anim.perfect.wline+=msPassed;
					anim.perfect.posy-=msPassed;
					anim.perfect.txtsize=48+300*(1-anim.perfect.wline/500);
					if (anim.perfect.wline>=500) {
						anim.perfect.wline=500;
						anim.perfect.posy=0;
						anim.perfect.txtsize=48;
						game.event="phase2";
					}
					break;
				case "phase2":
					c.globalAlpha=1;
					c.drawImage(txt_perfect1,Cw*0.1+Cw*0.8*(anim.perfect.posx/1000),Ch*0.452,32,66)
					anim.perfect.posx+=msPassed;
					anim.perfect.posx2+=msPassed/2;
					if (anim.perfect.posx>=1000) {
						anim.perfect.posx=1000;
						anim.perfect.posx2=500;
						anim.perfect.phase=1;
						anim.perfect.whitescreen=500;
						anim.perfect.ratio=1.25;
						game.event="phase3";
					}
					break;
				case "phase3":
					anim.perfect.whitescreen-=msPassed;
					anim.perfect.posx2+=msPassed/4;
					if (anim.perfect.whitescreen<=0) {
						anim.perfect.whitescreen=0;
						game.event="phase4";
					}
					break;
				case "phase4":
					anim.perfect.globalOp-=msPassed;
					anim.perfect.posx2+=msPassed/4;
					if (anim.perfect.globalOp<=0) {
						anim.perfect.globalOp=0;
						game.prevevent="perfect";
						game.mainevent="finish";
						game.event="transition";
						game.timer=833;
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
				textfillplace(Cw*0.5,Ch*0.45,"TERMINE!",32,true,"white",5)
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
						game.timer=266;
					}
					break;
				case "end":
					if (game.timer<=0) {
						anim.entity.phase=6;
						anim.burst.phase=1;
						if ((game.stats.maxvies>0&&game.stats.vies==game.stats.maxvies)||(game.stats.maxpv>0&&game.stats.pv==game.stats.maxpv)&&game.stats.miss==0) {
							saves.levels[game.level.world][game.level.stage].perfect=true;
							saveUpdate()
							game.mainevent="perfect";
							game.event="init"
						}
						else {
							game.event="transition0";
							game.timer=1300
						}
					}
					break;
				case "transition0":
					if (game.timer<=0) {
						game.event="transition";
						game.timer=833
					}
					break;
				case "transition":
					c.fillStyle="black";
					c.globalAlpha = 0.92*(1-game.timer/833);
					c.fillRect(0,0,canvas.width,canvas.height)
					if (game.timer<=0) {
						if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
						game.stats.avgrep=calcAvgTResp(game.stats.inputT)
						game.event="finpop";
						game.timer=333;
						setmenu(3,"lr",0.11,0.83,0.26,0);
					}
					break;
				case "finpop":
				case "transition2":
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					switch(game.event){
					case "finpop":
						c.globalAlpha=1-game.timer/333;
						break;
					case "transition2":
					case "transition3":
						c.globalAlpha = game.timer/833;
						break;
					}
					game.prevevent=="perfect"?textfillplace(Cw*0.5,Ch*0.09,"PARFAIT!",50,true,"gold",5) :textfillplace(Cw*0.5,Ch*0.09,"VICTOIRE!",50,true,"white",5);
					c.font = '30px monospace';
					c.textAlign="center";
					c.fillText("Niveau "+game.level.world+"-"+game.level.stage,Cw*0.5,Ch*0.28)
					textfillplace(Cw*0.13,Ch*0.32,"SCORE",36,false,"black",5)
					numfillplace(Cw*0.38,Ch*0.325,game.stats.score,32,"start",5)
					textfillplace(Cw*0.13,Ch*0.41,"COMBO",32,false,"black",5)
					textfillplace(Cw*0.34,Ch*0.42,"MAX",26,false,"black",5)
					numfillplace(Cw*0.46,Ch*0.405,game.stats.maxcombo,32,"start",5)
					c.textAlign="start";
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.fillText("Bonnes réponses : "+game.stats.clear,Cw*0.13,Ch*0.54)
					c.fillText("Mauvaise réponses : "+game.stats.miss,Cw*0.13,Ch*0.61)
					c.fillText("Temps de réponse moyen : "+(Math.floor(game.stats.avgrep*100)/100)+"sec",Cw*0.13,Ch*0.68)
					c.fillText("Durée de la partie : "+ShowTimerRes(game.stats.timeTot)+"sec",Cw*0.13,Ch*0.75)
					textfillplace(Cw*0.25,Ch*0.83,"REJOUER",24,true,"white",5)
					textfillplace(Cw*0.51,Ch*0.83,"SUIVANT",24,true,"white",5)
					textfillplace(Cw*0.75,Ch*0.83,"STATS",24,true,"white",5)
					break;
				default:
					errormsg("event error !")
				}
				switch (game.event){
				case "finpop":
					if (game.inputType=="phone") {
						c.globalAlpha = 0.15*(1-game.timer/333);
						c.fillRect(Cw*0.13,Ch*0.79,Cw*0.24,Ch*0.125)
						c.fillRect(Cw*0.38,Ch*0.79,Cw*0.26,Ch*0.125)
						c.fillRect(Cw*0.65,Ch*0.79,Cw*0.24,Ch*0.125)
					}
					else {
						movemenu()
						showcursor()
						if (key.space) {
							switch (game.menu.target){
							case 1:
								resetStats()
								game.mainevent="starting";
								game.event="set";
								game.timer=333;
								break;
							case 2:
								game.event="transition2";
								game.timer=833;
								break;
							case 3:
								game.prevevent="finish";
								game.mainevent="stats";
								game.event="global";
								setmenu(game.stats.level.length,"ud",0,0,0,0);
								anim.graph.init=0;
								break;
							}
						}
					}
					break;
				case "transition2":
					c.fillStyle="black";
					c.globalAlpha=1-game.timer/833;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						resetStats()
						game.event="transition3";
						game.timer=20;
					}
					break;
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						setmenu(levels[1].nblvl,"lr",0,0,0,0,game.level.stage);
						game.screen="level-select";
						game.prevevent="";
						game.mainevent="map";
						game.event="fadeout";
						anim.lvltransition.time=833;
					}
					break;
				default:
					break;
				}
				break;
			case "stats":
				c.fillStyle="black";
				c.globalAlpha = 0.92;
				c.fillRect(0,0,canvas.width,canvas.height)
				c.textAlign="center";
				if (game.inputType=="phone") {
					c.fillStyle="white";
					c.globalAlpha = 0.15;
					c.fillRect(Cw*0.27,Ch*0.145,Cw*0.08,Ch*0.11)
					c.fillRect(Cw*0.65,Ch*0.145,Cw*0.08,Ch*0.11)
					c.fillRect(Cw*0.77,Ch*0.15,Cw*0.2,Ch*0.1)
				}
				else {
					c.globalAlpha=1;
					c.fillStyle="yellow";
					c.font = '22px monospace';
					c.fillText("D",Cw*0.78,Ch*0.2)
				}
				c.font = '26px monospace';
				c.fillStyle="white";
				c.globalAlpha=1;
				c.fillText("Retour",Cw*0.87,Ch*0.22)
				c.font = '32px monospace';
				c.fillText("Statistiques de performance",Cw*0.5,Ch*0.125)
				movemenu()
				switch(game.event){
				case "global":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<       Global   >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",6,0)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.textAlign="start";
					c.fillText("N°    Opération        Résultat       Temps",Cw*0.07,Ch*0.3)
					let j=0;
					if (game.stats.level.length>0) {
						for (let i=game.menu.target-1; i < game.menu.target+9; i++) {
							if (i<game.stats.level.length) {
								c.textAlign="center";
								game.stats.level[i].opleft!=j ? c.fillText(game.stats.level[i].opleft ,Cw*0.085,Ch*0.43+Ch*0.055*(i-game.menu.target)):c.fillText("|",Cw*0.085,Ch*0.43+Ch*0.055*(i-game.menu.target));
								j=game.stats.level[i].opleft;
								c.fillText(game.stats.level[i].num1 ,Cw*0.22,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillText(game.stats.level[i].optype ,Cw*0.3,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillText(game.stats.level[i].num2 ,Cw*0.38,Ch*0.43+Ch*0.055*(i-game.menu.target))
								game.stats.level[i].valide ?  c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
								c.fillText(game.stats.level[i].inputP ,Cw*0.532,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillStyle="white";
								if (!game.stats.level[i].valide) {
									c.textAlign="start";
									c.fillText("-> "+game.stats.level[i].result,Cw*0.61,Ch*0.43+Ch*0.055*(i-game.menu.target))
								}
								c.textAlign="end";
								c.fillText(Math.floor(game.stats.level[i].timeResp*100)/100+"s",Cw*0.95,Ch*0.43+Ch*0.055*(i-game.menu.target))
							}
						}
					}
					else {
						c.textAlign="center";
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_stats,Cw*0.025,Ch*0.31,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.035,Ch*0.33,Cw*0.93,Ch*0.055)
					if (key.left) {
						game.event="temps";
						key.left=false;
					}
					if (key.right) {
						game.event="vies";
						key.right=false;
					}
					break;
				case "vies":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<        Vies    >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",3,0)
					let maxHP=get_maxhp(game.stats.maxvies,game.stats.maxpv);
					if (game.menu.target<anim.graph.init+2&&anim.graph.init>0) {
						anim.graph.init--;
					} else if (game.menu.target>anim.graph.init+anim.graph.step-2&&anim.graph.init<game.menu.options) {
						anim.graph.init++;
					}
					if (maxHP>0 && game.stats.level.length>0) {
						c.font = '20px monospace';
						c.fillText(maxHP,Cw*0.045,Ch*0.32)
						c.fillText(0,Cw*0.045,Ch*0.82)
						c.fillText(anim.graph.init,Cw*0.085,Ch*0.85)
						c.strokeStyle="grey";
						c.lineWidth=1;
						c.globalAlpha=0.5;
						for (let i = 0; i < anim.graph.step; i++) {
							c.strokeRect(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1),Ch*0.8-Ch*0.515,1,Ch*0.515)
						}
						c.fillStyle="white";
						c.strokeStyle="red";
						c.lineWidth=3;
						c.globalAlpha=1;
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].HPleft/maxHP))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].HPleft/maxHP))
								if (i == anim.graph.init+anim.graph.step-1||i==game.stats.level.length-1) c.fillText((i+1),Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.85);
							}
						}
						c.stroke()
						c.strokeStyle="white";
						c.lineWidth=1;
						c.fillStyle="red";
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].HPleft/maxHP),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.textAlign="center";
						c.fillStyle="white";
						c.fillText("N°",Cw*0.12,Ch*0.91)
						c.fillText("PV restant",Cw*0.27,Ch*0.91)
						c.fillText("PV perdu",Cw*0.47,Ch*0.91)
						c.fillText("Temps Réponse/Restant",Cw*0.75,Ch*0.91)
						c.fillText(game.stats.level[game.menu.target-1].opleft ,Cw*0.12,Ch*0.955)
						c.fillText(game.stats.level[game.menu.target-1].HPleft ,Cw*0.27,Ch*0.955)
						game.stats.level[game.menu.target-1].valide ?  c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
						c.fillText(game.stats.level[game.menu.target-1].HPlost ,Cw*0.47,Ch*0.955)
						c.fillStyle="white";
						c.textAlign="end";
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timeResp*100)/100+"s",Cw*0.75,Ch*0.955)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerleft*100)/100+"s",Cw*0.92,Ch*0.955)
					}
					else {
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_graph,Cw*0.025,Ch*0.24,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.08,Ch*0.87,Cw*0.87,Ch*0.1)
					if (key.left) {
						game.event="global";
						key.left=false;
					}
					if (key.right) {
						game.event="temps";
						key.right=false;
					}
					break;
				case "temps":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<       Temps    >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",4,0)
					let maxTimer=game.stats.maxtimer/1000;
					if (game.menu.target<anim.graph.init+2&&anim.graph.init>0) {
						anim.graph.init--;
					} else if (game.menu.target>anim.graph.init+anim.graph.step-2&&anim.graph.init<game.menu.options) {
						anim.graph.init++;
					}
					if (maxTimer>0 && game.stats.level.length>0) {
						c.font = '20px monospace';
						c.fillText(maxTimer+"s",Cw*0.045,Ch*0.32)
						c.fillText(0,Cw*0.045,Ch*0.82)
						c.fillText(anim.graph.init,Cw*0.085,Ch*0.85)
						c.strokeStyle="grey";
						c.lineWidth=1;
						c.globalAlpha=0.5;
						for (let i = 0; i < anim.graph.step; i++) {
							c.strokeRect(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1),Ch*0.8-Ch*0.515,1,Ch*0.515)
						}
						c.fillStyle="white";
						c.lineWidth=3;
						c.globalAlpha=1;
						c.strokeStyle="rgb(38, 183, 255)";
						c.beginPath()
						c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].maxtimer/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].maxtimer/maxTimer))
								if (i == anim.graph.init+anim.graph.step-1||i==game.stats.level.length-1) c.fillText((i+1),Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.85);
							}
						}
						c.stroke()
						c.strokeStyle="rgb(80, 80, 255)";
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].timerB/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.51*(game.stats.level[anim.graph.init].timerB/maxTimer))
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].timerB/maxTimer))
							}
						}
						c.stroke()
						c.strokeStyle="rgb(75, 214, 71)";
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].timeResp/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].timeResp/maxTimer))
							}
						}
						c.stroke()
						c.strokeStyle="white";
						c.fillStyle="rgb(80, 80, 255)";
						c.lineWidth=1;
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].timerB/maxTimer),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.fillStyle="rgb(75, 214, 71)";
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].timeResp/maxTimer),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.textAlign="center";
						c.fillStyle="rgb(38, 183, 255)";
						c.fillText("Temps Max.",Cw*0.26,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].maxtimer*100)/100+"s" ,Cw*0.26,Ch*0.955)
						c.fillStyle="rgb(80, 80, 255)";
						c.fillText("Action",Cw*0.41,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerB*100)/100+"s" ,Cw*0.41,Ch*0.955)
						c.fillStyle="rgb(75, 214, 71)";
						c.fillText("Réponse",Cw*0.54,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timeResp*100)/100+"s",Cw*0.54,Ch*0.955)
						c.fillStyle="white";
						c.fillText("N°",Cw*0.12,Ch*0.91)
						c.fillText("Temps Bonus/Restant",Cw*0.77,Ch*0.91)
						c.fillText(game.stats.level[game.menu.target-1].opleft ,Cw*0.12,Ch*0.955)
						c.textAlign="end";
						game.stats.level[game.menu.target-1].valide ?  c.fillStyle ="white": c.fillStyle="rgb(217, 38, 22)";
						game.stats.level[game.menu.target-1].bonustime==0 ? c.fillStyle ="rgb(50, 50, 50)":null;
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].bonustime*100)/100+"s",Cw*0.79,Ch*0.955)
						game.stats.level[game.menu.target-1].timerleft==game.stats.level[game.menu.target-1].maxtimer ?  c.fillStyle ="rgb(237, 216, 24)": c.fillStyle="white";
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerleft*100)/100+"s",Cw*0.93,Ch*0.955)
					}
					else {
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_graph,Cw*0.025,Ch*0.24,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.08,Ch*0.87,Cw*0.87,Ch*0.1)
					if (key.left) {
						game.event="vies";
						key.left=false;
					}
					if (key.right) {
						game.event="global";
						key.right=false;
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				if (key.d) {
					game.prevevent=="finish"?game.mainevent="finish":game.mainevent="gameover";
					game.event="finpop";
					setmenu(3,"lr",0.11,0.83,0.26,0);
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
		case "arcade":
			showbackground()
			RTAtimer()
			drawEntity()
			anim.combocolor=(anim.combocolor+msPassed/10)%360;
			anim.operation.invert ? anim.operation.time+=msPassed:anim.operation.time-=msPassed;
			if(anim.operation.time<0)anim.operation.time=0;
			if(anim.operation.time>2000)anim.operation.time=2000;
			if ((anim.operation.time<=0&&!anim.operation.invert)||(anim.operation.time>=2000&&anim.operation.invert)) anim.operation.invert=!anim.operation.invert;
			if (anim.decaybar.mode=="alt") {
				anim.decaybar.invert ? anim.decaybar.time+=msPassed:anim.decaybar.time-=msPassed;
				if (anim.decaybar.time>800) anim.decaybar.time=800;
				if (anim.decaybar.time<0) anim.decaybar.time=0;
			}else {
				anim.decaybar.time=666;
			}
			if ((anim.decaybar.time<=0&&!anim.decaybar.invert)||(anim.decaybar.time>=666&&anim.decaybar.invert)) anim.decaybar.invert=!anim.decaybar.invert;
			if (game.stats.timer<=game.stats.maxtimer*0.2 && anim.lowtimer.mode=="alt") {
				anim.lowtimer.time>0 ? anim.lowtimer.time-=msPassed:anim.lowtimer.time=500;
			}else {
				anim.lowtimer.time=500;
			}
			anim.pause.opa>0 ? anim.pause.opa-=msPassed : anim.pause.opa=0;

			if (anim.regenbar.mode=="alt") {
				anim.regenbar.invert ? anim.regenbar.time+=msPassed:anim.regenbar.time-=msPassed;
				if(anim.regenbar.time<0)anim.regenbar.time=0;
				if(anim.regenbar.time>833)anim.regenbar.time=833;
			}else {
				anim.regenbar.time=833;
			}
			if ((anim.regenbar.time<=0&&!anim.regenbar.invert)||(anim.regenbar.time>=833&&anim.regenbar.invert)) anim.regenbar.invert=!anim.regenbar.invert;
			c.fillStyle="white";
			c.globalAlpha=1;
			game.battle.arcade.phase=="normal"?textfillplace(Cw*0.5,Ch*0.04,"CORRECT",22,true,"black",5):textfillplace(Cw*0.5,Ch*0.04,"BONUS",22,true,"lblue",5);
			c.globalAlpha=0.15+anim.pause.opa/833;
			c.fillStyle="rgb(255,"+(255*(1-key.pausecooldown/7000))+","+(255*(1-key.pausecooldown/7000))+")";
			if(key.pausecooldown>0)c.fillRect(Cw*0.035,Ch*0.875,120*(1-key.pausecooldown/7000),40);
			c.fillRect(Cw*0.035,Ch*0.875,120,40)
			c.globalAlpha=0.6+anim.pause.opa/833;
			key.pausecooldown==0?textfillplace(Cw*0.125,Ch*0.895,"PAUSE",26,true,"black",5):textfillplace(Cw*0.125,Ch*0.895,"PAUSE",26,true,"red",5);
			c.globalAlpha=1;
			c.font = '40px monospace';
			game.battle.arcade.phase=="normal"?numfillplace(Cw*0.5,Ch*0.12,game.stats.clear,40,"center",6,"brillant"):numfillplace(Cw*0.5,Ch*0.12,game.battle.arcade.clear,40,"center",6,"lblue");
			c.font = '30px monospace';
			c.textAlign="start";
			if (game.stats.maxtimer>0) {
				c.drawImage(ui_timerbarprogress,0,0,ui_timerbarprogress.width*(game.stats.timer/game.stats.maxtimer),ui_timerbarprogress.height,Cw*0.119,Ch*0.096,Cw*0.293*(game.stats.timer/game.stats.maxtimer),Ch*0.117)
				c.fillStyle="red";
				c.globalAlpha=0.3+anim.decaybar.time/1333;
				if (game.stats.timerDecay>0) c.fillRect(Cw*0.413-Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.1,Cw*0.295*(game.stats.timerDecay/game.stats.maxtimer),Ch*0.072);
				if (game.stats.timer<=game.stats.maxtimer*0.2 && game.mainevent!="starting" && anim.lowtimer.mode!="none") {
					c.globalAlpha=0.2+anim.lowtimer.time/833;
					c.fillRect(Cw*0.119,Ch*0.1,Cw*0.295*(game.stats.timer/game.stats.maxtimer),Ch*0.113)
				}
				c.globalAlpha=1;
				c.fillStyle="white";
				showicons(Cw*0.055,Ch*0.16,60,"ui",2,0)
				c.drawImage(ui_timerbar,Cw*0.11,Ch*0.09,202,72)
			}
			game.battle.arcade.phase=="normal"?mirrorDraw(ui_timerbarprogress,0,0,ui_timerbarprogress.width*(game.battle.arcade.clear/game.battle.arcade.maxclear),ui_timerbarprogress.height,Cw*0.88,Ch*0.096,Cw*0.293*(game.battle.arcade.clear/game.battle.arcade.maxclear),Ch*0.117):mirrorDraw(ui_timerbarprogress,0,0,ui_timerbarprogress.width,ui_timerbarprogress.height,Cw*0.88,Ch*0.096,Cw*0.293,Ch*0.117);
			c.globalAlpha=1;
			c.fillStyle="white";
			showicons(Cw*0.94,Ch*0.16,60,"ui",4,0)
			mirrorDraw(ui_timerbar,0,0,ui_timerbar.width,ui_timerbar.height,Cw*0.89,Ch*0.09,202,72)
			game.battle.arcade.phase=="normal"?textfillplace(Cw*0.59,Ch*0.18,"NIV",24,false,"black",5):textfillplace(Cw*0.59,Ch*0.18,"NIV",24,false,"lblue",5);
			game.battle.arcade.phase=="normal"?numfillplace(Cw*0.73,Ch*0.18,(game.battle.arcade.level+1),24,"end",3,"brillant"):numfillplace(Cw*0.73,Ch*0.18,(game.battle.arcade.level+1),24,"end",3,"lblue");
			c.textAlign="end";
			if (game.stats.maxtimer>0) numfillplace(Cw*0.4,Ch*0.18,ShowTimer(game.stats.timer),24,"end",3);
			textfillplace(Cw*0.02,Ch*0.74,"SCORE",26,false,"black",5)
			c.globalAlpha = 0.3;
			numfillplace(Cw*0.26,Ch*0.8,"00000000",26,"end",6)
			c.globalAlpha = 1;
			numfillplace(Cw*0.26,Ch*0.8,game.stats.score,26,"end",6)
			c.textAlign="start";
			c.globalAlpha=1;
			if (game.stats.maxvies>0) {
				if (game.battle.arcade.phase=="regen") {
					c.globalAlpha=0.4+anim.regenbar.time/1666;
					c.fillStyle ="rgb(75, 214, 71)"
					c.fillRect(Cw*0.268,Ch*0.867,Cw*0.474*((game.stats.vies+game.battle.arcade.regen/10)/game.stats.maxvies),Ch*0.08)
				}
				c.globalAlpha=0.5;
				c.fillStyle="red";
				c.fillRect(Cw*0.268+Cw*0.474*(game.stats.vies/game.stats.maxvies),Ch*0.867,Cw*0.474*(game.battle.dmg/game.stats.maxvies),Ch*0.08)
				game.battle.arcade.phase=="regen"?c.fillStyle="rgb(38, 183, 255)":c.fillStyle="white";
				c.globalAlpha=1;
				c.fillRect(Cw*0.268,Ch*0.867,Cw*0.474*(game.stats.vies/game.stats.maxvies),Ch*0.08)
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
				game.battle.arcade.phase=="regen"?numfillplace(Cw*0.5,Ch*0.8,Math.floor(game.stats.vies),26,"center",5,"lblue"):numfillplace(Cw*0.5,Ch*0.8,Math.floor(game.stats.vies),26,"center",5);
			}
			c.fillStyle="white";
			c.font = '28px monospace';
			c.textAlign="start";
			if (game.stats.combo>4) {textfillplace(Cw*0.03,Ch*0.325,"COMBO",30,false,colorComboArcade(game.stats.combo),5);numfillplace(Cw*0.225,Ch*0.325,game.stats.combo,30,"start",7,colorComboArcade(game.stats.combo));}
			switch (game.mainevent){
			case "starting":
				switch (game.event){
				case "set":
					anim.entity.phase=0;
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					game.stats.vies=0;
					game.stats.timer=0;
					switch (game.setbtl.dif){
					case 2: 			//très facile
						game.stats.maxvies=5;
						game.stats.maxtimer=16000;
						game.battle.arcade.level=0;
						break;
					case 1.5: 			//facile
						game.stats.maxvies=5;
						game.stats.maxtimer=14000;
						game.battle.arcade.level=0;
						break;
					case 1: 			//normal
						game.stats.maxvies=5;
						game.stats.maxtimer=12000;
						game.battle.arcade.level=1;
						break;
					case 0.7: 			//difficile
						game.stats.maxvies=5;
						game.stats.maxtimer=12000;
						game.battle.arcade.level=2;
						break;
					}
					
					game.battle.arcade.phase="normal";
					game.battle.arcade.maxclear=arcade[game.battle.arcade.level].maxclear;
					game.battle.arcade.clear=0;
					game.battle.arcade.gaintimer=666;
					game.level.encounter=JSON.parse(JSON.stringify(arcade[game.battle.arcade.level].level))
					game.event="fadeout";
					break;
				case "fadeout":
					anim.lvltransition.time-=msPassed;
					if (anim.lvltransition.time<=0) {
						anim.lvltransition.time=0;
						game.event="transition";
						game.timer=333;
						anim.entity.phase=1
					}
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=anim.lvltransition.time/1666;
					c.fillRect(0,0,Cw,Ch)
					break;
				case "transition":
					if (game.timer<=0) {
						if (game.stats.vies<game.stats.maxvies) {
							game.stats.vies+=game.stats.maxvies/30;
							if (game.stats.vies>game.stats.maxvies) game.stats.vies=game.stats.maxvies;
						}
						if (game.stats.timer<game.stats.maxtimer) {
							game.stats.timer+=game.stats.maxtimer/30;
							if (game.stats.timer>game.stats.maxtimer) game.stats.timer=game.stats.maxtimer;
						}
						if (game.stats.vies==game.stats.maxvies&&game.stats.timer==game.stats.maxtimer) {
							game.battle.dmg=0;
							game.event="attention";
							game.timer=333;
							anim.entity.phase=2
						}
					}
					break;
				case "attention":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5*(1-game.timer/333),Ch*0.45,"PRET?",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
						game.timer=1166;
						game.event="pret";
						anim.entity.phase=3
					}
					break;
				case "pret":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5,Ch*0.45,"PRET?",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=300) anim.entity.phase=4;
					if (game.timer<=0) {
						game.timer=266;
						game.event="partez"
					}
					break;
				case "partez":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*(0.5+0.6*(1-game.timer/266)),Ch*0.45,"PRET?",36,true,"white",5)
					textfillplace(Cw*(0.5*(1-game.timer/266)),Ch*0.45,"PARTEZ!",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
						game.timer=500;
						game.event="start"
					}
					break;
				case "start":
					c.textAlign="center";
					c.font = '30px monospace';
					c.shadowColor="black";
					c.shadowBlur=3;
					textfillplace(Cw*0.5,Ch*0.45,"PARTEZ!",36,true,"white",5)
					c.shadowColor="";
					c.shadowBlur=0;
					if (game.timer<=0) {
						game.event="";
						game.mainevent="play";
						generatePuzzleArcade()
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				if (key.p) {
					pauseGame()
				}
				break;
			case "switchmode":
				switch(game.event){
				case "toregen":
					game.battle.arcade.phase="regen";
					anim.background.type=9+Math.floor(Math.random()*2);
					anim.lvltransition.time=1666;
					if (anim.background.stock.length>0) anim.background.stock.splice(0,anim.background.stock.length);
					game.battle.arcade.clear=0;
					game.battle.arcade.maxclear=999;
					game.battle.arcade.regen=0;
					game.battle.arcade.regenlvl=game.battle.arcade.level-1;
					if (game.battle.arcade.regenlvl<0) game.battle.arcade.regenlvl=0;
					game.level.encounter=JSON.parse(JSON.stringify(arcade[game.battle.arcade.regenlvl].level))
					game.event="fadeout";
					break;
				case "tonormal":
					game.battle.arcade.phase="normal";
					anim.background.type=Math.floor(Math.random()*4);
					anim.lvltransition.time=1000;
					if (anim.background.stock.length>0) anim.background.stock.splice(0,anim.background.stock.length);
					game.battle.arcade.clear=0;
					game.battle.arcade.regen=0;
					game.battle.arcade.level++;
					if (game.battle.arcade.level>9) game.battle.arcade.level=9;
					game.battle.arcade.gaintimer+=5;
					game.stats.timerDecay=0;
					game.stats.timer=Math.floor(game.stats.maxtimer*0.8);
					game.battle.arcade.maxclear=arcade[game.battle.arcade.level].maxclear;
					game.level.encounter=JSON.parse(JSON.stringify(arcade[game.battle.arcade.level].level))
					game.event="fadeout";
					break;
				case "fadeout":
					anim.lvltransition.time-=msPassed;
					if (anim.lvltransition.time<=0) {
						anim.lvltransition.time=0;
						game.event="";
						game.mainevent="play";
						input="";
						generatePuzzleArcade()
					}
					c.fillStyle="rgb(240,240,240)";
					c.globalAlpha=anim.lvltransition.time/1000;
					c.fillRect(0,0,Cw,Ch)
					break;
				default:
					errormsg("event error !")
					break;
				}
				if (key.p) {
					pauseGame()
				}
				break;
			case "play":
				if (game.battle.dmg>0) game.battle.dmg--;
				if (game.stats.timer>0) game.stats.timer-=msPassed;
				if (game.stats.time>0) game.stats.time-=msPassed;
				game.stats.timeRep+=msPassed;
				c.fillStyle="white";
				if(input==""){
					c.globalAlpha=0.6;
					game.battle.negat ? numfillplace(Cw*0.5,Ch*0.68,"-"+0,40,"center",7):numfillplace(Cw*0.5,Ch*0.68,0,40,"center",7);
				}
				else {
					game.battle.negat ? numfillplace(Cw*0.5,Ch*0.68,"-"+input,40,"center",7):numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7);
				}
				drawPuzzle()
				inputPlayer()
				if (game.stats.timer<=0) {
					game.stats.timer=0;
					game.mainevent="wait";
					game.event="calc";
					game.timer=400;
				}
				if (game.stats.vies<=0) {
					game.stats.vies=0;
					game.mainevent="gameover";
					game.event="begin";
					game.timer=1600;
				}
				if (key.space&&game.mainevent!="gameover"&&game.mainevent!="wait") {
					game.mainevent="wait";
					game.event="calc";
				}
				if (key.p) {
					pauseGame()
				}
				break;
			case "wait":
				drawPuzzle()
				c.textAlign="center";
				c.font = '32px monospace';
				switch(game.event){
				case "calc":
					if (input=="") input=0;
					pass =validatePuzzleArcade()
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					game.event=="calc"?game.event="wait":null;
					game.timer=333;
					break;
				case "wait":
					pass ? c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					c.font = '26px monospace';
					if (pass) c.fillText("+ "+game.battle.score,Cw*0.2,Ch*0.7);
					if (game.timer<=0) {
						game.event="";
						game.mainevent="play";
						input="";
						generatePuzzleArcade()
					}
					break;
				default:
					errormsg("event error !");
					break;
				}
				if (key.p) {
					pauseGame()
				}
				break;
			case "pause":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
				c.globalAlpha=1;
				c.fillStyle="white";
				c.textAlign="center";
				textfillplace(Cw*0.5,Ch*0.45,"PAUSE",40,true,"black",5)
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
				if ((key.space||key.p)&& game.timer<=0) {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					key.p=false;
					key.space=false
					key.pausecooldown=7000;
				}
				if (key.d) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				break;
			case "exit":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
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
						game.timer=833;
						break;
					default:
						break;
					}
				}
				break;
			case "exitgame":
				c.fillStyle="black";
				c.globalAlpha=0.8;
				c.fillRect(0,0,Cw,Ch)
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
					c.globalAlpha=1-game.timer/833;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						game.event="wait";
						game.timer=333;
					}
					break;
				case "wait":
					c.fillStyle="black";
					c.globalAlpha=1;
					c.fillRect(0,0,Cw,Ch)
					if (game.timer<=0) {
						resetStats()
						setmenu(5,"lr",0,0,0,0,2);
						game.screen="hub";
						game.mainevent="";
						game.event="fadeout";
						anim.lvltransition.time=1600;
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
				textfillplace(Cw*0.5,Ch*0.45,"FIN DE PARTIE!",32,true,"white",5)
				c.shadowColor="";
				c.shadowBlur=0;
				switch (game.event){
				case "begin":
					if (game.battle.dmg>20) game.battle.dmg-=2;
					if (game.battle.dmg>0) game.battle.dmg--;
					pass ? c.fillStyle ="green": c.fillStyle="red";
					numfillplace(Cw*0.5,Ch*0.68,input,40,"center",7,(pass?"green":"red"));
					if (game.battle.dmg==0 && game.timer<=0) {
						game.event="transition";
						game.timer=266;
					}
					break;
				case "end":
					if (game.timer<=0) {
						game.event="transition";
						game.timer=833;
					}
					break;
				case "transition":
					c.fillStyle="black";
					c.globalAlpha = 0.92*(1-game.timer/833);
					c.fillRect(0,0,canvas.width,canvas.height)
					if (game.timer<=0) {
						if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
						game.stats.avgrep=calcAvgTResp(game.stats.inputT)
						game.event="finpop";
						game.timer=333;
						setmenu(3,"lr",0.11,0.83,0.26,0);
					}
					break;
				case "finpop":
				case "transition2":
				case "transition3":
					c.fillStyle="black";
					c.globalAlpha = 0.92;
					c.fillRect(0,0,canvas.width,canvas.height)
					c.fillStyle="white";
					switch(game.event){
						case "finpop":
							c.globalAlpha = 1-game.timer/333;
							break;
						case "transition2":
						case "transition3":
							c.globalAlpha = game.timer/833;
							break;
					}
					textfillplace(Cw*0.5,Ch*0.1,"FIN DE PARTIE!",40,true,"black",5)
					c.font = '30px monospace';
					
					textfillplace(Cw*0.13,Ch*0.23,"ARCADE MODE",30,false,"black",7)
					switch (game.setbtl.dif) {
					case 2:
						textfillplace(Cw*0.54,Ch*0.23,"TRES FACILE",30,false,"black",7)
						break;
					case 1.5:
						textfillplace(Cw*0.54,Ch*0.23,"FACILE",30,false,"black",7)
						break;
					case 1:
						textfillplace(Cw*0.54,Ch*0.23,"NORMAL",30,false,"black",7)
						break;
					case 0.7:
						textfillplace(Cw*0.54,Ch*0.23,"DIFFICILE",30,false,"black",7)
						break;
					}
					textfillplace(Cw*0.13,Ch*0.32,"SCORE",34,false,"black",5)
					numfillplace(Cw*0.38,Ch*0.325,game.stats.score,30,"start",5)
					textfillplace(Cw*0.13,Ch*0.415,"NIVEAU ATTEINT",28,false,"black",5)
					numfillplace(Cw*0.65,Ch*0.41,game.battle.arcade.level+1,32,"start",5)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.textAlign="start";
					c.fillText("Bonnes réponses : "+game.stats.clear,Cw*0.13,Ch*0.54)
					c.fillText("Mauvaise réponses : "+game.stats.miss,Cw*0.13,Ch*0.61)
					c.fillText("Temps de réponse moyen : "+(Math.floor(game.stats.avgrep*100)/100)+" sec",Cw*0.13,Ch*0.68)
					c.fillText("Durée de la partie : "+ShowTimerRes(game.stats.timeTot)+" sec",Cw*0.13,Ch*0.75)
					textfillplace(Cw*0.25,Ch*0.83,"REJOUER",24,true,"white",5)
					textfillplace(Cw*0.51,Ch*0.83,"SUIVANT",24,true,"white",5)
					textfillplace(Cw*0.75,Ch*0.83,"STATS",24,true,"white",5)
					switch (game.event){
					case "finpop":
						if (game.inputType=="phone") {
							c.globalAlpha = 0.15*(1-game.timer/333);
							c.fillRect(Cw*0.13,Ch*0.79,Cw*0.24,Ch*0.125)
							c.fillRect(Cw*0.38,Ch*0.79,Cw*0.26,Ch*0.125)
							c.fillRect(Cw*0.65,Ch*0.79,Cw*0.24,Ch*0.125)
						}
						else {
							movemenu()
							showcursor()
							if (key.space) {
								switch (game.menu.target){
								case 1:
									resetStats()
									game.mainevent="starting";
									game.event="set";
									game.timer=333;
									break;
								case 2:
									game.event="transition2";
									game.timer=833;
									break;
								case 3:
									game.mainevent="stats";
									game.event="global";
									setmenu(game.stats.level.length,"ud",0,0,0,0);
									anim.graph.init=0;
									break;
								}
							}
						}
						break;
					case "transition2":
						c.fillStyle="black";
						c.globalAlpha=1-game.timer/833;
						c.fillRect(0,0,Cw,Ch)
						if (game.timer<=0) {
							resetStats()
							game.event="transition3";
							game.timer=333;
						}
						break;
					case "transition3":
						c.fillStyle="black";
						c.globalAlpha=1;
						c.fillRect(0,0,Cw,Ch)
						if (game.timer<=0) {
							setmenu(5,"lr",0,0,0,0,2);
							game.screen="hub";
							game.mainevent="";
							game.event="fadeout";
							anim.lvltransition.time=1600;
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
			case "stats":
				c.fillStyle="black";
				c.globalAlpha = 0.92;
				c.fillRect(0,0,canvas.width,canvas.height)
				c.textAlign="center";
				if (game.inputType=="phone") {
					c.fillStyle="white";
					c.globalAlpha = 0.15;
					c.fillRect(Cw*0.27,Ch*0.145,Cw*0.08,Ch*0.11)
					c.fillRect(Cw*0.65,Ch*0.145,Cw*0.08,Ch*0.11)
					c.fillRect(Cw*0.77,Ch*0.15,Cw*0.2,Ch*0.1)
				}
				else {
					c.globalAlpha=1;
					c.fillStyle="yellow";
					c.font = '22px monospace';
					c.fillText("D",Cw*0.78,Ch*0.2)
				}
				c.font = '26px monospace';
				c.fillStyle="white";
				c.globalAlpha=1;
				c.fillText("Retour",Cw*0.87,Ch*0.22)
				c.font = '32px monospace';
				c.fillText("Statistiques de performance",Cw*0.5,Ch*0.125)
				movemenu()
				switch(game.event){
				case "global":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<       Global   >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",6,0)
					game.inputType=="phone" ? c.font = '22px monospace': c.font = '24px monospace';
					c.textAlign="start";
					c.fillText("N°    Opération        Résultat       Temps",Cw*0.07,Ch*0.3)
					let j=0;
					if (game.stats.level.length>0) {
						for (let i=game.menu.target-1; i < game.menu.target+9; i++) {
							if (i<game.stats.level.length&&i>=0) {
								c.textAlign="center";
								game.stats.level[i].opleft!=j ? c.fillText(game.stats.level[i].opleft ,Cw*0.085,Ch*0.43+Ch*0.055*(i-game.menu.target)):c.fillText("|",Cw*0.085,Ch*0.43+Ch*0.055*(i-game.menu.target));
								j=game.stats.level[i].opleft;
								c.fillText(game.stats.level[i].num1 ,Cw*0.22,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillText(game.stats.level[i].optype ,Cw*0.3,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillText(game.stats.level[i].num2 ,Cw*0.38,Ch*0.43+Ch*0.055*(i-game.menu.target))
								game.stats.level[i].valide ?  c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
								c.fillText(game.stats.level[i].inputP ,Cw*0.532,Ch*0.43+Ch*0.055*(i-game.menu.target))
								c.fillStyle="white";
								if (!game.stats.level[i].valide) {
									c.textAlign="start";
									c.fillText("-> "+game.stats.level[i].result,Cw*0.61,Ch*0.43+Ch*0.055*(i-game.menu.target))
								}
								c.textAlign="end";
								c.fillText(Math.floor(game.stats.level[i].timeResp*100)/100+"s",Cw*0.95,Ch*0.43+Ch*0.055*(i-game.menu.target))
							}
						}
					}
					else {
						c.textAlign="center";
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_stats,Cw*0.025,Ch*0.31,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.035,Ch*0.33,Cw*0.93,Ch*0.055)
					if (key.left) {
						game.event="temps";
						key.left=false;
					}
					if (key.right) {
						game.event="vies";
						key.right=false;
					}
					break;
				case "vies":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<        Vies    >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",3,0)
					let maxHP=get_maxhp(game.stats.maxvies,game.stats.maxpv);
					if (game.menu.target<anim.graph.init+2&&anim.graph.init>0) {
						anim.graph.init--;
					} else if (game.menu.target>anim.graph.init+anim.graph.step-2&&anim.graph.init<game.menu.options) {
						anim.graph.init++;
					}
					if (maxHP>0 && game.stats.level.length>0) {
						c.font = '20px monospace';
						c.fillText(maxHP,Cw*0.045,Ch*0.32)
						c.fillText(0,Cw*0.045,Ch*0.82)
						c.fillText(anim.graph.init,Cw*0.085,Ch*0.85)
						c.strokeStyle="grey";
						c.lineWidth=1;
						c.globalAlpha=0.5;
						for (let i = 0; i < anim.graph.step; i++) {
							c.strokeRect(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1),Ch*0.8-Ch*0.515,1,Ch*0.515)
						}
						c.fillStyle="white";
						c.strokeStyle="red";
						c.lineWidth=3;
						c.globalAlpha=1;
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].HPleft/maxHP))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].HPleft/maxHP))
								if (i == anim.graph.init+anim.graph.step-1||i==game.stats.level.length-1) c.fillText((i+1),Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.85);
							}
						}
						c.stroke()
						c.strokeStyle="white";
						c.lineWidth=1;
						c.fillStyle="red";
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].HPleft/maxHP),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.textAlign="center";
						c.fillStyle="white";
						c.fillText("N°",Cw*0.12,Ch*0.91)
						c.fillText("PV restant",Cw*0.27,Ch*0.91)
						c.fillText("PV perdu",Cw*0.47,Ch*0.91)
						c.fillText("Temps Réponse/Restant",Cw*0.75,Ch*0.91)
						c.fillText(game.stats.level[game.menu.target-1].opleft ,Cw*0.12,Ch*0.955)
						c.fillText(game.stats.level[game.menu.target-1].HPleft ,Cw*0.27,Ch*0.955)
						game.stats.level[game.menu.target-1].valide ?  c.fillStyle ="rgb(75, 214, 71)": c.fillStyle="rgb(217, 38, 22)";
						c.fillText(game.stats.level[game.menu.target-1].HPlost ,Cw*0.47,Ch*0.955)
						c.fillStyle="white";
						c.textAlign="end";
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timeResp*100)/100+"s",Cw*0.75,Ch*0.955)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerleft*100)/100+"s",Cw*0.92,Ch*0.955)
					}
					else {
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_graph,Cw*0.025,Ch*0.24,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.08,Ch*0.87,Cw*0.87,Ch*0.1)
					if (key.left) {
						game.event="global";
						key.left=false;
					}
					if (key.right) {
						game.event="temps";
						key.right=false;
					}
					break;
				case "temps":
					c.font = '26px monospace';
					c.textAlign="center";
					c.fillText("<       Temps    >",Cw*0.5,Ch*0.22)
					showicons(Cw*0.4,Ch*0.195,40,"lt",4,0)
					let maxTimer=game.stats.maxtimer/1000;
					if (game.menu.target<anim.graph.init+2&&anim.graph.init>0) {
						anim.graph.init--;
					} else if (game.menu.target>anim.graph.init+anim.graph.step-2&&anim.graph.init<game.menu.options) {
						anim.graph.init++;
					}
					if (maxTimer>0 && game.stats.level.length>0) {
						c.font = '20px monospace';
						c.fillText(maxTimer+"s",Cw*0.045,Ch*0.32)
						c.fillText(0,Cw*0.045,Ch*0.82)
						c.fillText(anim.graph.init,Cw*0.085,Ch*0.85)
						c.strokeStyle="grey";
						c.lineWidth=1;
						c.globalAlpha=0.5;
						for (let i = 0; i < anim.graph.step; i++) {
							c.strokeRect(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1),Ch*0.8-Ch*0.515,1,Ch*0.515)
						}
						c.fillStyle="white";
						c.lineWidth=3;
						c.globalAlpha=1;
						c.strokeStyle="rgb(38, 183, 255)";
						c.beginPath()
						c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].maxtimer/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].maxtimer/maxTimer))
								if (i == anim.graph.init+anim.graph.step-1||i==game.stats.level.length-1) c.fillText((i+1),Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.85);
							}
						}
						c.stroke()
						c.strokeStyle="rgb(80, 80, 255)";
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].timerB/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.51*(game.stats.level[anim.graph.init].timerB/maxTimer))
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].timerB/maxTimer))
							}
						}
						c.stroke()
						c.strokeStyle="rgb(75, 214, 71)";
						c.beginPath()
						if (anim.graph.init!=0){
							c.moveTo(Cw*0.09,Ch*0.8-Ch*0.515*(game.stats.level[anim.graph.init-1].timeResp/maxTimer))
						} else {
							c.moveTo(Cw*0.09,Ch*0.8)
						}
						for (let i = anim.graph.init; i < anim.graph.init+anim.graph.step; i++) {
							if (i>=0&&i<game.stats.level.length) {
								c.lineTo(Cw*0.09+(Cw*0.85/anim.graph.step)*(i+1-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[i].timeResp/maxTimer))
							}
						}
						c.stroke()
						c.strokeStyle="white";
						c.fillStyle="rgb(80, 80, 255)";
						c.lineWidth=1;
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].timerB/maxTimer),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.fillStyle="rgb(75, 214, 71)";
						c.beginPath()
						c.arc(Cw*0.09+(Cw*0.85/anim.graph.step)*(game.menu.target-anim.graph.init),Ch*0.8-Ch*0.515*(game.stats.level[(game.menu.target-1)].timeResp/maxTimer),5,0,Math.PI*2)
						c.fill()
						c.stroke()
						c.closePath()
						c.textAlign="center";
						c.fillStyle="rgb(38, 183, 255)";
						c.fillText("Temps Max.",Cw*0.26,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].maxtimer*100)/100+"s" ,Cw*0.26,Ch*0.955)
						c.fillStyle="rgb(80, 80, 255)";
						c.fillText("Action",Cw*0.41,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerB*100)/100+"s" ,Cw*0.41,Ch*0.955)
						c.fillStyle="rgb(75, 214, 71)";
						c.fillText("Réponse",Cw*0.54,Ch*0.91)
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timeResp*100)/100+"s",Cw*0.54,Ch*0.955)
						c.fillStyle="white";
						c.fillText("N°",Cw*0.12,Ch*0.91)
						c.fillText("Temps Bonus/Restant",Cw*0.77,Ch*0.91)
						c.fillText(game.stats.level[game.menu.target-1].opleft ,Cw*0.12,Ch*0.955)
						c.textAlign="end";
						game.stats.level[game.menu.target-1].valide ?  c.fillStyle ="white": c.fillStyle="rgb(217, 38, 22)";
						game.stats.level[game.menu.target-1].bonustime==0 ? c.fillStyle ="rgb(50, 50, 50)":null;
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].bonustime*100)/100+"s",Cw*0.79,Ch*0.955)
						game.stats.level[game.menu.target-1].timerleft==game.stats.level[game.menu.target-1].maxtimer ?  c.fillStyle ="rgb(237, 216, 24)": c.fillStyle="white";
						c.fillText(Math.floor(game.stats.level[game.menu.target-1].timerleft*100)/100+"s",Cw*0.93,Ch*0.955)
					}
					else {
						c.font = '30px monospace';
						c.fillText("Données insuffisantes",Cw*0.5,Ch*0.5)
					}
					c.drawImage(frame_graph,Cw*0.025,Ch*0.24,Cw*0.95,Ch*0.6)
					c.strokeRect(Cw*0.08,Ch*0.87,Cw*0.87,Ch*0.1)
					if (key.left) {
						game.event="vies";
						key.left=false;
					}
					if (key.right) {
						game.event="global";
						key.right=false;
					}
					break;
				default:
					errormsg("event error !")
					break;
				}
				if (key.d) {
					game.mainevent="gameover";
					game.event="finpop";
					setmenu(3,"lr",0.11,0.83,0.26,0,3);
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
			c.fillText("Arcade "+returnMode(),Cw*0.02,Ch*0.04)
			break;
		default :
			errormsg("screenevent error !")
			break;
	}
	frames++
	t=Date.now()
	if (t-tstart>=1000) {
		frameRate=frames;
		frames=0;
		tstart=Date.now()
	}

	c.globalAlpha=0.5;
	c.font = '12px monospace';
	c.fillStyle = "white";
	c.textAlign="start";
	c.fillText("Réalisé par @Yenseng3", Cw*0.01, Ch*0.99);
	c.textAlign="end";
	c.fillText("Version "+version, Cw*0.99, Ch*0.99);
	c.globalAlpha=0.8;
	c.font = '14px monospace';
	if (game.option.showfps) c.fillText("FPS "+frameRate, Cw*0.99, Ch*0.03);	
}
loopAnimation()

chargement++