import Phaser from 'phaser'

export class MainMenu extends Phaser.Scene {
    constructor() {

        super("MainMenu")
    }

    create() {
 
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'escalera_logo');


        let Jugar = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY*1.1, 'escalera_btnjugar', 0).setScale(1);
        Jugar.setInteractive();
        
        Jugar.on("pointerdown", (pointer, localX, localY) => {
			this.scene.start("LevelSelect");});  
    }
}