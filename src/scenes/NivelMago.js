import Phaser, { GameObjects } from 'phaser'
import Cartas from './Cartas.js'
import { getPhrase } from '../services/translations.js'
import Button from './Botones.js'

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
		super('NivelMago')
		
        
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
		let spritecarta = 0

		let vidaenemigo = 258
		let vidajugador = 258

		let barravida1
		let barravida2

		let bloqueo = 0

		let enemigoDamage = 258 * 0.13

		let accionEnemigo

		let posicion

		//FONDO Y BOTONES

		//this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);

		const bgAnimation = this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('escalera_bg_sprite', {start: 0, end: 113}),
            frameRate: 30
            })
    
            const sprite4 = this.add.sprite(this.cameras.main.centerX ,this.cameras.main.centerY, 'escalera_bg_sprite').setScale(1.95);
    
            sprite4.play({ key: 'bg', repeat: -1 });

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'level1_bg').setScale(1);
				
		this.add.image(910,625, 'boton').setScale(1);
        const botonsalir = new Button (910,625- 7, getPhrase("Salir"), this, () =>
        {this.scene.start("MainMenu")}) 
		
		
        //PROTAGONISTA ANIMACIONES
        
        const protasAnimation = this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('protas', {start: 0, end: 3}),
        frameRate: 4
        })

        const sprite = this.add.sprite(this.cameras.main.centerX -139,this.cameras.main.centerY +81, 'protas').setScale(0.76);

        sprite.play({ key: 'idle', repeat: -1 });

		const protasAnimation2 = this.anims.create({
			key: 'cura',
			frames: this.anims.generateFrameNumbers('protas', {start: 4, end: 9}),
			frameRate: 4
			})

		const protasAnimation3 = this.anims.create({
			key: 'as',
			frames: this.anims.generateFrameNumbers('protas', {start: 10, end: 16}),
			frameRate: 4
			})
		
		const protasAnimation4 = this.anims.create({
			key: 'q',
			frames: this.anims.generateFrameNumbers('protas', {start: 17, end: 21}),
			frameRate: 4
			})
	
		const protasAnimation5 = this.anims.create({
			key: 'hit1',
			frames: this.anims.generateFrameNumbers('protas', {start: 22, end: 23}),
			frameRate: 4
			})
		
		const protasAnimation6 = this.anims.create({
			key: 'sword',
			frames: this.anims.generateFrameNumbers('protas', {start: 24, end: 28}),
			frameRate: 4
			})
		
		const protasAnimation7 = this.anims.create({
			key: 'shield',
			frames: this.anims.generateFrameNumbers('protas', {start: 29, end: 38}),
			frameRate: 4
			})
			
		const protasAnimation8 = this.anims.create({
			key: 'k',
			frames: this.anims.generateFrameNumbers('protas', {start: 39, end: 43}),
			frameRate: 4
			})

		const protasAnimation9 = this.anims.create({
			key: 'j',
			frames: this.anims.generateFrameNumbers('protas', {start: 44, end: 47}),
			frameRate: 4
			})

        //MAGO ANIMACIONES

        const MagoAnimation = this.anims.create({
        key: 'idle2',
        frames: this.anims.generateFrameNumbers('magos', {start: 0, end: 7}),
        frameRate: 5
        })   
        const sprite3 = this.add.sprite(this.cameras.main.centerX +150,this.cameras.main.centerY +10, 'magos').setScale(0.76);
        sprite3.play({ key: 'idle2', repeat: -1 });

		const MagoAnimation1 = this.anims.create({
			key: 'atk1',
			frames: this.anims.generateFrameNumbers('magos', {start: 8, end: 24}),
			frameRate: 5
			})

		const MagoAnimationHit = this.anims.create({
			key: 'hit',
			frames: this.anims.generateFrameNumbers('magos', {start: 25, end: 26}),
			frameRate: 2
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
			spritecarta = 1

		}
		if (nrocarta == 2 || nrocarta == 5 || nrocarta == 8) {
			damagecarta = 258 * 0.05 + 7*nrocarta
			curacarta = 0
			spritecarta = 2
		}
		if (nrocarta == 3 || nrocarta == 6 || nrocarta == 9) {
			damagecarta = 0
			curacarta = 258 * 0.05 + 7*nrocarta
			spritecarta = 3
		}
		if (nrocarta == 4 || nrocarta == 7 || nrocarta == 10) {
			damagecarta = 258 * 0.025 + 4*nrocarta
			curacarta = 258 * 0.025 + 4*nrocarta
			spritecarta = 4
		}
		if (nrocarta == 11) {
			damagecarta = 258 * 0.1 
			curacarta = 258 * 0.1
			spritecarta = 5
		}
		if (nrocarta == 12) {
			damagecarta = 0
			curacarta = 258 * 0.35
			spritecarta = 6
		}
		if (nrocarta == 13) {
			damagecarta = 258 * 0.35
			curacarta = 0
			spritecarta = 7
		}
		}

		const cartas = [];

		for (let i = 0; i < 5; i++) {
			const cartarandom = mazo[Phaser.Math.Between(1,cantidadmazo)]
			const posicion = mazo.indexOf(cartarandom)
			mazo.splice(posicion, 1)
			cantidadmazo = cantidadmazo- 1

			crearCarta(cartarandom)

			const carta = new Cartas (1, nrocarta, palocarta, damagecarta, curacarta, 150 * (i+1), 620, spritecarta)
			carta.sprite = this.add.image (carta.x, carta.y, 'cards', cartarandom).setScale(0.4).setInteractive();

			carta.sprite.on("pointerdown", (pointer, localX, localY) => {

			if (bloqueo == 0) {
			bloqueo = 1

			if (carta.sprites == 1) {sprite.play({ key: 'as', repeat: 0 });}
			if (carta.sprites == 2) {sprite.play({ key: 'sword', repeat: 0 });} 
			if (carta.sprites == 3) {sprite.play({ key: 'cura', repeat: 0 });} 
			if (carta.sprites == 4) {sprite.play({ key: 'shield', repeat: 0 });} 
			if (carta.sprites == 5) {sprite.play({ key: 'j', repeat: 0 });} 
			if (carta.sprites == 6) {sprite.play({ key: 'q', repeat: 0 });}
			if (carta.sprites == 7) {sprite.play({ key: 'k', repeat: 0 });} 
			
			setTimeout (function ataqueJugador (){

			vidaenemigo = vidaenemigo - carta.damage
			vidajugador = vidajugador + carta.cura

			barradevida2.displayWidth = barradevida2.displayWidth - carta.damage
			barradevida2.x = barradevida2.x + carta.damage/2

			barradevida.displayWidth = barradevida.displayWidth + carta.cura
			barradevida.x = barradevida.x + carta.cura/2
			spritevida.setFrame(1)

			sprite.play({ key: 'idle', repeat: -1 });

			sprite3.play({ key: 'hit', repeat: 0 });

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
			turno = turno + 1
			spritevida.setFrame(2)

			accionEnemigo = Phaser.Math.Between(0,1)
			
			if (accionEnemigo == 0) {sprite3.play({ key: 'atk1', repeat: 0 });}
			else if (accionEnemigo == 1) {sprite3.play({ key: 'atk1', repeat: 0 });}


				setTimeout (function ataqueEnemigo () {
				
				sprite.play({ key: 'hit1', repeat: 0 });

				if (accionEnemigo == 0) {

				vidajugador = vidajugador - enemigoDamage * 1.5
				barradevida.displayWidth = barradevida.displayWidth - enemigoDamage * 1.5
				barradevida.x = barradevida.x - (enemigoDamage* 1.5)/2

				} else {

				vidajugador = vidajugador - enemigoDamage
				barradevida.displayWidth = barradevida.displayWidth - enemigoDamage
				barradevida.x = barradevida.x - enemigoDamage/2
				
				vidaenemigo = vidaenemigo + enemigoDamage
				barradevida2.displayWidth = barradevida2.displayWidth + enemigoDamage
				barradevida2.x = barradevida2.x - enemigoDamage/2

				}
				
				if (vidaenemigo > 258) {
				barradevida2.displayWidth = 258
				barradevida2.x = 675
				vidaenemigo = 258
				}

				if (vidajugador <= 0) {
				contexto.scene.start("derrota");
				}

				sprite3.play({ key: 'idle2', repeat: -1 })

				spritevida.setFrame(3)

		
				setTimeout (function cambioTurno () {
					sprite.play({ key: 'idle', repeat: -1 });
					turno = turno + 1
					spritevida.setFrame(0)
					bloqueo = 0
					robarCarta();
					},500)
					
		
				},3000)

			},500)
			},2000)	

		}})
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
				cartas[i].sprites = spritecarta
	
				cartas[i].sprite = contexto.add.image (150 * (i+1), cartas[i].y, 'cards', cartarandom).setScale(0.4).setInteractive();
				cartas[i].sprite.on("pointerdown", (pointer, localX, localY) => {
				
				if (bloqueo == 0) {
				bloqueo = 1

					if (cartas[i].sprites == 1) {sprite.play({ key: 'as', repeat: 0 });}
					if (cartas[i].sprites == 2) {sprite.play({ key: 'sword', repeat: 0 });} 
					if (cartas[i].sprites == 3) {sprite.play({ key: 'cura', repeat: 0 });} 
					if (cartas[i].sprites == 4) {sprite.play({ key: 'shield', repeat: 0 });} 
					if (cartas[i].sprites == 5) {sprite.play({ key: 'j', repeat: 0 });} 
					if (cartas[i].sprites == 6) {sprite.play({ key: 'q', repeat: 0 });}
					if (cartas[i].sprites == 7) {sprite.play({ key: 'k', repeat: 0 });} 
					
					setTimeout (function ataqueJugador (){

					vidaenemigo = vidaenemigo - cartas[i].damage
					vidajugador = vidajugador + cartas[i].cura
	
					barradevida2.displayWidth = barradevida2.displayWidth - cartas[i].damage
					barradevida2.x = barradevida2.x + cartas[i].damage/2
			
					barradevida.displayWidth = barradevida.displayWidth + cartas[i].cura
					barradevida.x = barradevida.x + cartas[i].cura/2

					spritevida.setFrame(1)

					sprite.play({ key: 'idle', repeat: -1 });

					sprite3.play({ key: 'hit', repeat: 0 });

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
						turno = turno + 1
						spritevida.setFrame(2)
						accionEnemigo = Phaser.Math.Between(0,1)
			
						if (accionEnemigo == 0) {sprite3.play({ key: 'atk1', repeat: 0 });}
						else if (accionEnemigo == 1) {sprite3.play({ key: 'atk1', repeat: 0 });}

			
							setTimeout (function ataqueEnemigo () {
							
							sprite.play({ key: 'hit1', repeat: 0 });
				
							if (accionEnemigo == 0) {
							vidajugador = vidajugador - enemigoDamage * 1.5
							barradevida.displayWidth = barradevida.displayWidth - enemigoDamage * 1.5
							barradevida.x = barradevida.x - (enemigoDamage* 1.5)/2
							} else {
							vidajugador = vidajugador - enemigoDamage
							barradevida.displayWidth = barradevida.displayWidth - enemigoDamage
							barradevida.x = barradevida.x - enemigoDamage/2
								
							vidaenemigo = vidaenemigo + enemigoDamage
							barradevida2.displayWidth = barradevida2.displayWidth + enemigoDamage
							barradevida2.x = barradevida2.x - enemigoDamage/2
							}

							if (vidaenemigo > 258) {
							barradevida2.displayWidth = 258
							barradevida2.x = 675
							vidaenemigo = 258
							}
						
							if (vidajugador <= 0) {
							contexto.scene.start("derrota");
							}
							spritevida.setFrame(3)
							sprite3.play({ key: 'idle2', repeat: -1 });
					
							setTimeout (function cambioTurno () {
								sprite.play({ key: 'idle', repeat: -1 });
								turno = turno + 1
								spritevida.setFrame(0)
								bloqueo = 0
								robarCarta();
								},500)
								
					
							},3000)
			
						},500)
						},2000)	
			}})
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