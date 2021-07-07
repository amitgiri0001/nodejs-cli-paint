import { Canvas } from "../models/CanvasModel";
import { CanvasService } from "../services/CanvasService";
import { LINE_INDICATOR } from "../Components";
import { FillService } from "../services/FillService";
import { LineCoordinates } from "../models/LineCoordinatesModel";
import { LineService } from "../services/LineService";
import { RectangleCoordinates } from "../models/RectangleCoordinatesModel";
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

    /**
     * Creates canvas on std output
     * @param canvas width and height of Canvas
     */
    createCanvas (canvas: Canvas): void {
        this.canvasMatrix = this.canvasService.generateCanvas(canvas);
        this.render(this.canvasMatrix);
    }

    /**
     * Draws line on std output
     * @param line line coordinates
     */
    drawLine (line: LineCoordinates): void {
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

    /**
     * Draws rectangle on std output
     * @param rectangleCorners rectangle coordinates
     */
    drawRectangle (rectangleCorners: RectangleCoordinates): void {
        const rectangleMatrix = this.rectangleService.getRectangleCoordinates(rectangleCorners);
        this.canvasMatrix = this.addToCanvas(this.canvasMatrix, rectangleMatrix);
        this.render(this.canvasMatrix);
    }

    /**
     * Paints area with given coordinates
     * @param x 
     * @param y 
     * @param color 
     */
    fillColor(x: number, y: number, color: string): void {
        this.canvasMatrix = this.fillService.fill(x, y, color,this.canvasMatrix);
        this.render(this.canvasMatrix);
    }

    /**
     * Prints the final canvas output on std output
     * @param screenMatrix final matrix to plot on screen
     */
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

    /**
     * Maps drawing elements to current canvas matrix to be plotted by render()
     * @param canvasMatrix 
     * @param dataMatrix 
     * @returns new canvasMatrix
     */
    private addToCanvas(canvasMatrix: Array<Array<string>>, dataMatrix: Array<Array<number>>): string[][]  {
        while(dataMatrix.length) {
            const pixelPositions = dataMatrix.shift();
            canvasMatrix[pixelPositions[0]][pixelPositions[1]] = LINE_INDICATOR;
        } 

        return canvasMatrix;
    }
}