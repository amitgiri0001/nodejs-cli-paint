import { RectangleCoordinates } from "../../../src/models/RectangleCoordinatesModel";
import { LineService } from "../../../src/services/LineService";
import { RectangleService } from "../../../src/services/RectangleService";

describe('RectangleService (unit)', () => {
    let rectangleService: RectangleService;
    let lineService: LineService;
    beforeAll(() => {
        rectangleService = new RectangleService();
        lineService = new LineService()
    });

    it('should return 4 lines by coordinates', async () => {
        const rectangleCoordinates: RectangleCoordinates = {
            x1: 1,
            y1: 1,
            x2: 4,
            y2: 4,
        };

        const rectangleLines = rectangleService.getALLRectangleCoordinates(rectangleCoordinates);

        const topLine = lineService.generateHorizontalPositions(
            rectangleCoordinates.y1, 
            rectangleCoordinates.x1,
            rectangleCoordinates.x2
        );
        expect(rectangleLines.topLine).toEqual(topLine);

        const bottomLine = lineService.generateHorizontalPositions(
            rectangleCoordinates.y2, 
            rectangleCoordinates.x1,
            rectangleCoordinates.x2
        );
        expect(rectangleLines.bottomLine).toEqual(bottomLine);

        const leftLine = lineService.generateVerticalPositions(
            rectangleCoordinates.x1, 
            rectangleCoordinates.y1,
            rectangleCoordinates.y2
        );
        expect(rectangleLines.leftLine).toEqual(leftLine);

        const rightLine = lineService.generateVerticalPositions(
            rectangleCoordinates.x2, 
            rectangleCoordinates.y1,
            rectangleCoordinates.y2
        );
        expect(rectangleLines.rightLine).toEqual(rightLine);
    });
});