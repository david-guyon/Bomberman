var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
console.log("Canvas and Context ready");

function drawGrid() {
	context.beginPath();
	for(var i = 45; i < 585; i = i+45) {
		context.moveTo(i, 0);
		context.lineTo(i, 495);
	}
	for(var i = 45; i < 495; i = i+45) {
		context.moveTo(0, i);
		context.lineTo(585, i);
	}
	context.closePath();
	context.lineWidth = 2;
	context.stroke();

	for(var i = 0; i < 13; i++) {
		for(var j = 0; j < 11; j++) {
			if(i%2 && j%2) {
				context.fillStyle = 'brown';
				context.fillRect(i*45,j*45,45,45);
			}
		}
	}
}

var area = new Array();

function initArea() {
	for(var i = 0; i < 13; i++) {
		area[i] = new Array();
		for(var j = 0; j < 11; j++) {
			if(i%2 && j%2) {
				area[i][j] = "wall";
			}
		}
	}
}

console.log(area);

drawGrid();
