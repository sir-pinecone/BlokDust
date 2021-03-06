import {Block} from '../Block';
import IDisplayContext = etch.drawing.IDisplayContext;
import {MainScene} from '../../MainScene';
import Point = etch.primitives.Point;
import {IApp} from "../../IApp";

declare var App: IApp;

export class Void extends Block {

    public StarPos: Point;

    Init(drawTo: IDisplayContext): void {
        super.Init(drawTo);
        this.BlockName = App.L10n.Blocks.Power.Blocks.Void.name;
        this.Outline.push(new Point(-1,0), new Point(0,-1), new Point(1,0), new Point(0,1));
        this.StarPos = this.RandomStarPos();
    }

    RandomStarPos() {
        var x = Math.round(Math.random()*10);
        var y = Math.round(Math.random()*(10 - x));
        var dice = Math.floor(Math.random()*2);
        if (dice==0) {x = -x;}
        dice = Math.floor(Math.random()*2);
        if (dice==0) {y = -y;}
        return new Point(x,y);
    }

    Draw() {
        super.Draw();
        this.DrawSprite(this.BlockName, this.StarPos);
    }

    Dispose(){
        super.Dispose();
    }
}
