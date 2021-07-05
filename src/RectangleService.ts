import { Rectangle } from "./RectangleModel";
import { LineService } from './LineService';

export class RectangleService extends LineService {
    constructor() {
        super()
    }

    getRectangleCoordinates(rectangle: Rectangle): number[][] {
        const topLine = this.generateHorizontalPositions(rectangle.endY, rectangle.startX, rectangle.endX);
        const bottomLine = this.generateHorizontalPositions(rectangle.startY, rectangle.startX, rectangle.endX);
        return [[1]];
    }



}