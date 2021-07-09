import { CliController } from "../src/controllers/CliController";

describe('main (entry point)', () => {
    it('should initiate the CLI interaction', async () => {
        const startSpy = jest.spyOn(CliController.prototype, 'start').mockResolvedValueOnce();

        require('../src/main');
        expect(startSpy).toHaveBeenCalled();
    });
});