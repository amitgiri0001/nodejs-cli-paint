import { OperationsController } from "./OperationsController";

const operations = new OperationsController();

operations.createCanvas({
  height: 70,
  width: 70
});

operations.drawLine({
  x1: 10,
  y1: 20,
  x2: 70,
  y2: 20,
});



operations.drawRectangle({
  startX: 10,
  startY: 10,
  endX: 40,
  endY: 40,
});
