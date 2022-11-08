class Button{
    constructor (x, y, label, scene, callback){
        const button = scene.add.text(x,y,label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({
                fontFamily: "Germania One",
                backgroundColor: null,
                fontSize: "30px",
                fill: "#fff",
                stroke: '#000000',
                strokeThickness: 5,
                
            })
            .setInteractive({UseHandcursor: true})
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#B7BBC5' }))
            .on('pointerout', () => button.setStyle({ fill: '#fff' }));
    }
}
export default Button;