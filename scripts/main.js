import MainScene from "./MainScene.js";

window.innerWidth = window.innerWidth || screen.width;
window.innerHeight = window.innerHeight || screen.height;

const GAME_CONFIG = {
    width: 500,
    height: 500,
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            velocity: {
                y: 150
            }
        }
    },
    backgroundColor: "#0cc",
    scene: [MainScene],
    parent: "wrapper"
};

const Game = new Phaser.Game(GAME_CONFIG);

window.addEventListener("keydown", function () {
    document.getElementsByClassName("intro")[0].style.display = "none";
});