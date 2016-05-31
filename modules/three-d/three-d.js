var three = function(){
	this.canvas = document.querySelector('#canvas');
	this.posx = 250;
	this.posy = 250;
	this.posz = 1;
	this.rad = 30;
	this.start = 0;
	this.end = Math.PI*2;
	this.diretion = false;
	this.move();
}

three.prototype.draw = function(obj){
	var canvas = this.canvas;
	var context = canvas.getContext('2d');
	if(context){
		context.arc(this.posx,this.posy,this.rad,this.start,this.end,this.diretion);
		context.fillStyle = 'rgba(0,0,0,1)';
		context.fill();
		context.stroke();
	}else{
		console.log('get the context failed')
	}
}
three.prototype.move = function(){
	this.canvas.addEventListener('mousemove',function(e){

	},false);
}

module.exports = new three();