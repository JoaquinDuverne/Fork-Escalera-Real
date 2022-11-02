import Botones from './Botones.js'
import Phaser from 'phaser'
import { getPhrase } from '../services/translations.js';

export class MainMenu extends Phaser.Scene {
    constructor() {

        super("MainMenu")
    }

    init({ language }){
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

        //this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg_gif').setScale(1.1);

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'escalera_logo');

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY*1.1 + 7, 'boton').setScale(1.2);
        const botonjugar = new Botones(this.cameras.main.centerX, this.cameras.main.centerY*1.1, getPhrase("Jugar"), this, () =>
		{this.scene.start("LevelSelect")})
    }
}