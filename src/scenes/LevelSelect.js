import Phaser from 'phaser'
export class LevelSelect extends Phaser.Scene {
    constructor() {

        super("LevelSelect")
    }

    create() {

        this.add.image(this.cameras.main.centerX+9, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);



        let Jugar2 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY*1.1, 'escalera_nivel1', 0).setScale(1);
        Jugar2.setInteractive();
        
        Jugar2.on("pointerdown", (pointer, localX, localY) => {
			this.scene.start("NivelMago");});


        let Salir2 = this.add.image(120, 40, 'escalera_btnsalir2', 0).setScale(1);
        Salir2.setInteractive();
            
        Salir2.on("pointerdown", (pointer, localX, localY) => {
            this.scene.start("MainMenu");}); 
            
    }
}