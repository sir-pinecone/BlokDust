
class Grid extends Fayde.Drawing.SketchContext {

    // number of units to divide width by.
    public Divisor: number;

    constructor() {
        super();
    }

    get Unit(): Size{
        var u = this.Ctx.canvas.width / this.Divisor;
        return new Size(u, u);
    }

    // rounds a normalised position to the nearest grid intersection in grid units.
    public GetGridPosition(position: Point): Point {
        var x = Math.round(position.x * this.Divisor);
        var y = Math.round(position.y * this.GetHeightDivisor());
        return new Point(x, y);
    }

    // translate grid position into pixel position.
    public GetAbsPosition(position: Point): Point {
        var x = (position.x / this.Divisor) * this.Ctx.canvas.width;
        var y = (position.y / this.GetHeightDivisor()) * this.Ctx.canvas.height;
        return new Point(x, y);
    }

    public GetHeightDivisor(): number {
        // the vertical divisor is the amount you need to divide the canvas height by in order to get the cell width
        // width  / 75 = 10
        // height / x  = 10
        // x = 1 / 10 * height
        return (1 / this.Unit.height) * this.Ctx.canvas.height;
    }

    Draw() {
        // draw grid
/*        if (window.debug) {
            var cellWidth = this.Ctx.canvas.width / this.Divisor;

            this.Ctx.lineWidth = 1;
            this.Ctx.strokeStyle = '#3d3256';

            for (var i = 0; i < this.Divisor; i++) {
                var x = Math.floor(cellWidth * i);
                this.Ctx.beginPath();
                this.Ctx.moveTo(x, 0);
                this.Ctx.lineTo(x, this.Ctx.canvas.height);
                this.Ctx.stroke();
                this.Ctx.closePath();
            }

            for (var j = 0; j < this.Divisor; j++) {
                var y = Math.floor(cellWidth * j);
                this.Ctx.beginPath();
                this.Ctx.moveTo(0, y);
                this.Ctx.lineTo(this.Ctx.canvas.width, y);
                this.Ctx.stroke();
                this.Ctx.closePath();
            }
        }*/
    }
}

export = Grid;