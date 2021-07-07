import  { prompt, Separator } from 'inquirer';
import { OperationsController } from './OperationsController';

export class CliController {
    private canvas = {
        width: 0,
        height: 0,
    }
    actions: OperationsController;

    constructor() {
        this.actions = new OperationsController();
    }

    private DRAWING_OPTIONS = {
        LINE: `Line`,
        RECTANGLE: `Rectangle`,
        COLOR: `Color`,
        SEPARATOR: new Separator(),
        NEW_Canvas: `New Canvas`,
        QUIT: `Quit`,
    };

    async start(): Promise<void> {
        await this.createCanvasCommand();
        await this.drawingStartCommand();
    }

    private async drawingStartCommand(): Promise<void> {
        const { drawingOption } =  await prompt([{
            type: 'list',
            name: 'drawingOption',
            prefix: 'Try drawing in canvas with:',
            choices: Object.values(this.DRAWING_OPTIONS)
        }]);

        switch (drawingOption) {
            case this.DRAWING_OPTIONS.LINE:
                await this.createLineCommand();
                break;
            case this.DRAWING_OPTIONS.RECTANGLE:
                await this.createRectangleCommand();
                break;
            case this.DRAWING_OPTIONS.COLOR:
                await this.filleColorCommand();
                break;
            case this.DRAWING_OPTIONS.NEW_Canvas:
                await this.createCanvasCommand();
                break;
            case this.DRAWING_OPTIONS.QUIT:
                process.exit();
        }

        await this.drawingStartCommand();
    }

    private async createLineCommand(): Promise<void> {
        console.info('Enter the coordinates for the Line \n');
        
        const { x1, y1, x2, y2 } = await this.getCoordinatesFromUser();
        console.log(`Creating Line for following coordinates: [${x1},${y1}] [${x2},${y2}]`);
        
        this.actions.drawLine({ x1, y1, x2, y2 });
    }

    private async createRectangleCommand(): Promise<void> {
        console.info('Enter the coordinates for the Rectangle \n');
        
        const { x1, y1, x2, y2 } = await this.getCoordinatesFromUser();
        console.log(`Creating Rectangle for following coordinates: [${x1},${y1}] [${x2},${y2}]`);
        
        this.actions.drawRectangle({ startX: x1, startY: y1, endX: x2, endY: y2 });
    }

    private async filleColorCommand(): Promise<void> {
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
        
        this.actions.fillColor(x1, y1, color);
    }

    private async createCanvasCommand(): Promise<void> {
        console.info('Enter the size of the canvas \n');
        const {canvasWidth, canvasHeight  } = await prompt([{
            type: 'input',
            name: 'canvasWidth',
            message: 'width', 
            suffix: '(number)',
            validate: (input) => {
               return input && !isNaN(+input);
            },
            default: 10
        },
        {
            type: 'input',
            name: 'canvasHeight',
            message: 'height',
            suffix: '(number)',
            validate: (input) => {
               return input && !isNaN(+input);
            },
            default: 10
        }]);

        this.canvas.width = +canvasWidth;
        this.canvas.height = +canvasHeight;

        this.actions.createCanvas({
            width: this.canvas.width,
            height: this.canvas.height,
        })
    }

    private async inputCoordinateValidator(input: string | number): Promise<boolean | string> {
        if(input && !isNaN(+input) && input > 0) {
            return Promise.resolve(true);
        }
        return Promise.reject('Should be a valid number > 0');
    }

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

}