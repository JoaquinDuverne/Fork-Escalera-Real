import { EN_US, ES_AR } from "../enums/languages.js";
import Button from './Botones.js';
import { getPhrase, getTranslations } from "../services/translations.js";
import Phaser from 'phaser'

export class Idiomas extends Phaser.Scene {
    #language;
    constructor() {

        super("Idiomas")
    }

    create() {
        
        let contexto =this
        const bgAnimation = this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('escalera_bg_sprite', {start: 0, end: 113}),
            frameRate: 30
            })
    
            const sprite = this.add.sprite(this.cameras.main.centerX ,this.cameras.main.centerY, 'escalera_bg_sprite').setScale(1.95);
    
            sprite.play({ key: 'bg', repeat: -1 });


        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'escalera_logo');

        let Volver = this.add.image(120, 40 + 7, 'boton').setScale(1.2);
        Volver.on("pointerdown", (pointer, localX, localY) => {
        this.scene.start("Mainmenu");});
        const botonjugar = new Button(120, 40, getPhrase("Volver"), this, () =>
        {this.scene.start("MainMenu")})

        let ESP = this.add.image(300, 450, 'esp').setScale(1);
        ESP.setInteractive();
        ESP.on("pointerdown", (pointer, localX, localY) => {
        contexto.#language = ES_AR;
        getTranslations(contexto.#language);
        setTimeout(function idioma1() {
        contexto.scene.start("MainMenu");
            }, 2000);

        });

        let EEUU = this.add.image(720, 450, 'eeuu').setScale(1);
        EEUU.setInteractive();
        EEUU.on("pointerdown", (pointer, localX, localY) => {    
        contexto.#language = EN_US;
        getTranslations(contexto.#language);
        setTimeout(function idioma1() {
        contexto.scene.start("MainMenu");
            }, 2000);
        }
        );



    }
}