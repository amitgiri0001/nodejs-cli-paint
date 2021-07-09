import { RectangleCoordinates } from "../models/RectangleCoordinatesModel";
import { LineService } from './LineService';

export class RectangleService extends LineService {
    constructor() {
        super()
    }

    /**
     * 
     * @param rectangle Rectangle coordinates
     * @returns Array Matrix for rectangle
     */
     getALLRectangleCoordinates(rectangle: RectangleCoordinates):  { 
        topLine: number[][],
        bottomLine: number[][],
        leftLine: number[][],
        rightLine: number[][]
    } {
        const { x1: startX, y1: startY, x2: endX, y2: endY } = rectangle; 
        const topLine = this.generateHorizontalPositions(startY, startX, endX);
        const bottomLine = this.generateHorizontalPositions(endY, startX, endX);
        const leftLine = this.generateVerticalPositions(startX, startY, endY);
        const rightLine = this.generateVerticalPositions(endX, startY, endY);

        return {topLine, bottomLine, leftLine, rightLine};
    }



}