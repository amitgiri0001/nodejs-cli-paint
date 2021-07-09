import { FILL_PROMPT, GET_COORDINATES_PROMPTS, NEW_CANVAS_PROMPT } from "../../src/commands";
import { HORIZONTAL_BOUNDARIES, LINE_INDICATOR, VERTICAL_BOUNDARIES } from "../../src/Components";

describe('Commands Validations', () => {
    describe('FILL prompt validation', () => {
        it('should accept color as single alphabet', async () => {
            const fillValidator = FILL_PROMPT[0].validate;

            expect(FILL_PROMPT[0].name).toEqual('color');
            expect(FILL_PROMPT[0].type).toEqual('input');

            await expect(fillValidator('0')).rejects.not.toBe(true)
            await expect(fillValidator('A')).resolves.toBe(true)
            await expect(fillValidator('AA')).rejects.not.toBe(true)
        });

        it('should not accept color same as system characters', async () => {
            const fillValidator = FILL_PROMPT[0].validate;

            expect(FILL_PROMPT[0].name).toEqual('color');
            expect(FILL_PROMPT[0].type).toEqual('input');

            await expect(fillValidator(VERTICAL_BOUNDARIES)).rejects.not.toBe(true)
            await expect(fillValidator(HORIZONTAL_BOUNDARIES)).rejects.not.toBe(true)
            await expect(fillValidator(LINE_INDICATOR)).rejects.not.toBe(true)
        });
    });

    describe('NEW Canvas prompt validation', () => {
        it('should have width > 0', async () => {
            const newCanvasWidthValidator = NEW_CANVAS_PROMPT[0].validate;

            expect(NEW_CANVAS_PROMPT[0].name).toEqual('canvasWidth');
            expect(NEW_CANVAS_PROMPT[0].type).toEqual('input');
            
            expect(newCanvasWidthValidator('l')).not.toEqual(true);
            expect(newCanvasWidthValidator('0')).not.toEqual(true);
            expect(newCanvasWidthValidator('1')).toEqual(true);
        });

        it('should have height > 0', async () => {
            const newCanvasHeightValidator = NEW_CANVAS_PROMPT[1].validate;

            expect(NEW_CANVAS_PROMPT[1].name).toEqual('canvasHeight');
            expect(NEW_CANVAS_PROMPT[1].type).toEqual('input');

            expect(newCanvasHeightValidator('l')).not.toEqual(true);
            expect(newCanvasHeightValidator('0')).not.toEqual(true);
            expect(newCanvasHeightValidator('1')).toEqual(true);
        });
    });

    describe('GET Coordinate prompt validation', () => {
        let prompts;
        beforeEach(() => {
            prompts = GET_COORDINATES_PROMPTS(); 
        })
        it('should have x1 coordinates > 0', async () => {
            const { validate, name, type } = prompts[0];

            expect(name).toEqual('x1');
            expect(type).toEqual('input');

            await expect(validate('0')).rejects.not.toBe(true)
            await expect(validate('A')).rejects.not.toBe(true)
            await expect(validate('-1')).rejects.not.toBe(true)
            await expect(validate('1')).resolves.toBe(true)
        });

        it('should have y1 coordinates > 0', async () => {
            const { validate, name, type } = prompts[1];

            expect(name).toEqual('y1');
            expect(type).toEqual('input');

            await expect(validate('0')).rejects.not.toBe(true)
            await expect(validate('A')).rejects.not.toBe(true)
            await expect(validate('-1')).rejects.not.toBe(true)
            await expect(validate('1')).resolves.toBe(true)
        });

        it('should have x2 coordinates > 0', async () => {
            const { validate, name, type } = prompts[2];

            expect(name).toEqual('x2');
            expect(type).toEqual('input');

            await expect(validate('0')).rejects.not.toBe(true)
            await expect(validate('A')).rejects.not.toBe(true)
            await expect(validate('-1')).rejects.not.toBe(true)
            await expect(validate('1')).resolves.toBe(true)
        });

        it('should have y2 coordinates > 0', async () => {
            const { validate, name, type } = prompts[3];

            expect(name).toEqual('y2');
            expect(type).toEqual('input');

            await expect(validate('0')).rejects.not.toBe(true)
            await expect(validate('A')).rejects.not.toBe(true)
            await expect(validate('-1')).rejects.not.toBe(true)
            await expect(validate('1')).resolves.toBe(true)
        });

        it('should get only 1 coordinates when required like that', async () => {
            prompts = GET_COORDINATES_PROMPTS(1); 

            expect(prompts[2].when()).toBe(false);
            expect(prompts[3].when()).toBe(false);
        });
    });


});