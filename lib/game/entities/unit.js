var posistion = {
	Poses: [{
		pos: {x: 16, y: 16}
	}, {
		pos: {x: 16, y: -16}
	}, {
		pos: {x: -16, y: 16}
	}, {
		pos: {x: -16, y: -16}
	}, {
		pos: {x: 0, y: 16}
	}, {
		pos: {x: 0, y: -16}
	}, {
		pos: {x: 16, y: 0}
	}, {
		pos: {x: -16, y: 0}
	}, {
		pos: {x: -32, y: 0}
	}, {
		pos: {x: 32, y: 0}
	}, {
		pos: {x: 0, y: 32}
	}, {
		pos: {x: 0, y: -32}
	}]
};

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
		health: 100,

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
			console.log('flopp')
			this.active = true;
			this.currentAnim = this.anims.active;
			for (var i = 0; i < posistion.Poses.length; i++) {
				var p = posistion.Poses[i];
				ig.game.spawnEntity(EntityMarker, this.pos.x + p.pos.x, this.pos.y + p.pos.y);
			}
			//ig.game.spawnEntity( EntityMarker, this.pos.x, this.pos.y, this.active );
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

	EntityMarker = ig.Entity.extend({
		size: {x: 16, y: 16},
		animSheet: new ig.AnimationSheet( 'media/dorm-tiles.png', 16, 16 ),
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.PASSIVE,

		init: function( x, y, settings ) {
			this.parent( x , y );
			this.addAnim( 'idle', 1, [0] );
			this.currentAnim.alpha = 0.5;
			
		},

		update: function() {
			if (ig.input.pressed('click'))
			{
				this.kill();
			}
		},

		check: function( other ) {
			this.kill()
		}

	});
});