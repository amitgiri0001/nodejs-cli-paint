import { Canvas } from "./CanvasModel";
import { CanvasService } from "./CanvasService";
import { LINE_INDICATOR } from "./Components";
import { Line } from "./LineModel";
import { LineService } from "./LineService";
import { Rectangle } from "./RectangleModel";
import { RectangleService } from "./RectangleService";

// TODO validate or reset to min and max for x and Y according to the canvas
export class OperationsController {
    canvasService: CanvasService;
    lineService: LineService;
    canvasMatrix: Array<Array<string>>;
    rectangleService: RectangleService;

    constructor() {
        this.canvasService = new CanvasService();
        this.lineService = new LineService();
        this.rectangleService = new RectangleService();
    }

    createCanvas (canvas: Canvas): void {
        this.canvasMatrix = this.canvasService.generateCanvasCoordinates(canvas);
        this.render(this.canvasMatrix);
    }

    drawLine (line: Line): void {
        const lineMatrix = this.lineService.getLineCoordinates(line);
        this.canvasMatrix = this.addToCanvas(this.canvasMatrix, lineMatrix);
        this.render(this.canvasMatrix);
    }

    drawRectangle (rectangleCorners: Rectangle) {
        const rectangle = this.rectangleService.
    }

    private render(screenMatrix: Array<Array<string>>): void  {
        for (let level = 0; level < screenMatrix.length; level++) {
            const row = screenMatrix[level];
            let rowPixels = '';
            for (let partition = 0; partition < row.length; partition++) {
                rowPixels += row[partition];
            }
            console.log(rowPixels);
        }
    }

    private addToCanvas(canvasMatrix: Array<Array<string>>, lineMatrix: Array<Array<number>>): string[][]  {
        while(lineMatrix.length) {
            const pixelPositions = lineMatrix.shift();
            canvasMatrix[pixelPositions[0]][pixelPositions[1]] = LINE_INDICATOR;
        } 

        return canvasMatrix;
    }
    // createRectangle (x1: number, y1: number, x2: number, y2: number) {
        
    // }

    // fill (x: number, y: number, color: string) {
        
    // }

    // quit () {
        
    // }
}