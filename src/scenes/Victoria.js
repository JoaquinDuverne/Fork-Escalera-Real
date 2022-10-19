import Botones from './Botones.js'
import Phaser from 'phaser'
export class Victoria extends Phaser.Scene
{
    constructor()
	{
		super('victoria')
        
	}
	create() {
        
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);
        this.add.image(this.cameras.main.centerX -200, this.cameras.main.centerY -200, 'escalera_victoria');
        this.add.image(this.cameras.main.centerX + 176, this.cameras.main.centerY +9, 'prota');

        let Salir = this.add.image(this.cameras.main.centerX -200, this.cameras.main.centerY, 'escalera_btnsalir2', 0).setScale(0.8);
        Salir.setInteractive();
        Salir.on("pointerdown", (pointer, localX, localY) => {
            this.scene.start("MainMenu");});


    }
}