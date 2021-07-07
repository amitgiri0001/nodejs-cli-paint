import {  HORIZONTAL_BOUNDARIES, LINE_INDICATOR, VERTICAL_BOUNDARIES } from "./Components";

export class FillService {
    tempCanvasMatrix: string[][] = [[]];
    fillColor = 'c';

    fill(x: number, y: number, color: string = this.fillColor,canvasMatrix: string[][]): string[][] {
        this.fillColor = color;
        this.tempCanvasMatrix = [...canvasMatrix];
        this.findAndFillCoordinates(x, y);

        return this.tempCanvasMatrix;
    }

    private findAndFillCoordinates(x: number, y: number) {
        const nodes = [{ col: x ,  row: y }];

        while(nodes.length > 0) {
            const { col, row } = nodes.pop();

            if(!this.isInCanvasArea(row, col)) continue; 
            
            const currentNodeValue = this.tempCanvasMatrix[row][col];
            if(this.isInside(currentNodeValue)) continue;
            // Set color 
            this.tempCanvasMatrix[row][col] = this.fillColor;

            // Prepare for look around
            nodes.push({row: row + 1, col}); // Goes up
            nodes.push({row: row - 1, col}); // Goes down
            nodes.push({row: row, col: col -1}); // Goes left
            nodes.push({row: row, col: col  +1}); // Goes right
        }
    }

    /**
     * 
     * @param currentNodeValue 
     * @returns bool
     * "Inside" means, it is not inside any "filled" area.
     */
    private isInside(currentNodeValue: string) {
        // When the coordinates are not empty to be painted.
        //if(currentNodeValue !== EMPTY_SPACE) return true;
        if([VERTICAL_BOUNDARIES, HORIZONTAL_BOUNDARIES, LINE_INDICATOR].includes(currentNodeValue)) return true;

        // When the coordinates are already painted
        if(currentNodeValue === this.fillColor) return true;

        return false;
    }

    private isInCanvasArea(row: number, col: number) {
        // When the rows are going out of range
        if(row < 0 || row > this.tempCanvasMatrix.length - 1) return false;

        // When the columns are going out of range
        if(col < 0 || col > this.tempCanvasMatrix[row].length) return false;
        
        return true
    }
}