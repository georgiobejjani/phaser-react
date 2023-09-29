import Phaser from "phaser";
import WebFont from "webfontloader";

import GameBackground from '../assets/scratch/bg_scratch.png';
import EA1 from '../assets/scratch/values/eagle1.png';
import EA2 from '../assets/scratch/values/eagle2.png';
import EA3 from '../assets/scratch/values/elephantt.png';
import EA4 from '../assets/scratch/values/elephantt2.png';
import EA5 from '../assets/scratch/values/horse1.png';
import EA6 from '../assets/scratch/values/horse2.png';
import EA7 from '../assets/scratch/values/lion1.png';
import EA8 from '../assets/scratch/values/lion2.png';
import EA9 from '../assets/scratch/values/tiger1.png';
import EA10 from '../assets/scratch/values/tiger2.png';
import Ball_Gratage from '../assets/scratch/ball_Scratch.png';
import Info_Board from '../assets/scratch/buttons/info-container.png';
import Settings_Container from '../assets/scratch/settingsCnt_scratch.png';
import UnsratchedBg from '../assets/scratch/unscratched_bg.png';
import LoadingScreen from '../assets/scratch/loadingScreen.png';
import TicketWrapper from '../assets/scratch/buttons/tickets_btn.png';
import Available_Ticket from '../assets/scratch/buttons/available_tcks.png';
import OrangeLogo from '../assets/scratch/loadinglogo.png';
import ticketPrice from '../assets/scratch/ticketPrice.png';
import addTicket_Hovered from '../assets/scratch/buttons/addTicketOg_scratch.png'
import addTicket_Unhovered from '../assets/scratch/buttons/addTicketW_scratch.png'
import ticketInfo from '../assets/scratch/buttons/ticketInfo_btn.png'
import removeTicket_Hovered from '../assets/scratch/buttons/removeTicketOg_Hovered.png';
import removeTicket_Unhovered from '../assets/scratch/buttons/removeTicketW_UnHovered.png';
import whiteBtn from '../assets/scratch/buttons/white_button.png';
import yellowBtn from '../assets/scratch/buttons/yellow_btn.png'
import greyBtn from '../assets/scratch/buttons/grey_btn.png';
import expandIcon from '../assets/scratch/buttons/expand_icon-settings.png';
import NoExpandIcon from '../assets/scratch/buttons/Noexpand_icon-settings.png';
import muteIcon from '../assets/scratch/buttons/mute-sound_icon-settings.png';
import UnMuteIcon from '../assets/scratch/buttons/unmute-sound_icon-settings.png';
import infoIcon from '../assets/scratch/buttons/info_icon-settings.png';
import loadingWheel from '../assets/scratch/buttons/loadingWheel.png';
import CounterBox from '../assets/scratch/buttons/ticketCounter_scratch.png';
import Emitter from '../assets/emitter_Scratched.png';
import rollingBall from '../assets/SpriteSheet/rollingball.png';
import LoadingAnimation from '../assets/SpriteSheet/loading_animation.png';
import buttonClick from '../assets/Audio/buttonClick.mp3';
import BackgroundMusic from '../assets/Audio/bg-music.mp3';
import WinningSound from '../assets/Audio/winning-sound.mp3';
import LoosingSound from '../assets/Audio/loosing-sound.mp3'

class LoadingScene extends Phaser.Scene {
    constructor(config) {
        super("LoadingScene", { ...config });
        this.config = config;
    }

    preload() {

    //   WebFont.load({
    //     google: {
    //         families: ['Inter', 'Black Ops One'],
    //     },
    //     active: () => {
    //         // Font is loaded, start the main scene
    //     },
    // });

        this.load.image("bg-game", GameBackground);
        this.load.image("EA1", EA1);
        this.load.image("EA2", EA2);
        this.load.image("EA3", EA3);
        this.load.image("EA4", EA4);
        this.load.image("EA5", EA5);
        this.load.image("EA6", EA6);
        this.load.image("EA7", EA7);
        this.load.image("EA8", EA8);
        this.load.image("EA9", EA9);
        this.load.image("EA10", EA10);
        this.load.image('ball_gratage', Ball_Gratage);
        // this.load.image('info-board', Info_Board)
        // this.load.image('SettingsCnt',Settings_Container)
        this.load.image('UnscratchedBg', UnsratchedBg)
        this.load.image('loadingscreen',LoadingScreen);
        // this.load.image('ticketsWrapper', TicketWrapper)
        // this.load.image('availableTickets', Available_Ticket)
        this.load.image('orangelogo', OrangeLogo);
        this.load.image('ticketPrice', ticketPrice);
        // this.load.image('addTicketOg_Hovered', addTicket_Hovered)
        // this.load.image('addTicketW_UnHovered', removeTicket_Unhovered)
        this.load.image('TicketInfo', ticketInfo)
        // this.load.image('removeTicketOg_Hovered', removeTicket_Hovered)
        // this.load.image('removeTicketW_UnHovered', removeTicket_Unhovered)

        // this.load.image('whiteBtn', whiteBtn);
        // this.load.image('yellowBtn', yellowBtn);
        // this.load.image('greyBtn', greyBtn);

        // this.load.image('expand-icon', expandIcon);
        // this.load.image('Noexpand-icon', NoExpandIcon);
        // this.load.image('mute-icon', muteIcon);
        // this.load.image('unmute-icon', UnMuteIcon);
        // this.load.image('info-icon', infoIcon);
        // this.load.image('loadingWheel', loadingWheel);
        // this.load.image('CounterBox', CounterBox)

        this.load.image("emitter", Emitter);
        this.load.audio("buttonClick", buttonClick)
        this.load.audio("bg-music", BackgroundMusic)
        this.load.audio("winning-sound", WinningSound)
        this.load.audio("loosing-sound", LoosingSound)
        this.load.spritesheet("manWalk", rollingBall, {
            frameWidth: 512, frameHeight: 492
        });
        this.load.spritesheet("loadingAnimation", LoadingAnimation, {
            frameWidth: 207.1, frameHeight: 200
        });
    }

    create() {
       this.image =  this.add.image(0, 0, 'loadingscreen');
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

export default LoadingScene;