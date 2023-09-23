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
function showcursor(cursortype=0){
	c.fillStyle = "white";
	c.fillRect(Cw*game.menu.posx,Ch*game.menu.posy,20,20)
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
function RTAtimer(){
	if (game.mainevent=="play"||game.mainevent=="wait") {
		game.stats.timeTot++;
	}
}
function ShowTimer(temps){
	var milisec = Math.floor(temps%60*1.6665/10);
	let sec = Math.floor(temps/60);
	return sec+"."+milisec
}
function ShowTimerRes(temps){
	var milisec = Math.floor(temps%60*1.6665);
	let sec = Math.floor(temps/60);
	return sec+"."+milisec
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
}
function generatePuzzleMode2() {
	let tabsymb= [];
	if (game.battle.add) tabsymb.push("plus");
	if (game.battle.sub) tabsymb.push("moins");
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
	game.battle.negat=false;
}
function generatePuzzleModelvl() {
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
		switch (game.level.encounter[select][2].length) {
		case undefined:
			game.battle.num2=game.level.encounter[select][2];
			break;
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
		game.battle.noEncounter=select;
		game.battle.negat=false;
	}
	else {
		game.mainevent="finish";
		game.event="begin";
	}
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
	}
	game.stats.inputT.push(game.stats.timeRep)
	if (validate) {
		game.stats.combo++;
		game.stats.clear++;
		let score = 200-game.stats.timeRep/(2-game.setbtl.dif+game.battle.numopp+game.battle.symbnum);
		if (score<50) score=50;
		score = Math.floor(score*checkCombo(game.stats.combo))
		game.stats.score+= score;
		game.battle.score= score;
		let bonustime=0;
		if (game.battle.mode=="very-easy"||game.battle.mode=="easy") {
			bonustime = Math.floor((300-game.stats.clear)*(game.setbtl.dif*2/3+game.battle.numopp/3+game.battle.symbnum/3));
		} else {
			bonustime = Math.floor((240-game.stats.clear)*(game.setbtl.dif*2/3+game.battle.numopp/3+game.battle.symbnum/3));
		}
		if (bonustime<90) {bonustime=90}
		game.stats.timer+=bonustime;
		if (game.stats.timer>game.stats.maxtimer-game.stats.maxtimer*(0.33*(game.stats.clear/200*(game.setbtl.dif/1)))) game.stats.timer=Math.floor(game.stats.maxtimer-game.stats.maxtimer*(0.33*(game.stats.clear/200*(game.setbtl.dif/1))));
	} else {
		game.stats.miss++;
		let malustime = Math.floor(120*(3-game.setbtl.dif)+60*game.stats.clear/100);
		if (malustime>360) {malustime=360}
		game.stats.timer-=malustime;
		if (game.stats.timer<0) game.stats.timer=0;
		if (game.stats.combo>game.stats.maxcombo) game.stats.maxcombo=game.stats.combo;
		game.stats.combo=0;
		game.battle.score=0;
	}
	return validate
}
function validatePuzzle2() {
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
	}
	if (validate && game.stats.timer>0) {
		game.stats.inputT.push(game.stats.timeRep)
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
function validatePuzzlelvl() {
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
	}
	if (validate) {
		game.stats.inputT.push(game.stats.timeRep)
		game.stats.combo++;
		game.stats.clear++;
		if (game.battle.gamemode!="boss")game.battle.left--;
		let score = 200-game.stats.timeRep/3;
		if (score<50) score=50;
		score = Math.floor(score*checkCombo(game.stats.combo))
		game.stats.score+= score;
		game.battle.score= score;
		if (game.battle.decaystep>0){
			if (game.stats.clear%game.battle.decaystep==0 && game.stats.timerDecay<game.stats.maxtimer*0.5) game.stats.timerDecay+=game.battle.decaytimer;
		}
		game.battle.rangemin+=game.battle.rangeminstep;
		game.battle.rangemax+=game.battle.rangemaxstep;
	} else {
		game.stats.miss++;
		if (game.stats.timer==0) {
			if (game.stats.maxpv>0) {
				game.stats.pv-=game.battle.timerhplose;
				game.battle.dmg+=game.battle.timerhplose;
			}
			if (game.stats.maxvies>0) {
				game.stats.vies--;
				game.battle.dmg++;
			}
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
			if (game.stats.maxpv>0) {
				game.stats.pv-=dmg;
				game.battle.dmg+=dmg;
			}
			if (game.stats.maxvies>0) {
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
	game.stats.timer=game.stats.maxtimer-game.stats.timerDecay;
	return validate
}
function drawPuzzle(){
	c.textAlign="center";
	game.inputType=="phone" ? c.font = '28px monospace': c.font = '30px monospace';
	c.shadowColor="white";
	c.shadowBlur=6+anim.operation.time/8;
	switch(game.battle.symb) {
	case "plus":
		c.drawImage(btl_plus,Cw*0.5-75,Ch*0.43-75,150,150)
		c.fillStyle ="white";
		c.shadowBlur=7;
		c.fillText(game.battle.num1+" + "+game.battle.num2,Cw*0.5,Ch*0.455)
		c.fillStyle ="black"
		c.fillText(game.battle.num1+" + "+game.battle.num2,Cw*0.5,Ch*0.455)
		break;
	case "moins":
		c.drawImage(btl_moins,Cw*0.5-75,Ch*0.43-75,150,150)
		c.fillStyle ="white";
		c.shadowBlur=7;
		c.fillText(game.battle.num1+" - "+game.battle.num2,Cw*0.5,Ch*0.455)
		c.fillStyle ="black";
		c.fillText(game.battle.num1+" - "+game.battle.num2,Cw*0.5,Ch*0.455)
		break;
	case "mult":
		c.drawImage(btl_mult,Cw*0.5-75,Ch*0.43-75,150,150)
		c.fillStyle ="white";
		c.shadowBlur=7;
		c.fillText(game.battle.num1+" x "+game.battle.num2,Cw*0.5,Ch*0.455)
		c.fillStyle ="black";
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
	return avg/60
}
function registerScore(score){
	if (score>saves.levels[game.level.world][game.level.stage].score) {
		saves.levels[game.level.world][game.level.stage].score=score;
	}
}
function showbackground(){
	if (game.option.bckgrndOpacity>0) {
		if (anim.background.timer>0)anim.background.timer--;
		switch(anim.background.type){
		case 0:
			if (anim.background.timer==0) {
				anim.background.timer=Math.floor(Math.random()*50+30)
				anim.background.stock.push(new bckgrnd1(Math.random()*Cw,Math.random()*1+0.2,Math.random()*2.5+1,Math.random()*60+20))
			}
			if (anim.background.stock.length>0) {
				for (var i = anim.background.stock.length - 1; i >= 0; i--) {
					anim.background.stock[i].update()
					anim.background.stock[i].show()
					if (anim.background.stock[i].destroy) anim.background.stock.splice(i,1)
				}
			}
			break;
		case 1:
			if (anim.background.timer==0) {
				anim.background.timer=Math.floor(Math.random()*5+15)
				anim.background.stock.push(new bckgrnd2(Math.random()*Cw*0.9+10,Math.random()*Ch*0.9+5,Math.random()*4+2,Math.random()*50+30))
			}
			if (anim.background.stock.length>0) {
				for (var i = anim.background.stock.length - 1; i >= 0; i--) {
					anim.background.stock[i].update()
					anim.background.stock[i].show()
					if (anim.background.stock[i].destroy) anim.background.stock.splice(i,1)
				}
			}
			break;
		case 2:
			if (anim.background.timer==0) {
				anim.background.timer=Math.floor(Math.random()*30+20)
				anim.background.stock.push(new bckgrnd3(Math.random()*Cw-10,Math.random()*Ch,Math.random()*12+20,Math.random()*10+10))
			}
			if (anim.background.stock.length>0) {
				for (var i = anim.background.stock.length - 1; i >= 0; i--) {
					anim.background.stock[i].update()
					anim.background.stock[i].show()
					if (anim.background.stock[i].destroy) anim.background.stock.splice(i,1)
				}
			}
			break;
		case 3:
			if (anim.background.timer==0) {
				anim.background.timer=Math.floor(Math.random()*10+20)
				anim.background.stock.push(new bckgrnd4(Math.random()*Cw,Math.random()*0.4+0.2,Math.random()*1.5+1,Math.random()*45+45,Math.random()*12+8))
			}
			if (anim.background.stock.length>0) {
				for (var i = anim.background.stock.length - 1; i >= 0; i--) {
					anim.background.stock[i].update()
					anim.background.stock[i].show()
					if (anim.background.stock[i].destroy) anim.background.stock.splice(i,1)
				}
			}
			break;
		}
	}
}
class bckgrnd1{
	constructor(posX,spd,size,opa){
		this.posX=posX;
		this.posY=Ch;
		this.speed=spd;
		this.size=size;
		this.opacity=opa;
		this.destroy=false;
	}
	update(){
		this.posY-=this.speed;
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
	update(){
		this.invert ? this.opacity-=0.7:this.opacity+=0.7;
		this.posY+=0.1;
		if (this.opacity<0) this.opacity=0;
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
	update(){
		if (this.opacity<this.MINopacity&&!this.invert) this.opacity+=0.05;
		this.invert ? this.opacity-=0.1:this.opacity+=0.01;
		this.posX+=0.05;
		if (this.opacity<0) this.opacity=0;
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
		this.posY=Ch;
		this.speed=spd;
		this.size=size;
		this.opacity=opa;
		this.offsetX=offX;
		this.time=1;
		this.invert=false;
		this.decay=false;
		this.destroy=false;
	}
	update(){
		this.posY-=this.speed;
		this.invert ?this.time-=0.07:this.time+=0.07;
		if (this.time>=180||this.time<=0) this.invert=!this.invert;
		if (this.posY<Ch*0.6) this.decay=true;
		if (this.decay) this.opacity--;
		if (this.opacity<0) this.opacity=0;
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
function errormsg(txt) {
	c.fillStyle="white";
	c.globalAlpha=1;
	c.textAlign="center";
	c.font = '26px monospace';
	c.fillText(txt,Cw*0.5,Ch*0.5)
}
chargement++