import {  HORIZONTAL_BOUNDARIES, LINE_INDICATOR, VERTICAL_BOUNDARIES } from "../Components";

export class FillService {
    private tempCanvasMatrix: string[][] = [[]];
    private fillColor = ' ';

    /**
     * 
     * @param x Painting start coordinate x
     * @param y Painting start coordinate y
     * @param color Painting color
     * @param canvasMatrix Current canvas status
     * @returns new canvas matrix with painted value
     */
    fill(x: number, y: number, color: string, canvasMatrix: string[][]): string[][] {
        this.fillColor = color;
        this.tempCanvasMatrix = [...canvasMatrix];
        this.findAndFillCoordinates(x, y);

        return this.tempCanvasMatrix;
    }

    /**
     * 
     * @param x 
     * @param y 
     */
    private findAndFillCoordinates(x: number, y: number) {
        const nodes = [{ col: x ,  row: y }];

        while(nodes.length > 0) {
            const { col, row } = nodes.pop();
            
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
     * @param currentNodeValue value of current node position
     * @returns bool
     * "Inside" means, it is not inside any "filled" area.
     */
    private isInside(currentNodeValue: string) {
        // When the node is not either of below
        if([VERTICAL_BOUNDARIES, HORIZONTAL_BOUNDARIES, LINE_INDICATOR].includes(currentNodeValue)) return true;

        // When the coordinates are already painted
        if(currentNodeValue === this.fillColor) return true;

        return false;
    }
}