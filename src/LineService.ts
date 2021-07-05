import { Line } from "./LineModel";

export class LineService {
    static LINE_TYPES = {
        HORIZONTAL: 'HORIZONTAL',
        VERTICAL: 'VERTICAL',
        NON_STRAIGHT: 'NON_STRAIGHT',
    }

    getLineCoordinates(line: Line): Array<Array<number>> {
      const lineType = this.getOrientation(line);

      switch (lineType) {
        case LineService.LINE_TYPES.HORIZONTAL:
            return this.generateHorizontalPositions(line.y1, line.x1, line.x2);
        case LineService.LINE_TYPES.VERTICAL:
            return this.generateVerticalPositions(line.x1, line.y1, line.y2);
        default:
            throw new Error('Not Implemented');
      }
    }

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

    private getOrientation(line: Line) {
        // Not moving sidewise
        if(line.x1 === line.x2) { 
            return LineService.LINE_TYPES.VERTICAL;
        }
        // Constant height
        else if(line.y1 === line.y2) { 
            return LineService.LINE_TYPES.HORIZONTAL;
        }

        return LineService.LINE_TYPES.NON_STRAIGHT;

    }
}