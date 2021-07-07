import { Canvas } from "../models/CanvasModel";
import { CanvasService } from "../services/CanvasService";
import { LINE_INDICATOR } from "../Components";
import { FillService } from "../services/FillService";
import { Line } from "../models/LineModel";
import { LineService } from "../services/LineService";
import { Rectangle } from "../models/RectangleModel";
import { RectangleService } from "../services/RectangleService";

export class OperationsInteractor {
    private canvasService: CanvasService;
    private lineService: LineService;
    private canvasMatrix: Array<Array<string>>;
    private rectangleService: RectangleService;
    private fillService: FillService;

    constructor() {
        this.canvasService = new CanvasService();
        this.lineService = new LineService();
        this.rectangleService = new RectangleService();
        this.fillService = new FillService();
    }

    createCanvas (canvas: Canvas): void {
        this.canvasMatrix = this.canvasService.generateCanvas(canvas);
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

    fillColor(x: number, y: number, color: string): void {
        this.canvasMatrix = this.fillService.fill(x, y, color,this.canvasMatrix);
        this.render(this.canvasMatrix);
    }

    private render(screenMatrix: Array<Array<string>>): void  {
        console.log('\n\n\n');
        for (let level = 0; level < screenMatrix.length; level++) {
            const row = screenMatrix[level];
            let rowPixels = '';
            for (let partition = 0; partition < row.length; partition++) {
                rowPixels += row[partition];
            }
            console.log(rowPixels);
        }
        console.log('\n\n\n');
    }

    private addToCanvas(canvasMatrix: Array<Array<string>>, dataMatrix: Array<Array<number>>): string[][]  {
        while(dataMatrix.length) {
            const pixelPositions = dataMatrix.shift();
            canvasMatrix[pixelPositions[0]][pixelPositions[1]] = LINE_INDICATOR;
        } 

        return canvasMatrix;
    }
}