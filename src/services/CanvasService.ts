import { Canvas } from "../models/CanvasModel";
import { VERTICAL_BOUNDARIES, HORIZONTAL_BOUNDARIES, EMPTY_SPACE,  } from "../Components";

export class CanvasService {
    generateCanvas(canvas: Canvas): Array<Array<string>> {
      const rowList = [];
      const screenMargin = 2;

      for (let level = 1; level <= canvas.height + screenMargin; level++) {
          const row = [];
          for (let partition = 1; partition <= canvas.width + screenMargin; partition++) {
            let pixel = EMPTY_SPACE;
            if (level === 1 || level === canvas.height + screenMargin) {
              pixel = HORIZONTAL_BOUNDARIES;
            } 
            else if (partition === 1 || partition === canvas.width + screenMargin) {
              pixel = VERTICAL_BOUNDARIES;
            }
            
            row.push(pixel)  
          }
          rowList.push(row);   
      }

      return rowList;
    }
}