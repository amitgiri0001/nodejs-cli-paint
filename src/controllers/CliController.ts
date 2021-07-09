import  { prompt } from 'inquirer';
import { DRAWING_OPTIONS, DRAWING_OPTIONS_PROMPT, FILL_PROMPT, GET_COORDINATES_PROMPTS, NEW_CANVAS_PROMPT } from '../commands';
import { OperationsInteractor } from '../interactors/OperationsInteractor';

export class CliController {
    private canvas = {
        width: 0,
        height: 0,
    }
    private operations: OperationsInteractor;

    constructor() {
        this.operations = new OperationsInteractor();
    }

    /**
     * Starting point of the CLI base interaction
     */
    async start(): Promise<void> {
        const canvasMatrix =  await this.createCanvasCommand();
        this.render(canvasMatrix);
        await this.drawingStartCommand();
    }

    /**
     * CLI interaction loop to get commands
     */
    async drawingStartCommand(): Promise<void> {
        let canvasMatrix = [[]];
        const { drawingOption } =  await prompt(DRAWING_OPTIONS_PROMPT);

        switch (drawingOption) {
            case DRAWING_OPTIONS.LINE:
                canvasMatrix = await this.createLineCommand();
                break;
            case DRAWING_OPTIONS.RECTANGLE:
                canvasMatrix = await this.createRectangleCommand();
                break;
            case DRAWING_OPTIONS.COLOR:
                canvasMatrix = await this.filleColorCommand();
                break;
            case DRAWING_OPTIONS.NEW_Canvas:
                canvasMatrix = await this.createCanvasCommand();
                break;
            case DRAWING_OPTIONS.QUIT:
                return this.quitCommand();
        }

        // Prints every thing on screen
        this.render(canvasMatrix);

        await this.drawingStartCommand();
    }

    quitCommand(): Promise<void> {
        return process.exit();
    }

    /**
     * Calls drawLine operation on command
     */
    private async createLineCommand(): Promise<string[][]> {
        console.info('Enter the coordinates for the Line \n');
        
        const { x1, y1, x2, y2 } = await this.getCoordinatesFromUser();
        console.log(`Creating Line for following coordinates: [${x1},${y1}] [${x2},${y2}]`);
        
        return this.operations.drawLine({ x1, y1, x2, y2 });
    }

    /**
     * Calls drawRectangle operation on command
     */
    private async createRectangleCommand(): Promise<string[][]> {
        console.info('Enter the coordinates for the Rectangle \n');
        
        const { x1, y1, x2, y2 } = await this.getCoordinatesFromUser();
        console.log(`Creating Rectangle for following coordinates: [${x1},${y1}] [${x2},${y2}]`);
        
        return this.operations.drawRectangle({ x1, y1, x2, y2 });
    }

    /**
     * Calls fillColor operation on command
     */
    private async filleColorCommand(): Promise<string[][]> {
        console.info('Enter the coordinates to paint \n');
        
        const { x1, y1 } = await this.getCoordinatesFromUser(1);
        const { color } = await prompt(FILL_PROMPT);

        console.log(`Painting for following coordinates: [${x1},${y1}]`);
        
        return this.operations.fillColor(x1, y1, color);
    }

    /**
     * Calls createCanvas operation on command
     */
    private async createCanvasCommand(): Promise<string[][]> {
        console.info('Enter the size of the canvas \n');
        const {canvasWidth, canvasHeight  } = await prompt(NEW_CANVAS_PROMPT);

        this.canvas.width = +canvasWidth;
        this.canvas.height = +canvasHeight;

        return this.operations.createCanvas({
            width: this.canvas.width,
            height: this.canvas.height,
        });
    }

    /**
     * Prompts for input coordinates for drawing
     * @param numberOfCoordinates default 2
     * @returns coordinates
     */
    private async getCoordinatesFromUser(numberOfCoordinates = 2): Promise<{
        x1: number,
        x2: number,
        y1: number,
        y2: number
    }> {
        let { x1, y1, x2, y2 } =  await prompt(GET_COORDINATES_PROMPTS(numberOfCoordinates));

        x1 = Math.min(this.canvas.width, x1);
        x2 = Math.min(this.canvas.width, x2);
        y1 = Math.min(this.canvas.height, y1);
        y2 = Math.min(this.canvas.height, y2);

        return { x1, x2, y1, y2 }
    }

    /**
     * Prints the final canvas output on std output
     * @param screenMatrix final matrix to plot on screen
     */
     render(screenMatrix: Array<Array<string>>): void  {
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

}