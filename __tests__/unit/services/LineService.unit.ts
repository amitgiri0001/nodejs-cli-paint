import { LineCoordinates } from "../../../src/models/LineCoordinatesModel";
import { LineService } from "../../../src/services/LineService";

describe('LineService', () => {
    let lineService: LineService;
    beforeAll(() => {
        lineService = new LineService();
    });

    it('should consider line vertical when the x are same', async () => {
        const lineCoordinates: LineCoordinates = {
            x1: 1,
            y1: 2,
            x2: 1,
            y2: 3,
        };
        
        const lineOrientation = lineService.getOrientation(lineCoordinates);

        expect(lineOrientation).toEqual(LineService.LINE_TYPES.VERTICAL)
    });

    it('should consider line horizontal when the y are same', async () => {
        const lineCoordinates: LineCoordinates = {
            x1: 2,
            y1: 1,
            x2: 3,
            y2: 1,
        };
        
        const lineOrientation = lineService.getOrientation(lineCoordinates);

        expect(lineOrientation).toEqual(LineService.LINE_TYPES.HORIZONTAL)
    });

    it('should return non straight line when neither x nor y are same', async () => {
        const lineCoordinates: LineCoordinates = {
            x1: 2,
            y1: 1,
            x2: 3,
            y2: 7,
        };
        
        const lineOrientation = lineService.getOrientation(lineCoordinates);

        expect(lineOrientation).toEqual(LineService.LINE_TYPES.NON_STRAIGHT)
    });

    it('should generate a series of positions for horizontal line', async () => {
        const lineCoordinates: LineCoordinates = {
            x1: 2,
            y1: 1,
            x2: 3,
            y2: 1,
        };
        
        const linePositions = lineService.generateHorizontalPositions(
            lineCoordinates.y1,
            lineCoordinates.x1,
            lineCoordinates.x2
        );

        expect(linePositions.length).toEqual(lineCoordinates.x2 - lineCoordinates.x1 + 1);
        
        // first position
        expect(linePositions[0]).toEqual([lineCoordinates.y1, lineCoordinates.x1]);
        // last position
        expect(linePositions[linePositions.length - 1]).toEqual([lineCoordinates.y2, lineCoordinates.x2]);
    });

    it('should generate a series of positions for vertical line', async () => {
        const lineCoordinates: LineCoordinates = {
            x1: 1,
            y1: 2,
            x2: 1,
            y2: 5,
        };
        
        const linePositions = lineService.generateVerticalPositions(
            lineCoordinates.x1,
            lineCoordinates.y1,
            lineCoordinates.y2
        );

        expect(linePositions.length).toEqual(lineCoordinates.y2 - lineCoordinates.y1 + 1)
         
        // first position
         expect(linePositions[0]).toEqual([lineCoordinates.y1, lineCoordinates.x1]);
         // last position
         expect(linePositions[linePositions.length - 1]).toEqual([lineCoordinates.y2, lineCoordinates.x2]);
    });
});