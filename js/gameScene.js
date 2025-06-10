

class GameScene extends Phaser.Scene {
      
    
    //create an alien
    createAliens() {
        const alienXLocation = Math.floor(Math.random() * 1920) + 1 //this will give a random number between 1 and 1920
        let alienXVelocity = Math.floor(Math.random() * 50) + 1 //this will give a random number between 1 and 50
        alienXVelocity *= Math.round(Math.random()) ? 1 : -1 //this will add minus sign in 50% of cases
        const anAlien = this.physics.add.sprite(alienXLocation, 100, 'ship')
        anAlien.body.velocity.y = 200
        anAlien.body.velocity.x = alienXVelocity
        this.alienGroup.add(anAlien)
    }

    constructor() {
        super({ key: 'gameScene' })

        this.background = null
        this.ship = null
        this.fireMissile = false
        this.score = 0
        this.scoreText = null
        this.scoreTextStyle = {
            font: '65px Arial',
            fill: '#ffffff',
            align: 'center'
        }
    }
  
  
    init (data) {
    this.cameras.main.setBackgroundColor("#ffffff");
    }
  
    preload() {
        console.log('Game Scene')

        //images
        this.load.image('starBackground', 'assets/starBackground.png')
        this.load.image('ship', 'assets/spaceShip.png')
        this.load.image('missile', 'assets/missile.png')
        // set Sound
        this.load.audio('laser', 'assets/laser1.wav')
        this.load.audio('explosion', 'assets/explosion.wav')
    }
  
    create(data) {
      this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
        this.background.setOrigin(0, 0)
        

        this.scoreText = this.add.text(10, 10, 'Score: 0', this.score.toString())
        
        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
        
        //Create a group for the missiles
        this.missileGroup = this.physics.add.group()

        // create a group for the aliens
        this.alienGroup = this.physics.add.group()
        this.createAliens()

        //colision between missiles and aliens
        this.physics.add.collider(this.missileGroup, this.alienGroup, function (missile, alien) {
            missile.destroy()
            alien.destroy()
            this.sound.play('explosion')
            this.score = this.score + 1
            this.scoreText.setText('Score: ' + this.score.toString())
            this.createAliens()
            this.createAliens()
          }.bind(this))
        }
        
    }
  
    update(time, delta) 
        //called 60 time a second,

        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')
        const keySpaceObj = this.input.keyboard.addKey('SPACE')

        if (keyLeftObj.isDown === true) {
            this.ship.x -= 15
            if (this.ship.x < 0) {
                this.ship.x = 0
            }
        } 
             
    
        if (keyRightObj.isDown === true) {
            this.ship.x += 15
            if (this.ship.x > 1920) {
                this.ship.x = 1920
            }
        }
        
        if (keySpaceObj.isDown === true) {
            if (this.fireMissile === false) {
            // fire Missile
            this.fireMissile = true
            const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
            this.missileGroup.add(aNewMissile)
            this.sound.play('laser')
            
         }
        }

        if (keySpaceObj.isUp === true) {
            this.fireMissile = false
        }
       
        this.missileGroup.children.each(function (item) {
            item.y = item.y - 15
            if(item.y < 0) {
                item.destroy()
            }
        })
        
    

    

    

    
    
    export default GameScene