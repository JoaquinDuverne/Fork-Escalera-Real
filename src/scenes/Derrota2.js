import Botones from './Botones.js'
import Phaser from 'phaser'
import { getPhrase } from '../services/translations.js';

export class Derrota2 extends Phaser.Scene
{
    constructor()
	{
		super('Derrota2')
        
	} 
	create() {
        
        const bgAnimation = this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('escalera_bg_sprite', {start: 0, end: 113}),
            frameRate: 30
            })
    
        const sprite = this.add.sprite(this.cameras.main.centerX ,this.cameras.main.centerY, 'escalera_bg_sprite').setScale(1.95);
    
        sprite.play({ key: 'bg', repeat: -1 });

        this.add.image(this.cameras.main.centerX -200, this.cameras.main.centerY -200, 'escalera_derrota');
        this.add.image(this.cameras.main.centerX +176, this.cameras.main.centerY +9, 'retratorey');

        this.add.image(this.cameras.main.centerX-200, this.cameras.main.centerY - 7, 'boton').setScale(1.2);
        const botonsalir = new Botones(this.cameras.main.centerX-200, this.cameras.main.centerY - 7, getPhrase("Salir"), this, () =>
        {this.scene.start("MainMenu")})

        this.add.image(this.cameras.main.centerX-200, this.cameras.main.centerY + 100 - 7, 'boton').setScale(1.2);
        const botonreiniciar = new Botones(this.cameras.main.centerX-200, this.cameras.main.centerY + 100 - 7, getPhrase("Reiniciar"), this, () =>
		{this.scene.start("NivelRey")})

    }
}