import React, { useEffect } from 'react';
import Phaser from 'phaser';
import BaseScene from './BaseScene';
import LoadingScene from './LoadingScene';

export default function GameComponent() {
const WIDTH = 1200;
const HEIGHT = 800;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
}

const Scenes = [LoadingScene];

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG))

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      ...SHARED_CONFIG,
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-scratch',
      },
      physics: {
        default: 'arcade',
        arcade: {
          // debug:true
        },
      },
      scene: initScenes()
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="game-container">
    </div>
  );
}