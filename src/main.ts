// import { OperationsController } from "./OperationsController";

import { CliController } from "./controllers/CliController";

/**
 * This is the starting point of CLI interaction.
 * The CLI start with a fresh canvas on every start.
 */
new CliController().start();