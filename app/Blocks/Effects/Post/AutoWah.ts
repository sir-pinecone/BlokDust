import IDisplayContext = etch.drawing.IDisplayContext;
import Point = etch.primitives.Point;
import {PostEffect} from '../PostEffect';

import {IApp} from "../../../IApp";

declare var App: IApp;

export class AutoWah extends PostEffect {

    public Effect: Tone.AutoWah;
    public Params: AutoWahParams;
    public Defaults: AutoWahParams;

    Init(drawTo: IDisplayContext): void {

        this.BlockName = App.L10n.Blocks.Effect.Blocks.AutoWah.name;

        this.Defaults = {
            octaves: 5,
            baseFrequency: 100,
            mix: 0.3,
            attack: 0.75,
            release: 0.3
        };
        this.PopulateParams();

        this.Effect = new Tone.AutoWah({
            "baseFrequency": this.Params.baseFrequency,
            "octaves": this.Params.octaves,
            "sensitivity": -10,
            "gain" : 30,
            "rolloff" : -18,
            "follower" : {
                "attack": this.Params.attack,
                "release": this.Params.release
            }
        });

        this.Effect.wet.value = this.Params.mix;

        super.Init(drawTo);

        // Define Outline for HitTest
        this.Outline.push(new Point(0, -1),new Point(1, -1),new Point(1, 1),new Point(-2, 1));
    }

    Draw() {
        super.Draw();
        this.DrawSprite(this.BlockName);
    }

    Dispose() {
        this.Effect.dispose();
    }

    SetParam(param: string,value: number) {
        super.SetParam(param,value);
        var val = value;

        if (param === "mix") {
            this.Effect.wet.value = val;
        } else if (param === "octaves") {
            this.Effect.octaves = val;
        } else if (param === "baseFrequency") {
            this.Effect.baseFrequency = val;
        } else if (param === "attack") {
            this.Effect.follower.attack = val;
        } else if (param === "release") {
            this.Effect.follower.release = val;
        }

        this.Params[param] = val;
    }

    UpdateOptionsForm() {
        super.UpdateOptionsForm();

        this.OptionsForm =
        {
            "name" : App.L10n.Blocks.Effect.Blocks.AutoWah.name,
            "parameters" : [

                {
                    "type" : "slider",
                    "name" : "Range",
                    "setting" :"octaves",
                    "props" : {
                        "value" : this.Params.octaves,
                        "min" : 1,
                        "max" : 8,
                        "quantised" : false,
                        "centered" : false
                    }
                },

                {
                    "type" : "slider",
                    "name" : "Frequency",
                    "setting" :"baseFrequency",
                    "props" : {
                        "value" : this.Params.baseFrequency,
                        "min" : 50,
                        "max" : 1200,
                        "quantised" : true,
                        "centered" : false
                    }
                },

                {
                    "type" : "slider",
                    "name" : "Mix",
                    "setting" :"mix",
                    "props" : {
                        "value" : this.Params.mix,
                        "min" : 0,
                        "max" : 1,
                        "quantised" : false,
                        "centered" : false
                    }
                },

                {
                    "type" : "slider",
                    "name" : "Attack",
                    "setting" :"attack",
                    "props" : {
                        "value" : this.Params.attack,
                        "min" : 0.01,
                        "max" : 2,
                        "quantised" : false,
                        "centered" : false
                    }
                },

                {
                    "type" : "slider",
                    "name" : "Release",
                    "setting" :"release",
                    "props" : {
                        "value" : this.Params.release,
                        "min" : 0.01,
                        "max" : 2,
                        "quantised" : false,
                        "centered" : false
                    }
                }
            ]
        };
    }
}
