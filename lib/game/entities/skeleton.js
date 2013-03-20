ig.module(
	'game.entities.skeleton')
	.requires(
	'game.entities.unit')
	.defines(function() {

	EntitySkeleton = EntityUnit.extend({
		size: {
			x: 12,
			y: 24
		},
		offset: {
			x: 20,
			y: 12
		},

		animSheet: new ig.AnimationSheet('media/skeleton.png', 48, 48),

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 1, [4]);
			this.addAnim('active', 1, [9]);
			this.addAnim('walk', 0.08, [4, 5, 6, 7]);
		}
	});

});