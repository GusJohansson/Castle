ig.module(
	'game.entities.rat')
	.requires(
	'game.entities.unit')
	.defines(function() {

	EntityRat = EntityUnit.extend({
		size: {
			x: 48,
			y: 48
		},
		offset: {
			x: 20,
			y: 12
		},
		movementRange: 8,
		animSheet: new ig.AnimationSheet('media/rat.png', 48, 48),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [7]);
			this.addAnim('active', 1, [19]);
			this.addAnim('walk', 0.08, ['6', '7', '8', '9', '10', '11', '12', '13', '14']);
			this.addAnim('dead', 0.08, [0,1,2,3], true);
		},
	});

});