import { LINE_INDICATOR } from '../../src/Components';
import { OperationsInteractor } from '../../src/interactors/OperationsInteractor';
import { Canvas } from '../../src/models/CanvasModel';
import { LineCoordinates } from '../../src/models/LineCoordinatesModel';
import { RectangleCoordinates } from '../../src/models/RectangleCoordinatesModel';
import { CanvasService } from '../../src/services/CanvasService';
import { FillService } from '../../src/services/FillService';
import { LineService } from '../../src/services/LineService';
import { RectangleService } from '../../src/services/RectangleService';

describe('OperationsInteractor (acceptance)', () => {
  let operationsInteractor: OperationsInteractor;
  let generateCanvasMatrixSpy: jest.SpyInstance;
  jest.spyOn(console, 'log').mockImplementation(jest.fn());

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCanvas', () => {
    let canvasService: CanvasService;
    beforeAll(() => {
      canvasService = new CanvasService();
      generateCanvasMatrixSpy = jest.spyOn(
        CanvasService.prototype,
        'generateCanvasMatrix',
      );
      operationsInteractor = new OperationsInteractor();
    });

    it('should return canvas matrix', async () => {
      const canvas: Canvas = {
        width: 1,
        height: 1,
      };
      const canvasMatrix = operationsInteractor.createCanvas(canvas);

      expect(canvasMatrix.length === canvas.height + 2).toBe(true);
      expect(canvasMatrix[0].length === canvas.width + 2).toBe(true);

      expect(generateCanvasMatrixSpy).toHaveBeenCalledWith(canvas);

      expect(operationsInteractor.canvasMatrix).toEqual(
        canvasService.generateCanvasMatrix(canvas),
      );
      expect(canvasMatrix).toEqual(canvasService.generateCanvasMatrix(canvas));
    });
  });

  describe('drawLine', () => {
    let lineService: LineService;
    beforeAll(() => {
      lineService = new LineService();
      operationsInteractor = new OperationsInteractor();
      operationsInteractor.createCanvas({
        width: 3,
        height: 3,
      });
    });

    it('should return horizontal line with canvas', async () => {
      const lineCoordinates: LineCoordinates = {
        x1: 1,
        y1: 1,
        x2: 2,
        y2: 1,
      };
      const newCanvasAfterDrawing =
        operationsInteractor.drawLine(lineCoordinates);
      const lineFromLineService = lineService.generateHorizontalPositions(
        lineCoordinates.y1,
        lineCoordinates.x1,
        lineCoordinates.x2,
      );

      expect(
        validateDrawingInCanvas(newCanvasAfterDrawing, lineFromLineService),
      ).toEqual(true);
    });

    it('should return vertical line with canvas', async () => {
      const lineCoordinates: LineCoordinates = {
        x1: 1,
        y1: 2,
        x2: 1,
        y2: 3,
      };

      const newCanvasAfterDrawing =
        operationsInteractor.drawLine(lineCoordinates);
      const lineFromLineService = lineService.generateVerticalPositions(
        lineCoordinates.y1,
        lineCoordinates.x1,
        lineCoordinates.x2,
      );

      expect(
        validateDrawingInCanvas(newCanvasAfterDrawing, lineFromLineService),
      ).toEqual(true);
    });

    it('should not update canvas for non straight lines', async () => {
      const lineCoordinates: LineCoordinates = {
        x1: 1,
        y1: 2,
        x2: 3,
        y2: 3,
      };

      const lastCanvasMatrix = [...operationsInteractor.canvasMatrix];
      const newCanvasAfterDrawing =
        operationsInteractor.drawLine(lineCoordinates);

      expect(newCanvasAfterDrawing).toEqual(lastCanvasMatrix);
    });
  });

  describe('drawRectangle', () => {
    let rectangleService: RectangleService;
    beforeAll(() => {
      rectangleService = new RectangleService();
      operationsInteractor = new OperationsInteractor();
      operationsInteractor.createCanvas({
        width: 3,
        height: 3,
      });
    });
    it('should return canvas with rectangle', async () => {
      const rectangleCoordinates: RectangleCoordinates = {
        x1: 1,
        y1: 1,
        x2: 3,
        y2: 3,
      };

      const newCanvasAfterDrawing =
        operationsInteractor.drawRectangle(rectangleCoordinates);
      const { topLine, bottomLine, leftLine, rightLine } =
        rectangleService.getALLRectangleCoordinates(rectangleCoordinates);
      const rectangleMatrix: number[][] = [].concat(
        topLine,
        bottomLine,
        leftLine,
        rightLine,
      );
      expect(
        validateDrawingInCanvas(newCanvasAfterDrawing, rectangleMatrix),
      ).toEqual(true);
    });
  });

  describe('fillColor', () => {
    let fillService: FillService;
    beforeAll(() => {
      fillService = new FillService();
      operationsInteractor = new OperationsInteractor();
      operationsInteractor.createCanvas({
        width: 3,
        height: 3,
      });
    });

    it('should return canvas with filled colors', async () => {
      const x = 1;
      const y = 1;
      const color = 'c';

      const paintedMatrix = fillService.fill(
        x,
        y,
        color,
        operationsInteractor.canvasMatrix,
      );
      const newCanvasAfterDrawing = operationsInteractor.fillColor(x, y, color);

      expect(paintedMatrix).toEqual(newCanvasAfterDrawing);
    });
  });

  const validateDrawingInCanvas = (
    canvasMatrix: Array<Array<string>>,
    dataMatrix: Array<Array<number>>,
  ): boolean => {
    while (dataMatrix.length) {
      const pixelPositions = dataMatrix.shift();
      if (
        canvasMatrix[pixelPositions[0]][pixelPositions[1]] !== LINE_INDICATOR
      ) {
        return false;
      }
    }

    return true;
  };
});
