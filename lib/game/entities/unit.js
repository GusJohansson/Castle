ig.module(
	'game.entities.unit')
	.requires(
	'impact.entity')
	.defines(function() {

	EntityUnit = ig.Entity.extend({
		active: false,
		movementRange: 4,
		ranged: false,
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.ACTIVE,

		speed: 40,

		pathTimer: null,
		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.pathTimer = new ig.Timer(2);
		},

		update: function() {
			this.parent();

			this.followPath(this.speed, true);

			if (this.active && ig.input.released('click')) {
				this.walk();
			}

			if (!this.active && ig.input.released('click') && this.inFocus()) {
				this.unitActive();
			}
		},

		walk: function() {
			this.currentAnim = this.anims.walk;
			this.getPath(ig.input.mouse.x + ig.game.screen.x, ig.input.mouse.y + ig.game.screen.y, false, [EntityUnit]);
			this.active = false;
		},

		unitActive: function() {
			console.log('asd')
			this.active = true;
			this.currentAnim = this.anims.active;
		},

		reachedGoal: function() {
			console.log('FU')
			this.currentAnim = this.anims.idle;
		},

		handleMovementTrace: function(res) {
			/*
			if(res.collision.x || res.collision.y) {
				console.log('DEAD');
				this.currentAnim = this.anims.dead;
			}
			*/
			this.parent(res);
		},

		inFocus: function() {
			return (
			(this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) && ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) && (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) && ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y));
		}
	});
});