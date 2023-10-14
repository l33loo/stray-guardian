import * as tf from "@tensorflow/tfjs-node";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as deeplab from "@tensorflow-models/deeplab";
import { getLabels, getColormap } from "@tensorflow-models/deeplab";
import fs from "fs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

const loadDeepLabModel = async () => {
  const modelName = "ade20k"; // set to your preferred model, either `pascal`, `cityscapes` or `ade20k`
  const quantizationBytes = 4; // either 1, 2 or 4
  return await deeplab.load({ base: modelName, quantizationBytes });
};

export default async (filePath: string) => {
  const imageBuffer = fs.readFileSync(filePath);
  const tfimage = tf.node.decodeImage(imageBuffer);

  // Load the coco model.
  const cocoModel = await cocoSsd.load();
  const predictions = await cocoModel.detect(tfimage);
  return predictions.sort((p) => -p.score)[0];

  // Load deeplab
  // const deeplabModel = await loadDeepLabModel();
  // console.log(await deeplabModel.segment(tfimage));
};
