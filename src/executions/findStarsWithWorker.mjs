/* eslint-disable no-undef */
import { matToImageData } from '../helper.mjs';

const worker = new Worker('public/worker.js');

export const findStarsWithWorker = (percent) => {
  return new Promise((resolve) => {
    const inputMat = cv.imread('canvasInput');
    const imageData = matToImageData(inputMat);
    inputMat.delete();

    worker.postMessage(
      {
        imageData,
        percent
      },
      [imageData.data.buffer]
    );

    worker.onmessage = (e) => {
      const outputCanvas = document.querySelector('#canvasOutput');
      outputCanvas.getContext('2d').putImageData(e.data.imageData, 0, 0);

      resolve();
    };
  });
};
