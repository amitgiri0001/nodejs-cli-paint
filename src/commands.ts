import { Separator } from "inquirer";
import { HORIZONTAL_BOUNDARIES, LINE_INDICATOR, VERTICAL_BOUNDARIES } from "./Components";

export const DRAWING_OPTIONS = {
    LINE: `Line`,
    RECTANGLE: `Rectangle`,
    COLOR: `Color`,
    SEPARATOR: new Separator(),
    NEW_Canvas: `New Canvas`,
    QUIT: `Quit`,
};

export const DRAWING_OPTIONS_PROMPT = [{
    type: 'list',
    name: 'drawingOption',
    prefix: 'Try drawing in canvas with:',
    choices: Object.values(DRAWING_OPTIONS)
}];

export const FILL_PROMPT = [{
    type: 'input',
    name: 'color',
    message: 'Choose a character to paint',
    validate: async (input: string): Promise<boolean> => {
        if(input && isNaN(+input) && input.length === 1 
            && 
            ![VERTICAL_BOUNDARIES, HORIZONTAL_BOUNDARIES, LINE_INDICATOR].includes(input)
        ) {
            return Promise.resolve(true);
        }
        return Promise.reject(`A single character is required. Excluding following characters [ ${VERTICAL_BOUNDARIES}, ${HORIZONTAL_BOUNDARIES}, ${LINE_INDICATOR} ]`);
    }
}]

export const NEW_CANVAS_PROMPT = [{
    type: 'input',
    name: 'canvasWidth',
    message: 'width', 
    suffix: '(number)',
    validate: (input : string | number): boolean => {
       return input && !isNaN(+input) && +input > 0;
    },
    default: 10
},
{
    type: 'input',
    name: 'canvasHeight',
    message: 'height',
    suffix: '(number)',
    validate: (input : string | number): boolean => {
        return input && !isNaN(+input) && +input > 0;
     },
    default: 10
}];

export const GET_COORDINATES_PROMPTS = (numberOfCoordinates = 2):
Array<{ 
    validate: (input: string | number) => Promise<boolean | string>, 
    when?: () => boolean, 
    type: string,
    name: string    
}> => {
    return [{
        type: 'input',
        name: 'x1',
        validate: inputCoordinateValidator
    },
    {
        type: 'input',
        name: 'y1',
        validate: inputCoordinateValidator,
    },
    {
        type: 'input',
        name: 'x2',
        validate: inputCoordinateValidator,
        when: () => numberOfCoordinates > 1
    },
    {
        type: 'input',
        name: 'y2',
        validate: inputCoordinateValidator,
        when: () => numberOfCoordinates > 1
    }]
}

/**
* Validator for CLI input for coordinates
* @param input 
* @returns 
*/
export const inputCoordinateValidator = async(input: string | number): Promise<boolean | string> => {
   if(input && !isNaN(+input) && +input > 0) {
       return Promise.resolve(true);
   }
   return Promise.reject('Should be a valid number > 0');
}