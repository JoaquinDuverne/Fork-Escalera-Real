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
		super('NivelMago')
		
        
	}

    preload ()
	{

	}

	create ()
	{
		let cartarandom = 0
        let nrocarta = 0
		let palocarta = 0
		let damagecarta = 0
		let curacarta = 0

		let vidaenemigo = 1000
		let vidajugador = 1000
		let botonturno

		let barravida1
		let barravida2

		let estadocarta1 = 1
		let estadocarta2 = 1
		let estadocarta3 = 1
		let estadocarta4 = 1
		let estadocarta5 = 1

		let posicion

		//FONDO Y BOTONES

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'escalera_bg').setScale(1.1);

		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'level1_bg').setScale(1);
				
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

        //MAGO ANIMACIONES

        const MagoAnimation = this.anims.create({
        key: 'idle2',
        frames: this.anims.generateFrameNumbers('magos', {start: 0, end: 7}),
        frameRate: 5
        })
           
        const sprite2 = this.add.sprite(this.cameras.main.centerX +150,this.cameras.main.centerY +10, 'magos').setScale(0.76);

        sprite2.play({ key: 'idle2', repeat: -1 });


		//ARRAY DE NUMEROS QUE SIRVEN DE MAZO
		let mazo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
		let cantidadmazo = 51

		//VIDAS

		let barradevida = this.add.image(200, 50, 'rellenobarra1').setScale(0.5)

		let barradevida2 = this.add.image(800, 50, 'rellenobarra1').setScale(0.5)

        barravida2 = this.add.text(698, 50 ,vidaenemigo.toString(), {
            fontSize: "32px",
        })
		barravida1 = this.add.text(298, 50 ,vidajugador.toString(), {
            fontSize: "32px",
        })

		//FUNCION CREAR CARTAS
		function crearCarta(carta){

		if (carta < 13){ palocarta = 0} else if (carta < 26) {palocarta = 1} 
		else if (carta < 39) {palocarta = 2} else {palocarta = 3}

		nrocarta = (carta - palocarta * 13)+1

		if(nrocarta==1) {
			damagecarta = 75
			curacarta = 0	
		}
		if (nrocarta == 2 || nrocarta == 5 || nrocarta == 8) {
			damagecarta = 50 + 7*nrocarta
			curacarta = 0
		}
		if (nrocarta == 3 || nrocarta == 6 || nrocarta == 9) {
			damagecarta = 0
			curacarta = 50 + 7*nrocarta
		}
		if (nrocarta == 4 || nrocarta == 7 || nrocarta == 10) {
			damagecarta = 25 + 3*nrocarta
			curacarta = 25 + 3*nrocarta
		}
		if (nrocarta == 11) {
			damagecarta = 50 + 7*nrocarta
			curacarta = 50 + 7*nrocarta
		}
		if (nrocarta == 12) {
			damagecarta = 0
			curacarta = 100
		}
		if (nrocarta == 13) {
			damagecarta = 150
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
			vidaenemigo = vidaenemigo - carta.damage
			vidajugador = vidajugador + carta.cura

			barradevida2.displayWidth = barradevida2.displayWidth - carta.damage
			barradevida2.x = barradevida2.x +carta.damage/2

			barradevida.displayWidth = barradevida.displayWidth + carta.cura
			barradevida.x = barradevida.x +carta.cura/2

			barravida1.setText(vidajugador.toString());
			barravida2.setText(vidaenemigo.toString());

			carta.sprite.destroy()
			carta.estado = 0
		})
		cartas.push(carta);
			
		}

		
		
		//ROBAR CARTAS NUEVAS
		botonturno = this.add.image (800, 300, 'botonturno').setScale(0.3).setInteractive();
		botonturno.on("pointerdown", (pointer, localX, localY) => {
		
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

			cartas[i].sprite = this.add.image (150 * (i+1), cartas[i].y, 'cards', cartarandom).setScale(0.4).setInteractive();
			cartas[i].sprite.on("pointerdown", (pointer, localX, localY) => {
				vidaenemigo = vidaenemigo - cartas[i].damage
				vidajugador = vidajugador + cartas[i].cura

				barradevida2.displayWidth = barradevida2.displayWidth - cartas[i].damage
				barradevida2.x = barradevida2.x +cartas[i].damage/2
		
				barradevida.displayWidth = barradevida.displayWidth + cartas[i].cura
				barradevida.x = barradevida.x +cartas[i].cura/2
		
				barravida1.setText(vidajugador.toString());
				barravida2.setText(vidaenemigo.toString());
		
				cartas[i].sprite.destroy()
				cartas[i].estado = 0
			})
			cartas[i].estado = 1
		}}



		console.log(mazo)
		console.log (cantidadmazo)

		})

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
