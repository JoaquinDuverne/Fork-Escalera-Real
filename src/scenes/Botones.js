class Button{
    constructor (x, y, label, scene, callback){
        const button = scene.add.text(x,y,label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({
                backgroundColor: null,
                fontSize: "30px",
                fill: "#fff",
                stroke: '#000000',
                strokeThickness: 11,
                fontFamily: 'Happy Chicken'
            })
            .setInteractive({UseHandcursor: true})
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#B7BBC5' }))
            .on('pointerout', () => button.setStyle({ fill: '#fff' }));
    }
}
export default Button;