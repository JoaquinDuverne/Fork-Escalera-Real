import Phaser from 'phaser'
import { getLanguageConfig, getTranslations } from "../services/translations";
export class Preload extends Phaser.Scene
{

	#language;

    constructor()
	{
		super('preload')
        
	}  
	preload ()
	{
        getTranslations(this.#language);

		//CARTAS Y VIDA
		this.load.image("rellenobarra1", "assets/vida_relleno.png");
		this.load.image("fondobarra", "assets/vida_fondo.png");
		this.load.image("boton", "assets/boton.png");
		this.load.image("black", "assets/black.png");
		this.load.spritesheet("cards", 'assets/cards.png', {
			frameWidth: 325,
			frameHeight: 440,
		});
			
		//SPRITE SHEET PROTA
		this.load.spritesheet('protas', "assets/prota_sprite.png", { frameWidth: 240, frameHeight: 150 })

		//SPRITE SHEET JEFES 
		this.load.spritesheet('magos', "assets/spritesheetmago.png", { frameWidth: 450, frameHeight: 450 })
		this.load.spritesheet('rey', "assets/rey_sprite.png", { frameWidth: 450, frameHeight: 390 })
			
		//MENU
		this.load.image("escalera_bg", "assets/escalera_bg.png");
		this.load.spritesheet("escalera_bg_sprite", "assets/escalera_big_spritesheet.png", {frameWidth:600, frameHeight: 338 });
		this.load.image("escalera_logo", "assets/escalera_logo.png");
		this.load.image("escalera_nivel1", "assets/escalera_nivel1.png");
		this.load.image("escalera_nivel12", "assets/escalera_nivel12.png");
		this.load.image("escalera_nivel2", "assets/escalera_nivel2.png");
		this.load.image("escalera_nivel2_lock", "assets/escalera_nivel2_lock.png");
		this.load.image("eeuu", "assets/eeuu.png");
		this.load.image("esp", "assets/arg.png");
		this.load.image("tutorial", "assets/tutorial.png");
		this.load.image("libro_creditos", "assets/libro_creditos.png");
		this.load.image("creditos", "assets/creditos.png");
	
		//BOTONES
		this.load.image("escalera_btncreditos", "assets/btn_creditos.png");
		this.load.image("escalera_btnextras", "assets/btn_extras.png");
		this.load.image("escalera_btnjugar", "assets/btn_jugar.png");
		this.load.image("escalera_btnreiniciar2", "assets/btn_reiniciar2.png");
		this.load.image("escalera_btnsalir", "assets/btn_salir.png");
		this.load.image("escalera_btnsalir2", "assets/btn_salir2.png");
		this.load.image("escalera_btnsiguiente2", "assets/btn_siguiente2.png");
		this.load.image("escalera_btnidioma", "assets/botonidiomas.png");
		
		//VICTORIA Y DERROTA
		this.load.image("escalera_victoria", "assets/escalera_victoria.png");
		this.load.image("escalera_derrota", "assets/escalera_derrota.png");
		
		//HUD MENU
		this.load.image("level1_bg", "assets/level1_bg.png");
		this.load.image("libro", "assets/libro.png");
		this.load.image("btn_juego", "assets/btn_juego.png");
		this.load.image("level2_bg", "assets/escenario_2.png");
		
		//PERSONAJES
		this.load.image("prota", "assets/sprite_protaf.png");
		this.load.image("mago", "assets/sprite_mago.png");
		this.load.image("retratorey", "assets/sprite_rey.png");
		this.load.spritesheet("barra_vida", "assets/barra_vida.png",{ frameWidth: 870, frameHeight: 120 } );
		this.load.spritesheet("barra_vida2", "assets/barra_vida2.png",{ frameWidth: 870, frameHeight: 120 } );
		
	}
	create() {
		this.scene.start("MainMenu",{ language: this.#language });
	  }
	async getTranslations(language){
    await getTranslations(language)
    }
}