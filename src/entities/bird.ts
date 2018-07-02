declare let PIXI: any;
export class Bird {
    private BIRD_FRAMES: any[] = [];
    private speedY = 0;
    private sprite = new PIXI.Sprite();
    private isDead = false;
    private textureCounter = 0;

    public updateSprite() {
        this.speedY +=
    }

    private updateTexture(): void {
        if (this.isDead) {
            return;
        }
        this.sprite.texture = PIXI.loader.resources[this.BIRD_FRAMES[this.textureCounter++]].texture;
        if (this.textureCounter === this.BIRD_FRAMES.length) {
            this.textureCounter = 0;
        }
    }
}
