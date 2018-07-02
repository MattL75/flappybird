import {canvasWidthHeight, GAME_SPEED_X} from './constants';

declare let PIXI: any;

export class Tube {
    private x: number;
    private y: number;
    private innerDistance = 80;
    private tubeWidth = 20;
    private sprite = new PIXI.Graphics();

    constructor(stage: any, x: number) {
        stage.addChild(this.sprite);
        this.reset(x);
    }

    public reset(x: number = canvasWidthHeight + 20) {
        this.x = x;
        const tubeMinHeight = 60;
        const randomNum = Math.random() * (canvasWidthHeight - 2 * tubeMinHeight - this.innerDistance);
        this.y = tubeMinHeight + randomNum;
    }

    public checkCollision(x: number, y: number, width: number, height: number): boolean {
        if (!(x + width < this.x || this.x + this.tubeWidth < x || this.y < y)) {
            return true;
        }
        if (!(x + width < this.x || this.x + this.tubeWidth < x || y + height < this.y + this.innerDistance)) {
            return true;
        }
        return false;
    }

    public update(): void {
        this.x -= GAME_SPEED_X / 60;
        if (this.x < -this.tubeWidth) {
            this.reset();
        }

        this.sprite.clear();
        this.sprite.beginFill(0xffffff, 1);
        this.sprite.drawRect(this.x, 0, this.tubeWidth, this.y);
        this.sprite.drawRect(this.x, this.y + this.innerDistance, this.tubeWidth, canvasWidthHeight);
        this.sprite.endFill();
    }

}
