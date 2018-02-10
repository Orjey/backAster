var canvas 	= document.getElementById('game');
var context	= canvas.getContext('2d');

//var aster={x:0,y:300,dx:10,dy:20};
var aster=[];
var fire=[]
var expl=[];
var timer=0;
var ship={
	x:300,
	y:300
};

var shipimg = new Image();
shipimg.src = 'ship.png'

var fireimg = new Image();
fireimg.src = 'fire.png'

var fonimg = new Image();
fonimg.src = 'fon.png';

var asterimg = new Image();
asterimg.src = 'astero.png';

//mouse
canvas.addEventListener("mousemove", function(event){
ship.x=event.offsetX-25;
ship.y=event.offsetY-13;
});



fonimg.onload = function () {
game();
}

function game(){

update();
render();
requestAnimFrame(game);
}

function update(){

timer++;
if(timer%5==0){
	aster.push({
		x:Math.random()*600,
		y:-50,
		dx:Math.random()*2-1,
		dy:Math.random()*2+2,
		del:0});
}
if (timer%30==0){
	fire.push({x:ship.x+10,y:ship.y,dx:0,dy:-5.2});
	fire.push({x:ship.x+10,y:ship.y,dx:0.5,dy:-5});
	fire.push({x:ship.x+10,y:ship.y,dx:-0.5,dy:-5});
}

//выстрел
for (i in fire) {
	fire[i].x=fire[i].x+fire[i].dx;
	fire[i].y=fire[i].y+fire[i].dy;
}

//физика булыжника
for(i in aster){
aster[i].x=aster[i].x+aster[i].dx;
aster[i].y=aster[i].y+aster[i].dy;
//Граница карты
if (aster[i].x>550 || aster[i].x<0) aster[i].dx=-aster[i].dx;
if (aster[i].y>600) aster.splice(i,1);


for (j in fire){

	if ( Math.abs(aster[i].x+25-fire[j].x-15)<50 && Math.abs(aster[i].y-fire[j].y)<25) {
	//	expl.push({x:aster[i].x-25, y:aster[i].y-25, animx:0, animy:0});
		aster[i].del=1;
		fire.splice(j,1);break;
	}
}
if (aster[i].del==1) aster.splice(i,1);
}
}

function render(){
	context.drawImage(fonimg, 0, 0, 600, 600);
	context.drawImage(shipimg, ship.x, ship.y);

	for(i in fire) context.drawImage(fireimg, fire[i].x, fire[i].y, 30, 30);
	for(i in aster) context.drawImage(asterimg, aster[i].x, aster[i].y, 50, 50);

	//взрыв
for (i in expl)
	context.drawImage(explimg, 128*Math.floor(expl[i].animx),128*Math.floor(expl[i].animy),128,128, expl[i].x, expl[i].y, 100, 100);
}

var requestAnimFrame = (function(){
	return window.RequestAnimationFrame 		||
		window.webkitRequestAnimationFrame		||
		window.mozRequestAnimationFrame			||
		window.oRequestAimationFrame			||
		window.msRequestAnimationFrame			||
		function(callback){
		window.setTimeout(callback, 1000 / 20);
	};
})();