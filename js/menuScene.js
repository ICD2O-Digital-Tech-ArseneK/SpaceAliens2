/* global phaser */
// Created by: abdul
// Created on: May 2025
// This is the Menu scene for the game

/**
 */
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'menuScene' })

        this.menuSceneBackgroundImage = null
        this.startButton
    }
  
  
    init(data) {
        this.cameras.main.setBackgroundColor("#ffffff")
    }
  
    preload() {
        console.log('Menu Scene')
        this.load.image('MenuSceneBackground', './assets/aliens_screen_image2.jpg')
        this.load.image('startButton', 'assets/start.png')
    }
  
    create(data) {
        this.load.menuSceneBackGroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
        this.load.menuSceneBackGroundImage.x = 1920 / 2
        this.load.menuSceneBackGroundImage.y = 1080 / 2

        this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
        this.startButton.setInteractive({ useHandCursor: true })
        this.startButton.on('pointerdown', () => this.clickButton)
    }
  
    update(time, delta) {
    }
    
    clickButton() {
        this.scene.start('gameScene')
    }
}

    export default MenuScene