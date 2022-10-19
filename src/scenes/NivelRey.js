import Botones from './Botones.js'
import Phaser, { GameObjects } from 'phaser'
import Cartas from './Cartas.js'

let gameOptions = {
    startingCards: 5,
    cardWidth: 265,
    cardHeight: 400,
    cardDistance: 50,
    cardAngle: 5
}
export default class NivelMago extends Phaser.Scene
{
	constructor()
	{
		super('NivelRey')
		
        
	}

    preload ()
	{

	}

	create ()
	{
		let contexto = this
		let cartarandom = 0
        let nrocarta = 0
		let palocarta = 0
		let damagecarta = 0
		let curacarta = 0

		let vidaenemigo = 258
		let vidajugador = 258

		let barravida1
		let barravida2

		let enemigoDamage = 258 * 0.13

		let accionEnemigo

		let posicion

		//FONDO Y BOTONES

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'level2_bg').setScale(1);
				
		let Salir = this.add.image(910, 625, 'escalera_btnsalir2', 0).setScale(0.8);
		Salir.setInteractive();
							
		Salir.on("pointerdown", (pointer, localX, localY) => {
		this.scene.start("MainMenu");}); 
		
		
        //PROTAGONISTA ANIMACIONES
        
        const protasAnimation = this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('protas', {start: 0, end: 3}),
        frameRate: 4
        })

        const sprite = this.add.sprite(this.cameras.main.centerX -139,this.cameras.main.centerY +81, 'protas').setScale(0.76);

        sprite.play({ key: 'idle', repeat: -1 });

        //REY ANIMACIONES

        const ReyAnimation = this.anims.create({
        key: 'idle3',
        frames: this.anims.generateFrameNumbers('rey', {start: 0, end: 9}),
        frameRate: 5
        })
           
        const sprite2 = this.add.sprite(this.cameras.main.centerX +150,this.cameras.main.centerY +10, 'rey').setScale(0.76);

        sprite2.play({ key: 'idle3', repeat: -1 });

		const ReyAnimation1 = this.anims.create({
			key: 'reyanim1',
			frames: this.anims.generateFrameNumbers('rey', {start: 11, end: 25}),
			frameRate: 8
			})

		const ReyAnimation2 = this.anims.create({
			key: 'reyanim2',
			frames: this.anims.generateFrameNumbers('rey', {start: 45, end: 56}),
			frameRate: 5
			})

		const ReyAnimationDormir = this.anims.create({
			key: 'reydormir',
			frames: this.anims.generateFrameNumbers('rey', {start: 26, end: 44}),
			frameRate: 5
			})
	


		//ARRAY DE NUMEROS QUE SIRVEN DE MAZO
		let mazo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
		let cantidadmazo = 51

		//VIDAS
		let barradevidafondo = this.add.image(339, 66, 'fondobarra')
		let barradevida2fondo = this.add.image(675, 66, 'fondobarra')

		let barradevida = this.add.image(339, 66, 'rellenobarra1')
		let barradevida2 = this.add.image(675, 66, 'rellenobarra1')
		

		const spritevida = this.add.sprite(this.cameras.main.centerY + 180, 70, "barra_vida", 0)

		let turno = 1


		//FUNCION CREAR CARTAS
		function crearCarta(carta){

		if (carta < 13){ palocarta = 0} else if (carta < 26) {palocarta = 1} 
		else if (carta < 39) {palocarta = 2} else {palocarta = 3}

		nrocarta = (carta - palocarta * 13)+1

		if(nrocarta==1) {
			damagecarta = 258 * 0.3
			curacarta = 0	
		}
		if (nrocarta == 2 || nrocarta == 5 || nrocarta == 8) {
			damagecarta = 258 * 0.05 + 7*nrocarta
			curacarta = 0
		}
		if (nrocarta == 3 || nrocarta == 6 || nrocarta == 9) {
			damagecarta = 0
			curacarta = 258 * 0.05 + 7*nrocarta
		}
		if (nrocarta == 4 || nrocarta == 7 || nrocarta == 10) {
			damagecarta = 258 * 0.025 + 4*nrocarta
			curacarta = 258 * 0.025 + 4*nrocarta
		}
		if (nrocarta == 11) {
			damagecarta = 258 * 0.1 
			curacarta = 258 * 0.1 
		}
		if (nrocarta == 12) {
			damagecarta = 0
			curacarta = 258 * 0.35
		}
		if (nrocarta == 13) {
			damagecarta = 258 * 0.35
			curacarta = 0
		}
		}

		const cartas = [];

		for (let i = 0; i < 5; i++) {
			const cartarandom = mazo[Phaser.Math.Between(1,cantidadmazo)]
			const posicion = mazo.indexOf(cartarandom)
			mazo.splice(posicion, 1)
			cantidadmazo = cantidadmazo- 1

			crearCarta(cartarandom)

			const carta = new Cartas (1, nrocarta, palocarta, damagecarta, curacarta, 150 * (i+1), 620)
			carta.sprite = this.add.image (carta.x, carta.y, 'cards', cartarandom).setScale(0.4).setInteractive();

			carta.sprite.on("pointerdown", (pointer, localX, localY) => {
			setTimeout (function ataqueJugador (){
			vidaenemigo = vidaenemigo - carta.damage
			vidajugador = vidajugador + carta.cura

			barradevida2.displayWidth = barradevida2.displayWidth - carta.damage
			barradevida2.x = barradevida2.x + carta.damage/2

			barradevida.displayWidth = barradevida.displayWidth + carta.cura
			barradevida.x = barradevida.x + carta.cura/2

			if (vidajugador > 258) {
			barradevida.displayWidth = 258
			barradevida.x = 339
			vidajugador = 258
			}

			if (vidaenemigo <= 0) {
			contexto.scene.start("victoria");
			}

			carta.sprite.destroy()
			carta.estado = 0
			
			setTimeout (function cambioTurno () {
			
			accionEnemigo = Phaser.Math.Between(0,2)

			if (accionEnemigo == 0) {sprite2.play({ key: 'reyanim2', repeat: 1 });}
			else if (accionEnemigo == 1) {sprite2.play({ key: 'reyanim1', repeat: 1 });}
			else {{sprite2.play({ key: 'reydormir', repeat: 1 });}}

			turno = turno + 1
			spritevida.setFrame(1)

				setTimeout (function ataqueEnemigo () {

				if (accionEnemigo == 0) {

				vidajugador = vidajugador - enemigoDamage * 1.5
				barradevida.displayWidth = barradevida.displayWidth - enemigoDamage * 1.5
				barradevida.x = barradevida.x - (enemigoDamage* 1.5)/2

				} else if (accionEnemigo == 1) {

				vidajugador = vidajugador - enemigoDamage
				barradevida.displayWidth = barradevida.displayWidth - enemigoDamage
				barradevida.x = barradevida.x - enemigoDamage/2
				
				vidaenemigo = vidaenemigo + enemigoDamage
				barradevida2.displayWidth = barradevida2.displayWidth + enemigoDamage
				barradevida2.x = barradevida2.x - enemigoDamage/2

				} else
				
				if (vidaenemigo > 258) {
				barradevida2.displayWidth = 258
				barradevida2.x = 675
				vidaenemigo = 258
				}

				if (vidajugador <= 0) {
				contexto.scene.start("derrota");
				}

				sprite2.play({ key: 'idle3', repeat: -1 });

		
				setTimeout (function cambioTurno () {
					turno = turno + 1
					spritevida.setFrame(0)
					robarCarta();
					},2000)
					
		
				},2000)

			},2000)
			},2000)	

		})
		cartas.push(carta);
			
		}

		function robarCarta() {
			for (let i = 0; i < 5; i++) {
			if (cartas[i].estado == 0) {
				cartarandom = mazo[Phaser.Math.Between(0,cantidadmazo)]
				posicion = mazo.indexOf(cartarandom)
				mazo.splice(posicion, 1)
				cantidadmazo = cantidadmazo- 1
		
				crearCarta(cartarandom)
	
				cartas[i].nro = nrocarta
				cartas[i].palo = palocarta
				cartas[i].damage = damagecarta
				cartas[i].cura = curacarta
	
				cartas[i].sprite = contexto.add.image (150 * (i+1), cartas[i].y, 'cards', cartarandom).setScale(0.4).setInteractive();
				cartas[i].sprite.on("pointerdown", (pointer, localX, localY) => {
					setTimeout (function ataqueJugador (){

					vidaenemigo = vidaenemigo - cartas[i].damage
					vidajugador = vidajugador + cartas[i].cura
	
					barradevida2.displayWidth = barradevida2.displayWidth - cartas[i].damage
					barradevida2.x = barradevida2.x + cartas[i].damage/2
			
					barradevida.displayWidth = barradevida.displayWidth + cartas[i].cura
					barradevida.x = barradevida.x + cartas[i].cura/2

					if (vidajugador > 258) {
					barradevida.displayWidth = 258
					barradevida.x = 339
					vidajugador = 258
					}

					if (vidaenemigo <= 0) {
					contexto.scene.start("victoria");
					}
			
					cartas[i].sprite.destroy()
					cartas[i].estado = 0
					setTimeout (function cambioTurno () {
			
						accionEnemigo = Phaser.Math.Between(0,2)
			
						if (accionEnemigo == 0) {sprite2.play({ key: 'reyanim2', repeat: 1 });}
						else if (accionEnemigo == 1) {sprite2.play({ key: 'reyanim1', repeat: 1 });}
						else {{sprite2.play({ key: 'reydormir', repeat: 1 });}}
			
						turno = turno + 1
						spritevida.setFrame(1)
			
							setTimeout (function ataqueEnemigo () {
			
							if (accionEnemigo == 0) {
			
							vidajugador = vidajugador - enemigoDamage * 1.5
							barradevida.displayWidth = barradevida.displayWidth - enemigoDamage * 1.5
							barradevida.x = barradevida.x - (enemigoDamage* 1.5)/2
			
							} else if (accionEnemigo == 1) {
			
							vidajugador = vidajugador - enemigoDamage
							barradevida.displayWidth = barradevida.displayWidth - enemigoDamage
							barradevida.x = barradevida.x - enemigoDamage/2
							
							vidaenemigo = vidaenemigo + enemigoDamage
							barradevida2.displayWidth = barradevida2.displayWidth + enemigoDamage
							barradevida2.x = barradevida2.x - enemigoDamage/2
			
							} else
							
							if (vidaenemigo > 258) {
							barradevida2.displayWidth = 258
							barradevida2.x = 675
							vidaenemigo = 258
							}
			
							if (vidajugador <= 0) {
							contexto.scene.start("derrota");
							}
			
							sprite2.play({ key: 'idle3', repeat: -1 });
					
							setTimeout (function cambioTurno () {
								
								turno = turno + 1
								spritevida.setFrame(0)
								robarCarta();
								},2000)
								
					
							},2000)
			
						},2000)
						},2000)	
				})
				cartas[i].estado = 1
			}}
			}
		
		
		//TUTORIAL

		let Black = this.add.image(this.cameras.main.centerX, 2000, 'black').setScale(0.4);
		let Tuto = this.add.image(this.cameras.main.centerX, 1000, 'tutorial').setScale(0.25);

		let Libro = this.add.image(950, 510, 'libro').setScale(0.8);
		Libro.setInteractive();
		Libro.on("pointerdown", (pointer, localX, localY) => {
		if (Tuto.y == 1000) {
			Tuto.y = this.cameras.main.centerY
			Black.y = this.cameras.main.centerY
		} else {
		Tuto.y = 1000
		Black.y = 2000
		}
		}); 
	
	}
}