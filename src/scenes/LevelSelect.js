import Botones from './Botones.js'
import Phaser from 'phaser'
export class LevelSelect extends Phaser.Scene {
    constructor() {

        super("LevelSelect")
    }

    create() {

        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);


        let Jugar2 = this.add.image(300, this.cameras.main.centerY*1.1, 'escalera_nivel1', 0).setScale(1);
        Jugar2.setInteractive();
        
        Jugar2.on("pointerdown", (pointer, localX, localY) => {
			this.scene.start("NivelMago");});


        let Jugar3 = this.add.image(800, this.cameras.main.centerY*1.1, 'escalera_nivel2', 0).setScale(1);
        Jugar3.setInteractive();
            
        Jugar3.on("pointerdown", (pointer, localX, localY) => {
            this.scene.start("NivelRey");});


        let Volver = this.add.image(120, 40 + 7, 'boton').setScale(1.2);
        Volver.on("pointerdown", (pointer, localX, localY) => {
        this.scene.start("Mainmenu");});
        const botonjugar = new Botones(120, 40, "Volver", this, () =>
        {this.scene.start("MainMenu")})
            
    }
}