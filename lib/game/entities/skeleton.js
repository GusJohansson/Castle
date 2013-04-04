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

			this.addAnim('idle', 1, [4]);
			this.addAnim('active', 1, [9]);
			this.addAnim('walk', 0.08, [4, 5, 6, 7]);
		}
	});

});