var config = {
	Level: 'Level2',
	Units: [{
		type: 'EntitySkeleton',
		pos: {x: 1, y: 4}
	}, {
		type: 'EntitySkeleton',
		pos: {x: 1, y: 5}
	}, {
		type: 'EntitySkeleton',
		pos: {x: 1, y: 7}
	}, {
		type: 'EntityRat',
		pos: {x: 2, y: 4}
	}]
};


ig.module(
	'game.main'
)
.requires(
	'impact.debug.debug',
	'impact.game',
	'impact.font',
	'game.levels.2',
	'plugins.astar-for-entities',
	'game.entities.unit'
)
	.defines(function() {
	Jake = ig.Game.extend({
		gravity: 0,
		tileSize: 16,
		font: new ig.Font('media/04b03.font.png'),

		init: function() {
			ig.input.bind(ig.KEY.MOUSE1, 'click');
			this.loadLevel(Level2);
			// this.units = ig.game.getEntitiesByType('EntityUnit')[0];
			// this.skeleton = this.spawnEntity('EntitySkeleton', 4*this.tileSize, y, {})
			// console.

			console.log(config)
			this.units = [];
			for (var i = 0; i < config.Units.length; i++) {
				var u = config.Units[i];
				this.units.push(this.spawnEntity(u.type, u.pos.x * this.tileSize, u.pos.y * this.tileSize));
			}
		},

		update: function() {
			this.parent();
			if (ig.input.released('click')) {
				var xTile = (ig.input.mouse.x/this.tileSize-0.5).round();
				//this.pos.x = xTile*this.tileSize;
				var yTile= (ig.input.mouse.y/this.tileSize-0.5).round();
				//this.pos.y = yTile*this.tileSize;
				console.log(xTile+"."+yTile);
				/*
				console.log("x= " + ig.input.mouse.x + ig.game.screen.x + " y= " + ig.input.mouse.y + ig.game.screen.y);
				console.log("Tile: "+ Math.round(ig.input.mouse.x / this.tileSize) +"."+ Math.round(ig.input.mouse.y / this.tileSize));
				console.log(getTile(ig.input.mouse.x, ig.input.mouse.y));
				*/
			};
		},

		draw: function() {
			this.parent();
		},

		loadLevel: function(level) {
			this.parent(level);

			// Enable the pre-rendered background mode for all 
			// mobile devices
			if (ig.ua.mobile) {
				for (var i = 0; i < this.backgroundMaps.length; i++) {
					this.backgroundMaps[i].preRender = true;
				}
			}
		}
	});


	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	ig.main('#canvas', Jake, 60, 320, 240, 2);

});