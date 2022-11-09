import Phaser from "phaser";
import {Preload} from "./scenes/Preload.js";
import {MainMenu} from "./scenes/MainMenu.js";
import {Idiomas} from "./scenes/Idiomas.js";
import {LevelSelect} from "./scenes/LevelSelect.js";
import {Victoria} from "./scenes/Victoria";
import {Derrota} from "./scenes/Derrota";
import {Derrota2} from "./scenes/Derrota2";
import NivelMago from "./scenes/NivelMago";
import NivelRey from "./scenes/NivelRey";

const config = {
	type: Phaser.AUTO,
	width: 1020,
	height: 660,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		min: {
			width: 1020,
			height: 660,
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
	scene: [Preload, MainMenu, Idiomas, NivelMago, NivelRey, LevelSelect, Victoria, Derrota, Derrota2]
}

export default new Phaser.Game(config)
