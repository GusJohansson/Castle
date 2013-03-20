var config = {
	Level: 'Level1',
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
	'game.levels.1',
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
			this.loadLevel(Level1);

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