jest.mock('inquirer');
import { CliController } from "../../src/controllers/CliController";
import { prompt } from 'inquirer';
import { OperationsInteractor } from "../../src/interactors/OperationsInteractor";
import { DRAWING_OPTIONS } from "../../src/commands";

describe('CliController (acceptance)', () => {
    let promptMock: jest.MockedFunction<typeof prompt>;

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(jest.fn());
        jest.spyOn(console, 'info').mockImplementation(jest.fn());
        promptMock = prompt as jest.MockedFunction<typeof prompt>;
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    
    it('should start with creating new canvas', async () => {
        promptMock.mockResolvedValueOnce({canvasWidth: 3, canvasHeight:3  })

        const drawingStartCommandSpy = jest.spyOn(CliController.prototype, 'drawingStartCommand').mockImplementation(jest.fn());
        const renderSpy = jest.spyOn(CliController.prototype, 'render');
        const createCanvasSpy = jest.spyOn(OperationsInteractor.prototype, 'createCanvas');
        
        const cli = new CliController();
        await cli.start();
        
        expect(createCanvasSpy).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalled();
        expect(drawingStartCommandSpy).toHaveBeenCalled();
    });

    describe('Commands', () => {
        let quitSpy: jest.SpyInstance;
        beforeEach(() => {
            quitSpy = jest.spyOn(CliController.prototype, 'quitCommand').mockResolvedValue();
        });

        describe('Create Line Command', () => {
            it('should create Line on command', async () => {
                const renderSpy = jest.spyOn(CliController.prototype, 'render');
                const drawLineSpy = jest.spyOn(OperationsInteractor.prototype, 'drawLine').mockReturnValue([['*']]);
                
                const cli = new CliController();
                
                // Command input sequence
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.LINE }) ;
                promptMock.mockResolvedValueOnce({ x1: 1, y1:1, x2:2, y2:1 });
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.QUIT });
    
                await cli.drawingStartCommand();
    
                expect(renderSpy).toHaveBeenCalled();
                expect(drawLineSpy).toHaveBeenCalled();
            });
        });

        describe('Create Rectangle Command', () => {
            it('should create Rectangle on command', async () => {
                const renderSpy = jest.spyOn(CliController.prototype, 'render');
                const drawRectangleSpy = jest.spyOn(OperationsInteractor.prototype, 'drawRectangle').mockReturnValue([['*']]);
                
                const cli = new CliController();
                
                // Command input sequence
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.RECTANGLE }) ;
                promptMock.mockResolvedValueOnce({ x1: 1, y1:1, x2:2, y2:2 });
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.QUIT });
    
                await cli.drawingStartCommand();
    
                expect(renderSpy).toHaveBeenCalled();
                expect(drawRectangleSpy).toHaveBeenCalled();
            });
        });

        describe('Fill Command', () => {
            it('should fill on command', async () => {
                const renderSpy = jest.spyOn(CliController.prototype, 'render');
                const fillColorSpy = jest.spyOn(OperationsInteractor.prototype, 'fillColor').mockReturnValue([['*']]);
                
                const cli = new CliController();
                
                // Command input sequence
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.COLOR }) ;
                promptMock.mockResolvedValueOnce({ x1: 1, y1:1 });
                promptMock.mockResolvedValueOnce({ color: 'c' });
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.QUIT });
    
                await cli.drawingStartCommand();
    
                expect(renderSpy).toHaveBeenCalled();
                expect(fillColorSpy).toHaveBeenCalled();
            });
        });

        describe('New canvas Command', () => {
            it('should create new canvas on command', async () => {
                const renderSpy = jest.spyOn(CliController.prototype, 'render');
                const createCanvasSpy = jest.spyOn(OperationsInteractor.prototype, 'createCanvas').mockReturnValue([['*']]);
                
                const cli = new CliController();
                
                // Command input sequence
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.NEW_Canvas }) ;
                promptMock.mockResolvedValueOnce({canvasWidth: 3, canvasHeight:3  })
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.QUIT });
    
                await cli.drawingStartCommand();
    
                expect(renderSpy).toHaveBeenCalled();
                expect(createCanvasSpy).toHaveBeenCalled();
            });
        });

        describe('Quit Command', () => {
            it('should quit on command', async () => {
                const renderSpy = jest.spyOn(CliController.prototype, 'render');
                quitSpy.mockRestore();
                const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();
                
                const cli = new CliController();
                
                // Command input sequence
                promptMock.mockResolvedValueOnce({ drawingOption: DRAWING_OPTIONS.QUIT });
    
                await cli.drawingStartCommand();
    
                expect(renderSpy).not.toHaveBeenCalled();
                expect(processExitSpy).toHaveBeenCalled();
            });
        });
    
    });

});