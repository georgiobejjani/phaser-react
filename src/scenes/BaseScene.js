import Phaser from "phaser";


import LoadingScreen from '../assets/scratch/loadingScreen.png';
import LoadingAnimation from '../assets/SpriteSheet/loading_animation.png';

export default class BaseScene extends Phaser.Scene {
    constructor(config) {
        super("LoadingScene", { ...config });
        this.config = config;
    }

    preload() {

   
        this.load.image('loadingscreen',LoadingScreen);
        this.load.spritesheet("loadingAnimation", LoadingAnimation, {
            frameWidth: 207.1, frameHeight: 200
        });
    }

    create() {
        this.image = this.add.image(0, 0, 'loadingscreen');
        this.scaleFactor = this.config.height / this.image.height;
        this.image.setScale(this.scaleFactor).setPosition(this.config.width / 2, this.config.height / 2);
        this.add.image(this.config.width / 2, this.config.height - 600, "orangelogo").setScale(0.7)
        this.load.on('complete', () => {
            // Clean up and start the main scene

            this.time.delayedCall(1000, () => {
                this.stopBallAnimation();
                this.scene.start('Scratch');
            });
        });

        // Start loading assets
        this.createBallAnimation();
        this.load.start();
    }
    createBallAnimation() {

        this.loadingAnimation = this.physics.add
            .sprite(this.config.width / 2, this.config.height / 2, "loadingAnimation")
            .setOrigin(0.5)
            .setScale(0.7)


        this.loadingAnimation.body.velocity.x = 0;

        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("loadingAnimation"),
            frameRate: 6,
            repeat: -1,
        });
        this.loadingAnimation.play("rotate");
    }

    stopBallAnimation() {
        this.loadingAnimation.anims.stop('rotate');
        this.loadingAnimation.setFrame(0);
        this.loadingAnimation.destroy();
    }

}

