/*
	Simple mod interface for Prodigy version 1-22-1
	
	Installed Mods: 
		
		| Mod Name |               	| Author |
		
		Walk Speed 					Daboss7173
		Fast Game Speed				Daboss7173
		Classic Faces				Daboss7173
		Classic Faces for boys      XPMUser
		CoyBlush                    XPMUser
		Custom Music                XPMUser
		Credits: Daboss7173, XPMUser, & Prodigy Education
	
	Written by: Daboss7173 & XPMUser
	Github: https://github.com/Daboss7173/Daboss7173.github.io
	Github: https://github.com/XPMUser/XPMUser.github.io
*/
class ModHandler {
	constructor(e) {
		this.game = e;
		this.animations = new class {
			constructor() {
				this.animations = []
			}
			getAll() {
				let e = [];
				for (let t = 0; t < this.animations.length; t++) e.push(this.animations[t].animation);
				return e
			}
			register(e, t) {
				this.animations.push({
					animation: e,
					baseSpeed: t
				})
			}
			clear() {
				this.animations = []
			}
		};
		this.available = [{
				id: "WalkSpeed",
				patch: "initWalkSpeedMod"
			}, {
				id: "FastGameSpeed",
				patch: "initFastGameSpeedMod"
			}, {
				id: "ClassicFaces",
				patch: "initClassicFaceMod"
			}, {
				id: "ClassicFacesforboys",
				patch: "initClassicFacesforboysMod"
			}, {
				id: "CoyBlush",
				patch: "initCoyBlushMod"
			}, {
				id: "CustomMusic",
				patch: "initCustomMusicMod"
			}]
	}
	
	log(e) {
		Util.isDefined(e) && console.log("%c %c %c " + e + " %c %c ", "background: #1724", "background: #172a", "background: #172f; color: #FFF", "background: #172a", "background: #1724")
	}
	
	info(e) {
		Util.isDefined(e) && console.log("%c %c %c " + e + " %c %c ", "background: #14b4", "background: #14ba", "background: #14bf; color: #FFF", "background: #14ba", "background: #14b4")
	}
	
	error(e) {
		Util.isDefined(e) && console.log("%c %c %c " + e + " %c %c ", "background: #a114", "background: #a11a", "background: #a11f; color: #FFF", "background: #a11a", "background: #a114")
	}
	
	initWalkSpeedMod() {
		let walkSpeed = 1,
        openList = SystemMenu.prototype.openList;
        SystemMenu.prototype.openList = function() {
            openList.call(this);
            new BitmapFont(this.game, this.content, 0, 320, "walk speed", {
                width: 400,
                align: "center"
            }), this.walkSpeedBar = new ProgressBar(this.game, this.content, 50, 350, 300, 80, 1, walkSpeed/20), this.walkSpeedBar.setDraggable(), this.walkSpeedBar.setBarAnimationSpeed(ProgressBar.SPEED_VERYSLOW)
        };
        
        let menuUpdate = SystemMenu.prototype.menuUpdate;
        SystemMenu.prototype.menuUpdate = function() {
            menuUpdate.call(this);
            if (Util.isDefined(this.walkSpeedBar) && walkSpeed !== this.walkSpeedBar.getPercent()*20)
                walkSpeed = this.walkSpeedBar.getPercent()*20;
        };
        
        let clearContents = SystemMenu.prototype.clearContents;
        SystemMenu.prototype.clearContents = function() {
            clearContents.call(this);
            if (Util.isDefined(this.walkSpeedBar)) {
                this.walkSpeedBar.destroy();
                this.walkSpeedBar = null;
            }
        }
        
        WalkableScreen.prototype.listener = function() {
            var e = function(e) {
                if (Util.isDefined(e)) {
                    var t = this.path.getCallback(Math.floor(e[0].x / this.tileSize), Math.floor(e[0].y / this.tileSize));
                    this.user.setPath(e, t, walkSpeed);
                    var a = this.game.prodigy.player;
                    this.user.evtProc || this.game.prodigy.network.emitMessage({
                        action: "move",
                        data: {
                            userID: a.userID,
                            path: e
                        }
            })
                }
            };
            this.path.findPath(this.user.x, this.user.y, this.game.input.x, this.game.input.y, e.bind(this))
        }
	}
	
	initFastGameSpeedMod() {
		var e = Phaser.TweenManager.prototype.add,
			t = this.game,
			i = Phaser.Timer.prototype.add,
			a = Phaser.Tween.prototype.delay,
			s = Phaser.Tween.prototype.to,
			r = (Boot.prototype.update, Phaser.AnimationManager.prototype.play),
			n = Phaser.AnimationManager.prototype.add,
			l = Phaser.Game.prototype.update,
			d = this.animations;
		Phaser.Game.prototype.update = function(e) {
			for (let e = 0; e < d.animations.length; e++) !Util.isDefined(d.animations[e].animation._parent) && d.animations.splice(e, 1);
			return l.call(this, e)
		}, window.setGameSpeed = function(l) {
			var g = l;
			if (g < .1) ModHooks.error("Supplied speed multiplier is too low. Try a larger speed value.");
			else {
				if (Phaser.TweenManager.prototype.add = function(t) {
						t.timeScale = g, e.call(this, t)
					}, Phaser.Timer.prototype.add = function(e, t, a) {
						return e /= g, i.call(this, e, t, a)
					}, Phaser.Tween.prototype.delay = function(e, t) {
						return e /= g, a.call(this, e, t)
					}, Phaser.Tween.prototype.to = function(e, t, i, a, r, o, n) {
						return Util.isDefined(r) && (r /= g), s.call(this, e, t, i, a, r, o, n)
					}, Phaser.AnimationManager.prototype.add = function(e, t, i, a, s) {
						let r = 10;
						Util.isDefined(i) && (r = i, i *= g);
						let o = n.call(this, e, t, i, a, s);
						return d.register(o, r), o
					}, Phaser.AnimationManager.prototype.play = function(e, t, i, a) {
						return Util.isDefined(t) && !isNaN(t) && (t *= g), r.call(this, e, t, i, a)
					}, Util.isDefined(t.tweens))
					for (var c = t.tweens.getAll(), p = 0; p < c.length; p++) c[p].timeScale = g;
				if (Util.isDefined(d))
					for (var u = d.getAll(), m = 0; m < u.length; m++) u[m].speed = g * (Util.isDefined(d.animations[m].baseSpeed) ? d.animations[m].baseSpeed : 10);
			}
		}, window.setGameSpeed(3), setTimeout((() => {
			this.info('Use "setGameSpeed(speed)" to change the game speed at anytime.')
		}), 1e3)
	}
	
	initClassicFaceMod() {
		var assets = this.game.prodigy.assets._assets;
		assets.heads.base = "https://xpmuser.github.io/oldprodigy/prodigyde/assets/images/general-";
		
		PlayerContainer.getAssets = function(e, t, a, s, i) {
			var i = new Array;
			t = 1 === t ? "reduced" : "normal", Util.isDefined(a) || (a = e.equipment.getEquipment("outfit")), i.push(Util.isDefined(a) ? t + "-outfit-" + e.appearance.getGender() + "-" + a : null), i.push(t + "/face/" + e.appearance.getSkinColor()), i.push(t + "-hair-" + e.appearance.getGender() + "-" + e.appearance.getHairStyle() + "-" + e.appearance.getHairColor()), i.push(t + "/eyes/" + e.appearance.getGender() + "/" + e.appearance.getEyeColor()), i.push(Util.isDefined(e.equipment.getEquipment("hat")) ? t + "-hat-" + e.equipment.getEquipment("hat") : null), i.push("normal" === t && Util.isDefined(e.equipment.getEquipment("weapon")) ? t + "-weapon-" + e.equipment.getEquipment("weapon") : null), Util.isDefined(i[0]) || (i[0] = t + "-outfit-" + e.appearance.getGender() + "-13");
			var s = e.equipment.getEquipment("hat");
			if (Util.isDefined(s)) {
				var t = Items.getItemData("hat", s).type;
				("cover" === t || "wrap" === t) && (i[2] = null)
			}
			return i
		}
		
	}	
	
	initClassicFacesforboysMod() {
		var assets = this.game.prodigy.assets._assets;
		assets.heads.base = "https://xpmuser.github.io/oldprodigy/pde1221/assets/images/general-2";
		
		PlayerContainer.getAssets = function(e, t, a, s, i) {
			var i = new Array;
			t = 1 === t ? "reduced" : "normal", Util.isDefined(a) || (a = e.equipment.getEquipment("outfit")), i.push(Util.isDefined(a) ? t + "-outfit-" + e.appearance.getGender() + "-" + a : null), i.push(t + "/face/" + e.appearance.getSkinColor()), i.push(t + "-hair-" + e.appearance.getGender() + "-" + e.appearance.getHairStyle() + "-" + e.appearance.getHairColor()), i.push(t + "/eyes/" + e.appearance.getGender() + "/" + e.appearance.getEyeColor()), i.push(Util.isDefined(e.equipment.getEquipment("hat")) ? t + "-hat-" + e.equipment.getEquipment("hat") : null), i.push("normal" === t && Util.isDefined(e.equipment.getEquipment("weapon")) ? t + "-weapon-" + e.equipment.getEquipment("weapon") : null), Util.isDefined(i[0]) || (i[0] = t + "-outfit-" + e.appearance.getGender() + "-13");
			var s = e.equipment.getEquipment("hat");
			if (Util.isDefined(s)) {
				var t = Items.getItemData("hat", s).type;
				("cover" === t || "wrap" === t) && (i[1] = null)
			}
			return i
		}
		
	}
	initCoyBlushMod() {
		var assets = this.game.prodigy.assets._assets;
		assets.heads.base = "https://xpmuser.github.io/oldprodigy/pde1221/assets/images/general-";
		
		PlayerContainer.getAssets = function(e, t, a, s, i) {
			var i = new Array;
			t = 1 === t ? "reduced" : "normal", Util.isDefined(a) || (a = e.equipment.getEquipment("outfit")), i.push(Util.isDefined(a) ? t + "-outfit-" + e.appearance.getGender() + "-" + a : null), i.push(t + "/face/" + e.appearance.getSkinColor()), i.push(t + "-hair-" + e.appearance.getGender() + "-" + e.appearance.getHairStyle() + "-" + e.appearance.getHairColor()), i.push(t + "/eyes/" + e.appearance.getGender() + "/" + e.appearance.getEyeColor()), i.push(Util.isDefined(e.equipment.getEquipment("hat")) ? t + "-hat-" + e.equipment.getEquipment("hat") : null), i.push("normal" === t && Util.isDefined(e.equipment.getEquipment("weapon")) ? t + "-weapon-" + e.equipment.getEquipment("weapon") : null), Util.isDefined(i[0]) || (i[0] = t + "-outfit-" + e.appearance.getGender() + "-13");
			var s = e.equipment.getEquipment("hat");
			if (Util.isDefined(s)) {
				var t = Items.getItemData("hat", s).type;
				("cover" === t || "wrap" === t) && (i[1] = null)
			}
			return i
		}
		
	}
	initCustomMusicMod() {
var Prodigy = {};
Prodigy.extends = function(e, t, a) {
    e.prototype = Object.create(t.prototype);
    for (var i in a) e.prototype[i] = a[i]
}, Prodigy.Assets = function() {
    var e = "https://cdn.prodigygame.com/game/assets/images/player/reduced/outfits/male/",
		t = "https://cdn.prodigygame.com/game/assets/images/player/reduced/outfits/female/",
		i = "https://cdn.prodigygame.com/game/assets/images/player/reduced/hair/male/",
		a = "https://cdn.prodigygame.com/game/assets/images/player/reduced/hair/female/",
		s = "https://cdn.prodigygame.com/game/assets/images/player/reduced/hats/",
		r = "https://cdn.prodigygame.com/game/assets/images/player/normal/outfits/male/",
		o = "https://cdn.prodigygame.com/game/assets/images/player/normal/outfits/female/",
		n = "https://cdn.prodigygame.com/game/assets/images/player/normal/hair/male/",
		l = "https://cdn.prodigygame.com/game/assets/images/player/normal/hair/female/",
		h = "https://cdn.prodigygame.com/game/assets/images/player/normal/hats/",
		d = "https://cdn.prodigygame.com/game/assets/images/player/normal/weapons/",
		p = "https://cdn.prodigygame.com/game/assets/images/player/",
		c = "https://cdn.prodigygame.com/game/assets/fonts/",
		u = "https://cdn.prodigygame.com/game/assets/audio/bgm/",
		g = "https://cdn.prodigygame.com/game/assets/audio/sfx/",
		m = "https://cdn.prodigygame.com/game/assets/audio/voice/",
		y = "https://cdn.prodigygame.com/game/assets/images/popups/",
		f = "https://cdn.prodigygame.com/game/assets/images/tilesets/",
		D = "https://cdn.prodigygame.com/game/assets/data/maps/",
		b = "https://cdn.prodigygame.com/game/assets/images/battle/",
		I = "https://cdn.prodigygame.com/game/assets/images/stores/",
		v = "https://cdn.prodigygame.com/game/assets/images/backgrounds/",
		q = "https://cdn.prodigygame.com/game/assets/images/zones/",
		w = "https://cdn.prodigygame.com/game/assets/images/games/",
		x = "https://cdn.prodigygame.com/game/assets/images/npc/",
		P = "https://cdn.prodigygame.com/game/assets/images/icons/",
		k = "https://cdn.prodigygame.com/game/assets/images/attacks/",
		M = "https://cdn.prodigygame.com/game/assets/images/monsters/",
		C = "https://cdn.prodigygame.com/game/assets/images/events/",
		S = "https://cdn.prodigygame.com/game/assets/images/monsters/reduced/",
		A = "https://cdn.prodigygame.com/game/assets/images/monsters/small/",
		T = "https://cdn.prodigygame.com/game/assets/images/boss/",
		E = "https://cdn.prodigygame.com/game/assets/images/boss/small/",
		N = "https://cdn.prodigygame.com/game/assets/images/prompts/",
		B = "https://cdn.prodigygame.com/game/assets/images/scenes/";
	this._assets = {
		"bgm-victory": {
			type: "bgm",
			base: "https://cdn.prodigygame.com/game/assets/audio/bgm/",
			url: "bgm-victory.mp3",
			url: "bgm-victory.ogg"
		},
		"bgm-battle": {
			type: "bgm",
			base: "https://cdn.prodigygame.com/game/assets/audio/bgm/",
			url: "bgm-battle.mp3",
			url: "bgm-battle.ogg"
		},
		"bgm-intro": {
			type: "bgm",
			base: "https://cdn.prodigygame.com/game/assets/audio/bgm/",
			url: "bgm-intro.mp3",
			url: "bgm-intro.ogg"
		}
			}
}, Prodigy.Assets.prototype = {
    getAsset: function(e) {
        return this._assets[e]
    },
    getImageBounds: function(e) {
        return new Array(this._assets[e].x, this._assets[e].y, this._assets[e].w, this._assets[e].h)
    }
}, Prodigy.Assets.prototype.constructor = Prodigy.Assets;
	}
}

window.checkForMods = function(e, t) {
	ModHooks = new ModHandler(e), ModHooks.log("Checking for mods...");
		for (i = 0, a = 0; a < ModHooks.available.length; a += 1)
			if (t.includes(ModHooks.available[a].id)) try {
				let e = ModHooks.available[a].patch;
				ModHooks[e].call(ModHooks), ModHooks.log('Mod "' + ModHooks.available[a].id + '" successfully applied!'), i++
			} catch (e) {
				ModHooks.error('Error occured while applying mod "' + ModHooks.available[a].id + '" to Prodigy!'), console.error(e)
			}
		i > 0 ? ModHooks.log("Applied (" + i + ") mods to the game") : ModHooks.log("No mods have been applied")
}
