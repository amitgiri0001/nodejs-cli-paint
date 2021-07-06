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
        let lineMatrix = [];
        const lineType = this.lineService.getOrientation(line);

        if(lineType === LineService.LINE_TYPES.HORIZONTAL) {
            lineMatrix = this.lineService.generateHorizontalPositions(line.y1, line.x1, line.x2);
        }
        else if(lineType === LineService.LINE_TYPES.VERTICAL) {
            lineMatrix = this.lineService.generateVerticalPositions(line.x1, line.y1, line.y2);
        }

        this.canvasMatrix = this.addToCanvas(this.canvasMatrix, lineMatrix);
        this.render(this.canvasMatrix);
    }

    drawRectangle (rectangleCorners: Rectangle): void {
        const rectangleMatrix = this.rectangleService.getRectangleCoordinates(rectangleCorners);
        this.canvasMatrix = this.addToCanvas(this.canvasMatrix, rectangleMatrix);
        this.render(this.canvasMatrix);
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

    private addToCanvas(canvasMatrix: Array<Array<string>>, dataMatrix: Array<Array<number>>): string[][]  {
        while(dataMatrix.length) {
            const pixelPositions = dataMatrix.shift();
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