
var tileLayer;
var ghost;

var Q = Quintus()
	.include("Sprites, Scenes, Input, 2D, UI")
	.setup(
		"bomberman_canvas", 
		{ maximize: false }
	)
	.controls();

Q.Sprite.extend("Bomberman", {
	init: function(p) {
		this._super(p, {
			sheet: "bomberman",
			frame: 1,
			hitPoints: 10,
			damage: 5,
			speed: 16,
			x: 16+1*32,
			y: 16+1*32
		});
		Q.input.on("right",this,"moveRight");
		Q.input.on("left", this,"moveLeft");
		Q.input.on("up",   this,"moveUp");
		Q.input.on("down", this,"moveDown");
		Q.input.on("fire", this,"dropBomb");
		this.on("hit",this,"collision");
	},

	collision: function(col) {
		// console.log("collision of " + col.distance + " by " + col.obj.p.sheet );
		// col.obj.destroy();
	},

	moveRight: function() {
		// console.log("Ghost-x: " + (ghost.p.x-16)/32);
		ghost.p.x = this.p.x + this.p.speed;
		// console.log("Ghost-x: " + (ghost.p.x-16)/32);
		console.log();
		if( !tileLayer.collide(ghost) && Q.stage().locate(this.p.x + this.p.speed, this.p.y).p.sheet != "block")
			this.p.x += this.p.speed;
		else
			ghost.p.x = this.p.x;
	},

	moveLeft: function() {
		// console.log("Ghost-x: " + (ghost.p.x-16)/32);
		ghost.p.x = this.p.x - this.p.speed;
		// console.log("Ghost-x: " + (ghost.p.x-16)/32);
		if( !tileLayer.collide(ghost) && Q.stage().locate(this.p.x - this.p.speed, this.p.y).p.sheet != "block")
			this.p.x -= this.p.speed;
		else
			ghost.p.x = this.p.x;
	},

	moveUp: function() {
		// console.log("Ghost-y: " + (ghost.p.y-16)/32);
		ghost.p.y = this.p.y - this.p.speed;
		// console.log("Ghost-y: " + (ghost.p.y-16)/32);
		if( !tileLayer.collide(ghost) && Q.stage().locate(this.p.x, this.p.y - this.p.speed).p.sheet != "block")
			this.p.y -= this.p.speed;
		else
			ghost.p.y = this.p.y;
	},

	moveDown: function() {
		// console.log("Ghost-y: " + (ghost.p.y-16)/32);
		ghost.p.y = this.p.y + this.p.speed;
		// console.log("Ghost-y: " + (ghost.p.y-16)/32);
		if( !tileLayer.collide(ghost) && Q.stage().locate(this.p.x, this.p.y + this.p.speed).p.sheet != "block")
			this.p.y += this.p.speed;
		else
			ghost.p.y = this.p.y;
	},

	dropBomb: function() {
		console.log("drop a bomb");
		// Drop a bomb where the Bomberman is
		Q.stage().insert(new Q.Bomb({ x: this.p.x, y: this.p.y }));
	},

	step: function(dt) {
    	this.stage.collide(this);
  	}
});

Q.Sprite.extend("Ghost", {
	init: function(p) {
		this._super(p, {
			sheet: "block",
			frame: 0,
			x: 16+1*32,
			y: 16+1*32
		});
	}
});

Q.Sprite.extend("Bomb", {
	init: function(p) {
		this._super(p, {
			sheet: "bomb",
			frame: 1
		});
	}
});

Q.Sprite.extend("Block", {
	init: function(p) {
		this._super(p, {
			sheet: "block",
			frame: 2
		});
	}
});

Q.scene("level1", function(stage) {
	// Set the game area (undestroyable blocks)
	stage.collisionLayer(tileLayer = new Q.TileLayer({ 
		tilew: 32, 
		tileh: 32, 
		type: Q.SPRITE_ALL, 
		dataAsset: "area.json", 
		sheet: "block" 
	}));

	// Fill the game area with destroyable blocks
	for(var _x = 1; _x < 14; _x++)
		if(_x%2)
			for(var _y = 1; _y < 14; _y+=1)
				stage.insert(new Q.Block({ x: _x*32 + 16, y: _y*32 + 16}));
		else
			for(var _y = 1; _y < 14; _y+=2)
				stage.insert(new Q.Block({ x: _x*32 + 16, y: _y*32 + 16}));

	// Destroy the closest destroyable blocks from the player
	Q.stage().locate(1*32+16, 1*32+16).destroy();
	Q.stage().locate(1*32+16, 2*32+16).destroy();
	Q.stage().locate(2*32+16, 1*32+16).destroy();

	var bomberman = stage.insert(new Q.Bomberman());
	ghost = stage.insert(new Q.Ghost());

	// The view follows the player
	// stage.add("viewport").follow(bomberman);
});

Q.load("bomberman.png, block.png, bomb.png, area.json", function() {
	Q.sheet("bomb",		 "bomb.png",	  { tilew: 32, tileh: 32 });
	Q.sheet("block", 	 "block.png", 	  { tilew: 32, tileh: 32 });
	Q.sheet("bomberman", "bomberman.png", { tilew: 32, tileh: 32 });

	Q.stageScene("level1");
});