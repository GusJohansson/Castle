ig.module(
	'game.entities.skeleton')
	.requires(
	'game.entities.unit')
	.defines(function() {

	EntitySkeleton = EntityUnit.extend({
		size: {
			x: 16,
			y: 16
		},
		offset: {
			x: 0,
			y: 0
		},

		animSheet: new ig.AnimationSheet('media/zombie.png', 16, 16),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [0]);
			this.addAnim('active', 1, [9]);
			this.addAnim('walk', 0.08, [0, 1, 2, 3, 4, 5]);
		}
	});

});