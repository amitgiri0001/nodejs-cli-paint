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
    private _canvasMatrix: Array<Array<string>>;
    private rectangleService: RectangleService;
    private fillService: FillService;
    get canvasMatrix(): string[][]  {
        return this._canvasMatrix;
    }

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
    createCanvas (canvas: Canvas): string[][] {
        this._canvasMatrix = this.canvasService.generateCanvasMatrix(canvas);
        return this._canvasMatrix;
    }

    /**
     * Draws line on std output
     * @param line line coordinates
     */
    drawLine (line: LineCoordinates): string[][] {
        let lineMatrix = [];
        const lineType = this.lineService.getOrientation(line);

        if(lineType === LineService.LINE_TYPES.HORIZONTAL) {
            lineMatrix = this.lineService.generateHorizontalPositions(line.y1, line.x1, line.x2);
        }
        else if(lineType === LineService.LINE_TYPES.VERTICAL) {
            lineMatrix = this.lineService.generateVerticalPositions(line.x1, line.y1, line.y2);
        }
        else {
            console.log(`Line coordinates are not straight.`);
        }

        this._canvasMatrix = this.addToCanvasMatrix(this._canvasMatrix, lineMatrix);
        return this._canvasMatrix;
    }

    /**
     * Draws rectangle on std output
     * @param rectangleCorners rectangle coordinates
     */
    drawRectangle (rectangleCorners: RectangleCoordinates): string[][] {
        const {topLine, bottomLine, leftLine, rightLine} = this.rectangleService.getALLRectangleCoordinates(rectangleCorners);
        const rectangleMatrix: number[][] = [].concat(topLine, bottomLine, leftLine, rightLine);
        this._canvasMatrix = this.addToCanvasMatrix(this._canvasMatrix, rectangleMatrix);
        return this._canvasMatrix;
    }

    /**
     * Paints area with given coordinates
     * @param x 
     * @param y 
     * @param color 
     */
    fillColor(x: number, y: number, color: string): string[][] {
        this._canvasMatrix = this.fillService.fill(x, y, color,this._canvasMatrix);
        return this._canvasMatrix;
    }

    /**
     * Maps drawing elements to current canvas matrix to be plotted by render()
     * @param canvasMatrix 
     * @param dataMatrix 
     * @returns new canvasMatrix
     */
    private addToCanvasMatrix(canvasMatrix: Array<Array<string>>, dataMatrix: Array<Array<number>>): string[][]  {
        while(dataMatrix.length) {
            const pixelPositions = dataMatrix.shift();
            canvasMatrix[pixelPositions[0]][pixelPositions[1]] = LINE_INDICATOR;
        } 

        return canvasMatrix;
    }
}