import Botones from './Botones.js'
import Phaser from 'phaser'

export class MainMenu extends Phaser.Scene {
    constructor() {

        super("MainMenu")
    }

    create() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'escalera_logo');

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY*1.1 + 7, 'boton').setScale(1.2);
        const botonjugar = new Botones(this.cameras.main.centerX, this.cameras.main.centerY*1.1, "Jugar", this, () =>
		{this.scene.start("LevelSelect")})
    }
}