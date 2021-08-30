export default class MainScene extends Phaser.Scene {
    constructor() {
        super();
        this.keyboard = {};
        this.player = {};
        this.URLS = {
            BG_LAYER_1: "../tilesets/tilesets/JnRLayer01.png",
            BG_LAYER_2: "../tilesets/tilesets/JnRLayer02.png",
            BG_LAYER_3: "../tilesets/tilesets/JnRLayer03.png",
            BG_LAYER_4: "../tilesets/tilesets/JnRLayer04.png",
            AC_LAYER: "../tilesets/tilesets/JnRTiles.png",
            TILE_URL: "../tilesets/maps/platformer_test.json",
            PLAYER: "../tilesets/tilesets/dude.png"
        };
        this.SPEED_METER = {
            y: 100,
            x: 100,
            gr: 2,
            fr: 0.8,
            init: 250
        };
        this.I_SPEED = 150;
        this.Y_SPEED = 250;
        this.SPEED = 100;
        this.KEYS = [
            "BG_1",
            "BG_2",
            "BG_3",
            "BG_4",
            "AC_L",
            "TI_LE",
            "PY"
        ];
        this.tilesets = [
            "tileset_test",
            "blocks",
            "coins",
            "PL",
            "die"
        ];
        this.PLAYER_ANIM_KEYS = [
            "top",
            "right",
            "bottom",
            "left"
        ]
        this.tileMap = {};
        this.power = 0;
        this.TH_SPEED = 100;
        this.jumping = true;
        this.timer = 0;
        this.onGround = false;
        this.coins = 0;
        this.text = {};
    }

    preload() {
        this.load.image(this.KEYS[0], this.URLS.BG_LAYER_1);
        this.load.image(this.KEYS[1], this.URLS.BG_LAYER_2);
        this.load.image(this.KEYS[2], this.URLS.BG_LAYER_3);
        this.load.image(this.KEYS[3], this.URLS.BG_LAYER_4);
        this.load.image(this.KEYS[4], this.URLS.AC_LAYER);
        this.load.spritesheet(this.KEYS[6], this.URLS.PLAYER, {
            frameWidth: 32,
            frameHeight: 48
        });
        this.LAYERS = {
            coins: {},
            blocks: {},
            die: {}
        }
        this.load.tilemapTiledJSON(this.KEYS[5], this.URLS.TILE_URL);
    }

    create() {
        // const bg1 = this.physics.add.image(0, 0, this.KEYS[0]);
        // const bg2 = this.physics.add.image(0, 0, this.KEYS[1]);
        // const bg3 = this.physics.add.image(0, 0, this.KEYS[2]);
        // const bg4 = this.physics.add.image(0, 0, this.KEYS[3]);
        // const center = (500 / 2) + 50;
        // bg1.x = bg3.x = bg4.x = bg3.y = bg4.y = bg1.y = bg2.y = bg2.x = center;
        // bg2.y += 70;
        // bg3.y += 110;
        // bg4.y += 110;
        // bg1.setScale(3);
        // bg2.setScale(2);
        // bg3.setScale(2);
        // bg4.setScale(2);
        this.keyboard = this.input.keyboard.createCursorKeys();
        this.tileMap = this.make.tilemap({
            key: this.KEYS[5],
            tileWidth: 32,
            tileHeight: 32
        });
        this.tileMap.setCollisionBetween(0, 999);
        const tileset = this.tileMap.addTilesetImage(this.tilesets[0], this.KEYS[4]);
        this.LAYERS.blocks = this.tileMap.createLayer(this.tilesets[1], tileset);
        this.LAYERS.die = this.tileMap.createLayer(this.tilesets[4], tileset);
        this.player = this.physics.add.sprite(50, 300, this.KEYS[6]);
        this.player.body.setGravityY(270);
        this.onGround = false;
        this.physics.add.collider(this.player, this.LAYERS.blocks, () => this.onGround = true);
        this.physics.add.collider(this.player, this.LAYERS.die);
        this.LAYERS.coins = this.tileMap.createLayer(this.tilesets[2], tileset);
        this.LAYERS.coins.setCollisionByProperty({
            collides: true
        });
        
        this.physics.add.collider(this.player, this.LAYERS.coins, (pl, co) => {
            pl.disableBody(true);
        });
        
        this.player.setBounceY(0.2);
        this.cameras.main.startFollow(this.player);
        this.anims.create({
            key: this.PLAYER_ANIM_KEYS[3],
            frames: this.anims.generateFrameNumbers(this.KEYS[6], {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: this.PLAYER_ANIM_KEYS[0],
            frames: [{
                key: this.KEYS[6],
                frame: 4
            }]
        })
        this.anims.create({
            key: this.PLAYER_ANIM_KEYS[1],
            frames: this.anims.generateFrameNumbers(this.KEYS[6], {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });
        this.text = this.add.text(20, 100, this.coins, {
            fontSize: "55px",
            fill: "#fefefe"
        });
    }

    gameEnd(player, blocks) {
        player.setTint(0xcc0000);
    }


    update() {
        this.text.x = this.player.x - 10;
        this.onGround = false;
        this.player.setVelocityX(this.SPEED);
        if (this.keyboard.left.isDown) {
            this.player.anims.play(this.PLAYER_ANIM_KEYS[3], true);
            this.SPEED = -this.I_SPEED;
        } else if (this.keyboard.right.isDown) {
            this.player.anims.play(this.PLAYER_ANIM_KEYS[1], true);
            this.SPEED = this.I_SPEED;
        } else {
            this.SPEED = 0;
            this.player.anims.play(this.PLAYER_ANIM_KEYS[0], true);
        }
        if (this.keyboard.space.isDown) {
            this.jump();
        }
    }

    jump() {
        this.SPEED_METER.y = this.SPEED_METER.y;
        this.player.setVelocityY(-this.SPEED_METER.y);
    }
}