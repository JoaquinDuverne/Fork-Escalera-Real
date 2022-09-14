import Phaser from "phaser";
import {Preload} from "./scenes/Preload.js";
import {MainMenu} from "./scenes/MainMenu.js";
import {LevelSelect} from "./scenes/LevelSelect.js";
import {Level1} from "./scenes/Level1";
import {Victoria} from "./scenes/Victoria";
import {Derrota} from "./scenes/Derrota";
import {Retry} from "./scenes/Retry";
import HelloWorldScene from "./scenes/HelloWorldScene";

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 800,
			height: 600,
		},
		max: {
			width: 1600,
			height: 1200,
		},
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: false,
		}
	},
	scene: [HelloWorldScene, Preload, MainMenu, LevelSelect, Level1, Victoria, Derrota, Retry]
}

export default new Phaser.Game(config)
