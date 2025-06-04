/* global phaser */
// Created by: Arsene
// Created on: May 2025
// This is the splash scene for the game

/**
 * This class is the splash scene for the game
 */
class SplashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });

        this.titleSceneBackgroundImage = null
        this.titleSceneText = null
        this.titleSceneTextStyle = { font: '200px Times', fill: '#fde4b9', align: 'center' }
    }

    init (data) {
        this.cameras.main.setBackgroundColor("#ffffff");
    }

    preload() {
        console.log('Splash Scene')
        this.load.image('splashSceneBackground', './assets/aliens_screen_image.jpg');
    }

    create(data) {
        this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground').setScale(2.75)
        this.titleSceneBackgroundImage.x = 1920 / 2
        this.titleSceneBackgroundImage.y = 1080 / 2

        this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Aliens', this.titleSceneTextStyle).setOrigin(0.5)
    }

    update(time, delta) {
        if (time > 3000) {
            this.scene.switch('titleScene');
        }
    }
}
export default SplashScene
