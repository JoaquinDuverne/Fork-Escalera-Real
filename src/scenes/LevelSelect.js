import Botones from './Botones.js'
import Phaser from 'phaser'
import { getPhrase } from '../services/translations.js';
import Button from './Botones.js';
export class LevelSelect extends Phaser.Scene {
    constructor() {

        super("LevelSelect")
    }

    init(data){
        this.nivel1 = data.nivel1
    }

    create() {

        let nivel1 = this.nivel1

        const bgAnimation = this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('escalera_bg_sprite', {start: 0, end: 113}),
            frameRate: 30
        })
    
        const sprite = this.add.sprite(this.cameras.main.centerX ,this.cameras.main.centerY, 'escalera_bg_sprite').setScale(1.95);
    
        sprite.play({ key: 'bg', repeat: -1 });


        let Jugar2 = this.add.image(300, this.cameras.main.centerY*1.1, 'escalera_nivel1', 0).setScale(1);
        Jugar2.setInteractive();
        
        Jugar2.on("pointerdown", (pointer, localX, localY) => {
		this.scene.start("NivelMago");});

        let Jugar5 = this.add.image(300, this.cameras.main.centerY*1.1, 'escalera_nivel12', 0).setScale(1);
        Jugar5.setInteractive();
            
        Jugar5.on("pointerdown", (pointer, localX, localY) => {
        this.scene.start("NivelMago");});
    
        let Jugar3 = this.add.image(720, this.cameras.main.centerY*1.1, 'escalera_nivel2', 0).setScale(1);
        Jugar3.setInteractive();
            
        Jugar3.on("pointerdown", (pointer, localX, localY) => {
        this.scene.start("NivelRey");});

        let Jugar4 = this.add.image(720, 1000, 'escalera_nivel2_lock', 0).setScale(1);

        if (nivel1 != 1) {
            Jugar3.y = 1000
            Jugar4.y = this.cameras.main.centerY*1.1
            Jugar5.y = 1000
        }

        let Volver = this.add.image(120, 40 + 7, 'boton').setScale(1.2);
        Volver.on("pointerdown", (pointer, localX, localY) => {
        this.scene.start("Mainmenu");});
        const botonjugar = new Button (120, 40, getPhrase("Volver"), this, () =>
        {this.scene.start("MainMenu")})
            
    }
}