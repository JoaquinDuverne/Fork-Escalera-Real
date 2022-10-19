import Phaser from 'phaser'
export class Preload extends Phaser.Scene
{
    constructor()
	{
		super('preload')
        
	}  
	preload ()
	{

			this.load.image("botonturno", "assets/phaser_logo.png");
			this.load.image("tutorial", "assets/tutorial.png");
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
			//SPRITE SHEET MAGO MALVADO 
			this.load.spritesheet('magos', "assets/mago_sprite.png", { frameWidth: 450, frameHeight: 450 })
			this.load.spritesheet('rey', "assets/rey_sprite.png", { frameWidth: 450, frameHeight: 390 })
			
			//MENU
			this.load.image("escalera_bg", "assets/escalera_bg.png");
			this.load.image("escalera_logo", "assets/escalera_logo.png");
			this.load.image("escalera_nivel1", "assets/escalera_nivel1.png");
			this.load.image("escalera_nivel2", "assets/escalera_nivel2.png");
		
			//BOTONES
			this.load.image("escalera_btncreditos", "assets/btn_creditos.png");
			this.load.image("escalera_btnextras", "assets/btn_extras.png");
			this.load.image("escalera_btnjugar", "assets/btn_jugar.png");
			this.load.image("escalera_btnreiniciar2", "assets/btn_reiniciar2.png");
			this.load.image("escalera_btnsalir", "assets/btn_salir.png");
			this.load.image("escalera_btnsalir2", "assets/btn_salir2.png");
			this.load.image("escalera_btnsiguiente2", "assets/btn_siguiente2.png");
		
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
			this.load.spritesheet("barra_vida", "assets/barra_vida.png",{ frameWidth: 870, frameHeight: 120 } );
		
			//CARTAS
			this.load.image("carta_3t", "assets/carta_3t.png");
			this.load.image("carta_5d", "assets/carta_5d.png");
			this.load.image("carta_9c", "assets/carta_9c.png");
			this.load.image("carta_8p", "assets/carta_8p.png");
		
			//CARTAS NEGRO
			this.load.image("carta_3t_Negro", "assets/carta_3t_Negro.png");
			this.load.image("carta_5d_Negro", "assets/carta_5d_Negro.png");
			this.load.image("carta_9c_Negro", "assets/carta_9c_Negro.png");
			this.load.image("carta_8p_Negro", "assets/carta_8p_Negro.png");
		
	}
	create() {

		// Pasa directamente a la escena del menú principal
		this.scene.start("MainMenu");
	  }
}