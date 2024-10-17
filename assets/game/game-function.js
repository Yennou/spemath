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
function textfillplace(posx,posy,obj,size,center=false,color="black",ecart=0,calc=false){
	const tw=tile.tw*(size/48);
	const th=tile.th*(size/48);

	switch(game.option.font){
	case "none":
	case "num":
		let prevFillStyle=c.fillStyle;
		let prevtxtalign=c.textAlign;
		let prevletterspacing=c.letterSpacing;
		let prevfont=c.font;
		switch(color){
		case "brillant":
		case "combo":
		case "combo2":
		case "combo3":
		case "combo4":
			c.fillStyle="white";
			break;
		case "combo5":
			c.fillStyle="yellow";
			c.filter="grayscale(70%) hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo6":
			c.fillStyle="yellow";
			c.filter="hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo7":
			c.fillStyle="yellow";
			c.filter="hue-rotate("+anim.combocolor+"deg) contrast(150%)";
			break;
		case "white":
			c.fillStyle="white";
			break;
		case "red":
			c.fillStyle="red";
			break;
		case "green":
			c.fillStyle="green";
			break;
		case "lblue":
			c.fillStyle="rgb(38, 183, 255)"
			break;
		case "gold":
			c.fillStyle="rgb(230, 210, 20)";
			break;
		case "black":
			!calc? c.fillStyle="white":c.fillStyle="black"
			break;
		}
		c.letterSpacing=ecart;
		center ? c.textAlign="center":c.textAlign="start";
		c.font=Math.floor(size*1.2)+"px monospace";
		c.fillText(obj,posx,posy+Math.floor(size*0.85))

		c.fillStyle=prevFillStyle;
		c.textAlign=prevtxtalign;
		c.letterSpacing=prevletterspacing;
		c.font=prevfont;
		break;
	case "txt":
	case "all":
		switch (color) {
		case "black":
			c.filter="grayscale(100%) contrast(200%)";
			break;
		case "combo":
			c.filter="grayscale(100%) brightness(125%)";
			break;
		case "combo2":
			c.filter="grayscale(100%) brightness(150%)";
			break;
		case "combo3":
			c.filter="grayscale(100%) brightness(200%)";
			break;
		case "combo4":
			c.filter="grayscale(100%) brightness(250%)";
			break;
		case "combo5":
			c.filter="grayscale(70%) hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo6":
			c.filter="hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo7":
			c.filter="hue-rotate("+anim.combocolor+"deg) contrast(150%)";
			break;
		case "white":
			c.filter="hue-rotate(280deg) grayscale(100%) brightness(250%)";
			break;
		case "gold":
			c.filter="hue-rotate(175deg) brightness(150%)";
			break;
		case "red":
			c.filter="hue-rotate(120deg) brightness(100%) grayscale(20%)";
			break;
		case "lblue":
			c.filter="hue-rotate(295deg) brightness(150%)";
			break;
		}
		for (let i in obj) {
			let col = -1;
			col = spritefont.indexOf(obj[i]);
			if (center) {
				let long=obj.length/2;
				c.drawImage(font, col*tile.tx, 0, tile.tx, tile.ty, posx+tw*i-tw*long+ecart*long-ecart*i, posy, tw, th);
			}else{
				c.drawImage(font, col*tile.tx, 0, tile.tx, tile.ty, posx+tw*i-ecart*i, posy, tw, th);
			}
		}
		break;
	}
	c.filter="grayscale(0%)";
	c.filter="hue-rotate(0)";
	c.filter="brightness(100%)";
	c.filter="contrast(100%)";
}
function numfillplace(posx,posy,obj,size,align="start",ecart=0,color="black",calc=false){
	const objet = obj.toString();
	let long=0;
	let row=color=="black"?0:1;
	const tw=tilenum.tw*(size/48);
	const th=tilenum.th*(size/48);
	switch (game.option.font){
	case "none":
	case "txt":
		let prevFillStyle=c.fillStyle;
		let prevtxtalign=c.textAlign;
		let prevletterspacing=c.letterSpacing;
		let prevfont=c.font;
		switch(color){
		case "brillant":
		case "combo":
		case "combo2":
		case "combo3":
		case "combo4":
			c.fillStyle="white";
			break;
		case "combo5":
			c.fillStyle="yellow";
			c.filter="grayscale(70%) hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo6":
			c.fillStyle="yellow";
			c.filter="hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo7":
			c.fillStyle="yellow";
			c.filter="hue-rotate("+anim.combocolor+"deg) contrast(150%)";
			break;
		case "white":
			c.fillStyle="white";
			break;
		case "red":
			c.fillStyle="red";
			break;
		case "green":
			c.fillStyle="green";
			break;
		case "lblue":
			c.fillStyle="rgb(38, 183, 255)"
			break;
		case "gold":
			c.fillStyle="rgb(230, 210, 20)";
			break;
		case "black":
			!calc? c.fillStyle="white":c.fillStyle="black"
			break;
		}
		c.letterSpacing=ecart;
		c.textAlign=align;
		c.font=Math.floor(size*1.2)+"px monospace";
		c.fillText(obj,posx,posy+Math.floor(size*0.85))

		c.fillStyle=prevFillStyle;
		c.textAlign=prevtxtalign;
		c.letterSpacing=prevletterspacing;
		c.font=prevfont;
		break;
	case "num":
	case "all":
		switch(color){
		case "brillant":
			c.filter="grayscale(100%) contrast(200%)";
			break;
		case "combo":
			c.filter="grayscale(100%) brightness(125%)";
			break;
		case "combo2":
			c.filter="grayscale(100%) brightness(150%)";
			break;
		case "combo3":
			c.filter="grayscale(100%) brightness(200%)";
			break;
		case "combo4":
			c.filter="grayscale(100%) brightness(250%)";
			break;
		case "combo5":
			c.filter="grayscale(70%) hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo6":
			c.filter="hue-rotate("+anim.combocolor+"deg)";
			break;
		case "combo7":
			c.filter="hue-rotate("+anim.combocolor+"deg) contrast(150%)";
			break;
		case "white":
			c.filter="hue-rotate(280deg) grayscale(100%) brightness(250%)";
			break;
		case "red":
			c.filter="hue-rotate(120deg) brightness(100%) grayscale(20%)";
			break;
		case "green":
			c.filter="hue-rotate(200deg) brightness(150%)";
			break;
		case "lblue":
			c.filter="hue-rotate(295deg) brightness(150%)";
			break;
		case "gold":
			c.filter="hue-rotate(175deg) brightness(150%)";
			break;
		case "black":
			c.filter="grayscale(100%) contrast(200%)";
			break;
		}
		for (let i in objet) {
			let col = -1;
			col = numfont.indexOf(objet[i]);
			switch (align){
			case "start":
				c.drawImage(font_num, col*tilenum.tx, row*tilenum.tx, tilenum.tx, tilenum.ty, posx+tw*i-ecart*i, posy, tw, th);
				break;
			case "center":
				long=objet.length/2;
				c.drawImage(font_num, col*tilenum.tx, row*tilenum.tx, tilenum.tx, tilenum.ty, posx+tw*i-tw*long+ecart*long-ecart*i, posy, tw, th);
				break;
			case "end":
				long=objet.length;
				c.drawImage(font_num, col*tilenum.tx, row*tilenum.tx, tilenum.tx, tilenum.ty, posx-tw*(long-i)-ecart*i+ecart*long, posy, tw, th);
				break;
			}
		}
		break;
	}
	c.filter="grayscale(0%)";
	c.filter="hue-rotate(0)";
	c.filter="brightness(100%)";
	c.filter="contrast(100%)";
}
function showcursor(cursortype=0){
	c.drawImage(cursor,0,0,60,60,Cw*game.menu.posx-10,Ch*game.menu.posy-5,30,30)
}
function showicons(posx,posy,size,type,icons,stage=0){
	switch(type){
	case "menu":
		c.drawImage(icons_menu,200*icons,200*stage,200,200,posx-(size/2),posy-(size/2),200*(size/200),200*(size/200))
		break;
	case "ui":
		c.drawImage(ui_icons,200*icons,200*stage,200,200,posx-(size/2),posy-(size/2),200*(size/200),200*(size/200))
		break;
	case "lt":
		c.drawImage(icons_lt,100*icons,100*stage,100,100,posx-(size/2),posy-(size/2),100*(size/100),100*(size/100))
		break;
	}
}
function inputPlayer(){
	c.globalAlpha=game.option.inputOpacity/100;
	c.fillStyle="white";
	if (game.inputType=="keyboard") {
		c.drawImage(inputframe,Cw*0.84,Ch*0.46,100,70)
		c.drawImage(inputframe,Cw*0.84,Ch*0.63,100,80)
		c.drawImage(inputframe,Cw*0.84,Ch*0.82,100,70)
		c.drawImage(btn_enter,Cw*0.87,Ch*0.49,60,60)
		c.drawImage(btn_plusmoins,Cw*0.87,Ch*0.67,60,60)
		c.drawImage(btn_return,Cw*0.87,Ch*0.85,60,60)
		c.textAlign="start";
		c.fillStyle="yellow";
		c.font = '19px monospace';
		c.fillText("Espace",Cw*0.85,Ch*0.50)
		c.fillText("Shift",Cw*0.85,Ch*0.67)
		c.fillText("Retour",Cw*0.85,Ch*0.86)
		c.fillText("P",Cw*0.045,Ch*0.915)
	}
}
function inputPlayerPhone(inputP){
	if ((inputP>=0&&inputP<=9)&&game.mainevent=="play") game.option.inputDirection?input=inputP+input:input=input+inputP;
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
				game.option.inputDirection?input=input.substr(1,input.length-1):input=input.slice(0,input.length-1);
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
		case "p":
			key.p=true;
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
		case "p":
			key.p=false;
			break;
		default:
			break;
		}
	}
	else {
		setTimeout(resetInput,2,inputName)
	}
}

function resetStats(){
	game.stats.score = 0;
	game.stats.clear = 0;
	game.stats.miss = 0;
	game.stats.combo = 0;
	game.stats.maxcombo = 0;
	game.stats.maxpv=0;
	game.stats.pv=0;
	game.stats.maxvies=0;
	game.stats.vies=0;
	game.stats.maxtimer=0;
	game.stats.maxtime=0;
	game.stats.timer = 0;
	game.stats.timeRep = 0;
	game.stats.timeTot = 0;
	game.stats.avgrep = 0;
	game.stats.inputT = [];
	game.stats.timerDecay = 0;
	game.battle.num1= 0;
	game.battle.num2= 0;
	game.battle.dmg = 0; 
	game.stats.level= [];
	input="";
	pass=false;
}

function resetAnim(){
	anim.lvlselect.time=1;
	anim.regenbar.time=1;
	anim.lvltransition.time=1;
	anim.lowtimer.time=1;
	anim.decaybar.time=1;
	anim.operation.time=1;
}

function RTAtimer(){
	if (game.mainevent=="play"||game.mainevent=="wait") {
		game.stats.timeTot+=msPassed;
	}
}
function ShowTimer(temps){
	let milisec = Math.floor(temps%1000/100);
	let sec = Math.floor(temps/1000);
	return sec+"."+milisec
}
function ShowTimerRes(temps){
	let milisec = Math.floor(temps%1000/100);
	let sec = Math.floor(temps/1000);
	return sec+"."+milisec
}
function convertTime(temps){
	return Math.floor(temps/60*1000)
}
function pauseGame(){
	if (key.pausecooldown==0) {
		game.prevevent=game.mainevent;
		game.mainevent="pause";
		game.prevtimer=game.timer;
		game.timer=666;
	}
	else {
		anim.pause.opa=333;
	}
}

function generatePuzzleMode1() {
	let tabsymb= [];
	if (game.battle.add) tabsymb.push("plus");
	if (game.battle.sub) tabsymb.push("moins");
	if (game.battle.mult) tabsymb.push("mult");
	game.stats.timeRep=0;
	game.battle.num1= Math.floor(Math.random()*Math.pow(10,game.battle.numopp));
	if (game.battle.num1<Math.pow(10,game.battle.numopp-1)) game.battle.num1+=Math.pow(10,game.battle.numopp-1);
	game.battle.num2= Math.floor(Math.random()*Math.pow(10,game.battle.numopp));
	if (game.battle.num2<Math.pow(10,game.battle.numopp-1)) game.battle.num2+=Math.pow(10,game.battle.numopp-1);
	game.battle.symb= tabsymb[Math.floor(Math.random()*tabsymb.length)];
	if (game.battle.symb=="mult"&& game.battle.numopp>=2) {
		if ((game.battle.numopp>=2&&game.battle.numopp<4)&&game.battle.mode=="normal"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*40)+5;
			game.battle.num2= Math.floor(Math.random()*20)+5;
		}
		else if (game.battle.numopp==2&&game.battle.mode=="hard"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*80)+5;
			game.battle.num2= Math.floor(Math.random()*20)+5;
		}
		else if (game.battle.numopp==3&&game.battle.mode=="normal"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*295)+5;
			game.battle.num2= Math.floor(Math.random()*200)+5;
		}
		else if (game.battle.numopp==3&&game.battle.mode=="normal") {
			game.battle.num1= Math.floor(Math.random()*195)+5;
			game.battle.num2= Math.floor(Math.random()*100)+5;
		}
		else if (game.battle.numopp==3&&game.battle.mode=="hard"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*495)+5;
			game.battle.num2= Math.floor(Math.random()*300)+5;
		}
		else if (game.battle.numopp==3&&game.battle.mode=="hard") {
			game.battle.num1= Math.floor(Math.random()*405)+95;
			game.battle.num2= Math.floor(Math.random()*100)+105;
		} 
		else if (game.battle.numopp==4&&game.battle.mode=="very-easy"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*9099)+900;
			game.battle.num2= Math.floor(Math.random()*9)+1;
		}
		else if (game.battle.numopp==4&&game.battle.mode=="easy"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*9099)+900;
			game.battle.num2= Math.floor(Math.random()*89)+11;
		}
		else if (game.battle.numopp==4&&game.battle.mode=="normal"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*9099)+900;
			game.battle.num2= Math.floor(Math.random()*899)+100;
		}
		else if (game.battle.numopp==4&&game.battle.mode=="hard"&&game.battle.symbnum==1) {
			game.battle.num1= Math.floor(Math.random()*9000)+999;
			game.battle.num2= Math.floor(Math.random()*9099)+900;
		}
		else if (game.battle.numopp==4&&game.battle.symbnum>1) {
			game.battle.num1= Math.floor(Math.random()*9000)+999;
			game.battle.num2= Math.floor(Math.random()*990)+9;
		}
		else {
			game.battle.num1= Math.floor(Math.random()*19+1);
			game.battle.num2= Math.floor(Math.random()*18+2);
		}
	}
	game.battle.negat=false;
	anim.operation.phase=1;
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
	anim.operation.phase=1;
}
function generatePuzzleModelvl(pass=false,starter=true) {
	anim.operation.phase=1;
	game.stats.timeRep=0;
	if (!pass&&!starter&&game.battle.skiptonext) return;
	let select = 0;
	prev.num1=game.battle.num1;
	prev.num2=game.battle.num2;
	switch (game.battle.symb){
	case "plus":
		prev.result=prev.num1+prev.num2;
		break;
	case "moins":
		prev.result=prev.num1-prev.num2;
		break;
	case "mult":
		prev.result=prev.num1*prev.num2;
		break;
	}
	if (pass) game.level.encounter.splice(game.battle.noEncounter,1);
	if (game.level.encounter.length>0) {
		if (game.battle.order=="random") select = Math.floor(Math.random()*game.level.encounter.length);
		switch (game.level.encounter[select][0]){
		case "+":
			game.battle.symb= "plus";
			break;
		case "-":
			game.battle.symb="moins";
			break;
		case "x":
			game.battle.symb="mult";
			break;
		}
		if (game.level.encounter[select][1].length==undefined) {
			game.battle.num1=game.level.encounter[select][1];
		}
		else {
			switch (game.level.encounter[select][1]) {
			case "prev1":
				game.battle.num1=prev.num1;
				break;
			case "prev2":
				game.battle.num1=prev.num2;
				break;
			case "prevR":
				game.battle.num1=prev.result;
				break;
			default:
				game.battle.num1=randomNum(game.level.encounter[select][1][0],game.level.encounter[select][1][1]);
				break;
			}
		}
		if (game.level.encounter[select][2].length==undefined) {
			game.battle.num2=game.level.encounter[select][2];
		}
		else {
			switch (game.level.encounter[select][2]) {
			case "prev1":
				game.battle.num2=prev.num1;
				break;
			case "prev2":
				game.battle.num2=prev.num2;
				break;
			case "prevR":
				game.battle.num2=prev.result;
				break;
			default:
				game.battle.num2=randomNum(game.level.encounter[select][2][0],game.level.encounter[select][2][1]);
				break;
			}
		}
		game.battle.noEncounter=select;
		game.battle.negat=false;
	}
	else {
		game.mainevent="finish";
		game.event="begin";
	}
}
function generatePuzzleArcade() {
	let select = 0;
	prev.num1=game.battle.num1;
	prev.num2=game.battle.num2;
	switch (game.battle.symb){
	case "plus":
		prev.result=prev.num1+prev.num2;
		break;
	case "moins":
		prev.result=prev.num1-prev.num2;
		break;
	case "mult":
		prev.result=prev.num1*prev.num2;
		break;
	}
	if (game.battle.arcade.clear<game.battle.arcade.maxclear) {
		select = Math.floor(Math.random()*game.level.encounter.length);
		game.stats.timeRep=0;
		switch (game.level.encounter[select][0]){
		case "+":
			game.battle.symb= "plus";
			break;
		case "-":
			game.battle.symb="moins";
			break;
		case "x":
			game.battle.symb="mult";
			break;
		}
		if (game.level.encounter[select][1].length==undefined) {
			game.battle.num1=game.level.encounter[select][1];
		}
		else {
			switch (game.level.encounter[select][1]) {
			case "prev1":
				game.battle.num1=prev.num1;
				break;
			case "prev2":
				game.battle.num1=prev.num2;
				break;
			case "prevR":
				game.battle.num1=prev.result;
				break;
			default:
				game.battle.num1=randomNum(game.level.encounter[select][1][0],game.level.encounter[select][1][1]);
				break;
			}
		}
		if (game.level.encounter[select][2].length==undefined) {
			game.battle.num1=game.level.encounter[select][2];
		}
		else {
			switch (game.level.encounter[select][2]) {
			case "prev1":
				game.battle.num2=prev.num1;
				break;
			case "prev2":
				game.battle.num2=prev.num2;
				break;
			case "prevR":
				game.battle.num2=prev.result;
				break;
			default:
				game.battle.num2=randomNum(game.level.encounter[select][2][0],game.level.encounter[select][2][1]);
				break;
			}
		}
		game.battle.negat=false;
	}
	else if (game.battle.arcade.clear>=game.battle.arcade.maxclear){
		game.mainevent="switchmode";
		game.event="toregen"
	}
	anim.operation.phase=1;
}

function validatePuzzle() {
	let validate = false;
	let maxtimer = get_maxtimerdecay(game.stats.maxtimer,game.stats.maxtimer*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))));
	let result = 0;
	let dmg=0;
	let bonustime=0;
	let timerB=0;
	if (game.battle.negat) input=input*-1;
	switch (game.battle.symb) {
	case "plus":
		result = game.battle.num1+game.battle.num2
		if (result==input) validate=true;
		break;
	case "moins":
		result = game.battle.num1-game.battle.num2
		if (result==input) validate=true;
		break;
	case "mult":
		result = game.battle.num1*game.battle.num2
		if (result==input) validate=true;
		break;
	}
	game.stats.inputT.push(game.stats.timeRep)
	timerB=(game.stats.timer+game.stats.timeRep)/1000;
	if (validate) {
		game.stats.combo++;
		game.stats.clear++;
		let score = 200-game.stats.timeRep/convertTime(2-game.setbtl.dif+game.battle.numopp+game.battle.symbnum);
		if (score<50) score=50;
		score = Math.floor(score*checkCombo(game.stats.combo))
		game.stats.score+= score;
		game.battle.score= score;
		if (game.battle.mode=="very-easy"||game.battle.mode=="easy") {
			bonustime = convertTime(Math.floor((300-game.stats.clear)*(game.setbtl.dif*2/3+game.battle.numopp/3+game.battle.symbnum/3)));
		} else {
			bonustime = convertTime(Math.floor((240-game.stats.clear)*(game.setbtl.dif*2/3+game.battle.numopp/3+game.battle.symbnum/3)));
		}
		if (bonustime<1500) bonustime=1500;
		game.stats.timer+=bonustime;
		if (game.stats.timer>game.stats.maxtimer-game.stats.maxtimer*(0.33*(game.stats.clear/200*(game.setbtl.dif/1)))) game.stats.timer=Math.floor(game.stats.maxtimer-game.stats.maxtimer*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))));
	} else {
		game.stats.miss++;
		bonustime = convertTime(Math.floor(120*(3-game.setbtl.dif)+60*game.stats.clear/100)*-1);
		if (bonustime<=6000) bonustime=-6000;
		game.stats.timer+=bonustime;
		if (game.stats.timer<0) game.stats.timer=0;
		if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
		game.stats.combo=0;
		game.battle.score=0;
	}
	game.stats.level.push(new statsoperation(game.battle.num1,game.battle.num2,get_symb(game.battle.symb),(validate?result:input),result,game.stats.timeRep/1000,dmg*-1,get_hp(game.stats.maxvies,game.stats.maxpv,game.stats.vies,game.stats.pv),maxtimer,timerB,get_timer(game.stats.maxtime,game.stats.maxtimer,game.stats.time,game.stats.timer),bonustime/1000,(validate?game.stats.clear:game.stats.clear+1),validate))
	anim.operation.phase=4;
	return validate
}
function validatePuzzle2() {
	let validate = false;
	let maxtimer = get_maxtimerdecay(game.stats.maxtimer,game.stats.timerDecay);
	let result = 0;
	let dmg=0;
	let timerB=0;
	if (game.battle.negat) input=input*-1;
	switch (game.battle.symb) {
	case "plus":
		result = game.battle.num1+game.battle.num2
		if (result==input) validate=true;
		break;
	case "moins":
		result = game.battle.num1-game.battle.num2
		if (result==input) validate=true;
		break;
	case "mult":
		result = game.battle.num1*game.battle.num2
		if (result==input) validate=true;
		break;
	}
	game.stats.inputT.push(game.stats.timeRep)
	timerB=(game.stats.timer+game.stats.timeRep)/1000;
	if (validate && game.stats.timer>0) {
		game.stats.combo++;
		game.stats.clear++;
		let score = 200-game.stats.timeRep/50;
		if (score<50) score=50;
		score = Math.floor(score*checkCombo(game.stats.combo))
		game.stats.score+= score;
		game.battle.score= score;
		if (game.stats.clear%game.battle.decaystep==0 && game.stats.timerDecay<game.stats.maxtimer*0.5) game.stats.timerDecay+=1000;
		if (game.stats.clear%game.battle.regenstep==0 && game.stats.pv<game.stats.maxpv) game.stats.pv+=game.battle.regen;
		if (game.stats.pv>game.stats.maxpv) game.stats.pv=game.stats.maxpv;
		game.battle.rangemin+=game.battle.rangeminstep;
		game.battle.rangemax+=game.battle.rangemaxstep;
	} else {
		game.stats.miss++;
		if (game.stats.timer==0) {
			dmg=game.battle.timerhplose;
			game.stats.pv-=dmg;
			game.battle.dmg+=dmg;
		}
		else {
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
	game.stats.level.push(new statsoperation(game.battle.num1,game.battle.num2,get_symb(game.battle.symb),(validate?result:input),result,game.stats.timeRep/1000,dmg*-1,get_hp(game.stats.maxvies,game.stats.maxpv,game.stats.vies,game.stats.pv),maxtimer,timerB,get_timer(game.stats.maxtime,game.stats.maxtimer,game.stats.time,game.stats.timer),0,(validate?game.stats.clear:game.stats.clear+1),validate))
	anim.operation.phase=4;
	return validate
}
function validatePuzzlelvl() {				//A modifier
	let validate = false;
	let maxtimer = get_maxtimerdecay(game.stats.maxtimer,game.stats.timerDecay);
	let result = 0;
	let dmg=0
	let bonustime=0;
	let timerB=0;
	if (game.battle.negat) input=input*-1;
	switch (game.battle.symb) {
	case "plus":
		result = game.battle.num1+game.battle.num2
		if (result==input) validate=true;
		break;
	case "moins":
		result = game.battle.num1-game.battle.num2
		if (result==input) validate=true;
		break;
	case "mult":
		result = game.battle.num1*game.battle.num2
		if (result==input) validate=true;
		break;
	}
	game.stats.inputT.push(game.stats.timeRep)
	timerB=(game.stats.timer+game.stats.timeRep)/1000;
	if (validate) {
		game.stats.combo++;
		game.stats.clear++;
		if (game.battle.gamemode!="boss")game.battle.left--;
		let score = 200-game.stats.timeRep/50;
		if (score<50) score=50;
		score = Math.floor(score*checkCombo(game.stats.combo))
		game.stats.score+= score;
		game.battle.score= score;
		if (game.battle.decaystep>0){
			if (game.stats.clear%game.battle.decaystep==0 && game.stats.timerDecay<game.stats.maxtimer*0.5) game.stats.timerDecay+=game.battle.decaytimer;
		}
/*		if (game.stats.clear%game.battle.regenstep==0 && game.stats.pv<game.stats.maxpv) game.stats.pv+=game.battle.regen;
		if (game.stats.pv>game.stats.maxpv) game.stats.pv=game.stats.maxpv;*/
		game.battle.rangemin+=game.battle.rangeminstep;
		game.battle.rangemax+=game.battle.rangemaxstep;
	} else {
		game.stats.miss++;
		if (game.stats.timer==0) {
			if (game.stats.maxpv>0) {
				dmg=game.battle.timerhplose;
				game.stats.pv-=dmg;
				game.battle.dmg+=dmg;
			}
			if (game.stats.maxvies>0) {
				dmg=1;
				game.stats.vies--;
				game.battle.dmg++;
			}
		}
		else {
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
			if (game.stats.maxpv>0) {
				game.stats.pv-=dmg;
				game.battle.dmg+=dmg;
			}
			if (game.stats.maxvies>0) {
				dmg=-1;
				game.stats.vies--;
				game.battle.dmg++;
			}
		}
		if (game.stats.pv<0) game.stats.pv=0;
		if (game.battle.dmg>game.stats.maxpv) game.battle.dmg=game.stats.maxpv;
		if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
		game.stats.combo=0;
		game.battle.score=0;
	}
	bonustime=game.stats.maxtimer-game.stats.timerDecay;
	game.stats.timer=bonustime;
	game.stats.level.push(new statsoperation(game.battle.num1,game.battle.num2,get_symb(game.battle.symb),(validate?result:input),result,game.stats.timeRep/1000,dmg*-1,get_hp(game.stats.maxvies,game.stats.maxpv,game.stats.vies,game.stats.pv),maxtimer,timerB,get_timer(game.stats.maxtime,game.stats.maxtimer,game.stats.time,game.stats.timer),(game.stats.maxtimer>0?bonustime/1000:-1),(validate?game.stats.clear:game.stats.clear+1),validate))
	anim.operation.phase=4;
	return validate
}
function validatePuzzleArcade() {
	let validate = false;
	let maxtimer = get_maxtimerdecay(game.stats.maxtimer,game.stats.timerDecay);
	let result = 0;
	let dmg=0;
	let bonustime=0;
	let timerB=0;
	if (game.battle.negat) input=input*-1;
	switch (game.battle.symb) {
	case "plus":
		result = game.battle.num1+game.battle.num2
		if (result==input) validate=true;
		break;
	case "moins":
		result = game.battle.num1-game.battle.num2
		if (result==input) validate=true;
		break;
	case "mult":
		result = game.battle.num1*game.battle.num2
		if (result==input) validate=true;
		break;
	}
	game.stats.inputT.push(game.stats.timeRep)
	timerB=(game.stats.timer+game.stats.timeRep)/1000;
	if (validate) {
		game.stats.combo++;
		game.stats.clear++;
		game.battle.arcade.clear++;
		
		let score = Math.floor((200-game.stats.timeRep/50)*((game.battle.arcade.level+1)/3));
		if (score<30) score=30;
		game.stats.score+= score;
		game.battle.score= score;

		if (game.battle.arcade.phase=="regen") {
			if (game.battle.arcade.clear%10==0) {
				game.battle.arcade.regenlvl++;
				if (game.battle.arcade.regenlvl>9) game.battle.arcade.regenlvl=9;
				game.level.encounter=JSON.parse(JSON.stringify(arcade[game.battle.arcade.regenlvl].level))
			}
			if (game.stats.vies==game.stats.maxvies) {
				game.stats.timerDecay+=760;
				if (game.stats.timerDecay>game.stats.maxtimer*0.8) game.stats.timerDecay=game.stats.maxtimer*0.8;
			}
			else {
				game.battle.arcade.regen++;
				if (game.battle.arcade.regen==10) {game.stats.vies++;game.battle.arcade.regen=0}
			}
		}
		game.battle.arcade.phase=="normal"? bonustime = Math.floor(game.battle.arcade.gaintimer/1666*game.stats.maxtimer): bonustime = game.stats.maxtimer-game.stats.timerDecay;
		game.stats.timer+=bonustime;
		if (game.stats.timer>game.stats.maxtimer) game.stats.timer=game.stats.maxtimer;
		if (game.stats.timer>game.stats.maxtimer-game.stats.timerDecay) game.stats.timer=game.stats.maxtimer-game.stats.timerDecay;
	} 
	else {
		game.stats.miss++;
		game.battle.arcade.phase=="normal"? bonustime = Math.floor(game.battle.arcade.gaintimer/3333*game.stats.maxtimer): bonustime = game.stats.maxtimer-game.stats.timerDecay;

		game.stats.timer+=bonustime;
		if (game.stats.timer<game.stats.maxtimer*0.33) game.stats.timer=Math.floor(game.stats.maxtimer*0.33);
		if (game.stats.timer>game.stats.maxtimer) game.stats.timer=game.stats.maxtimer;
		if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
		game.stats.combo=0;
		game.battle.score=0;

		if(game.battle.arcade.phase=="normal"){game.stats.vies--}
		else {
			game.mainevent="switchmode";
			game.event="tonormal"
		}
	}

	game.stats.level.push(new statsoperation(
		game.battle.num1,
		game.battle.num2,
		get_symb(game.battle.symb),
		(validate?result:input),
		result,
		game.stats.timeRep/1000,
		dmg*-1,
		get_hp(game.stats.maxvies,game.stats.maxpv,game.stats.vies,game.stats.pv),
		maxtimer,
		timerB,
		get_timer(game.stats.maxtime,game.stats.maxtimer,game.stats.time,game.stats.timer),
		bonustime/1000,
		(validate?game.stats.clear:game.stats.clear+1),
		validate
	))
	anim.operation.phase=4;
	return validate
}
function get_symb(symb){
	switch(symb) {
	case "plus":
		return "+";
		break;
	case "moins":
		return "-";
		break;
	case "mult":
		return "x";
		break;
	default:
		break;
	}
}
function get_hp(modelife,modehp,life,hp){
	if (modehp>0) {
		return hp
	}
	else if (modelife>0){
		return life
	}
	else {
		return -1
	}
}
function get_maxhp(maxlife,maxhp){
	if (maxhp>0) {
		return maxhp
	}
	else if (maxlife>0){
		return maxlife
	}
	else {
		return -1
	}
}
function get_timer(maxtime,maxtimer,time,timer){
	if (maxtime>0) {
		return time/1000
	}
	else if (maxtimer>0){
		return timer/1000
	}
	else {
		return 0
	}
}
function get_maxtimerdecay(maxtimer,decay){
	if (maxtimer>0) {
		return (Math.floor(maxtimer-decay))/1000
	}
	else {
		return 0
	}
}
function drawEntity(){
	updateEntity()
	c.globalAlpha=anim.entity.opacity/100;
	c.save()
	c.translate(Cw*0.5,Ch*0.43)
	c.rotate(anim.entity.rotation*Math.PI/180)
	c.drawImage(entity,0-anim.entity.size/2,0-anim.entity.size/2,anim.entity.size,anim.entity.size)
	c.restore()
}
function updateEntity(){
	anim.entity.rotation=(anim.entity.rotation+msPassed/10)%360;
	switch(anim.entity.phase){
	case -3:
		anim.entity.size=15;
		anim.entity.phase=-2;
		anim.entity.opacity=100;
		break;
	case -2:
		anim.entity.size+=msPassed*2;
		break;
	case -1:
		anim.entity.size+=msPassed*4;
		break;
	case 0:
		anim.entity.size=1;
		anim.entity.opacity=100;
		break;
	case 1:
		anim.entity.opacity=100;
		anim.entity.size+=msPassed/7;
		if (anim.entity.size>80) {anim.entity.size=80;anim.entity.phase=1.5}
		break;
	case 1.5:
		anim.entity.size-=msPassed/30;
		if (anim.entity.size<70) anim.entity.size=70;
		break;
	case 2:
		anim.entity.size+=msPassed/7;
		if (anim.entity.size>150) {anim.entity.size=150;anim.entity.phase=2.5}
		break;
	case 2.5:
		anim.entity.size-=msPassed/30;
		if (anim.entity.size<130) anim.entity.size=130;
		break;
	case 3:
		anim.entity.size+=msPassed/7;
		if (anim.entity.size>200) {anim.entity.size=200;anim.entity.phase=3.5}
		break;
	case 3.5:
		anim.entity.size-=msPassed/20;
		if (anim.entity.size<180) anim.entity.size=180;
		break;
	case 4:
		anim.entity.size-=msPassed/100;
		if (anim.entity.size<170) {anim.entity.size=170;anim.entity.phase=5}
		break;
	case 5:
		anim.entity.size+=msPassed/100;
		if (anim.entity.size>180) {anim.entity.size=180;anim.entity.phase=4}
		break;
	case 6:
		anim.entity.size-=msPassed/70;
		if (anim.entity.size<140) anim.entity.size=140;
		break;
	case 7:
		anim.entity.size+=msPassed*1.5;
		anim.entity.opacity-=msPassed*0.8;
		if (anim.entity.opacity<0) anim.entity.phase=8;
		break;
	case 8:
		anim.entity.size=0;
		anim.entity.opacity=0;
		break;
	}
}
function drawBurst(){
	updateBurst()
	if (anim.burst.phase==0) return;
	c.save()
	c.translate(Cw*0.5,Ch*0.43)
	c.rotate(anim.burst.rotation1*Math.PI/180)
	c.globalAlpha=anim.burst.opacity1/100;
	c.drawImage(blast,-3.5,8,7,120)
	c.restore()
	c.save()
	c.translate(Cw*0.5,Ch*0.43)
	c.rotate((anim.burst.rotation2)*Math.PI/180)
	c.globalAlpha=anim.burst.opacity2/100;
	c.drawImage(blast,-8,10,16,180)
	c.restore()
	c.save()
	c.translate(Cw*0.5,Ch*0.43)
	c.rotate((anim.burst.rotation3)*Math.PI/180)
	c.globalAlpha=anim.burst.opacity3/100;
	c.drawImage(blast,-13,0,26,200)
	c.restore()
	c.globalAlpha=anim.burst.opacity/100;
	c.drawImage(burst,Cw*0.5-(burst.width*anim.burst.ratio)/2,Ch*0.425-(burst.height*anim.burst.ratio)/2,burst.width*anim.burst.ratio,burst.height*anim.burst.ratio)
}
function updateBurst(){
	let an=anim.burst;
	an.rotation1=(an.rotation1+msPassed/14)%360;
	an.rotation2=(an.rotation2-msPassed/30)%360;
	an.rotation3=(an.rotation3+msPassed/100)%360;
	switch(an.phase){
	case 0:
		an.opacity1=0;
		an.opacity2=0;
		an.opacity3=0;
		an.opacity=0;
		an.ratio=0.1;
		break;
	case 1:
		an.opacity1+=msPassed/3;
		if (an.opacity1>100) an.phase=2;
		break;
	case 2:
		an.opacity2+=msPassed/3;
		if (an.opacity2>100) an.phase=3;
		break;
	case 3:
		an.opacity3+=msPassed/3;
		if (an.opacity3>100) {an.timer=620;an.phase=4}
		break;
	case 4:
		an.timer-=msPassed;
		if (an.timer<0) {
			an.opacity1=0;
			an.opacity2=0;
			an.opacity3=0;
			an.opacity=100;
			an.phase=5;
			anim.entity.phase=7;
		}
		break;
	case 5:
		an.ratio+=msPassed/60;
		if (an.ratio>3) an.phase=6;
		break;
	case 6:
		an.ratio+=msPassed/200;
		an.opacity-=msPassed/6;
		if (an.opacity<0) {
			an.opacity=0;
			an.phase=0;
		}
	}
}

function drawPuzzle(){
	updatePuzzle()
	c.textAlign="center";
	game.inputType=="phone" ? c.font = '28px monospace': c.font = '30px monospace';
	c.shadowColor="white";
	c.shadowBlur=6+anim.operation.time/320;
	c.globalAlpha=anim.operation.opacity/200;
	switch(game.battle.symb) {
	case "plus":
		c.drawImage(btl_plus,Cw*0.5-anim.operation.size/2,Ch*0.43-anim.operation.size/2,anim.operation.size,anim.operation.size)
		c.fillStyle ="black";
		c.shadowBlur=7;
		c.globalAlpha=1;
		numfillplace(Cw*0.47,Ch*0.405,game.battle.num1,30,"end",5,"black",true)
		numfillplace(Cw*0.5,Ch*0.39,"+",40,"center",0,"black",true)
		numfillplace(Cw*0.53,Ch*0.405,game.battle.num2,30,"start",5,"black",true)
		break;
	case "moins":
		c.drawImage(btl_moins,Cw*0.5-anim.operation.size/2,Ch*0.43-anim.operation.size/2,anim.operation.size,anim.operation.size)
		c.fillStyle ="black";
		c.shadowBlur=7;
		c.globalAlpha=1;
		numfillplace(Cw*0.47,Ch*0.405,game.battle.num1,30,"end",5,"black",true)
		numfillplace(Cw*0.5,Ch*0.39,"-",40,"center",0,"black",true)
		numfillplace(Cw*0.53,Ch*0.405,game.battle.num2,30,"start",5,"black",true)
		break;
	case "mult":
		c.drawImage(btl_mult,Cw*0.5-anim.operation.size/2,Ch*0.43-anim.operation.size/2,anim.operation.size,anim.operation.size)
		c.fillStyle ="black";
		c.shadowBlur=7;
		c.globalAlpha=1;
		numfillplace(Cw*0.47,Ch*0.405,game.battle.num1,30,"end",5,"black",true)
		numfillplace(Cw*0.5,Ch*0.39,"x",40,"center",0,"black",true)
		numfillplace(Cw*0.53,Ch*0.405,game.battle.num2,30,"start",5,"black",true)
		break;
	}
	c.shadowColor="none";
	c.shadowBlur=0;
}
function updatePuzzle(){
	switch (anim.operation.phase){
	case 0:
		anim.operation.size=0;
		break;
	case 1:
		anim.operation.size=0;
		anim.operation.opacity=200;
		anim.operation.phase=2;
		break;
	case 2:
		anim.operation.size+=msPassed;
		if(anim.operation.size>150) anim.operation.phase=3;
		break;
	case 3:
		anim.operation.size=150;
		break;
	case 4:
		anim.operation.opacity-=msPassed;
		anim.operation.size+=msPassed*0.8;
		if (anim.operation.opacity<0) {
			anim.operation.opacity=0;
			anim.operation.phase=0;
		}
		break;
	}
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
		return 1
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
function colorCombo(combo){
	if (combo<10) {
		return "black"
	}
	else if (combo<15) {
		return "combo"
	}
	else if (combo<30) {
		return "combo2"
	}
	else if (combo<50) {
		return "combo3"
	}
	else if (combo<75) {
		return "combo4"
	}
	else if (combo<150) {
		return "combo5"
	}
	else if (combo<200) {
		return "combo6"
	}
	else {
		return "combo7"
	}
}
function colorComboArcade(combo){
	if (combo<10) {
		return "black"
	}
	else if (combo<15) {
		return "combo2"
	}
	else if (combo<30) {
		return "combo4"
	}
	else if (combo<50) {
		return "combo5"
	}
	else if (combo<75) {
		return "combo6"
	}
	else {
		return "combo7"
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
	return avg/1000
}
function registerScore(score){
	if (score>saves.levels[game.level.world][game.level.stage].score) {
		saves.levels[game.level.world][game.level.stage].score=score;
	}
	saveUpdate()
}

function showbackground(){
	if (game.option.bckgrndOpacity>0) {
		//réduction du timer avant nouvelle création d'animation de fond
		if (anim.background.timer>0)anim.background.timer-=msPassed;
		//création des animations de fond
		switch(anim.background.type){
		case 0:
			if (anim.background.timer<=0) {
				anim.background.timer=Math.floor(Math.random()*830+500)
				anim.background.stock.push(new bckgrnd1(Math.random()*Cw,Math.random()*1+0.2,Math.random()*2+2.5,Math.random()*60+20))
			}
			break;
		case 1:
			if (anim.background.timer<=0) {
				anim.background.timer=Math.floor(Math.random()*83+250)
				anim.background.stock.push(new bckgrnd2(Math.random()*Cw*0.9+10,Math.random()*Ch*0.9+5,Math.random()*4+2,Math.random()*50+30))
			}
			break;
		case 2:
			if (anim.background.timer<=0) {
				anim.background.timer=Math.floor(Math.random()*500+665)
				anim.background.stock.push(new bckgrnd3(Math.random()*Cw-10,Math.random()*Ch,Math.random()*12+20,Math.random()*10+10))
			}
			break;
		case 3:
			if (anim.background.timer<=0) {
				anim.background.timer=Math.floor(Math.random()*166+332)
				anim.background.stock.push(new bckgrnd4(Math.random()*Cw,Math.random()*0.4+0.2,Math.random()*1.5+2,Math.random()*45+45,Math.random()*12+8))
			}
			break;
		case 9:
			if (anim.background.timer<=0) {
				anim.background.timer=130;
				anim.background.stock.push(new bckgrnd10(Math.floor(Math.random()*4),Math.floor(Math.random()*12+14),Math.floor(Math.random()*5+10)))
			}
			break;
		case 10:
			if (anim.background.timer<=0) {
				anim.background.timer=Math.floor(Math.random()*322+1322);
				anim.background.stock.push(new bckgrnd11())
			}
			break;
		}
		//Update
		if (anim.background.stock.length>0) {
			for (var i = anim.background.stock.length - 1; i >= 0; i--) {
				anim.background.stock[i].update(nbFramePassed)
				anim.background.stock[i].destroy?anim.background.stock.splice(i,1):anim.background.stock[i].show();
			}
		}
	}
}

class bckgrnd1{
	constructor(posX,spd,size,opa){
		this.posX=posX;
		this.posY=Ch+size;
		this.speed=spd;
		this.size=size;
		this.opacity=opa;
		this.destroy=false;
	}
	update(mult){
		this.posY-=(this.speed*anim.background.speed)*mult;
		if (this.posY<-10) this.destroy=true;
	}
	show(){
		c.shadowColor="white";
		c.shadowBlur=10;
		c.globalAlpha=this.opacity/100*(game.option.bckgrndOpacity/100);
		c.fillStyle= "white";
		c.beginPath()
		c.arc(this.posX,this.posY,this.size,0,Math.PI*2)
		c.fill()
		c.closePath()
		c.shadowColor="";
		c.shadowBlur=0;
	}
}
class bckgrnd2{
	constructor(posX,posY,size,opamax){
		this.posX=posX;
		this.posY=posY;
		this.size=size;
		this.opacity=0;
		this.MAXopacity=opamax;
		this.invert=false;
		this.destroy=false;
	}
	update(mult){
		this.invert ? this.opacity-=0.7*anim.background.speed*mult:this.opacity+=0.7*anim.background.speed*mult;
		this.posY+=0.1*anim.background.speed*mult;
		if (this.opacity<0) this.opacity=0;
		if (this.opacity>100) this.opacity=100;
		if (this.opacity>=this.MAXopacity) this.invert=true;
		if (this.opacity<=0&&this.invert) this.destroy=true;
	}
	show(){
		c.shadowColor="white";
		c.shadowBlur=5;
		c.globalAlpha=this.opacity/100*(game.option.bckgrndOpacity/100);
		c.fillStyle= "white";
		c.beginPath()
		c.arc(this.posX,this.posY,this.size,0,Math.PI*2)
		c.fill()
		c.closePath()
		c.shadowColor="";
		c.shadowBlur=0;
	}
}
class bckgrnd3{
	constructor(posX,posY,size,opamax){
		this.posX=posX;
		this.posY=posY;
		this.size=size;
		this.opacity=0;
		this.MINopacity=8;
		this.MAXopacity=opamax;
		this.invert=false;
		this.destroy=false;
	}
	update(mult){
		if (this.opacity<this.MINopacity&&!this.invert) this.opacity+=0.05*anim.background.speed*mult;
		this.invert ? this.opacity-=0.1*anim.background.speed*mult:this.opacity+=0.01*anim.background.speed*mult;
		this.posX+=0.05*anim.background.speed*mult;
		if (this.opacity<0) this.opacity=0;
		if (this.opacity>100) this.opacity=100;
		if (this.opacity>=this.MAXopacity) this.invert=true;
		if (this.opacity<=0&&this.invert) this.destroy=true;
	}
	show(){
		c.shadowColor="white";
		c.shadowBlur=30;
		c.globalAlpha=this.opacity/100*(game.option.bckgrndOpacity/100);
		c.fillStyle= "white";
		c.beginPath()
		c.arc(this.posX,this.posY,this.size,0,Math.PI*2)
		c.fill()
		c.closePath()
		c.shadowColor="";
		c.shadowBlur=0;
	}
}
class bckgrnd4{
	constructor(posX,spd,size,opa,offX){
		this.posX=posX;
		this.posY=Ch+size;
		this.speed=spd;
		this.size=size;
		this.opacity=opa;
		this.offsetX=offX;
		this.time=1;
		this.invert=false;
		this.decay=false;
		this.destroy=false;
	}
	update(mult){
		this.posY-=this.speed*anim.background.speed*mult;
		this.invert ?this.time-=0.07*anim.background.speed*mult:this.time+=0.07*anim.background.speed*mult;
		if (this.time>=180||this.time<=0) this.invert=!this.invert;
		if (this.posY<Ch*0.6) this.decay=true;
		if (this.decay) this.opacity-=1*mult;
		if (this.opacity<0) this.opacity=0;
		if (this.opacity>100) this.opacity=100;
		if (this.opacity<=0) this.destroy=true;
	}
	show(){
		c.shadowColor="white";
		c.shadowBlur=10;
		c.globalAlpha=this.opacity/100*(game.option.bckgrndOpacity/100);
		c.fillStyle= "white";
		c.beginPath()
		c.arc(this.posX+Math.cos(this.time),this.posY,this.size,0,Math.PI*2)
		c.fill()
		c.closePath()
		c.shadowColor="";
		c.shadowBlur=0;
	}
}
class bckgrnd10{
	constructor(side,spd,size){
		switch(side){
		case 0:
			this.posY=-50;
			this.posX=Math.random()*(1.3-0.3)*Cw;
			break;
		case 1:
			this.posX=Cw+50;
			this.posY=Math.random()*(1.3-0.3)*Ch;
			break;
		case 2:
			this.posY=Ch+50;
			this.posX=Math.random()*(1.3-0.3)*Cw;
			break;
		case 3:
			this.posX=-50;
			this.posY=Math.random()*(1.3-0.3)*Ch;
			break;
		}
		this.speed=spd;
		this.size=size;
		this.opacity=50;
		this.destroy=false;
	}
	update(mult){
		this.posX+=(Cw/2-this.posX)/(50-this.speed)*anim.background.speed*mult;
		this.posY+=(Ch*0.43-this.posY)/(50-this.speed)*anim.background.speed*mult;
		this.size/=1.05*anim.background.speed*mult;
		if (this.posX>Cw/2-10&&this.posX<Cw/2+10&&this.posY>Ch*0.43-10&&this.posY<Ch*0.43+10) {
			this.destroy=true;
		}
	}
	show(){
		c.shadowColor="white";
		c.shadowBlur=5;
		c.globalAlpha=this.opacity/100*(game.option.bckgrndOpacity/100);
		c.fillStyle= "white";
		c.beginPath()
		c.arc(this.posX,this.posY,this.size,0,Math.PI*2)
		c.fill()
		c.closePath()
		c.shadowColor="";
		c.shadowBlur=0;
	}
}
class bckgrnd11{
	constructor(){
		this.posX=Cw*0.5;
		this.posY=Ch*0.43;
		this.size=Cw*0.75;
		this.width=30;
		this.opacity=65;
		this.time=1;
		this.decay=false;
		this.destroy=false;
	}
	update(mult){
		this.size-=Cw*0.005*mult;
		this.width-=0.2*mult;
		this.opacity-=0.3*mult;
		if (this.size<Cw*0.01) {
			this.destroy=true;
		}
	}
	show(){
		c.shadowColor="white";
		c.shadowBlur=10;
		c.lineWidth=this.width;
		c.globalAlpha=this.opacity/100*(game.option.bckgrndOpacity/100);
		c.strokeStyle= "white";
		c.beginPath()
		c.arc(this.posX,this.posY,this.size,0,Math.PI*2)
		c.stroke()
		c.closePath()
		c.shadowColor="";
		c.shadowBlur=0;
		c.lineWidth=1;
		c.globalAlpha=1;
	}
}

class statsoperation{
	constructor(num1,num2,optype,inputP,res,time,HPlost,HPleft,maxtimer,timerB,timerleft,bonustime,opleft,valide){
		this.num1 = num1;
		this.num2 = num2;
		this.optype = optype;
		this.inputP = inputP;
		this.result = res;
		this.timeResp = time;
		this.HPlost = HPlost;
		this.HPleft = HPleft;
		this.maxtimer = maxtimer;
		this.timerB = timerB;
		this.timerleft = timerleft;
		this.bonustime = bonustime;
		this.opleft = opleft;
		this.valide = valide;
	}
}
function checkSave(){
	let update =false;
	var actualSave;
	if (localStorage.getItem("save")!=null) {
		actualSave = JSON.parse(localStorage.save.toString());
		let lvlcount = 0;
		let count = [];
		for (lvlcount; lvlcount <10; lvlcount++) {
			if (actualSave.levels[lvlcount+1]!==undefined){
				for (let i = 1; i <100; i++) {
					if (actualSave.levels[lvlcount+1][i]!==undefined) count[lvlcount]=i;
				}
			} else {
				break;
			}
		}
		for (let i = 0;i<count.length;i++){
			if (count[i]<levels[i+1].nblvl) {
				let addlvl = levels[i+1].nblvl-count[i];
				//console.log(addlvl)
				if (addlvl>0) update=true;
			}
		}
		if(update){ return 1 }
		else {return 0}
	}
	else {
		return 2
	}
}
function majSave(){
	var actualSave;
	if (localStorage.getItem("save")!=null) {
		actualSave = JSON.parse(localStorage.save.toString());
	}
	else {
		actualSave={levels:{}};
	}
	let lvlcount = 1;
	let count = [];
	for (lvlcount; lvlcount <10; lvlcount++) {
		if (actualSave.levels[lvlcount]!==undefined){
			for (let i = 1; i <100; i++) {
				if (actualSave.levels[lvlcount][i]!==undefined) count[lvlcount-1]=i;
			}
		}else {
			break;
		}
	}
	if (count[0]==null) {
		count[0]=0
	}
	for (let i = 0;i<levels.nblvl;i++){
			if (actualSave.levels[i+1]==null) (actualSave.levels[i+1]={})
			if (count[i]<levels[i+1].nblvl) {
			let addlvl = levels[i+1].nblvl-count[i];
			for (let j=0; j < addlvl; j++) {
				actualSave.levels[i+1][count[i]+j+1]= {
					score:0,
					perfect:false,
					clear: false,
				}
			}
		}
	}
	saves = actualSave
	saveUpdate()
}

function saveUpdate(){
	if (!game.nosave) {
		localStorage.setItem("save",JSON.stringify(saves))
	}
}
function optionsUpdate(){
	if (!game.nosave) {
		localStorage.setItem("option",JSON.stringify(game.option))
	}
}
function optionsLoad(){
	if (localStorage.getItem("option")!==null) {
		game.option=JSON.parse(localStorage.option.toString());
		if (game.option.showfps==undefined) {
			game.option.showfps=true;
			game.option.inputDirection=false;
			optionsUpdate()
		}
		if (game.option.font==undefined) {
			game.option.font="all";
			optionsUpdate()
		}
	}
	setAnimationOptions(game.option.animation)
}
function setAnimationOptions(opt){
	anim.decaybar.mode=opt;
	anim.lowtimer.mode=opt;
	anim.regenbar.mode=opt
}

function mirrorDraw(img,initx,inity,cropx,cropy,posx,posy,width,height){
	c.save()
	c.translate(c.width,0);
	c.scale(-1,1)
	c.drawImage(img,initx,inity,cropx,cropy,-posx,posy,width,height)
	c.restore()
}

function errormsg(txt) {
	c.fillStyle="white";
	c.globalAlpha=1;
	c.textAlign="center";
	c.font = '26px monospace';
	c.fillText(txt,Cw*0.5,Ch*0.5)
}
chargement++