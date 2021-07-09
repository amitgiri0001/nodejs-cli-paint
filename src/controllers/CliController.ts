import  { prompt, Separator } from 'inquirer';
import { OperationsInteractor } from '../interactors/OperationsInteractor';

export class CliController {
    private canvas = {
        width: 0,
        height: 0,
    }
    operations: OperationsInteractor;

    constructor() {
        this.operations = new OperationsInteractor();
    }

    private DRAWING_OPTIONS = {
        LINE: `Line`,
        RECTANGLE: `Rectangle`,
        COLOR: `Color`,
        SEPARATOR: new Separator(),
        NEW_Canvas: `New Canvas`,
        QUIT: `Quit`,
    };

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
    private async drawingStartCommand(): Promise<void> {
        let canvasMatrix = [[]];
        const { drawingOption } =  await prompt([{
            type: 'list',
            name: 'drawingOption',
            prefix: 'Try drawing in canvas with:',
            choices: Object.values(this.DRAWING_OPTIONS)
        }]);

        switch (drawingOption) {
            case this.DRAWING_OPTIONS.LINE:
                canvasMatrix = await this.createLineCommand();
                break;
            case this.DRAWING_OPTIONS.RECTANGLE:
                canvasMatrix = await this.createRectangleCommand();
                break;
            case this.DRAWING_OPTIONS.COLOR:
                canvasMatrix = await this.filleColorCommand();
                break;
            case this.DRAWING_OPTIONS.NEW_Canvas:
                canvasMatrix = await this.createCanvasCommand();
                break;
            case this.DRAWING_OPTIONS.QUIT:
                process.exit();
        }

        // Prints every thing on screen
        this.render(canvasMatrix);

        await this.drawingStartCommand();
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
        const { color } = await prompt([{
            type: 'input',
            name: 'color',
            message: 'Choose a character to paint',
            validate: async (input: string) => {
                if(input && isNaN(+input) && input.length === 1) {
                    return Promise.resolve(true);
                }
                return Promise.reject('A single character is required.');
            }
        }]);

        console.log(`Painting for following coordinates: [${x1},${y1}]`);
        
        return this.operations.fillColor(x1, y1, color);
    }

    /**
     * Calls createCanvas operation on command
     */
    private async createCanvasCommand(): Promise<string[][]> {
        console.info('Enter the size of the canvas \n');
        const {canvasWidth, canvasHeight  } = await prompt([{
            type: 'input',
            name: 'canvasWidth',
            message: 'width', 
            suffix: '(number)',
            validate: (input) => {
               return input && !isNaN(+input) && +input > 0;
            },
            default: 10
        },
        {
            type: 'input',
            name: 'canvasHeight',
            message: 'height',
            suffix: '(number)',
            validate: (input) => {
               return input && !isNaN(+input) && +input > 0;
            },
            default: 10
        }]);

        this.canvas.width = +canvasWidth;
        this.canvas.height = +canvasHeight;

        return this.operations.createCanvas({
            width: this.canvas.width,
            height: this.canvas.height,
        });
    }

    /**
     * Validator for CLI input for coordinates
     * @param input 
     * @returns 
     */
    private async inputCoordinateValidator(input: string | number): Promise<boolean | string> {
        if(input && !isNaN(+input) && input > 0) {
            return Promise.resolve(true);
        }
        return Promise.reject('Should be a valid number > 0');
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
        let { x1, y1, x2, y2 } =  await prompt([{
            type: 'input',
            name: 'x1',
            validate: this.inputCoordinateValidator
        },
        {
            type: 'input',
            name: 'y1',
            validate: this.inputCoordinateValidator,
        },
        {
            type: 'input',
            name: 'x2',
            validate: this.inputCoordinateValidator,
            when: () => numberOfCoordinates > 1
        },
        {
            type: 'input',
            name: 'y2',
            validate: this.inputCoordinateValidator,
            when: () => numberOfCoordinates > 1
        }]);

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
     private render(screenMatrix: Array<Array<string>>): void  {
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