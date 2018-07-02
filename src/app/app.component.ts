import {Component, OnInit} from '@angular/core';
declare let PIXI: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    app = new PIXI.Application();

    ngOnInit() {
        document.body.appendChild(this.app.view);
        this.pixiLoad();
    }

    pixiLoad(): void {
        PIXI.loader.add('bunny', '../assets/bunny.png').load((loader, resources) => {
            const bunny = new PIXI.Sprite(resources.bunny.texture);
            bunny.x = this.app.renderer.width / 2;
            bunny.y = this.app.renderer.height / 2;

            bunny.anchor.x = 0.5;
            bunny.anchor.y = 0.5;

            this.app.stage.addChild(bunny);

            this.app.ticker.add(() => {
                bunny.rotation += 0.1;
            });
        });
    }
}
