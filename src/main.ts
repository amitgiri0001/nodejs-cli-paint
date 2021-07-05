import { OperationsController } from "./OperationsController";

const operations = new OperationsController();

operations.createCanvas({
  height: 10,
  width: 10
});

operations.drawLine({
  x1: 8,
  y1: 1,
  x2: 8,
  y2: 9,
});

operations.drawLine({
  x1: 0,
  y1: 2,
  x2: 15,
  y2: 2,
});
