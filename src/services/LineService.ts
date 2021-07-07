import { LineCoordinates } from "../models/LineCoordinatesModel";
export class LineService {
    static LINE_TYPES = {
        HORIZONTAL: 'HORIZONTAL',
        VERTICAL: 'VERTICAL',
        NON_STRAIGHT: 'NON_STRAIGHT',
    }

    /**
     * 
     * @param x Common column coordinates that remains unchanged
     * @param y1 Vertical line coordinates start
     * @param y2 Vertical line coordinates end
     * @returns Array matrix of line in canvas
     */
    generateVerticalPositions(x : number, y1: number, y2: number): number[][] {
        const pixelPositions = [];
        let fromRow = Math.min(y1, y2);
        const toRow = Math.max(y1, y2);
        while(fromRow <= toRow) {
            pixelPositions.push([fromRow, x]); // pushing in yx format for Array
            fromRow++;
        }
        return pixelPositions;
    }

    /**
     * 
     * @param y Common row coordinates that remains unchanged
     * @param x1 Horizontal line coordinates start
     * @param x2 Horizontal line coordinates end
     * @returns Array matrix of line in canvas
     */
    generateHorizontalPositions(y : number, x1: number, x2: number): number[][] {
        const pixelPositions = [];
        let fromColumn = Math.min(x1, x2);
        const toColumn = Math.max(x1, x2);
        while(fromColumn <= toColumn) {
            pixelPositions.push([y, fromColumn]); // pushing in yx format for Array
            fromColumn++;
        }
        return pixelPositions;
    }

    /**
     * 
     * @param line Line coordinates
     * @returns line's orientation in string
     */
    getOrientation(line: LineCoordinates): string {
        // Constant column
        if(line.x1 === line.x2) { 
            return LineService.LINE_TYPES.VERTICAL;
        }
        // Constant row
        else if(line.y1 === line.y2) { 
            return LineService.LINE_TYPES.HORIZONTAL;
        }

        return LineService.LINE_TYPES.NON_STRAIGHT;

    }
}