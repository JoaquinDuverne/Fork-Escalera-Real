import Button from './Botones.js';
import Phaser from 'phaser'
import { getPhrase } from '../services/translations.js';


export class MainMenu extends Phaser.Scene {
    constructor() {

        super("MainMenu")
    }

    init({ language}){
        this.language = language;

    }

    create() {


        const bgAnimation = this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('escalera_bg_sprite', {start: 0, end: 113}),
            frameRate: 30
        })
    
        const sprite = this.add.sprite(this.cameras.main.centerX ,this.cameras.main.centerY, 'escalera_bg_sprite').setScale(1.95);
    
        sprite.play({ key: 'bg', repeat: -1 });


        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'escalera_logo');

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY*1.1 + 7, 'boton').setScale(1.2);

        let botonjugar = new Button (this.cameras.main.centerX, this.cameras.main.centerY*1.1, getPhrase("Jugar"), this, () =>
		{this.scene.start("LevelSelect")})

        let botonidioma = this.add.image(this.cameras.main.centerX ,this.cameras.main.centerY*1.5, "escalera_btnidioma").setScale(1.2);
        botonidioma.setInteractive()
        botonidioma.on("pointerdown", (pointer, localX, localY) => {
        this.scene.start("Idiomas");});

        let Black = this.add.image(this.cameras.main.centerX, 2000, 'black').setScale(0.4);
		let Cred = this.add.image(this.cameras.main.centerX, 1000, 'creditos').setScale(0.25);

		let Libro = this.add.image(950, 580, 'libro_creditos').setScale(0.8);
		Libro.setInteractive();
		Libro.on("pointerdown", (pointer, localX, localY) => {
		if (Cred.y == 1000) {
			Cred.y = this.cameras.main.centerY
			Black.y = this.cameras.main.centerY
		} else {
			Cred.y = 1000
			Black.y = 2000
		}
		}); 

    }
}