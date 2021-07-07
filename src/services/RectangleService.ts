import { Rectangle } from "../models/RectangleModel";
import { LineService } from './LineService';

export class RectangleService extends LineService {
    constructor() {
        super()
    }

    getRectangleCoordinates(rectangle: Rectangle): number[][] {
        const { startX, startY, endX, endY } = rectangle; 
        const topLine = this.generateHorizontalPositions(startY, startX, endX);
        const bottomLine = this.generateHorizontalPositions(endY, startX, endX);
        const leftLine = this.generateVerticalPositions(startX, startY, endY);
        const rightLine = this.generateVerticalPositions(endX, startY, endY);

        return [].concat(topLine, bottomLine, leftLine, rightLine);
    }



}