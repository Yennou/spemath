window.addEventListener('keydown', function(event){
	keypressed = event.key;
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
				case "p":
				case "P":
					key.p=true;
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
					game.option.inputDirection?input="1"+input:input=input+"1";
					break;
				case"é":
				case"2":
					game.option.inputDirection?input="2"+input:input=input+"2";
					break;
				case"\"":
				case"3":
					game.option.inputDirection?input="3"+input:input=input+"3";
					break;
				case"'":
				case"4":
					game.option.inputDirection?input="4"+input:input=input+"4";
					break;
				case"(":
				case"5":
					game.option.inputDirection?input="5"+input:input=input+"5";
					break;
				case"-":
				case"6":
					if (event.keyCode==109) {
						game.battle.negat ? game.battle.negat=false:game.battle.negat=true;
					} else {
						game.option.inputDirection?input="6"+input:input=input+"6";
					}
					break;
				case"è":
				case"7":
					game.option.inputDirection?input="7"+input:input=input+"7";
					break;
				case"_":
				case"8":
					game.option.inputDirection?input="8"+input:input=input+"8";
					break;
				case"ç":
				case"9":
					game.option.inputDirection?input="9"+input:input=input+"9";
					break;
				case"à":
				case"0":
					game.option.inputDirection?input="0"+input:input=input+"0";
					break;
				case "d":
				case "D":
				case"Backspace":
					game.option.inputDirection?input=input.substr(1,input.length-1):input=input.slice(0,input.length-1);
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
		case "p":
		case "P":
			key.p=false;
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
canvas.addEventListener('touchstart', function(event){
	if (game.inputType=="phone") {
		mouse.down=true;
		canvasPosition = canvas.getBoundingClientRect();
		mouse.x=Math.floor(Cw*((event.touches[0].clientX-canvasPosition.left)/canvasPosition.width));
		mouse.y=Math.floor(Ch*((event.touches[0].clientY-canvasPosition.top)/canvasPosition.height));
	}
})
canvas.addEventListener('touchmove', function(event){
	if (game.inputType=="phone"&&mouse.down) {
		canvasPosition = canvas.getBoundingClientRect();
		mouse.prex=mouse.x;
		mouse.prey=mouse.y;
		mouse.x=Math.floor(Cw*((event.touches[0].clientX-canvasPosition.left)/canvasPosition.width));
		mouse.y=Math.floor(Ch*((event.touches[0].clientY-canvasPosition.top)/canvasPosition.height));
		mouse.hasmove=true;
		switch(game.screen){
		case "survival":
		case "level":
		case "arcade":
			switch(game.mainevent){
			case "stats":
				switch(game.event){
				case "global":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.975&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prey-mouse.y)/10;
						if (mouse.range<-1) {
							mouse.range++;
							game.menu.target--;
						} else if (mouse.range>1) {
							mouse.range--;
							game.menu.target++;
						}
					}
					break;
				case "vies":
				case "temps":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prex-mouse.x)/10;
						if (mouse.range<-1) {
							mouse.range++;
							anim.graph.init--;
							game.menu.target--
						} else if (mouse.range>1) {
							mouse.range--;
							anim.graph.init++;
							game.menu.target++
						}
					}
					if (anim.graph.init<0) {
						anim.graph.init=0;
					}
					else if (anim.graph.init>game.menu.options-1){
						anim.graph.init=game.menu.options-1
					}
					if (game.menu.target<1) game.menu.target=1;
					if (game.menu.target>game.menu.options) game.menu.target=game.menu.options;
					break;
				}
				break;
			}
			break;
		}
	}
});
canvas.addEventListener("touchend", function(event){
	if (game.inputType=="phone") {
		mouse.down=false;
		if (!mouse.hasmove) {clicEvent()}
		mouse.hasmove=false;
		mouse.range=0;
		if (game.menu.target<1) game.menu.target=1;
		if (game.menu.target>game.menu.options) game.menu.target=game.menu.options;
	}
})

/*canvas.addEventListener('mousedown', function(event){
	if (game.inputType=="phone") {
		mouse.down=true;
		canvasPosition = canvas.getBoundingClientRect();
		mouse.x=Math.floor(Cw*((event.x-canvasPosition.left)/canvasPosition.width));
		mouse.y=Math.floor(Ch*((event.y-canvasPosition.top)/canvasPosition.height));
	}
});
canvas.addEventListener('mousemove', function(event){
	if (game.inputType=="phone"&&mouse.down) {
		canvasPosition = canvas.getBoundingClientRect();
		mouse.prex=mouse.x;
		mouse.prey=mouse.y;
		mouse.x=Math.floor(Cw*((event.x-canvasPosition.left)/canvasPosition.width));
		mouse.y=Math.floor(Ch*((event.y-canvasPosition.top)/canvasPosition.height));
		mouse.hasmove=true;
		switch(game.screen){
		case "survival":
			switch(game.mainevent){
			case "stats":
				switch(game.event){
				case "global":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.975&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prey-mouse.y)/10;
						if (mouse.range<-1) {
							mouse.range++;
							game.menu.target--;
						} else if (mouse.range>1) {
							mouse.range--;
							game.menu.target++;
						}
					}
					break;
				case "vies":
				case "temps":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prex-mouse.x)/10;
						if (mouse.range<-1) {
							mouse.range++;
							anim.graph.init--;
						} else if (mouse.range>1) {
							mouse.range--;
							anim.graph.init++;
						}
					}
					if (anim.graph.init<0) {
						anim.graph.init=0;
					}
					else if (anim.graph.init>game.menu.options-1){
						anim.graph.init=game.menu.options-1
					}
					break;
				}
				break;
			}
			break;
		case "level":
			switch(game.mainevent){
			case "stats":
				switch(game.event){
				case "global":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prey-mouse.y)/10;
						if (mouse.range<-1) {
							mouse.range++;
							game.menu.target--;
						} else if (mouse.range>1) {
							mouse.range--;
							game.menu.target++;
						}
					}
					break;
				case "vies":
				case "temps":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prex-mouse.x)/10;
						if (mouse.range<-1) {
							mouse.range++;
							anim.graph.init--;
						} else if (mouse.range>1) {
							mouse.range--;
							anim.graph.init++;
						}
					}
					if (anim.graph.init<0) {
						anim.graph.init=0;
					}
					else if (anim.graph.init>game.menu.options-1){
						anim.graph.init=game.menu.options-1
					}
					break;
				}
				break;
			}
			break;
		case "arcade":
			switch(game.mainevent){
			case "stats":
				switch(game.event){
				case "global":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prey-mouse.y)/10;
						if (mouse.range<-1) {
							mouse.range++;
							game.menu.target--;
						} else if (mouse.range>1) {
							mouse.range--;
							game.menu.target++;
						}
					}
					break;
				case "vies":
				case "temps":
					if (mouse.x>=Cw*0.025&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						mouse.range+=(mouse.prex-mouse.x)/10;
						if (mouse.range<-1) {
							mouse.range++;
							anim.graph.init--;
						} else if (mouse.range>1) {
							mouse.range--;
							anim.graph.init++;
						}
					}
					if (anim.graph.init<0) {
						anim.graph.init=0;
					}
					else if (anim.graph.init>game.menu.options-1){
						anim.graph.init=game.menu.options-1
					}
					break;
				}
				break;
			}
			break;
		}
	}
});
canvas.addEventListener('mouseup', function(event){
	if (game.inputType=="phone") {
		mouse.down=false;
		if (!mouse.hasmove) {clicEvent()}
		mouse.hasmove=false;
		mouse.range=0;
		if (game.menu.target<1) game.menu.target=1;
		if (game.menu.target>game.menu.options) game.menu.target=game.menu.options;
	}
})*/
function clicEvent(){
	switch(game.screen){
		case "init":
			switch(game.event){
			case "choix":
				if (mouse.x >= Cw*0.18 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.18+Cw*0.3 && mouse.y <= Ch*0.68+Ch*0.11) {
					majSave()
					saveUpdate()
					optionsUpdate()
					localStorage.setItem("version",version)
					game.screen="title";
					setmenu(2,"ud",0.3,0.47,0,0.09)
				}
				if (mouse.x >= Cw*0.51 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.51+Cw*0.3 && mouse.y <= Ch*0.68+Ch*0.11) {
					game.nosave=true;
					majSave()
					game.screen="title";
					setmenu(2,"ud",0.3,0.47,0,0.09)
				}
				break;
			}
			break;
		case "maj":
			switch(game.event){
			case "choix":
				if (mouse.x >= Cw*0.18 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.18+Cw*0.3 && mouse.y <= Ch*0.68+Ch*0.11) {
					majSave()
					localStorage.setItem("version",version)
					game.screen="title";
					setmenu(2,"ud",0.3,0.47,0,0.09)
				}
				if (mouse.x >= Cw*0.51 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.51+Cw*0.3 && mouse.y <= Ch*0.68+Ch*0.11) {
					resetSave();
					localStorage.setItem("version",version)
					game.screen="title";
					setmenu(2,"ud",0.3,0.47,0,0.09)
				}
				break;
			}
			break;
		case "title":
			switch(game.mainevent){
			case "mainmenu":
				if (mouse.x >= Cw*0.3 && mouse.y >= Ch*0.78 && mouse.x <= Cw*0.3+Cw*0.4 && mouse.y <= Ch*0.78+Ch*0.12) {
					game.mainevent="reset";
					setmenu(2,"lr",0.17,0.71,0.31,0);
				}
				else {
					setmenu(5,"lr",0,0,0,0);
					game.screen="hub";
				}
				break;
			case "reset":
				if (mouse.x >= Cw*0.18 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.18+Cw*0.3 && mouse.y <= Ch*0.68+Ch*0.11) {
					majSave()
					game.mainevent="mainmenu";
					setmenu(2,"ud",0.3,0.47,0,0.09)
				}
				if (mouse.x >= Cw*0.51 && mouse.y >= Ch*0.68 && mouse.x <= Cw*0.51+Cw*0.3 && mouse.y <= Ch*0.68+Ch*0.11) {
					resetSave();
					game.mainevent="mainmenu";
					setmenu(2,"ud",0.3,0.47,0,0.09)
				}
				break;
			default:
				break;
			}
			break;
		case "hub":
			if (mouse.x >= Cw*0.08 && mouse.y >= Ch*0.39 && mouse.x <= Cw*0.08+Cw*0.14 && mouse.y <= Ch*0.39+Ch*0.2) {
				game.menu.target==1 ? game.menu.target=5:game.menu.target--;
			}
			if (mouse.x >= Cw*0.78 && mouse.y >= Ch*0.39 && mouse.x <= Cw*0.78+Cw*0.14 && mouse.y <= Ch*0.39+Ch*0.2) {
				game.menu.target==5 ? game.menu.target=1:game.menu.target++;
			}
			if (mouse.x >= Cw*0.24 && mouse.y >= Ch*0.42 && mouse.x <= Cw*0.24+Cw*0.52 && mouse.y <= Ch*0.42+Ch*0.17) {
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
					setmenu(5,"ud",0.045,0.46,0,0.1,5);
					game.screen="options";
					game.mainevent="menu";
					game.event="back";
					game.sideevent="page1";
					break;
				}
			}
			break;
		case "options":
			switch (game.mainevent){
			case "menu":
				switch (game.sideevent){
				case "page1":
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.24 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.24+Ch*0.08) {
						setmenu(11,"lr",0,0,0,0,game.option.inputOpacity/10+1);
						game.mainevent="select";
						game.event="opa.input";
					}
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.34 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.34+Ch*0.08) {
						setmenu(11,"lr",0,0,0,0,game.option.bckgrndOpacity/10+1);
						game.mainevent="select";
						game.event="opa.bckgrnd";
					}
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.44 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.44+Ch*0.08) {
						switch(anim.lowtimer.mode){
						case true:
							setmenu(2,"lr",0,0,0,0,2);
							break;
						case false:
							setmenu(2,"lr",0,0,0,0,1);
							break;
						}
						game.mainevent="select";
						game.event="inputdirect";
					}
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.54 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.54+Ch*0.08) {
						switch(anim.lowtimer.mode){
						case "alt":
							setmenu(2,"lr",0,0,0,0,2);
							break;
						case "fix":
							setmenu(2,"lr",0,0,0,0,1);
							break;
						}
						game.mainevent="select";
						game.event="animchrono";
					}
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.64 && mouse.x <= Cw*0.07+Cw*0.2 && mouse.y <= Ch*0.64+Ch*0.08) {
						setmenu(5,"lr",0,0,0,0,6);
						game.screen="hub";
						game.mainevent="";
						game.event="";
						game.sideevent="";
						optionsUpdate()
					}
					if (mouse.x >= Cw*0.38 && mouse.y >= Ch*0.74 && mouse.x <= Cw*0.38+Cw*0.24 && mouse.y <= Ch*0.74+Ch*0.08) {
						game.sideevent="page2";
					}
					break;
				case "page2":
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.24 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.24+Ch*0.08) {
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
						game.event="customtext";
					}
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.34 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.34+Ch*0.08) {
						switch(game.option.showfps){
						case true:
							setmenu(2,"lr",0,0,0,0,2);
							break;
						case false:
							setmenu(2,"lr",0,0,0,0,1);
							break;
						}
						game.mainevent="select";
						game.event="fps";
					}
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.44 && mouse.x <= Cw*0.07+Cw*0.2 && mouse.y <= Ch*0.44+Ch*0.08) {
						setmenu(5,"lr",0,0,0,0,6);
						game.screen="hub";
						game.mainevent="";
						game.event="";
						game.sideevent="";
						optionsUpdate()
					}

					if (mouse.x >= Cw*0.38 && mouse.y >= Ch*0.74 && mouse.x <= Cw*0.38+Cw*0.24 && mouse.y <= Ch*0.74+Ch*0.08) {
						game.sideevent="page1";
					}
					break;
				}
				break;
			case "select":
				if (mouse.x >= Cw*0.54 && mouse.y >= Ch*0.24 && mouse.x <= Cw*0.54+Cw*0.08 && mouse.y <= Ch*0.24+Ch*0.5) {
					game.menu.target--;
				}
				if (mouse.x >= Cw*0.86 && mouse.y >= Ch*0.24 && mouse.x <= Cw*0.86+Cw*0.08 && mouse.y <= Ch*0.24+Ch*0.5) {
					game.menu.target++;
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.24 && mouse.x <= Cw*0.07+Cw*0.48 && mouse.y <= Ch*0.24+Ch*0.5) {
					game.sideevent=="page1"?setmenu(5,"ud",0.045,0.26,0,0.1,5):setmenu(3,"ud",0.045,0.26,0,0.1,3);
					game.mainevent="menu";
					game.event="back"
				}
				switch (game.event) {
				case "opa.input":
				case "opa.bckgrnd":
					if (game.menu.target>11) game.menu.target=1;
					if (game.menu.target<1) game.menu.target=11;
					break;
				case "animchrono":
				case "fps":
				case "inputdirect":
					if (game.menu.target>2) game.menu.target=1;
					if (game.menu.target<1) game.menu.target=2;
					break;
				case "customtext":
					if (game.menu.target>4) game.menu.target=1;
					if (game.menu.target<1) game.menu.target=4;
					break;
				}
				break; 
			}
			break;
		case "modeArcade":
			if (mouse.x >= Cw*0.005 && mouse.y >= Ch*0.007 && mouse.x <= Cw*0.005+Cw*0.4 && mouse.y <= Ch*0.007+Ch*0.08) {
				setmenu(5,"lr",0,0,0,0,2);
				game.screen="hub";
				game.mainevent="";
				game.event=""
			}
			switch(game.mainevent){
			case "first":
				if (mouse.x >= Cw*0.195 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.195+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==1 ? game.menu.target=4:game.menu.target--;
				}
				if (mouse.x >= Cw*0.695 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.695+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==4 ? game.menu.target=1:game.menu.target++;
				}
				if (mouse.x >= Cw*0.352 && mouse.y >= Ch*0.645 && mouse.x <= Cw*0.352+Cw*0.3 && mouse.y <= Ch*0.645+Ch*0.12) {
					setmenu(2,"lr",0.05,0.605,0.31,0,2);
					game.mainevent="second";
					game.event="ready";
				}
				break;
			case "second":
				if (game.event=="ready") {
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.57 && mouse.x <= Cw*0.07+Cw*0.22 && mouse.y <= Ch*0.57+Ch*0.12) {
						setmenu(4,"lr",0.3,0.56,0,0);
						game.mainevent="first";
						game.event="";
					}
					if (mouse.x >= Cw*0.37 && mouse.y >= Ch*0.55 && mouse.x <= Cw*0.37+Cw*0.26 && mouse.y <= Ch*0.55+Ch*0.14) {
						game.event="transition";
						game.timer=7;
					}
				}
				break;
			default:
				break;
			}
			break;
		case "mode1":
			if (mouse.x >= Cw*0.005 && mouse.y >= Ch*0.007 && mouse.x <= Cw*0.005+Cw*0.4 && mouse.y <= Ch*0.007+Ch*0.08) {
				setmenu(5,"lr",0,0,0,0,3);
				game.screen="hub";
				game.mainevent="";
				game.event=""
			}
			switch(game.mainevent){
			case "first":
				if (mouse.x >= Cw*0.1 && mouse.y >= Ch*0.23 && mouse.x <= Cw*0.1+Cw*0.195 && mouse.y <= Ch*0.23+Ch*0.32) {
					game.battle.add ? game.battle.add=false: game.battle.add=true;
					game.battle.add ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.4 && mouse.y >= Ch*0.23 && mouse.x <= Cw*0.4+Cw*0.195 && mouse.y <= Ch*0.23+Ch*0.32) {
					game.battle.sub ? game.battle.sub=false: game.battle.sub=true;
					game.battle.sub ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.7 && mouse.y >= Ch*0.23 && mouse.x <= Cw*0.7+Cw*0.195 && mouse.y <= Ch*0.23+Ch*0.32) {
					game.battle.mult ? game.battle.mult=false: game.battle.mult=true;
					game.battle.mult ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.35 && mouse.y >= Ch*0.645 && mouse.x <= Cw*0.35+Cw*0.305 && mouse.y <= Ch*0.645+Ch*0.12) {
					if (game.battle.symbnum>0) {
						setmenu(4,"lr",0.3,0.56,0,0,game.battle.numopp);
						game.mainevent="second"
					}
				}
				break;
			case "second":
				if (mouse.x >= Cw*0.205 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.205+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==1 ? game.menu.target=4:game.menu.target--;
				}
				if (mouse.x >= Cw*0.685 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.685+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==4 ? game.menu.target=1:game.menu.target++;
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.675 && mouse.x <= Cw*0.07+Cw*0.23 && mouse.y <= Ch*0.675+Ch*0.1) {
					setmenu(4,"lr",0.065,0.43,0.23,0);
					game.mainevent="first";
				}
				if (mouse.x >= Cw*0.35 && mouse.y >= Ch*0.655 && mouse.x <= Cw*0.35+Cw*0.305 && mouse.y <= Ch*0.655+Ch*0.12) {
					setmenu(4,"lr",0.3,0.71,0,0);
					game.mainevent="third";
				}
				break;
			case "third":
				if (mouse.x >= Cw*0.205 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.205+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==1 ? game.menu.target=4:game.menu.target--;
				}
				if (mouse.x >= Cw*0.685 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.685+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==4 ? game.menu.target=1:game.menu.target++;
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.675 && mouse.x <= Cw*0.07+Cw*0.23 && mouse.y <= Ch*0.675+Ch*0.1) {
					setmenu(4,"lr",0.3,0.56,0,0,game.battle.numopp);
					game.mainevent="second"
				}
				if (mouse.x >= Cw*0.35 && mouse.y >= Ch*0.655 && mouse.x <= Cw*0.35+Cw*0.305 && mouse.y <= Ch*0.655+Ch*0.12) {
					setmenu(2,"lr",0.05,0.605,0.31,0,2);
					game.mainevent="fourth";
					game.event="ready";
				}
				break;
			case "fourth":
				if (game.event=="ready") {
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.57 && mouse.x <= Cw*0.07+Cw*0.22 && mouse.y <= Ch*0.57+Ch*0.12) {
						setmenu(4,"lr",0.3,0.56,0,0);
						game.mainevent="third";
						game.event="";
					}
					if (mouse.x >= Cw*0.37 && mouse.y >= Ch*0.55 && mouse.x <= Cw*0.37+Cw*0.26 && mouse.y <= Ch*0.55+Ch*0.14) {
						game.event="transition";
						game.timer=7;
					}
				}
				break;
			default:
				break;
			}
			break;
		case "mode2":
			if (mouse.x >= Cw*0.005 && mouse.y >= Ch*0.007 && mouse.x <= Cw*0.005+Cw*0.4 && mouse.y <= Ch*0.007+Ch*0.08) {
				setmenu(5,"lr",0,0,0,0,4);
				game.screen="hub";
				game.mainevent="";
				game.event="";
			}
			switch(game.mainevent){
			case "first":
				if (mouse.x >= Cw*0.25 && mouse.y >= Ch*0.23 && mouse.x <= Cw*0.25+Cw*0.195 && mouse.y <= Ch*0.23+Ch*0.32) {
					game.battle.add ? game.battle.add=false: game.battle.add=true;
					game.battle.add ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.55 && mouse.y >= Ch*0.23 && mouse.x <= Cw*0.55+Cw*0.195 && mouse.y <= Ch*0.23+Ch*0.32) {
					game.battle.sub ? game.battle.sub=false: game.battle.sub=true;
					game.battle.sub ? game.battle.symbnum++ : game.battle.symbnum--;
					key.space=false;
				}
				if (mouse.x >= Cw*0.35 && mouse.y >= Ch*0.645 && mouse.x <= Cw*0.35+Cw*0.305 && mouse.y <= Ch*0.645+Ch*0.12) {
					if (game.battle.symbnum>0) {
						setmenu(4,"lr",0.3,0.56,0,0,game.battle.numopp);
						game.mainevent="second"
					}
				}
				break;
			case "second":
				if (mouse.x >= Cw*0.205 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.205+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==1 ? game.menu.target=4:game.menu.target--;
				}
				if (mouse.x >= Cw*0.685 && mouse.y >= Ch*0.49 && mouse.x <= Cw*0.685+Cw*0.11 && mouse.y <= Ch*0.49+Ch*0.17) {
					game.menu.target==4 ? game.menu.target=1:game.menu.target++;
				}
				if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.675 && mouse.x <= Cw*0.07+Cw*0.23 && mouse.y <= Ch*0.675+Ch*0.1) {
					setmenu(4,"lr",0.065,0.43,0.23,0);
					game.mainevent="first";
				}
				if (mouse.x >= Cw*0.35 && mouse.y >= Ch*0.655 && mouse.x <= Cw*0.35+Cw*0.305 && mouse.y <= Ch*0.655+Ch*0.12) {
					setmenu(2,"lr",0.05,0.605,0.31,0,2);
					game.mainevent="third";
					game.event="ready";
				}
				break;
			case "third":
				if (game.event=="ready") {
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.57 && mouse.x <= Cw*0.07+Cw*0.22 && mouse.y <= Ch*0.57+Ch*0.12) {
						setmenu(4,"lr",0.3,0.56,0,0);
						game.mainevent="second";
						game.event="";
					}
					if (mouse.x >= Cw*0.37 && mouse.y >= Ch*0.55 && mouse.x <= Cw*0.37+Cw*0.26 && mouse.y <= Ch*0.55+Ch*0.14) {
						game.event="transition";
						game.timer=7;
					}
				}
				break;
			default:
				break;
			}
			break;
		case "level-select":
			switch (game.mainevent){
			case "map":
				switch (game.event){
				case "select":
				case "selected":
					game.event="select";
					if (mouse.x >= Cw*0.07 && mouse.y >= Ch*0.825 && mouse.x <= Cw*0.07+Cw*0.23 && mouse.y <= Ch*0.825+Ch*0.13){
						setmenu(5,"lr",0,0,0,0);
						game.screen="hub";
						game.event=""
					}
					if (mouse.x >= Cw*0.345 && mouse.y >= Ch*0.825 && mouse.x <= Cw*0.345+Cw*0.32 && mouse.y <= Ch*0.825+Ch*0.13){
						game.event="transition";
						game.timer=7;
					}
					if (mouse.x >= Cw*0.25 && mouse.y >= Ch*0.34 && mouse.x <= Cw*0.25+Cw*0.12 && mouse.y <= Ch*0.34+Ch*0.2){
						game.menu.target==1? game.menu.target=game.menu.options:game.menu.target--;
					}
					if (mouse.x >= Cw*0.63 && mouse.y >= Ch*0.34 && mouse.x <= Cw*0.63+Cw*0.12 && mouse.y <= Ch*0.34+Ch*0.2){
						game.menu.target==game.menu.options? game.menu.target=1:game.menu.target++;
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
		case "survival":
			switch (game.mainevent){
			case "starting":
			case "play":
			case "wait":
				if (mouse.x >= Cw*0.035 && mouse.y >= Ch*0.875 && mouse.x <= Cw*0.035+120 && mouse.y <= Ch*0.875+40) {
					if (key.pausecooldown==0) {
						game.prevevent=game.mainevent;
						game.mainevent="pause";
						game.prevtimer=game.timer;
						game.timer=40;
					}
					else {
						anim.pause.opa=20;
					}
				}
				break;
			case "pause":
				if (mouse.x >= Cw*0.3 && mouse.y >= Ch*0.78 && mouse.x <= Cw*0.3+Cw*0.4 && mouse.y <= Ch*0.78+Ch*0.12) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				else {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					RTAtimer()
					key.p=false;
					key.space=false;
					key.pausecooldown=7000
				}
				break;
			case "exit":
				if (mouse.x >= Cw*0.24 && mouse.y >= Ch*0.765 && mouse.x <= Cw*0.24+Cw*0.225 && mouse.y <= Ch*0.765+Ch*0.32) {
					game.mainevent="pause";
				}
				if (mouse.x >= Cw*0.54 && mouse.y >= Ch*0.765 && mouse.x <= Cw*0.54+Cw*0.225 && mouse.y <= Ch*0.765+Ch*0.32) {
					game.mainevent="exitgame";
					game.event="transition";
					game.timer=50;
				}
				break;
			case "gameover":
				switch(game.event){
				case "finpop":
					if (mouse.x >= Cw*0.13 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.13+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						resetStats()
						switch (game.battle.gamemode) {
						case "survival-timer":
							game.mainevent="starting";
							game.event="set";
							game.timer=20;
							break;
						case "survival-life":
							game.mainevent="starting";
							game.event="set";
							game.timer=20;
							break;
						}
					}
					if (mouse.x >= Cw*0.38 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.38+Cw*0.26 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.event="transition2";
						game.timer=50;
					}
					if (mouse.x >= Cw*0.65 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.65+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.mainevent="stats";
						game.event="global";
						setmenu(game.stats.level.length,"ud",0,0,0,0);
						anim.graph.init=0;
					}
					break;
				default:
					break;
				}
				break;
			case "stats":
				if (mouse.x >= Cw*0.77 && mouse.y >= Ch*0.15 && mouse.x <= Cw*0.77+Cw*0.2 && mouse.y <= Ch*0.15+Ch*0.1) {
					game.prevevent=="finish"?game.mainevent="finish":game.mainevent="gameover";  // remplacer par gameover seulement
					game.event="finpop";
					setmenu(3,"lr",0.11,0.82,0.25,0,3);
				}
				if (mouse.x >= Cw*0.27 && mouse.y >= Ch*0.145 && mouse.x <= Cw*0.27+Cw*0.08 && mouse.y <= Ch*0.145+Ch*0.11) {
					switch(game.event){
					case "global":
						game.event="temps";
						break;
					case "vies":
						game.event="global";
						break;
					case "temps":
						game.event="vies";
						break;
					}
				}
				if (mouse.x >= Cw*0.65 && mouse.y >= Ch*0.145 && mouse.x <= Cw*0.65+Cw*0.08 && mouse.y <= Ch*0.145+Ch*0.11) {
					switch(game.event){
					case "global":
						game.event="vies";
						break;
					case "vies":
						game.event="temps";
						break;
					case "temps":
						game.event="global";
						break;
					}
				}
				switch(game.event){
				case "vies":
				case "temps":
					if (mouse.x>=Cw*0.08&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						game.menu.target=Math.floor((mouse.x-Cw*0.09)/(Cw*0.85)*anim.graph.step)+anim.graph.init;
						if (game.menu.target>game.menu.options) game.menu.target=game.menu.options;
					}
					break;
				}
				break;
			default:
				break;
			}
			break;
		case "level":
			switch (game.mainevent){
			case "starting":
			case "play":
			case "wait":
				if (mouse.x >= Cw*0.035 && mouse.y >= Ch*0.875 && mouse.x <= Cw*0.035+120 && mouse.y <= Ch*0.875+40) {
					if (key.pausecooldown==0) {
						game.prevevent=game.mainevent;
						game.mainevent="pause";
						game.prevtimer=game.timer;
						game.timer=40;
					}
					else {
						anim.pause.opa=20;
					}
				}
				break;
			case "pause":
				if (mouse.x >= Cw*0.3 && mouse.y >= Ch*0.78 && mouse.x <= Cw*0.3+Cw*0.4 && mouse.y <= Ch*0.78+Ch*0.12) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				else {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					RTAtimer()
					key.p=false;
					key.space=false;
					key.pausecooldown=7000
				}
				break;
			case "exit":
				if (mouse.x >= Cw*0.24 && mouse.y >= Ch*0.765 && mouse.x <= Cw*0.24+Cw*0.225 && mouse.y <= Ch*0.765+Ch*0.32) {
					game.mainevent="pause";
				}
				if (mouse.x >= Cw*0.54 && mouse.y >= Ch*0.765 && mouse.x <= Cw*0.54+Cw*0.225 && mouse.y <= Ch*0.765+Ch*0.32) {
					game.mainevent="exitgame";
					game.event="transition";
					game.timer=50;
				}
				break;
			case "gameover":
				switch(game.event){
				case "finpop":
					if (mouse.x >= Cw*0.13 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.13+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.mainevent="starting";
						game.event="set";
						game.timer=20;
						resetStats()
					}
					if (mouse.x >= Cw*0.38 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.38+Cw*0.26 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.event="transition2";
						game.timer=50;
					}
					if (mouse.x >= Cw*0.65 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.65+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.mainevent="stats";
						game.prevevent="gameover";
						game.event="global";
						setmenu(game.stats.level.length,"ud",0,0,0,0);
						anim.graph.init=0;
					}
					break;
				default:
					break;
				}
				break;
			case "stats":
				if (mouse.x >= Cw*0.77 && mouse.y >= Ch*0.15 && mouse.x <= Cw*0.77+Cw*0.2 && mouse.y <= Ch*0.15+Ch*0.1) {
					game.prevevent=="finish"?game.mainevent="finish":game.mainevent="gameover"; 
					game.event="finpop";
					setmenu(3,"lr",0.11,0.82,0.25,0,3);
				}
				if (mouse.x >= Cw*0.27 && mouse.y >= Ch*0.145 && mouse.x <= Cw*0.27+Cw*0.08 && mouse.y <= Ch*0.145+Ch*0.11) {
					switch(game.event){
					case "global":
						game.event="temps";
						break;
					case "vies":
						game.event="global";
						break;
					case "temps":
						game.event="vies";
						break;
					}
				}
				if (mouse.x >= Cw*0.65 && mouse.y >= Ch*0.145 && mouse.x <= Cw*0.65+Cw*0.08 && mouse.y <= Ch*0.145+Ch*0.11) {
					switch(game.event){
					case "global":
						game.event="vies";
						break;
					case "vies":
						game.event="temps";
						break;
					case "temps":
						game.event="global";
						break;
					}
				}
				switch(game.event){
				case "vies":
				case "temps":
					if (mouse.x>=Cw*0.08&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						game.menu.target=Math.floor((mouse.x-Cw*0.09)/(Cw*0.85)*anim.graph.step)+anim.graph.init;
						if (game.menu.target>game.menu.options) game.menu.target=game.menu.options;
					}
					break;
				}
				break;
			case "finish":
				switch(game.event){
				case "finpop":
					if (mouse.x >= Cw*0.13 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.13+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.mainevent="starting";
						game.event="set";
						game.timer=20;
						resetStats()
					}
					if (mouse.x >= Cw*0.38 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.38+Cw*0.26 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.event="transition2";
						game.timer=50;
					}
					if (mouse.x >= Cw*0.65 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.65+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.mainevent="stats";
						game.prevevent="finish";
						game.event="global";
						setmenu(game.stats.level.length,"ud",0,0,0,0);
						anim.graph.init=0;
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
		case "arcade":
			switch (game.mainevent){
			case "starting":
			case "play":
			case "wait":
				if (mouse.x >= Cw*0.035 && mouse.y >= Ch*0.875 && mouse.x <= Cw*0.035+120 && mouse.y <= Ch*0.875+40) {
					if (key.pausecooldown==0) {
						game.prevevent=game.mainevent;
						game.mainevent="pause";
						game.prevtimer=game.timer;
						game.timer=40;
					}
					else {
						anim.pause.opa=20;
					}
				}
				break;
			case "pause":
				if (mouse.x >= Cw*0.3 && mouse.y >= Ch*0.78 && mouse.x <= Cw*0.3+Cw*0.4 && mouse.y <= Ch*0.78+Ch*0.12) {
					game.mainevent="exit";
					setmenu(2,"lr",0.25,0.8,0.3,0)
				}
				else {
					game.mainevent=game.prevevent;
					game.timer = game.prevtimer;
					game.prevevent="";
					RTAtimer()
					key.p=false;
					key.space=false;
					key.pausecooldown=7000
				}
				break;
			case "exit":
				if (mouse.x >= Cw*0.24 && mouse.y >= Ch*0.765 && mouse.x <= Cw*0.24+Cw*0.225 && mouse.y <= Ch*0.765+Ch*0.32) {
					game.mainevent="pause";
				}
				if (mouse.x >= Cw*0.54 && mouse.y >= Ch*0.765 && mouse.x <= Cw*0.54+Cw*0.225 && mouse.y <= Ch*0.765+Ch*0.32) {
					game.mainevent="exitgame";
					game.event="transition";
					game.timer=50;
				}
				break;
			case "gameover":
				switch(game.event){
				case "finpop":
					if (mouse.x >= Cw*0.13 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.13+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.mainevent="starting";
						game.event="set";
						game.timer=20;
						resetStats()
					}
					if (mouse.x >= Cw*0.38 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.38+Cw*0.26 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.event="transition2";
						game.timer=50;
					}
					if (mouse.x >= Cw*0.65 && mouse.y >= Ch*0.79 && mouse.x <= Cw*0.65+Cw*0.24 && mouse.y <= Ch*0.79+Ch*0.125) {
						game.mainevent="stats";
						game.prevevent="gameover";
						game.event="global";
						setmenu(game.stats.level.length,"ud",0,0,0,0);
						anim.graph.init=0;
					}
					break;
				default:
					break;
				}
				break;
			case "stats":
				if (mouse.x >= Cw*0.77 && mouse.y >= Ch*0.15 && mouse.x <= Cw*0.77+Cw*0.2 && mouse.y <= Ch*0.15+Ch*0.1) {
					game.prevevent=="finish"?game.mainevent="finish":game.mainevent="gameover"; 
					game.event="finpop";
					setmenu(3,"lr",0.11,0.82,0.25,0,3);
				}
				if (mouse.x >= Cw*0.27 && mouse.y >= Ch*0.145 && mouse.x <= Cw*0.27+Cw*0.08 && mouse.y <= Ch*0.145+Ch*0.11) {
					switch(game.event){
					case "global":
						game.event="temps";
						break;
					case "vies":
						game.event="global";
						break;
					case "temps":
						game.event="vies";
						break;
					}
				}
				if (mouse.x >= Cw*0.65 && mouse.y >= Ch*0.145 && mouse.x <= Cw*0.65+Cw*0.08 && mouse.y <= Ch*0.145+Ch*0.11) {
					switch(game.event){
					case "global":
						game.event="vies";
						break;
					case "vies":
						game.event="temps";
						break;
					case "temps":
						game.event="global";
						break;
					}
				}
				switch(game.event){
				case "vies":
				case "temps":
					if (mouse.x>=Cw*0.08&&mouse.y>=Ch*0.31&&mouse.x<=Cw*0.955&&mouse.y<=Ch*0.91) {
						game.menu.target=Math.floor((mouse.x-Cw*0.09)/(Cw*0.85)*anim.graph.step)+anim.graph.init;
						if (game.menu.target>game.menu.options) game.menu.target=game.menu.options;
					}
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
chargement++