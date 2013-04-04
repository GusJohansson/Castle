ig.module(
	'game.entities.rat')
	.requires(
	'game.entities.unit')
	.defines(function() {

	EntityRat = EntityUnit.extend({
		size: {
			x: 16,
			y: 16
		},
		offset: {
			x: 0,
			y: 0
		},
		movementRange: 8,
		animSheet: new ig.AnimationSheet('media/player.png', 16, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [7]);
			this.addAnim('active', 1, [19]);
			this.addAnim('walk', 0.08, ['6', '7', '8', '9', '10', '11', '12', '13', '14']);
			this.addAnim('dead', 0.08, [0,1,2,3], true);
		},
	});

});