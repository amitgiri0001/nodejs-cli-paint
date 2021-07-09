import { CanvasService } from "../../../src/services/CanvasService";
import { Canvas } from '../../../src/models/CanvasModel';
import { HORIZONTAL_BOUNDARIES, VERTICAL_BOUNDARIES } from "../../../src/Components";

describe('CanvasService (unit)', () => {
    let canvasService: CanvasService;
    let canvas: Canvas;
    beforeAll(() => {
        canvasService = new CanvasService();
        canvas = {
            width: 15,
            height: 10,
        };
    });
    
    it('should not consider canvas borders in user input', async () => {
        const canvasMatrix = canvasService.generateCanvasMatrix(canvas);

        expect(canvasMatrix.length === canvas.height + 2).toBe(true);
        expect(canvasMatrix[0].length === canvas.width + 2).toBe(true);
    });

    it('should put borders at the edges', async () => {
        const canvasMatrix = canvasService.generateCanvasMatrix(canvas);

        const maxColumnIndex = canvasMatrix.length - 1;
        const maxRowIndex = canvasMatrix[0].length - 1;

        // Top and bottom borders
        expect(canvasMatrix[0][0] === HORIZONTAL_BOUNDARIES).toBe(true);
        expect(canvasMatrix[maxColumnIndex][maxRowIndex] === HORIZONTAL_BOUNDARIES).toBe(true);

        // Left and right borders
        expect(canvasMatrix[1][0] === VERTICAL_BOUNDARIES).toBe(true);
        expect(canvasMatrix[maxColumnIndex - 1][maxRowIndex] === VERTICAL_BOUNDARIES).toBe(true);
    });
});