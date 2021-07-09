import { FillService } from "../../../src/services/FillService";
import { FILLED_CANVAS_3_3, FILLED_CANVAS_3_3_WITH_DIVIDING_LINE, FILLED_CANVAS_3_3_WITH_LINE_PARTIALLY_MORE_PAINTED, FILLED_CANVAS_3_3_WITH_LINE_PARTIALLY_REPAINTED, FILLED_CANVAS_3_3_WITH_SMALL_LINE, FILLED_CANVAS_4_4_WITH_3_3_RECTANGLE, FILLED_CANVAS_4_4_WITH_4_4_RECTANGLE, GIVEN_CANVAS_3_3, GIVEN_CANVAS_3_3_WITH_DIVIDING_LINE, GIVEN_CANVAS_3_3_WITH_LINE_PARTIALLY_PAINTED, GIVEN_CANVAS_3_3_WITH_SMALL_LINE, GIVEN_CANVAS_4_4_WITH_3_3_RECTANGLE, GIVEN_CANVAS_4_4_WITH_4_4_RECTANGLE } from "../../__fixtures__/fillVariations";

describe('FillService (unit)', () => {
    let fillService: FillService;
    const color = 'c'; 
    beforeAll(() => {
        fillService = new FillService();
    });

    it('should paint whole canvas if the canvas is empty', async () => {
        // Painting from bottom right corner for worst case scenario
        const filledMatrix = fillService.fill(3, 3,  color,GIVEN_CANVAS_3_3);
        expect(filledMatrix).toEqual(FILLED_CANVAS_3_3);
    });

    it('should fill everything except the drawings', async () => {
        const filledMatrix = fillService.fill(2, 2,  color, GIVEN_CANVAS_3_3_WITH_SMALL_LINE);
        expect(filledMatrix).toEqual(FILLED_CANVAS_3_3_WITH_SMALL_LINE);
    });

    it('should not fill of the color coordinates lies on drawing lines', async () => {
        const filledMatrix = fillService.fill(1, 1,  color, GIVEN_CANVAS_3_3_WITH_SMALL_LINE);
        expect(filledMatrix).toEqual(GIVEN_CANVAS_3_3_WITH_SMALL_LINE);
    });

    it('should paint the portion considering canvas borders and random canvas splits', async () => {
        const filledMatrix = fillService.fill(1, 1,  color, GIVEN_CANVAS_3_3_WITH_DIVIDING_LINE);
        expect(filledMatrix).toEqual(FILLED_CANVAS_3_3_WITH_DIVIDING_LINE);
    });

    it('should fill portion of drawing without going out of its scope', async () => {
        const filledMatrix = fillService.fill(3, 2,  color, GIVEN_CANVAS_4_4_WITH_4_4_RECTANGLE);
        expect(filledMatrix).toEqual(FILLED_CANVAS_4_4_WITH_4_4_RECTANGLE);
    });

    it('should fill portion of canvas without getting into the drawing scope', async () => {
        // Painting from bottom right corner for worst case scenario
        const filledMatrix = fillService.fill(4, 4,  color, GIVEN_CANVAS_4_4_WITH_3_3_RECTANGLE);
        expect(filledMatrix).toEqual(FILLED_CANVAS_4_4_WITH_3_3_RECTANGLE);
    });

    it('should be able to paint different color on top of an existing color', async () => {
        const filledMatrix = fillService.fill(1, 1,  'u', GIVEN_CANVAS_3_3_WITH_LINE_PARTIALLY_PAINTED);
        expect(filledMatrix).toEqual(FILLED_CANVAS_3_3_WITH_LINE_PARTIALLY_REPAINTED);
    });

    it('should be able to paint different color on other areas of canvas', async () => {
        const filledMatrix = fillService.fill(3, 3,  color, FILLED_CANVAS_3_3_WITH_LINE_PARTIALLY_REPAINTED);
        expect(filledMatrix).toEqual(FILLED_CANVAS_3_3_WITH_LINE_PARTIALLY_MORE_PAINTED);
    });

});