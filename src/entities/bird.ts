import {BIRD_FRAMES, canvasWidthHeight, GAME_SPEED_X, GRAVITY} from './constants';
import {Tube} from './tube';

declare let PIXI: any;

export class Bird {
    private speedY = 0;
    private sprite = new PIXI.Sprite();
    private isDead = false;
    private textureCounter = 0;

    private updateTexture = () => {
        if (this.isDead) {
            return;
        }
        this.sprite.texture = PIXI.loader.resources[BIRD_FRAMES[this.textureCounter++]].texture;

        if (this.textureCounter === BIRD_FRAMES.length) {
            this.textureCounter = 0;
        }
    }

    constructor(stage: any, readonly tubeList: Tube[], readonly onCollision: () => void) {
        stage.addChild(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.updateTexture();
        this.sprite.scale.x = 0.06;
        this.sprite.scale.y = 0.06;
        this.reset();
        document.addEventListener('keydown', e => {
            if (e.keyCode === 32) {
                this.bounceUp(-GRAVITY / 1.7);
            }
        });
        stage.on('pointerdown', () => this.bounceUp(-GRAVITY / 1.7));
        setInterval(this.updateTexture, 200);
    }

    public updateSprite(): void {
        this.speedY += GRAVITY / 50;
        this.sprite.y += this.speedY;
        this.sprite.rotation = Math.atan(this.speedY / GAME_SPEED_X);

        let hasCollided = false;
        this.tubeList.forEach(tube => {
            if (tube.checkCollision(this.sprite.x - this.sprite.width / 2, this.sprite.y - this.sprite.height / 2, this.sprite.width, this.sprite.height)) {
                hasCollided = true;
            }
        });
        if (this.sprite.y < -this.sprite.height / 2 || this.sprite.y > canvasWidthHeight + this.sprite.height / 2) {
            hasCollided = true;
        }
        if (hasCollided) {
            this.onCollision();
            this.isDead = true;
        }
    }

    public bounceUp(increment: number): void {
        this.speedY += increment;
        this.speedY = Math.max(-GRAVITY, this.speedY);
    }

    public reset(): void {
        this.sprite.x = canvasWidthHeight / 6;
        this.sprite.y = canvasWidthHeight / 2.5;
        this.speedY = 0;
        this.isDead = false;
    }

}
